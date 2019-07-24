import Taro, { Component, useState, useEffect, useRef } from "@tarojs/taro"
import { View, Text, Picker, ScrollView } from "@tarojs/components"
import { connect } from '@tarojs/redux'

import SegmentedControl from '../SegmentedControl/SegmentedControl'
import IconComponent from '../icon/icon'
import LineChart from "../Charts/LineChart";

import './reportPage.scss'

import { getWeek, getWeekDate, getMonthDate } from '../../util/index'

import { getChartData } from '../../api/index'

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  statusBarHeight: state.systemInfo.statusBarHeight,
  category: state.category
})

const mapDispatchToProps = dispatch => ({})

@connect(mapStateToProps, mapDispatchToProps)
export default class ReportPage extends Component {
  state = {
    values: ['周', '月', '年'],
    current: 0,// 年月日的Index
    dateList: [],
    currentIndex: 0, // dateList的index
    selector: ['支出', '收入'],
    selectorChecked: '支出', // 当前选中的type
    detailList: [],  // 底部列表数据
    chartData: {},
    total: '0.00',
    average: '0.00'
  }

  getData = () => {
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    const { selectorChecked, values, current, dateList, currentIndex } = this.state
    let date = parseFloat(dateList[currentIndex])
    if (isNaN(date)) {
      const now = new Date()
      switch (values[current]) {
        case '周':
          date = getWeek(now)
          break;
        case '月':
          date = now.getMonth() + 1
          break;
        case '年':
          date = now.getFullYear()
          break;
        default:
          break;
      }
    }
    return getChartData({
      type: selectorChecked,
      dateType: values[current],
      date,
    }).then(res => {
      console.log(res)
      this.setState((state, props) => {
        let chartData = state.chartData
        const total = res.total.toFixed(2)
        const average = (res.total / Object.keys(chartData).length).toFixed(2)
        res.data.forEach(i => {
          let key
          switch (values[current]) {
            case '周':
              key = `${i.month}-${i.day}`
              break;
            case '月':
              key = i.day
              break;
            case '年':
              key = i.month
              break;
            default:
              break;
          }
          chartData[key] += +i.count
        })

        let detailList = []

        for (const key in res.categoryData) {
          const count = res.categoryData[key]
          let obj = props.category.filter(i => i._id === key)[0]
          obj.count = count.toFixed(2)
          obj.percent = (count / res.total * 100).toFixed(2) + '%'
          detailList.push(obj)
        }
        detailList.sort((a, b) => +b.count - +a.count)
        return {
          total,
          average,
          detailList,
          chartData
        }
      }, () => {
        this.chart.refresh(this.setChartData(), selectorChecked, values[current])
          Taro.hideLoading()
      })
    })
  }

  setChartData () {
    return ({
      dimensions: {// x
        data: Object.keys(this.state.chartData)
      },
      measures: [{// y
        data: Object.values(this.state.chartData).map(i => i.toFixed(2))
      }]
    })
  }

  handleClick = (val) => {
    this.setState({
      current: val,
      currentIndex: 0,
    }, () => {
      this.getDateList()
    })
  }

  onChange = (e) => {
    this.setState((state) => {
      let chartData = state.chartData
      for (const key in chartData) {
        chartData[key] = 0
      }
      return {
        selectorChecked: this.state.selector[e.detail.value],
        chartData
      }
    }, () => {
      this.getData()
    })
  }

  handleClickDate = (index) => {
    if (index === this.state.currentIndex) return
    this.setState({
      currentIndex: index
    }, () => {
      this.getChartDateList()
    })
  }

  getDateList = () => {
    const { values, current } = this.state
    const type = values[current]
    const date = new Date(this.props.userInfo.createTime)
    const now = new Date()
    let start
    let end
    let dateListTmp = []
    switch (type) {
      case '周':
        // start = 20
        // end = 28
        start = getWeek(date)
        end = getWeek(now)
        for (let i = 0; i <= end - start; i++) {
          dateListTmp.push(start + i)
        }
        console.log(dateListTmp)
        console.log(date, now)
        dateListTmp = dateListTmp.map(i => i + type)
        dateListTmp.splice(-1, 1, '本周')
        break;
      case '月':
        // start = 1
        // end = 12
        start = date.getMonth() + 1
        end = now.getMonth() + 1
        for (let i = 0; i <= end - start; i++) {
          dateListTmp.push(start + i)
        }
        dateListTmp = dateListTmp.map(i => i + type)
        dateListTmp.splice(-1, 1, '本月')
        break;
      case '年':
        start = date.getFullYear()
        end = now.getFullYear()
        for (let i = 0; i <= end - start; i++) {
          dateListTmp.push(start + i)
        }
        dateListTmp = dateListTmp.map(i => i + type)
        dateListTmp.splice(-1, 1, '今年')
        break;
      default:
        break;
    }
    this.setState({
      dateList: dateListTmp
    }, () => {
      this.getChartDateList()
    })
  }

  getChartDateList = () => {
    const { values, current, dateList, currentIndex } = this.state
    const type = values[current]
    let date = parseFloat(dateList[currentIndex])
    let now = new Date()
    let dateListTmp = {}
    switch (type) {
      case '周':
        if (isNaN(date)) {
          date = getWeek(now)
        }
        dateListTmp = getWeekDate(date)
        break;
      case '月':
        if (isNaN(date)) {
          date = now.getMonth() + 1
        }
        dateListTmp = getMonthDate(date)
        break;
      case '年':
        for (let i = 1; i <= 12; i++) {
          dateListTmp[i] = 0
        }
        break;
      default:
        break;
    }
    this.setState({
      chartData: dateListTmp
    }, () => {
      this.getData()
    })
  }

  componentDidMount () {
    // this.getData()
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    this.getDateList()

    setTimeout(() => {
      this.chart.refresh(this.setChartData(), this.state.selectorChecked, this.state.values[this.state.current]);
    }, 20);
  }

  refLineChart = (node) => this.chart = node

  render () {
    const { values, current, dateList, currentIndex, selectorChecked, detailList, total, average } = this.state
    const height = this.props.statusBarHeight + 56 + 36
    return (
      <View className='report'>

        <View className='overview' style={{ marginTop: height + 'px' }}>
          <View className='SegmentedControl'>
            <SegmentedControl values={values}
              onClick={this.handleClick}
              current={current}
            ></SegmentedControl>
          </View>
        </View>


        <View className='label clearfix'>
          <ScrollView scrollX style={{ overflow: 'hidden' }} class='fl'>
            <View className='date' >
              {
                dateList.map((i, index) => (
                  <View className={index === currentIndex ? 'item active' : 'item'}
                    key={i}
                    onClick={() => this.handleClickDate(index)}
                  >{ i }</View>
                ))
              }
            </View>
          </ScrollView>
          <View className='picker fl'>
            <Picker mode='selector' range={this.selector} onChange={this.onChange}>
              <View>
                { selectorChecked } <Text className='icon'></Text>
              </View>
            </Picker>
          </View>
        </View>
        <View className='text'>
          <View>总{ selectorChecked }:{ total }</View>
          <View>平均值:{ average }</View>
        </View>
        <View className='echarts'>
          <LineChart ref={this.refLineChart}></LineChart>
        </View>

        <View className='detail'>
          <View className='title'>{ selectorChecked }排行榜</View>
          {
            detailList.map(item => (<View className='item' key={item.name}>
              <View className='icon'>
                <IconComponent name={item.icon}></IconComponent>
              </View>
              <View className='warpper'>
                <View className='clearfix'>
                  <View className='fl'>{ item.name }</View>
                  <View className='fl' style={{ marginLeft: '30rpx' }}>{ item.percent }</View>
                  <View className='fr'>{ item.count }</View>
                </View>
                <View className='bar' style={{ width: item.percent }}></View>
              </View>
            </View>))
          }

        </View>
      </View>
    )
  }
}