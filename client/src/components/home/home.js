import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text, Button } from '@tarojs/components'


import Header from '../header/header'
import Tabber from '../tabbar/tabbar'

const mapStateToProps = state => ({
  statusBarHeightProps: state.systemInfo.statusBarHeight
})

const mapDispatchToProps = () => ({})

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  state = {
    height: 160,
    statusBarHeight: 160,
    title: '资产'
  }

  static defaultProps = {
    onNavigator: () => { }
  }

  componentDidMount () {
    const that = this
    that.setState({
      statusBarHeight: this.props.statusBarHeightProps + 56,
      height: this.props.statusBarHeightProps + 56 + 36
    })
  }

  navigator = item => {
    const title = item.text
    this.props.onNavigator(title)
    let height
    switch (title) {
      case '记账':
        return
      case '资产':
        height = this.state.statusBarHeight + 36
        break;
      case '我的':
        height = 0
        break;
      case '报表':
        height = this.state.statusBarHeight + 36
        break;
      default:
        height = this.state.statusBarHeight
        break;
    }
    this.setState({
      title,
      height
    })

  }

  render () {
    const { height, title } = this.state

    return (<View className='home'>
      { title !== '我的' && <Header title={title} height={height}></Header> }
      <View style={{ paddingTop: height + 'px' }}>
        { this.props.children }
      </View>
      <Tabber onNavigator={this.navigator} title={title} />
    </View>)
  }
}

