import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

interface GraphData {
  Date: string;
  Price: number;
}

interface MarketData {
  current_price: {
    usd: number;
  };
  price_change_percentage_24h: number;
  high_24h: {
    usd: number;
  };
  fully_diluted_valuation: {
    usd: number;
  };
  market_cap: {
    usd: number;
  };
}

interface ShowData {
  name: string;
  symbol: string;
  image?: {
    large: string;
  };
  market_data?: MarketData;
}

interface ShowStoreState {
  graphData: GraphData[];
  data: ShowData;
  fetchData: (id: string, duration: number) => Promise<void>;
}

const showStore = create<ShowStoreState>((set) => ({
  graphData: [],
  data: {} as ShowData,
  fetchData: async (id: string, duration: number) => {
    try {
      const [graphRes, dataRes]: AxiosResponse<any>[] = await Promise.all([
        axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${duration}`
        ),

        axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`
        ),
      ]);

      const graphData: GraphData[] = graphRes.data.prices.map((price: any) => {
        const [timestamp, p]: [number, number] = price;
        const date = new Date(timestamp).toLocaleDateString("en-us");
        return {
          Date: date,
          Price: p,
        };
      });

      const coinData: ShowData = dataRes.data;

      set({ graphData, data: coinData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

export default showStore;
