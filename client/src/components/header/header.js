import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import './header.scss'


const mapStateToProps = state => ({
  statusBarHeight: state.systemInfo.statusBarHeight
})

const mapDispatchToProps = dispatch => ({})

//  connect(() => ({ }), mapDispatchToProps)(Home)
@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends Component {
  static defaultProps = {
    title: '理财记',
    height: 112,
    goBack: false
  }

  goBack = () => {
    Taro.navigateBack({ delta: 1 })
  }

  render () {
    let { title, height, statusBarHeight, goBack } = this.props
    return <View className='header' style={{ paddingTop: statusBarHeight + 12 + 'px', height: height + 'px' }}>
      {
        goBack && <Text className='goback' style={{ top: statusBarHeight + 12 + 'px' }} onClick={this.goBack}>返回</Text>
      }
      <Text className='title'>{ title === '资产' ? '记账App' : title }</Text>
    </View>
  }
}