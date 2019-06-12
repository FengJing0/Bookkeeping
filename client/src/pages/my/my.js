import Taro,{ Component} from '@tarojs/taro'
import { View, Text} from '@tarojs/components'

import Home from '../../components/home/home'

export default class My extends Component{
  render () {
    return (
      <View className='index'>
        <Home title='我的'>
        </Home>
      </View>
    )
  }
}