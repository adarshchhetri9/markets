import axios from "axios";
import { create } from "zustand";
import debounce from "../helper/debounce";
import formatNumber from "../helper/formatNumber";
import formatString from "../helper/formatString";

export interface Coin {
  name: string;
  image: string;
  id: string;
  symbol: string;
  priceBtc: string;
  priceUsd: string;
}

interface HomeStoreState {
  coins: Coin[];
  trending: Coin[];
  query: string;
  fetchCoins: () => Promise<void>;
  setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchCoins: () => void;
  graphData: Record<string, { Date: string; Price: number }[]>;
  searching: boolean;
}

const homeStore = create<HomeStoreState>((set) => {
  const initialState: HomeStoreState = {
    coins: [],
    trending: [],
    query: "",
    graphData: {},
    fetchCoins: () => Promise.resolve(),
    setQuery: () => {},
    searchCoins: () => {},
    searching: false,
  };

  let btcPrice: number; // Define btcPrice here

  return {
    ...initialState,

    setQuery: (e) => {
      set({ query: e.target.value });
      homeStore.getState().searchCoins();
    },

    searchCoins: debounce(
      async () => {
        set({ searching: true });
        const { query, trending } = homeStore.getState();

        if (query.length > 2) {
          try {
            const res = await axios.get(
              `https://api.coingecko.com/api/v3/search?query=${query}`
            );

            const coins: Coin[] = res.data.coins.map((coin: any) => {
              return {
                name: coin.name,
                image: coin.large,
                id: coin.id,
                symbol: coin.symbol,
                priceBtc: formatNumber(coin.price_btc),
                priceUsd: formatNumber(coin.price_btc * (btcPrice ?? 0)), // Use btcPrice here with fallback value 0
              };
            });

            set({ coins, searching: false });
          } catch (error) {
            console.error("Error fetching coins:", error);
          }
        } else {
          set({ coins: trending, searching: false });
        }
      },
      500,
      false
    ),

    fetchCoins: async () => {
      try {
        const [res, btcRes] = await Promise.all([
          axios.get("https://api.coingecko.com/api/v3/search/trending"),
          axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
          ),
        ]);

        btcPrice = btcRes.data.bitcoin?.usd; // Assign value to btcPrice

        const coins: Coin[] = res.data.coins.map((coin: any) => {
          return {
            name: formatString(coin.item.name),
            image: coin.item.large,
            symbol: coin.item.symbol,
            id: coin.item.id,
            priceBtc: formatNumber(coin.item.price_btc),
            priceUsd: formatNumber(coin.item.price_btc * btcPrice), // Use btcPrice here with fallback value 0
          };
        });

        const graphDataPromises = coins.map((coin) =>
          axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`
          )
        );

        const graphDataResponses = await Promise.all(graphDataPromises);

        const graphData: Record<string, { Date: string; Price: number }[]> = {};
        graphDataResponses.forEach((response, index) => {
          const coinId = coins[index].id;
          const coinGraphData = response.data.prices.map((price: any) => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us");
            return {
              Date: date,
              Price: p,
            };
          });
          graphData[coinId] = coinGraphData;
        });

        set({ graphData, coins, trending: coins });
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    },
  };
});

export default homeStore;
