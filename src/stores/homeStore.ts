import axios from "axios";
import create from "zustand";

export interface Coin {
  name: string;
  image: string;
  id: string;
  priceBtc: number;
}

interface HomeStoreState {
  coins: Coin[];
  query: string; // Add query property to the HomeStoreState
  fetchCoins: () => Promise<void>;
  setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void; // Specify the type for e
  searchCoins: () => void; // Correct the typo in the function name
}

const homeStore = create<HomeStoreState>((set) => ({
  coins: [],
  query: "",

  setQuery: (e) => {
    set({ query: e.target.value }); // Correct the syntax for updating the state
    homeStore.getState().searchCoins();
  },

  searchCoins: async () => {
    const { query } = homeStore.getState();
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );
    console.log(res);
  },

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

      set({ coins });
      console.log(coins);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  },
}));

export default homeStore;
