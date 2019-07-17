import Taro, { useState } from "@tarojs/taro"
import { View, Text, Picker } from "@tarojs/components"
import { connect } from '@tarojs/redux'

import { set as setUserInfoAction } from '../../actions/userInfo'


import './billPage.scss'

function BillPage (props) {
  const [detailList, setDetailList] = useState(getInitList())
  const [year, setYear] = useState(new Date().getFullYear())

  function getInitList () {
    let arr = []
    for (let i = 1; i <= 12; i++) {
      arr.push({
        month: i + '月',
        pay: 0,
        income: 0,
        balance: 0
      })
    }
    return arr
  }

  function handleChange (e) {
    setYear(e.detail.value)
  }

  return (
    <View className='bill'>
      <View className='top' style={{ paddingTop: props.statusBarHeight + 16 + 'px' }}>
        <View className='title'>
          账单
          </View>
        <View className='total'>
          结余
          <Picker mode='date' fields='year' onChange={handleChange}>
            <View className='picker' >
              <Text decode>{ year }&nbsp;&nbsp;</Text>
              <Text className='icon'></Text>
            </View>
          </Picker>

        </View>
        <View className='totalNo'>-123.32</View>
        <View className='type'>
          <View className='item'>收入:11.22</View>
          <View className='item'>支出:11.22</View>
        </View>
      </View>
      <View className='list'>
        <View className='label'>
          <View className='month'>月份</View>
          <View className='num'>收入</View>
          <View className='num'>支出</View>
          <View className='num'>结余</View>
        </View>
        {
          detailList.map(i => (<View className='item' key={i.month}>
            <View className='month'>{ i.month }</View>
            <View className='num'>{ i.income }</View>
            <View className='num'>{ i.pay }</View>
            <View className='num'>{ i.balance }</View>
          </View>))
        }
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillPage)
