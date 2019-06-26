import Taro, { Component } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"

import './SegmentedControl.scss'

export default class SegmentedControl extends Component {
  static defaultProps = {
    values: ['标签页1', '标签页2', '标签页3'],
    current: 0,
    onClick: () => { }
  }
  render () {
    const { values, onClick, current } = this.props
    return (
      <View className='SegmentedControl'>
        {
          values.map((item, index) => {
            return (
              <View className={`SegmentedControl_item ${current === index ? 'active' : ''}`} key={item} onClick={() => onClick(index)}>
                <Text> {item} </Text>
              </View>
            )
          })
        }

      </View>
    )
  }
}
