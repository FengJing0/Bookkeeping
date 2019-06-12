import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import Header from '../header/header'
import Tabber from '../tabbar/tabbar'

export default class Home extends Component {

  render () {
    const { title = 'title' } = this.props
    return <View className='home'>
      <Header title={title}></Header>
      { this.props.children }
      <Tabber />
    </View>
  }
}