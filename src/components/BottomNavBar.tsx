import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";

const BottomNavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const handleTabClick = (tabName: string) => {
    if (tabName === "Portfolio") {
      setActiveTab((prevTab) =>
        prevTab === "Portfolio" ? "Market" : "Portfolio"
      );
    } else {
      setActiveTab(tabName);
    }
  };

  return (
    <div className="bg-white text-sm">
      <nav className="fixed bottom-0 left-0 w-[390px] border bg-white flex justify-between items-center h-16 rounded-b-lg center-x">
        <Link
          to={"/portfolio"}
          className={`  w-1/3 text-center ${
            activeTab === "Portfolio" ? "font-semibold text-blue-700" : ""
          }`}
          onClick={() => handleTabClick("Portfolio")}
        >
          <h1 className="flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={activeTab === "Portfolio" ? "blue" : "gray"}
              className={`w-6 h-6 ${
                activeTab === "Portfolio" ? " blue" : "gray"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Portfolio</span>
          </h1>
        </Link>

        <Link
          to={"/"}
          className={` w-1/3 text-center ${
            activeTab === "Market" ? "font-semibold text-blue-700" : ""
          }`}
          onClick={() => handleTabClick("Market")}
        >
          <h1 className="flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={activeTab === "Market" ? "blue" : "gray"}
              className={`w-6 h-6 ${activeTab === "Market" ? " blue" : "gray"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
            <span>Market</span>
          </h1>
        </Link>

        <Link
          to={"/bitcoin"}
          className={`  w-1/3 text-center ${
            activeTab === "News" ? "font-semibold text-blue-700" : ""
          }`}
          onClick={() => handleTabClick("News")}
        >
          <h1 className="flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={activeTab === "News" ? "blue" : "gray"}
              className={`w-6 h-6 ${activeTab === "News" ? " blue" : "gray"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>

            <span>News</span>
          </h1>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavBar;
