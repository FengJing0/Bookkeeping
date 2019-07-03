import Taro, { Component } from "@tarojs/taro"
import { connect } from '@tarojs/redux'
import { View, Text, Button } from "@tarojs/components"

import SegmentedControl from '../../components/SegmentedControl/SegmentedControl'
import HeaderComponent from '../../components/header/header'
import IconComponent from '../../components/icon/icon'
import Calculator from '../../components/calculator/calculator'

import './bookkeeping.scss'

const mapStateToProps = state => ({
  statusBarHeight: state.systemInfo.statusBarHeight,
  category: state.category
})

const mapDispatchToProps = dispatch => ({})

//  connect(() => ({ }), mapDispatchToProps)(Home)
@connect(mapStateToProps, mapDispatchToProps)
export default class Bookkeeping extends Component {

  state = {
    values: ['支出', '收入'],
    current: 0,
    list: [],
    selectedItem: '',
    showCalculator:false
  }

  handleClick = val => {
    let list = this.filterCategoryList(val)
    this.setState({
      current: val,
      list
    })
  }

  onSelect = item => {
    this.setState({
      selectedItem: item._id,
      showCalculator:true
    })
    console.log(item)
  }

  filterCategoryList = (type) => {
    return this.props.category.filter(item => item.type === this.state.values[type])
  }

  init = () => {
    let list = this.filterCategoryList(0)
    this.setState({
      current: 0,
      list,
      selectedItem: ''
    })
  }

  componentDidMount () {
    this.init()
  }

  componentDidHide () {
    this.init()
  }


  render () {
    const { values, current, list, selectedItem, showCalculator} = this.state
    const { statusBarHeight } = this.props

    const height = statusBarHeight + 56 + 36

    return (
      <View className='bookkeeping'>
        <HeaderComponent title='记账' height={height} goBack></HeaderComponent>
        <View className='overview' style={{ marginTop: height + 'px' }}>
          <View className='SegmentedControl'>
            <SegmentedControl values={values}
              onClick={this.handleClick}
              current={current}
            ></SegmentedControl>
          </View>
        </View>
        <View className='item-warrper clearfix' style={{ paddingTop: height + 30 + 'px' }}>
          {
            list.map(item => (
              <View className={item._id === selectedItem ? 'item fl active' : 'item fl'} key={item._id} onClick={() => this.onSelect(item)}>
                <View className='icon'>
                  <IconComponent name={item.icon} fontSize={64}></IconComponent>
                </View>
                <View className='label'>{ item.name }</View>
              </View>
            ))
          }
        </View>
        <Calculator show={ showCalculator}></Calculator>
      </View>
    )
  }
}
