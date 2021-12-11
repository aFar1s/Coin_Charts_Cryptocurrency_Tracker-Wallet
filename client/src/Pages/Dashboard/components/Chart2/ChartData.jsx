import ReactApexChart from "react-apexcharts";

const ChartData = ({ chartData2 }) => {
  let data = {
    series: [
      {
        data: chartData2,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "Traded Volume",
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
    <div id="chart">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ChartData;
