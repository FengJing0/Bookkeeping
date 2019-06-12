import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './header.scss'

export default class Header extends Component {
  state = {
    paddingTop: 26,
    height: 160
  }
  componentDidMount () {
    const that = this
    Taro.getSystemInfo({
      success: (res) => {
        // 状态栏高度和屏幕宽度
        // console.log(res.statusBarHeight, res.windowWidth)
        // console.log(scale * res.statusBarHeight*2+24)
        console.log(res)
        that.setState({
          paddingTop: res.statusBarHeight + 12,
          height: res.statusBarHeight + 56
        })
      }
    })
  }

  render () {
    const { title } = this.props
    const { paddingTop, height } = this.state
    return <View className='header' style={{ paddingTop: paddingTop + 'Px', height: height + 'Px' }}>
      <Text className='title'>{ title }</Text>
    </View>
  }
}