import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import Home from '../../components/home/home'
import IndexPage from '../../components/indexPage/indexPage'
import ReportPage from '../../components/reportPage/reportPage'
import BillPage from '../../components/billPage/billPage'
import MyPage from '../../components/myPage/myPage'

export default class Index extends Component {
  state = {
    title: '资产'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  navigator = title => {
    if (title === '记账') {
      Taro.navigateTo({ url: '/pages/bookkeeping/bookkeeping' })
    } else {
      this.setState({
        title
      })
    }
  }

  render () {
    return (
      <View className='index'>
        <Home onNavigator={this.navigator}>
          {
            {
              '资产': <IndexPage></IndexPage>,
              '报表': <ReportPage></ReportPage>,
              '账单': <BillPage></BillPage>,
              '我的': <MyPage></MyPage>
            }[this.state.title]
          }
        </Home>
      </View>
    )
  }
}
