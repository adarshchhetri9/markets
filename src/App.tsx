// import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Show from "./pages/Show";
// import "./index.css";
// import BottomNavBar from "./components/BottomNavBar";
import Portfolio from "./pages/Portfolio";

const App = () => (
  <div className="w-[390px] ">
    <BrowserRouter>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Show />} />
      </Routes>
      {/* <BottomNavBar /> */}
    </BrowserRouter>
  </div>
);

export default App;
