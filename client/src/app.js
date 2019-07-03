import Taro, { Component } from '@tarojs/taro'
import { Provider, connect } from '@tarojs/redux'
import Index from './pages/index'
import { get } from './actions/systemInfo'
import { get as getCategoryAction } from './actions/category'

import configStore from './store'

import { getCategory } from './api/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()


const mapStateToProps = state => ({
  statusBarHeight: state.systemInfo.statusBarHeight
})

const mapDispatchToProps = dispatch => ({
  getSystemInfo (data) {
    dispatch(get(data))
  },
  getCategoryList (data) {
    dispatch(getCategoryAction(data))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/bookkeeping/bookkeeping'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationStyle: 'custom'
      // navigationBarBackgroundColor: '#fff',
      // navigationBarTitleText: 'WeChat',
      // navigationBarTextStyle: 'black'
    },
    cloud: true
  }

  componentDidMount () {
    const that = this
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
    Taro.getSystemInfo({
      success: (res) => {
        that.props.getSystemInfo(res.statusBarHeight)

      }
    })
    getCategory().then(res => {
      // let result = [
      //   { type: '支出', data: [] },
      //   { type: '收入', data: [] }
      // ]

      // res.result.forEach(item => {
      //   if (item.type === '支出') {
          
      //   } else if (item.type === '收入') {
          
      //   }
      // })
      that.props.getCategoryList(res.result)
      // console.log(result)
    })
  }

  componentDidShow () { }

  componentDidHide () { }

  componentDidCatchError () { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
