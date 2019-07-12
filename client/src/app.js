import Taro, { Component } from '@tarojs/taro'
import { Provider, connect } from '@tarojs/redux'
import Index from './pages/index'
import { get as getSystemInfoAction } from './actions/systemInfo'
import { get as getCategoryAction } from './actions/category'
import { get as getUserInfoAction, set as setUserInfoAction } from './actions/userInfo'

import configStore from './store'

import { getCategory, checkLogin } from './api/index'

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
    dispatch(getSystemInfoAction(data))
  },
  getCategoryList (data) {
    dispatch(getCategoryAction(data))
  },
  getUserInfo (data) {
    dispatch(getUserInfoAction(data))
  },
  setUserInfo (data) {
    dispatch(setUserInfoAction(data))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/bookkeeping/bookkeeping',
      'pages/billDetail/billDetail'
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
    checkLogin().then(res => { that.props.setUserInfo(res) })
    Taro.getSystemInfo().then(res => { that.props.getSystemInfo(res.statusBarHeight) })
    Taro.getSetting().then(res => {
      if (res.authSetting && res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        return Taro.getUserInfo()
      }
    }).then(res => {
      that.props.getUserInfo(res.userInfo)
    }).catch(e => { })
    getCategory().then(res => { that.props.getCategoryList(res) })
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
