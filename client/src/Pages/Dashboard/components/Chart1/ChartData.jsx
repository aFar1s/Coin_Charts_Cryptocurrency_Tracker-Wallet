// import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const ChartData = ({chartData1}) => {
  console.log("props from chart data", chartData1)

  let data = {
    series: [{
      data: chartData1
    }],
    options: {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'Historical Price',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    }
  };

  return (
    <div id="chart1">
      <ReactApexChart options={data.options} series={data.series}  type="candlestick" height={350} />
    </div>
  )
}

export default ChartData