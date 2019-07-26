import Taro, { useState, useEffect } from "@tarojs/taro"
import { View, Image, Button } from "@tarojs/components"
import { connect } from '@tarojs/redux'

import { set as setUserInfoAction } from '../../actions/userInfo'

import { checkLogin } from '../../api/index'

import './myPage.scss'

function MyPage (props) {
  const [day, setDay] = useState(0)
  const [paddingTop, setPaddingTop] = useState(26)

  useEffect(() => {
    checkLogin().then(res => { props.setUserInfo(res) })
    const day = (new Date() - props.userInfo.createTime) / 1000 / 60 / 60 / 24
    setDay(Math.ceil(day))
    setPaddingTop(props.statusBarHeight + 12)
  }, [])

  return (
    <View className='my'>
      <View className='top' style={{ paddingTop: paddingTop + 'px' }}>
        <View>
          <Image src={props.userInfo.avatarUrl} className='img'></Image>
          <View className='name'>{ props.userInfo.nickName }</View>
        </View>
        <View className='count'>
          <View>
            <View className='num'>{ day }</View>
            <View className='label'>记账天数</View>
          </View>
          <View>
            <View className='num'>{ props.userInfo.count }</View>
            <View className='label'>记账总笔数</View>
          </View>
        </View>
      </View>
        <Button open-type='share' className='btn'>分享给您的朋友</Button>
    </View>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  statusBarHeight: state.systemInfo.statusBarHeight,
})

const mapDispatchToProps = dispatch => ({
  setUserInfo (data) {
    dispatch(setUserInfoAction(data))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(MyPage)