import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text, Button } from '@tarojs/components'

import { get } from '../../actions/systemInfo'

import Header from '../header/header'
import Tabber from '../tabbar/tabbar'

const mapStateToProps = state => ({
  statusBarHeight: state.systemInfo.statusBarHeight
})

const mapDispatchToProps = dispatch => ({
  get (data) {
    dispatch(get(data))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  state = {
    height: 160,
    statusBarHeight: 160,
    title: '资产'
  }

  static defaultProps = {
    onNavigator: () => { }
  }

  componentDidMount () {
    const that = this
    Taro.getSystemInfo({
      success: (res) => {
        that.props.get(res.statusBarHeight)
        that.setState({
          statusBarHeight: res.statusBarHeight + 56,
          height: res.statusBarHeight + 56 + 36
        })
      }
    })
  }

  navigator = item => {
    const title = item.text
    this.props.onNavigator(title)
    let height
    switch (title) {
      case '记账':
        return
      case '资产':
        height = this.state.statusBarHeight + 36
        break;
      case '我的':
        height = 0
        break;
      case '报表':
        height = this.state.statusBarHeight + 36
        break;
      default:
        height = this.state.statusBarHeight
        break;
    }
    this.setState({
      title,
      height
    })

  }

  render () {
    const { height, title } = this.state

    return (<View className='home'>
      { title !== '我的' && <Header title={title} height={height}></Header> }
      <View style={{ paddingTop: height + 'px' }}>
        { this.props.children }
      </View>
      <Tabber onNavigator={this.navigator} title={title} />
    </View>)
  }
}

