import Taro, { Component } from "@tarojs/taro"
import { View, Text, Image } from "@tarojs/components"

import './indexPage.scss'

export default class IndexPage extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
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

        <View className='detail'>
          <View className='date'>
            <View>12月26日</View>
            <View>支出：80</View>
          </View>
          <View className='detailItem'>
            <View>
              <Image src='../../imgs/icon/bookkeeping.png' className='img'></Image>
              <Text>购物</Text>
            </View>
            <View>
              <Text>-80</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
