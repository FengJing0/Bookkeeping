import Taro, { useState,Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import Home from '../../components/home/home'
import IndexPage from '../../components/indexPage/indexPage'
import ReportPage from '../../components/reportPage/reportPage'
import BillPage from '../../components/billPage/billPage'
import MyPage from '../../components/myPage/myPage'

export default class Index extends Component{
  state = {
    title: '资产'
  }

  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '3秒钟极速记账，让你清楚掌握钱的行踪',
      imageUrl: '../../asstes/imgs/share.png'
    }
  }

   navigator = (title) => {
    if (title === '记账') {
      Taro.navigateTo({ url: '/pages/bookkeeping/bookkeeping' })
    } else {
      this.setState({title})
    }
  }
  render () {
    return (
    <View className='index'>
      <Home onNavigator={ this.navigator }>
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

// export default props => {
//   const [title, setTitle] = useState('资产');

//   function navigator (titles) {
//     if (titles === '记账') {
//       Taro.navigateTo({ url: '/pages/bookkeeping/bookkeeping' })
//     } else {
//       setTitle(titles)
//     }
//   }

//   function onShareAppMessage(res) {
//     if (res.from === 'button') {
//       // 来自页面内转发按钮
//       console.log(res.target)
//     }
//     return {
//       title: '自定义转发标题',
//       imageUrl: '../../asstes/imgs/share.png'
//     }
//   }

//   return (
//     <View className='index'>
//       <Home onNavigator={ navigator }>
//         {
//           {
//             '资产': <IndexPage></IndexPage>,
//             '报表': <ReportPage></ReportPage>,
//             '账单': <BillPage></BillPage>,
//             '我的': <MyPage></MyPage>
//           }[title]
//         }
//       </Home>
//     </View>
//   )
// }
