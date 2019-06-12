import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './tabbar.scss'

export default class Tabber extends Component {
  state = {
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: require("../../imgs/icon/asset.png"),
        selectedIconPath: require("../../imgs/icon/asset@selected.png")
      },
      {
        pagePath: "/pages/report/report",
        text: "报表",
        iconPath: require("../../imgs/icon/report.png"),
        selectedIconPath: require("../../imgs/icon/report@selected.png")
      },
      {
        pagePath: "/pages/bookkeeping/bookkeeping",
        iconPath: require("../../imgs/icon/bookkeeping.png"),
        selectedIconPath: require("../../imgs/icon/bookkeeping.png"),
        isSpecial: true,
        text: "记账"
      },
      {
        pagePath: "/pages/bill/bill",
        text: "账单",
        iconPath: require("../../imgs/icon/bill.png"),
        selectedIconPath: require("../../imgs/icon/bill@selected.png")
      },
      {
        pagePath: "/pages/my/my",
        text: "我的",
        iconPath: require("../../imgs/icon/my.png"),
        selectedIconPath: require("../../imgs/icon/my@selected.png")
      }
    ]
  }

  navigator = path => {
    console.log(path)
    Taro.redirectTo({
      url:path
    })
  }

  render () {
    return <View className='tabbar'>
      {
        this.state.list.map(i => (<View className='wrapper' key={i.pagePath} onClick={() => this.navigator(i.pagePath)}>
          <View className={`item ${i.isSpecial ? 'special' : ''}`}>
            <Image mode='aspectFit' src={i.iconPath} className='img'></Image>
            <Text className='name'>{ i.text }</Text>
          </View>
        </View>))
      }
    </View>
  }
}