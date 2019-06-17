import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './header.scss'

export default class Header extends Component {
  static defaultProps = {
    title: '记账App',
    height:160
  }

  state = {
    paddingTop: 26
  }
  componentDidMount () {
    const that = this
    Taro.getSystemInfo({
      success: (res) => {
        // 状态栏高度和屏幕宽度
        // console.log(res.statusBarHeight, res.windowWidth)
        // console.log(scale * res.statusBarHeight*2+24)
        // console.log(res)
        that.setState({
          paddingTop: res.statusBarHeight + 12
        })
      }
    })
  }

  render () {
    const { title, height } = this.props
    const { paddingTop } = this.state
    return <View className='header' style={{ paddingTop: paddingTop + 'px', height: height + 'px' }}>
      <Text className='title'>{ title === '资产' ? '记账App' : title }</Text>
    </View>
  }
}