import Taro, { Component } from "@tarojs/taro"
import { View, Text, Image } from "@tarojs/components"
import { connect } from '@tarojs/redux'

import { set as setUserInfoAction } from '../../actions/userInfo'

import { checkLogin } from '../../api/index'

import './myPage.scss'

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  statusBarHeight: state.systemInfo.statusBarHeight,
})

const mapDispatchToProps = dispatch => ({
  setUserInfo (data) {
    dispatch(setUserInfoAction(data))
  }
})


@connect(mapStateToProps, mapDispatchToProps)
export default class MyPage extends Component {
  state = {
    paddingTop: 26,
    day: 0
  }
  componentDidMount () {
    const that = this
    checkLogin().then(res => { that.props.setUserInfo(res) })
    const day = (new Date() - this.props.userInfo.createTime) / 1000 / 60 / 60 / 24
    this.setState({
      paddingTop: this.props.statusBarHeight + 12,
      day:Math.ceil(day)
    })
  }

  componentWillMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { paddingTop, day } = this.state
    const { userInfo } = this.props

    return (
      <View className='my'>
        <View className='top' style={{ paddingTop: paddingTop + 'px' }}>
          <View>
            <Image src={userInfo.avatarUrl} className='img'></Image>
            <View className='name'>{ userInfo.nickName }</View>
          </View>
          <View className='count'>
            <View>
              <View className='num'>{ day }</View>
              <View className='label'>记账天数</View>
            </View>
            <View>
              <View className='num'>{ userInfo.count }</View>
              <View className='label'>记账总笔数</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
