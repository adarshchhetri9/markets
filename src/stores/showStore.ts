import axios from "axios";
import { create } from "zustand";

export interface GraphDataItem {
  Date: string;
  Price: number;
}

interface ShowStoreState {
  graphData: GraphDataItem[];
  data: any; // Change 'any' to the correct type for 'data'
  fetchData: (id: string, duration: number) => Promise<void>; // Include the 'duration' parameter with the correct type
}

const showStore = create<ShowStoreState>((set) => ({
  graphData: [],
  data: {}, // Add the correct initial value for 'data'
  fetchData: async (id, duration) => {
    const [graphRes, dataRes] = await Promise.all([
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${duration}`
      ),
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`
      ),
    ]);

    const graphData = graphRes.data.prices.map((price: [number, number]) => {
      // Add type for 'price' parameter
      const [timestamp, p] = price;
      const date = new Date(timestamp).toLocaleDateString("en-us");
      return {
        Date: date,
        Price: p,
      };
    });

    set({ graphData, data: dataRes.data });
    // console.log(graphData);
    // console.log(dataRes);
  },
}));

export default showStore;
