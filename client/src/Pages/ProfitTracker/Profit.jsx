import React from "react";
import ProfitChart from "./components/ProfitChart";

const Profit = () => {
  return (
    <div>
      <div className="profit-tittle">
        <h2 style={{ textDecoration: "underline" }}>Profit Tracker</h2>
      </div>
      <ProfitChart />
    </div>
  );
};

export default Profit;
