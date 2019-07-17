import Taro, { useState, useEffect } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'


import Header from '../header/header'
import Tabber from '../tabbar/tabbar'


function Home (props) {
  const [height, setHeight] = useState(160)
  const [statusBarHeight, setStatusBarHeight] = useState(160)
  const [title, setTitle] = useState('资产')


  useEffect(() => {
    setHeight(props.statusBarHeightProps + 56 + 36)
    setStatusBarHeight(props.statusBarHeightProps + 56 )
  }, [props.statusBarHeightProps])

  function navigator (item) {
    const text = item.text
    props.onNavigator(text)
    let heights
    switch (text) {
      case '记账':
        return
      case '资产':
        heights = statusBarHeight + 36
        break;
      case '我的':
        heights = 0
        break;
      case '账单':
        heights = 0
        break;
      case '报表':
        heights = statusBarHeight + 36
        break;
      default:
        heights = statusBarHeight
        break;
    }
    setTitle(text)
    setHeight(heights)
  }

  return (
    <View className='home'>
      { (title !== '我的' && title !=='账单') && <Header title={title} height={height}></Header> }
      <View style={{ paddingTop: height + 'px' }}>
        { props.children }
      </View>
      <Tabber onNavigator={navigator} title={title} />
    </View>
  )
}

Home.defaultProps = {
  onNavigator: () => { }
}


const mapStateToProps = state => ({
  statusBarHeightProps: state.systemInfo.statusBarHeight
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)