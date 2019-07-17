import Taro, { useState,useEffect } from "@tarojs/taro"
import { View, Text, Picker } from "@tarojs/components"
import { connect } from '@tarojs/redux'

import { getBillTotalData } from '../../api/index'
import './billPage.scss'

function BillPage (props) {
  const [detailList, setDetailList] = useState(getInitList())
  const [year, setYear] = useState(new Date().getFullYear())
  const [total, setTotal] = useState({
    pay: 0,
    income: 0,
    balance: 0
  })

  useEffect(() => {
    getData(year)
  }, [])

  function getData (year) {
    Taro.showLoading({
      title: '加载中...',
      mask:true
    })
    getBillTotalData({ year:+year }).then(res => {
      console.log(res)
      const balance = (res.income-res.pay).toFixed(2)
      setTotal({
        pay: parseFloat(res.pay.toFixed(2)),
        income: parseFloat(res.income.toFixed(2)),
        balance
      })
      const list = detailList.map(i => {
        if (!res.data[i.month]) { 
          i.pay = 0
          i.income = 0
          i.balance=0
        } else {
          const data = res.data[i.month] 
          i.pay = parseFloat(data.pay.toFixed(2))
          i.income = parseFloat(data.income.toFixed(2))
          i.balance = parseFloat((data.income - data.pay).toFixed(2))
        } 
        return i
      })
      setDetailList(list)
      Taro.hideLoading()
    })
  }

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
    getData(e.detail.value)
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
        <View className='totalNo'>{ total.balance }</View>
        <View className='type'>
          <View className='item'>收入:{ total.income }</View>
          <View className='item'>支出:{ total.pay }</View>
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
  statusBarHeight: state.systemInfo.statusBarHeight,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(BillPage)
