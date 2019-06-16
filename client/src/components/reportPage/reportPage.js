import Taro, { Component } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"

import './reportPage.scss'

export default class ReportPage extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='report'>
        <View className='overview'>
          <View className='item'>
            <Text className='title'>2018年</Text>
            <Text>12<Text className='label'>月</Text></Text>
          </View>
          <View className='item'>
            <Text className='title'>收入</Text>
            <Text>0<Text className='label'>.00</Text></Text>
          </View>
          <View className='item'>
            <Text className='title'>支出</Text>
            <Text>0<Text className='label'>.00</Text></Text>
          </View>
        </View>
      </View>
    )
  }
}
