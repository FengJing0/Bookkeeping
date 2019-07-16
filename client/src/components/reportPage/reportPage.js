import Taro, { Component, useState, useEffect, useRef } from "@tarojs/taro"
import { View, Text, Picker, ScrollView } from "@tarojs/components"
import { connect } from '@tarojs/redux'

import SegmentedControl from '../SegmentedControl/SegmentedControl'
import IconComponent from '../icon/icon'
import LineChart from "../Charts/LineChart";

import './reportPage.scss'

import { getWeek } from '../../util/index'

// import { getData } from '../../api/index'
const mapStateToProps = state => ({
  userInfo: state.userInfo,
  statusBarHeight: state.systemInfo.statusBarHeight,
})

const mapDispatchToProps = dispatch => ({})

@connect(mapStateToProps, mapDispatchToProps)
export default class ReportPage extends Component {
  state = {
    values: ['周', '月', '年'],
    selector: ['支出', '收入'],
    current: 0,
    currentIndex: 0,
    dateList: [],
    selectorChecked: '支出',
    detailList: [],
    chartData: [0, 0, 0, 0, 0, 0, 0]

  }

  getData = () => {
    this.setState({
      detailList: [
        {
          type: '购物',
          icon: 'shejiao',
          count: 80.88
        }
      ]
    })
  }

  setChartData () {
    return ({
      dimensions: {
        data: this.state.dateList
      },
      measures: [{
        data: this.state.chartData
      }]
    })
  }

  handleClick = (val) => {
    this.setState({
      current: val,
      dateList: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',],
      currentIndex: 0,
      chartData: [10, 52, 200, 334, 390, 330, 220, 334, 390, 330, 220, 52]
    }, () => {
        this.chart.refresh(this.setChartData());
    })
  }

  onChange = (e) => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  handleClickDate = (index) => {
    this.setState({
      currentIndex: index
    })
    console.log(this.state.dateList[index])
  }

  getDateList = (type) => {
    const date = new Date(this.props.userInfo.createTime)
    const now = new Date()
    let start
    let end
    let dateListTmp = []
    switch (type) {
      case '周':
        start = getWeek(date)
        end = getWeek(now)
        for (let i = 0; i <= end - start; i++) {
          dateListTmp.push(start + i)
        }
        dateListTmp = dateListTmp.map(i => i + type)
        dateListTmp.splice(-1, 1, '本周')
        break;
      case '月':
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
    })
  }

  componentDidMount () {
    const { values, current } = this.state
    this.getData()
    this.getDateList(values[current])
    setTimeout(() => {    
      this.chart.refresh(this.setChartData());
    }, 20);
  }

  refLineChart = (node) => {
    this.chart = node
    // this.chart.refresh(this.setChartData());
  }

  render () {
    const { values, current, dateList, currentIndex, selectorChecked, detailList } = this.state
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

        <View>总支出:88.00</View>
        <View>平均值:14.22</View>
        <View className='echarts'>
          <LineChart ref={this.refLineChart}></LineChart>
        </View>

        <View className='detail'>
          <View className='title'>{ selectorChecked }排行榜</View>
          {
            detailList.map((item, index) => (<View className='item' key={item.type + index}>
              <View className='icon'>
                <IconComponent name={item.icon}></IconComponent>
              </View>
              <View className='warpper'>
                <View className='clearfix'>
                  <View className='fl'>{ item.type }</View>
                  <View className='fl' style={{ marginLeft: '30rpx' }}>20%</View>
                  <View className='fr'>{ item.count }</View>
                </View>
                <View className='bar'></View>
              </View>
            </View>))
          }

        </View>
      </View>
    )
  }
}




// function ReportPage (props) {
//   const values = ['周', '月', '年']
//   const selector = ['支出', '收入']
//   const [current, setCurrent] = useState(0)
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [dateList, setDateList] = useState([])
//   const [selectorChecked, setDelectorChecked] = useState('支出')
//   const [detailList, setDetailList] = useState([])
//   const [chartData, setChartData] = useState({
//     dimensions: {
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//     },
//     measures: [{
//       data: [0, 0, 0, 0, 0, 0, 0]
//     }]
//   })

//   const chart = useRef(null)

//   const height = props.statusBarHeight + 56 + 36

//   function handleClick (val) {
//     setCurrent(val)
//     // getDateList(values[val])
//     setDateList(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',])
//     setCurrentIndex(dateList.length - 1)
//     setChartData({
//       dimensions: {
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//       },
//       measures: [{
//         data: [10, 52, 200, 334, 390, 330, 220]
//       }]
//     })
//     console.log(chart.current)
//   }

//   function onChange (e) {
//     setDelectorChecked(selector[e.detail.value])
//   }

//   function getData () {
//     setDetailList([
//       {
//         type: '购物',
//         icon: 'shejiao',
//         count: 80.88
//       }
//     ])
//   }

//   function handleClickDate (index) {
//     setCurrentIndex(index)
//     console.log(dateList[index])
//   }

//   function getDateList (type) {
//     const date = new Date(props.userInfo.createTime)
//     const now = new Date()
//     let start
//     let end
//     let dateListTmp = []
//     switch (type) {
//       case '周':
//         start = getWeek(date)
//         end = getWeek(now)
//         for (let i = 0; i <= end - start; i++) {
//           dateListTmp.push(start + i)
//         }
//         dateListTmp = dateListTmp.map(i => i + type)
//         dateListTmp.splice(-1, 1, '本周')
//         setDateList(dateListTmp)
//         break;
//       case '月':
//         start = date.getMonth() + 1
//         end = now.getMonth() + 1
//         for (let i = 0; i <= end - start; i++) {
//           dateListTmp.push(start + i)
//         }
//         dateListTmp = dateListTmp.map(i => i + type)
//         dateListTmp.splice(-1, 1, '本月')
//         setDateList(dateListTmp)
//         break;
//       case '年':
//         start = date.getFullYear()
//         end = now.getFullYear()
//         for (let i = 0; i <= end - start; i++) {
//           dateListTmp.push(start + i)
//         }
//         dateListTmp = dateListTmp.map(i => i + type)
//         dateListTmp.splice(-1, 1, '今年')
//         setDateList(dateListTmp)
//         break;
//       default:
//         break;
//     }

//   }



//   useEffect(() => {
//     getData()
//     getDateList(values[current])

//   }, [])

//   return (
//     <View className='report'>

//       <View className='overview' style={{ marginTop: height + 'px' }}>
//         <View className='SegmentedControl'>
//           <SegmentedControl values={values}
//             onClick={handleClick}
//             current={current}
//           ></SegmentedControl>
//         </View>
//       </View>


//       <View className='label clearfix'>
//         <ScrollView scrollX style={{ overflow: 'hidden' }} class='fl'>
//           <View className='date' >
//             {
//               dateList.map((i, index) => (
//                 <View className={index === currentIndex ? 'item active' : 'item'}
//                   key={i}
//                   onClick={() => handleClickDate(index)}
//                 >{ i }</View>
//               ))
//             }
//           </View>
//         </ScrollView>
//         <View className='picker fl'>
//           <Picker mode='selector' range={selector} onChange={onChange}>
//             <View>
//               { selectorChecked } <Text className='icon'></Text>
//             </View>
//           </Picker>
//         </View>
//       </View>

//       <View>总支出:88.00</View>
//       <View>平均值:14.22</View>
//       <View className='echarts'>
//         <LineChart ref={ chart}></LineChart>
//       </View>

//       <View className='detail'>
//         <View className='title'>{ selectorChecked }排行榜</View>
//         {
//           detailList.map((item, index) => (<View className='item' key={item.type + index}>
//             <View className='icon'>
//               <IconComponent name={item.icon}></IconComponent>
//             </View>
//             <View className='warpper'>
//               <View className='clearfix'>
//                 <View className='fl'>{ item.type }</View>
//                 <View className='fl' style={{ marginLeft: '30rpx' }}>20%</View>
//                 <View className='fr'>{ item.count }</View>
//               </View>
//               <View className='bar'></View>
//             </View>
//           </View>))
//         }

//       </View>
//     </View>
//   )
// }

// const mapStateToProps = state => ({
//   userInfo: state.userInfo,
//   statusBarHeight: state.systemInfo.statusBarHeight,
// })

// const mapDispatchToProps = dispatch => ({})


// export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)
