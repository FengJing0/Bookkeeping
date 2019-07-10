import Taro, { Component } from "@tarojs/taro"
import { View, Text, Picker } from "@tarojs/components"
import { connect } from '@tarojs/redux'

import IconComponent from '../icon/icon'
import LoginBtn from '../loginBtn/loginBtn'

import './indexPage.scss'

import { getData } from '../../api/index'

const mapStateToProps = state => ({
  userInfo: state.userInfo,
})

const mapDispatchToProps = dispatch => ({})


@connect(mapStateToProps, mapDispatchToProps)
export default class IndexPage extends Component {

  state = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    list: [],
    pay: '0.00',
    income: '0.00'
  }


  handleDateChange = e => {
    const date = e.detail.value.split('-')
    this.setState({
      year: date[0],
      month: date[1]
    })
    this.getData(date[0], date[1])
  }

  getData = (year, month) => {
    if (!this.props.userInfo.nickName) return
    getData({ year, month }).then(res => {
      // console.log(res)
      const indexData = {
        list: res.data,
        pay: res.pay.toFixed(2),
        income: res.income.toFixed(2)
      }
      this.setState(indexData)
      Taro.setStorage({
        key: 'indexData',
        data: JSON.stringify(indexData)
      })
    })
  }

  componentWillMount () { }

  componentDidMount () {
    const that = this
    Taro.getStorage({ key: 'indexData' }).then(res => {
      if (res.data) {
        that.setState(JSON.parse(res.data))
      }
    }).catch(e => { })
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getData(this.state.year, this.state.month)
  }

  componentDidHide () { }

  render () {
    const { list, year, month } = this.state
    const payList = this.state.pay.split('.')
    const incomeList = this.state.income.split('.')

    const getDay = day => {
      const weekDay = new Date(`${year}-${month}-${day}`).getDay()
      const dayList = ['一', '二', '三', '四', '五', '六', '日']
      return dayList[weekDay - 1]
    }

    return (
      <View className='index'>
        <View className='overview'>
          <LoginBtn>
            <Picker mode='date' fields='month' onChange={this.handleDateChange}>
              <View className='item'>
                <Text className='title'>{ year }年</Text>
                <Text>{ month }<Text className='label'>月</Text></Text>
              </View>
            </Picker>
          </LoginBtn>
          <View className='item'>
            <Text className='title'>收入</Text>
            <Text>{ incomeList[0] }<Text className='label'>.{ incomeList[1] }</Text></Text>
          </View>
          <View className='item'>
            <Text className='title'>支出</Text>
            <Text>{ payList[0] }<Text className='label'>.{ payList[1] }</Text></Text>
          </View>
        </View>
        {
          list.map(item => (
            <View className='detail' key={item.day}>
              <View className='date'>
                <View>{ month }月{ item.day }日</View>
                <View style={{ flex: 1, marginLeft: '10rpx' }}>星期{ getDay(item.day) }</View>
                { item.income && <View style={{ marginRight: '10rpx' }}>收入：{ item.income.toFixed(2) }</View> }
                { item.pay && <View>支出：{ item.pay.toFixed(2) }</View> }
              </View>
              {
                item.list.map(sub => (
                  <View className='detailItem' key={sub._id}>
                    <View className='clearfix'>
                      <View className='fl icon'>
                        <IconComponent name={sub.category.icon}></IconComponent>
                      </View>
                      <View className='fl'>{ sub.category.name }</View>
                    </View>
                    <View>
                      <Text>{ sub.type === '支出' ? '-' : null }{ sub.count }</Text>
                    </View>
                  </View>
                ))
              }

            </View>
          ))
        }

      </View>
    )
  }
}
