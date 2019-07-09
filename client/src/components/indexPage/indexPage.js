import Taro, { Component } from "@tarojs/taro"
import { View, Text, Picker } from "@tarojs/components"

import IconComponent from '../icon/icon'

import './indexPage.scss'

import { getData } from '../../api/index'

export default class IndexPage extends Component {

  state = {
    year: new Date().getFullYear(),
    mouth: new Date().getMonth() + 1,
    list: [],
    pay: '0.00',
    income: '0.00'
  }


  handleDateChange = e => {
    console.log(e)
  }

  getData = () => {
    getData({ year: this.state.year, month: this.state.mouth }).then(res => {
      // console.log(res)
      this.setState({
        list: res.data,
        pay: res.pay.toFixed(2),
        income: res.income.toFixed(2)
      })
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    this.getData()
  }

  componentDidHide () { }

  render () {
    const { list } = this.state
    console.log(list)
    const payList = this.state.pay.split('.')
    const incomeList = this.state.income.split('.')
    return (
      <View className='index'>
        <View className='overview'>
          <Picker mode='date' fields='month' onChange={this.handleDateChange}>
            <View className='item'>
              <Text className='title'>2018年</Text>
              <Text>12<Text className='label'>月</Text></Text>
            </View>
          </Picker>
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
                <View>12月{ item.day }日</View>
                { item.income && <View>收入：{ item.income.toFixed(2) }</View> }
                { item.pay && <View>支出：{ item.pay.toFixed(2) }</View> }
              </View>
              {
                item.list.map(sub => (
                  <View className='detailItem' key={sub._id}>
                    <View className='clearfix'>
                      {/* <Image src='../../asstes/imgs/icon/bookkeeping.png' className='img'></Image> */ }
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
