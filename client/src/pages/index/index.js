import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import Home from '../../components/home/home'
import IndexPage from '../../components/indexPage/indexPage'
import ReportPage from '../../components/reportPage/reportPage'
import BillPage from '../../components/billPage/billPage'
import MyPage from '../../components/myPage/myPage'

export default props => {
  const [title, setTitle] = useState('资产');

  function navigator (titles) {
    if (titles === '记账') {
      Taro.navigateTo({ url: '/pages/bookkeeping/bookkeeping' })
    } else {
      setTitle(titles)
    }
  }

  return (
    <View className='index'>
      <Home onNavigator={navigator}>
        {
          {
            '资产': <IndexPage></IndexPage>,
            '报表': <ReportPage></ReportPage>,
            '账单': <BillPage></BillPage>,
            '我的': <MyPage></MyPage>
          }[title]
        }
      </Home>
    </View>
  )
}
