import axios from "axios";
import { create } from "zustand";
import debounce from "../helper/debounce";

export interface Coin {
  name: string;
  image: string;
  id: string;
  priceBtc: number;
}

interface HomeStoreState {
  coins: Coin[];
  trending: Coin[]; // Initialize the 'trending' property with an empty array
  query: string;
  fetchCoins: () => Promise<void>;
  setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchCoins: () => void;
}

const useHomeStore = create<HomeStoreState>((set) => ({
  coins: [],
  trending: [], // Initialize 'trending' as an empty array
  query: "",

  setQuery: (e: React.ChangeEvent<HTMLInputElement>) => {
    set((state) => ({ ...state, query: e.target.value }));
    useHomeStore.getState().searchCoins();
  },

  searchCoins: debounce(
    () => {
      const { query, trending } = useHomeStore.getState();
      if (query.length > 2) {
        axios
          .get(`https://api.coingecko.com/api/v3/search?query=${query}`)
          .then((res) => {
            const coins: Coin[] = res.data.coins.map((coin: any) => {
              return {
                name: coin.name,
                image: coin.large,
                id: coin.id,
              };
            });

            set({ coins });

            console.log(coins);
          })
          .catch((error) => {
            console.error("Error fetching coins:", error);
          });
      } else {
        // Set 'coins' to 'trending' if the query length is less than or equal to 2
        set({ coins: trending });
      }
    },
    500,
    true
  ),

  fetchCoins: async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );

      const coins: Coin[] = res.data.coins.map((coin: any) => {
        return {
          name: coin.item.name,
          image: coin.item.large,
          id: coin.item.id,
          priceBtc: coin.item.price_btc,
        };
      });

      set({ coins, trending: coins });
      console.log(coins);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  },
}));

export default useHomeStore;
