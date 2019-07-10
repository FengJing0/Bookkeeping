import Taro, { Component } from "@tarojs/taro"
import { View, Button } from "@tarojs/components"
import { connect } from '@tarojs/redux'
import { get as getUserInfoAction } from '../../actions/userInfo'

import './loginBtn.scss'

const mapStateToProps = state => ({
  userInfo: state.userInfo,
})

const mapDispatchToProps = dispatch => ({
  dispatchGetUserInfo (data) {
    dispatch(getUserInfoAction(data))
  },
})


@connect(mapStateToProps, mapDispatchToProps)
export default class LoginBtn extends Component {

  handleGetUserInfo = e => {
    if (e.detail.userInfo) {
      this.props.dispatchGetUserInfo(e.detail.userInfo)
    }
  }

  render () {
    const specialStyle = {
      height: 'calc(100% + 55rpx)',
      top: '-55rpx'
    }
    return <View className='login_wrapper'>
      { !this.props.userInfo.nickName && <Button open-type='getUserInfo' onGetUserInfo={this.handleGetUserInfo} className='loginBtn' style={this.props.isSpecial ? specialStyle : {}}>登录</Button> }
      { this.props.children }
    </View>
  }
}
