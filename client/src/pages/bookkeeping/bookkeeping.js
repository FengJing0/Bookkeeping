import Taro, { Component } from "@tarojs/taro"
import { connect } from '@tarojs/redux'
import { View, Text, Button } from "@tarojs/components"

import SegmentedControl from '../../components/SegmentedControl/SegmentedControl'
import HeaderComponent from '../../components/header/header'
import IconComponent from '../../components/icon/icon'
import Login from '../../components/login'

import './bookkeeping.scss'

const mapStateToProps = state => ({
  statusBarHeight: state.systemInfo.statusBarHeight
})

const mapDispatchToProps = dispatch => ({})

//  connect(() => ({ }), mapDispatchToProps)(Home)
@connect(mapStateToProps, mapDispatchToProps)
export default class Bookkeeping extends Component {

  state = {
    values: ['支出', '收入'],
    current: 0,
    list: [
      {
        icon: 'gouwu',
        label: '购物'
      },
      {
        icon: 'gouwu',
        label: '购物'
      },
      {
        icon: 'gouwu',
        label: '购物'
      },
      {
        icon: 'gouwu',
        label: '购物'
      },
      {
        icon: 'gouwu',
        label: '购物'
      },
      {
        icon: 'gouwu',
        label: '购物'
      },
      {
        icon: 'gouwu',
        label: '购物'
      },
      {
        icon: 'gouwu',
        label: '购物'
      },
      {
        icon: 'gouwu',
        label: '购物'
      },
      {
        icon: 'gouwu',
        label: '烟酒'
      }
    ],
    selectedItem: ''
  }

  handleClick = val => {
    this.setState({
      current: val
    })
  }

  onSelect = item => {
    this.setState({
      selectedItem:item.label
    })
    console.log(item)
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { values, current, list, selectedItem } = this.state
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
        <View className='item-warrper clearfix'>
          {
            list.map((item, index) => (
              <View className={ item.label === selectedItem ? 'item fl active' : 'item fl'} key={item.label} onClick={() => this.onSelect(item)}>
                <View className='icon'>
                  <IconComponent name={item.icon} fontSize={64}></IconComponent>
                </View>
                <View className='label'>{ item.label }</View>
              </View>
            ))
          }
        </View>
        <Login></Login>
      </View>
    )
  }
}
