// import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
// import axios from "axios";

const ProfitChart = () => {

  // const [chartData, setChartData] = useState([])

//   useEffect(() => {
//     axios
//       .get(
//         ``
//       )
//       .then((res) => {
//         setChartData(res.data);
//       });
//   }, []);

  let data = {
    series: [
      {
        data: [[1640232119801, 10000]],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      title: {
        text: "Profit Record",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ProfitChart;
