import Taro, { Component } from "@tarojs/taro"
import { View, Text, Image } from "@tarojs/components"

import './myPage.scss'

export default class MyPage extends Component {
  state = {
    paddingTop: 26
  }
  componentDidMount () {
    const that = this
    Taro.getSystemInfo({
      success: (res) => {
        that.setState({
          paddingTop: res.statusBarHeight + 12
        })
      }
    })
  }

  componentWillMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { paddingTop } = this.state

    return (
      <View className='my'>
        <View className='top' style={{ paddingTop: paddingTop + 'px' }}>
          <View>
            <Image src='../../imgs/icon/bookkeeping.png' className='img'></Image>
            <View className='name'>一头猪</View>
          </View>
          <View className='count'>
            <View>
              <View className='num'>138</View>
              <View className='label'>记账天数</View>
            </View>
            <View>
              <View className='num'>7</View>
              <View className='label'>记账总笔数</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
