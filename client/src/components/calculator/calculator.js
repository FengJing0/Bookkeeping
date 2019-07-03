import Taro, { Component } from '@tarojs/taro'
import { CoverView } from '@tarojs/components'

import './calculator.scss'

export default class Calculator extends Component {

  state = {
    func: '',
    numList:[],
    reslut: 0
  }

  onClick = e => {
    const val = e.target.dataset.val
    let num = Number(val)
    if (isNaN(num)) {
      console.log(val)
      switch (val) {
        case '.':
          this.setState((prevState) => {
            if (!prevState.includes(val)) {
              return {
                func: prevState.func + val
              }
            }
          })
          break;
        case '-':
          // this.setState((prevState) => {
          //   numList = [...prevState.numList]
          //   return {
          //     func: '',
          //     numList: prevState.prevState.push(prevState.func + val)
          //   }
          // })
          break;
        case '+':
          this.setState((prevState) => ({
            func: prevState.func + val
          }))
          break;
        case '今天':
          // this.setState((prevState) => ({
          //   func: prevState.func + val
          // }))
          break;
        case '完成':
          let reslut = eval('return ' + this.state.func)
          // this.setState((prevState) => ({
          //   reslut: new Function('return '+prevState.func)()
          // }))
          this.setState({
            reslut
          })
          break;
        default:
          break;
      }
    } else {
      this.setState((prevState) => ({
        func: prevState.func + num
      }))
      console.log(num)
    }
  }

  onShow = () => {
    let func = new Function('return 96+3;')
    console.log(Object.prototype.toString.call(func))
    console.log(func)
  }
  render () {
    const { show } = this.props
    return <CoverView className='calculator' style={{ bottom: show ? '0rpx' : -300 + 'rpx' }} onClick={this.onClick}>
      <CoverView className='item' data-val='7'>7</CoverView>
      <CoverView className='item' data-val='8'>8</CoverView>
      <CoverView className='item' data-val='9'>9</CoverView>
      <CoverView className='item' data-val='今天'>今天</CoverView>
      <CoverView className='item' data-val='4'>4</CoverView>
      <CoverView className='item' data-val='5'>5</CoverView>
      <CoverView className='item' data-val='6'>6</CoverView>
      <CoverView className='item' data-val='+'>+</CoverView>
      <CoverView className='item' data-val='1'>1</CoverView>
      <CoverView className='item' data-val='2'>2</CoverView>
      <CoverView className='item' data-val='3'>3</CoverView>
      <CoverView className='item' data-val='-'>-</CoverView>
      <CoverView className='item' data-val='.'>.</CoverView>
      <CoverView className='item' data-val='0'>0</CoverView>
      <CoverView className='item' data-val='C' onClick={this.onShow}>C</CoverView>
      <CoverView className='item' data-val='完成'>完成</CoverView>
    </CoverView>
  }
}