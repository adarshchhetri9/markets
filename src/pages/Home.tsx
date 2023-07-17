import React from "react";
import homeStore, { Coin } from "../stores/homeStore";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  // Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";
// import Head from "../components/Head";
// import { bitcoin, money } from "../assets";

export default function Home() {
  const store = homeStore();

  React.useEffect(() => {
    store.fetchCoins();
  }, []);

  return (
    <div className="w-[390px]   p-2 pb-[60px] ">
      <div className="bg-[#2c53f5] text-white  rounded-t-xl px-4 py-2">
        {/* <Head /> */}
        <div className=" rounded-lg w-full p-1 text-black bg-[#5c7cf7]">
          <input
            className="w-full bg-[#5c7cf7] focus:border  focus:outline-none focus:border-[#6d8af1] text-white"
            type="text"
            value={store.query}
            onChange={store.setQuery}
          />
        </div>
        <div className="flex gap-4 justify-center mt-5 mb-4 ">
          <h1 className="text-slate-300">Main Market</h1>
          <h1 className="text-white">Junior Market</h1>
          <h1 className="text-slate-300">FX Rates</h1>
        </div>
      </div>
      {store.coins.map((coin: Coin) => {
        return (
          <div key={coin.id} className="bg-white p-2 mt-2 border-b-2">
            <Link className="flex " to={`/${coin.id}`}>
              <div className="flex gap-2 items-center">
                <img src={coin.image} alt="" className="h-8 w-8 rounded-full" />
                <div>
                  <h1 className="font-bold">{coin.symbol}</h1>
                  <div className="w-[100px]  text-slate-400 font-thin">
                    {coin.name}
                  </div>
                </div>
              </div>
              {coin.priceBtc && (
                <div className=" ">
                  <ResponsiveContainer width={120} height={40}>
                    <LineChart
                      data={store.graphData[coin.id]}
                      margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                    >
                      <Line
                        type="monotone"
                        dataKey="Price"
                        stroke="#81f542"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              {coin.priceBtc && (
                <div>
                  <div className="flex justify-start gap-1 items-center">
                    {/* <img src={bitcoin} className="w-[20px] h-[20px]" alt="" /> */}
                    <h1 className="relative overflow-hidden text-xs font-semibold  ">
                      {coin.priceBtc}
                    </h1>
                  </div>
                  <div className="ml-[2.5px] flex justify-start gap-2 items-center mt-2 ">
                    {/* <img src={money} className="w-[15px] h-{15px]" alt="" /> */}
                    <h1 className="relative  overflow-hidden text-[10px] text-slate-800  ">
                      {coin.priceUsd}
                    </h1>
                    <h1></h1>
                  </div>
                </div>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
