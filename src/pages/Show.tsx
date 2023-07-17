import { useRef } from "react";
import showStore, { GraphDataItem } from "../stores/showStore";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { arrow } from "../assets";

interface ShowStore {
  fetchData: (id: string, duration: number) => Promise<void>;
  graphData: GraphDataItem[];
  data: {
    name: string;
    symbol: string;
    image: {
      large: string;
    };
    market_data: {
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
    };
  };
}

export default function Show() {
  const store = showStore() as ShowStore;
  const params = useParams<{ id: string }>();
  const [selectedDuration, setSelectedDuration] = useState(120);
  const durationButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (params.id) {
      store.fetchData(params.id, selectedDuration);
    } else {
      console.log("params.id is undefined.");
    }
  }, [params.id, selectedDuration]);

  const handleDurationChange = (duration: number, index: number) => {
    setSelectedDuration(duration);
    durationButtonsRef.current[index]?.focus();
  };

  const value = store.data.market_data?.price_change_percentage_24h;
  const backgroundColor =
    value && value > 0 ? "text-green-500" : "text-red-500";
  const sign = value && value > 0 ? "+" : "-";

  if (store.graphData.length === 0) {
    // Handle loading or no data state
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[390px] pb-20 border">
      <header className="px-5">
        <div className="flex mt-3 items-center">
          <Link className="mr-5 mb-4" to="/">
            <img
              src={arrow}
              alt=""
              className="border rounded-full w-10 h-10 flex justify-center p-2 items-center pl-1"
            />
          </Link>
          <img
            className="w-16 mb-5"
            src={store.data.image?.large}
            alt={store.data.name}
          />
          <div className="ml-3 mb-8">
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold">{store.data.name}</h1>
              <h1 className="ml-1 text-xl">{store.data.symbol}</h1>
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-xl">
            $ {store.data.market_data?.current_price?.usd}
          </h1>
          <h1 className={`mb-5 ${backgroundColor}`}>
            ({sign}
            {Math.abs(value)?.toFixed(2)} %)
          </h1>
        </div>
      </header>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={store.graphData}>
          <XAxis dataKey="Date" className="hidden" />
          <Tooltip />
          <Line type="monotone" dataKey="Price" stroke="#000" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-7 font-semibold mb-10 text-xs">
        <button
          key={1}
          ref={(ref) => (durationButtonsRef.current[0] = ref)}
          onClick={() => handleDurationChange(1, 0)}
          className={`${
            selectedDuration === 1
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          } w-10 h-10 rounded-full`}
        >
          1D
        </button>
        <button
          key={7}
          ref={(ref) => (durationButtonsRef.current[1] = ref)}
          onClick={() => handleDurationChange(7, 1)}
          className={`${
            selectedDuration === 7
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          } w-10 h-10 rounded-full`}
        >
          7D
        </button>
        <button
          key={30}
          ref={(ref) => (durationButtonsRef.current[2] = ref)}
          onClick={() => handleDurationChange(30, 2)}
          className={`${
            selectedDuration === 30
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          } w-10 h-10 rounded-full`}
        >
          1M
        </button>
        <button
          key={90}
          ref={(ref) => (durationButtonsRef.current[3] = ref)}
          onClick={() => handleDurationChange(90, 3)}
          className={`${
            selectedDuration === 90
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          } w-10 h-10 rounded-full`}
        >
          3M
        </button>
        <button
          key={365}
          ref={(ref) => (durationButtonsRef.current[4] = ref)}
          onClick={() => handleDurationChange(365, 4)}
          className={`${
            selectedDuration === 365
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          } w-10 h-10 rounded-full`}
        >
          1Y
        </button>
      </div>
      <div className="mx-4">
        <div className="font-base flex flex-col gap-1">
          <div className="flex justify-between">
            <h1>Close Prize :</h1>
            <span className="font-bold">
              $ {store.data.market_data?.high_24h?.usd}
            </span>
          </div>
          <div className="flex justify-between">
            <h1>Last Trade Price :</h1>
            <span className="font-bold">
              $ {store.data.market_data?.high_24h?.usd}
            </span>
          </div>
          <div className="flex justify-between">
            <h1>OutStanding :</h1>
            <span className="font-bold">
              $ {store.data.market_data?.fully_diluted_valuation?.usd}
            </span>
          </div>
          <div className="flex justify-between">
            <h1>Market Value :</h1>
            <span className="font-bold">
              $ {store.data.market_data?.market_cap?.usd}
            </span>
          </div>
        </div>

        <Link to={"/portfolio"}>
          <h1 className="bg-black text-white w-full mx-auto px-6 py-4 rounded-lg mt-5 text-center">
            Add to Portfolio
          </h1>
        </Link>
      </div>
    </div>
  );
}
