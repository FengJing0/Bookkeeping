import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import IconComponent from '../icon/icon'
import './header.scss'


function goBackFunc () {
  Taro.navigateBack({ delta: 1 })
}

function Header (props) {
  let { title, height, statusBarHeight, goBack } = props
  return (<View className='header' style={{ paddingTop: statusBarHeight + 12 + 'px', height: height + 'px' }}>
    {
      goBack && <View className='goback' style={{ top: statusBarHeight + 12 + 'px' }} onClick={goBackFunc}>
        <IconComponent name='fanhui1'></IconComponent>
      </View>
    }
    <Text className='title'>{ title === '资产' ? '钱迹账' : title }</Text>
  </View>)
}

Header.defaultProps = {
  title: '钱迹账',
  height: 112,
  goBack: false
}

const mapStateToProps = state => ({
  statusBarHeight: state.systemInfo.statusBarHeight
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

