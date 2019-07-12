import Taro, { Component } from "@tarojs/taro"
import { View, Button } from "@tarojs/components"
import { connect } from '@tarojs/redux'
import { get as getUserInfoAction } from '../../actions/userInfo'

import './loginBtn.scss'



function LoginBtn (props) {
  const specialStyle = {
    height: 'calc(100% + 55rpx)',
    top: '-55rpx'
  }
  
  function handleGetUserInfo (e) {
    if (e.detail.userInfo) {
      props.dispatchGetUserInfo(e.detail.userInfo)
    }
  }

  return (<View className='login_wrapper'>
    { !props.userInfo.nickName && <Button open-type='getUserInfo' onGetUserInfo={handleGetUserInfo} className='loginBtn' style={props.isSpecial ? specialStyle : {}}>登录</Button> }
    { props.children }
  </View>)
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
})

const mapDispatchToProps = dispatch => ({
  dispatchGetUserInfo (data) {
    dispatch(getUserInfoAction(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginBtn)
