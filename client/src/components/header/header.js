import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import IconComponent from '../icon/icon'
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
        goBack && <View className='goback' style={{ top: statusBarHeight + 12 + 'px' }} onClick={this.goBack}>
          <IconComponent name='fanhui1'></IconComponent>
        </View>
      }
      <Text className='title'>{ title === '资产' ? '理财记' : title }</Text>
    </View>
  }
}