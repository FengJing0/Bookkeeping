import Taro, { Component } from "@tarojs/taro"
import { View, Text, Picker } from "@tarojs/components"

import SegmentedControl from '../SegmentedControl/SegmentedControl'
import IconComponent from '../icon/icon'

import './reportPage.scss'
// import '../../fonts/iconfont.css'
// import '../../asstes/fonts/iconfont.css';

export default class ReportPage extends Component {

  state = {
    values: ['周', '月', '年'],
    current: 0,
    selector: ['支出', '收入'],
    selectorChecked: '支出',
    detailList: [
      {
        type: '购物',
        icon: 'shejiao',
        count: 80.88
      }
    ]
  }

  handleClick = val => {
    this.setState({
      current: val
    })
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  render () {
    const { values, current, selectorChecked, selector, detailList } = this.state
    return (
      <View className='report'>

        <View className='overview'>
          <View className='SegmentedControl'>
            <SegmentedControl values={values}
              onClick={this.handleClick}
              current={current}
            ></SegmentedControl>
          </View>
        </View>


        <View className='label'>
          <View className='date'>
            <Text>{ values[current] === '年' ? '今' + values[current] : '本' + values[current] }</Text>
          </View>
          <View className='picker'>
            <Picker mode='selector' range={selector} onChange={this.onChange}>
              <View>
                { selectorChecked } <Text className='icon'></Text>
              </View>
            </Picker>
          </View>
        </View>

        <View className='chart'>
          <View>总支出:88.00</View>
          <View>平均值:14.22</View>
          chart
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
