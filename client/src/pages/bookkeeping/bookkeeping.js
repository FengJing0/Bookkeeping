import Taro, { Component } from "@tarojs/taro"
import { connect } from '@tarojs/redux'
import { View, Text, Button } from "@tarojs/components"

import SegmentedControl from '../../components/SegmentedControl/SegmentedControl'
import HeaderComponent from '../../components/header/header'
import IconComponent from '../../components/icon/icon'
import Calculator from '../../components/calculator/calculator'

import { getWeek } from '../../util/index'
import { saveData } from '../../api/index'

import './bookkeeping.scss'

const mapStateToProps = state => ({
  statusBarHeight: state.systemInfo.statusBarHeight,
  category: state.category
})

const mapDispatchToProps = dispatch => ({})

@connect(mapStateToProps, mapDispatchToProps)
export default class Bookkeeping extends Component {

  state = {
    values: ['支出', '收入'],
    current: 0,
    list: [],
    selectedItem: '',
    showCalculator: false,
    detailData: {}
  }

  handleClick = val => {
    let list = this.filterCategoryList(val)
    this.setState({
      current: val,
      list,
      showCalculator:false
    })
  }

  onSelect = item => {
    this.setState({
      selectedItem: item._id,
      showCalculator: true
    })
  }

  filterCategoryList = (type) => {
    return this.props.category.filter(item => item.type === this.state.values[type])
  }

  init = () => {
    let list = this.filterCategoryList(0)
    this.setState({
      current: 0,
      list,
      selectedItem: '',
      showCalculator: false
    })
  }

  hideCalculator = e => {
    if (e.target.dataset.hide === 'true') {
      this.setState({
        showCalculator: false
      })
    }
  }

  handleSubmit = data => {
    console.log(data)
    Taro.showLoading({
      title: '正在提交...',
      mask: true
    })
    const date = new Date(data.date)
    const formData = {
      ...data,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      week: getWeek(date),
      day: date.getDate(),
      category: this.state.selectedItem,
      type: this.state.values[this.state.current]
    }
    saveData(formData).then(res => {
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/index/index'
      })
    })
  }

  componentDidMount () {
    if (this.$router.params.detail) {
      Taro.getStorage({ key: 'detailData' }).then(res => {
        this.setState({
          detailData: res.data,
          selectedItem: res.data.category,
          showCalculator:true
        })
        // console.log(res.data)
      })
      
    }
    this.init()
  }



  render () {
    const { values, current, list, selectedItem, showCalculator, detailData } = this.state
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
        <View className='item-warrper clearfix' data-hide='true' style={{ paddingTop: height + 30 + 'px' }} onClick={this.hideCalculator}>
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
        <Calculator detailData={ detailData} show={showCalculator} onSubmit={data => this.handleSubmit(data)}></Calculator>
      </View>
    )
  }
}
