import Taro, { Component } from "@tarojs/taro";
import * as echarts from "./ec-canvas/echarts";

function setChartData (chart, data) {
  let option = {
    color: ['#999'],
    grid: {
      containLabel: true,
      left: 0,
      right: '5%',
      top: '5%',
      bottom: 0,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function (params) {
        // console.log(params)
        params = params[0];
        return `${params.name}:${params.value}元`;
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        // show: false,
        type: 'value'
      }
    ],
    series: [],
    animation: false
  };
  if (data && data.dimensions && data.measures) {
    option.xAxis[0].data = data.dimensions.data
    option.series = data.measures.map(item => {
      return {
        ...item,
        type: 'line',
        itemStyle: {
          color: '#FC7F5D'
        },
        lineStyle: {
          color: '#999',
          width: 1
        }
      }
    })
  }
  chart.setOption(option);
}

export default class LineChart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "./ec-canvas/ec-canvas"
    }
  };

  constructor (props) {
    super(props);
  }

  state = {
    ec: {
      lazyLoad: true
    }
  };

  // componentWillReceiveProps (props) {
  //   console.log(props)
  //   this.refresh(props.chartData)
  // }


  refresh (data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);

  render () {
    return (
      <ec-canvas
        ref={this.refChart}
        canvas-id='mychart-area'
        ec={this.state.ec}
      />
    );
  }
}
