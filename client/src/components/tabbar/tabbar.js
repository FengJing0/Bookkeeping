import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './tabbar.scss'

export default class Tabber extends Component {
  state = {
    list: [
      {
        text: "资产",
        iconPath: require("../../asstes/imgs/icon/asset.png"),
        selectedIconPath: require("../../asstes/imgs/icon/asset@selected.png")
      },
      {
        text: "报表",
        iconPath: require("../../asstes/imgs/icon/report.png"),
        selectedIconPath: require("../../asstes/imgs/icon/report@selected.png")
      },
      {
        iconPath: require("../../asstes/imgs/icon/bookkeeping.png"),
        selectedIconPath: require("../../asstes/imgs/icon/bookkeeping.png"),
        isSpecial: true,
        text: "记账"
      },
      {
        text: "账单",
        iconPath: require("../../asstes/imgs/icon/bill.png"),
        selectedIconPath: require("../../asstes/imgs/icon/bill@selected.png")
      },
      {
        text: "我的",
        iconPath: require("../../asstes/imgs/icon/my.png"),
        selectedIconPath: require("../../asstes/imgs/icon/my@selected.png")
      }
    ]
  }

  static defaultProps = {
    onNavigator: () => { }
  }

  navigator = path => {
    this.props.onNavigator(path)
    // Taro.redirectTo({
    //   url:path
    // })
  }

  render () {
    const { title } = this.props
    return <View className='tabbar'>
      {
        this.state.list.map(i => (<View className='wrapper' key={i.pagePath} onClick={() => this.navigator(i)}>
          <View className={`item ${i.isSpecial ? 'special' : ''} ${i.text === title ? 'active' : ''}`}>
            <Image mode='aspectFit' src={i.text === title ? i.selectedIconPath : i.iconPath} className='img'></Image>
            <Text className='name'>{ i.text }</Text>
          </View>
        </View>))
      }
    </View>
  }
}