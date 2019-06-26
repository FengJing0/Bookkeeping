import Taro from "@tarojs/taro"
import { Text } from "@tarojs/components"

import './iconfont.css'


export default function IconComponent (props) {
  const { fontSize = 48, name } = props
  return <Text style={{ fontSize: fontSize + 'rpx' }} className={'iconfont icon-' + name}></Text>
}