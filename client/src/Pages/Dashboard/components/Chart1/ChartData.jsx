// import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const ChartData = ({props}) => {
  console.log("props from chart data", props)

  let data = {
    series: [{
      data: props
    }],
    options: {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'CandleStick Chart',
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
    <div id="chart">
      <ReactApexChart options={data.options} series={data.series}  type="candlestick" height={350} />
    </div>
  )
}

export default ChartData