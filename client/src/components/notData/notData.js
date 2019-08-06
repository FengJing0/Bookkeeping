import Taro from "@tarojs/taro"
import { Text, View } from "@tarojs/components"

import './notData.scss'


export default function NotData (props) {
  const { title = '暂无数据' } = props
  return <View className='title'> { title }</View>
}