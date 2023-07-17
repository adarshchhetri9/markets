import React, { useRef, useEffect, FC } from "react";
import showStore, { GraphDataItem, Data } from "../stores/showStore";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { arrow } from "../assets";

interface DurationButtonRef {
  current: HTMLButtonElement | null;
}

const Show: FC = () => {
  const store = showStore();
  const params = useParams<{ id: string }>();
  const [selectedDuration, setSelectedDuration] = useState<number>(120);
  const durationButtonsRef = useRef<DurationButtonRef[]>([]);

  useEffect(() => {
    store.fetchData(params.id, selectedDuration);
  }, [params.id, selectedDuration]);

  const handleDurationChange = (duration: number, index: number) => {
    setSelectedDuration(duration);
    if (durationButtonsRef.current[index]?.current) {
      durationButtonsRef.current[index].current.focus();
    }
  };

  const value = store.data.market_data?.price_change_percentage_24h;
  const backgroundColor = value && value > 0 ? "text-green-500" : "text-red-500";
  const sign = value && value > 0 ? "+" : "-";

  return (
    <div className="w-[390px]  pb-20 border">
      <header className="px-5 ">
        <div className="flex mt-3 items-center">
          <Link className="mr-5 mb-4" to="/">
            <img
              src={arrow}
              alt=""
              className=" border rounded-full w-10 h-10 flex justify-center p-2 items-center pl-1  "
            />
          </Link>
          <img className="w-16 mb-5" src={store.data.image?.large} alt="" />
          <div className="ml-3 mb-8">
            <div className="flex flex-col ">
              <h1 className="text-3xl font-semibold   ">{store.data.name}</h1>
              <h1 className="ml-1 text-xl">{store.data.symbol}</h1>
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-xl">
            $ {store.data.market_data?.current_price?.usd}
          </h1>
          <h1 className={` mb-5 ${backgroundColor}`}>
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
      <div className="flex justify-center gap-3 font-semibold mb-10">
        <button
          ref={(ref) => (durationButtonsRef.current[0] = { current: ref })}
          onClick={() => handleDurationChange(1, 0)}
          className={`${
            selectedDuration === 1
              ? "bg-black  text-white "
              : "bg-gray-200 text-gray-700"
          } w-12 h-12 rounded-full`}
        >
          1D
        </button>
        {/* Other buttons */}
      </div>

      <div className="mx-4">
        <div className="font-medium flex flex-col gap-1">
          <div className="flex justify-between">
            <h1>Close Prize : </h1>
            <span className="font-bold">
              $ {store.data.market_data?.high_24h?.usd}
            </span>
          </div>
          {/* Other data */}
        </div>

        <Link to={"/"}>
          <h1 className="bg-black text-white w-1/2 mx-auto px-6 py-4 rounded-lg mt-5 text-center">
            Add to Portfolio
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Show;
