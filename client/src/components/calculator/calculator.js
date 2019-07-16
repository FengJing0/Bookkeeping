import Taro, { Component } from '@tarojs/taro'
import { View, Input, Picker } from '@tarojs/components'

import './calculator.scss'

class CalculatorClass {
  constructor () {
    this.funcList = []
    this.numList = []
    this.tmp = ''
    this.result = 0
    this.show = '0'
  }

  init (flag) {
    if (!flag) {
      this.result = 0
      this.show = '0'
    }
    this.funcList = []
    this.numList = []
    this.tmp = ''
  }

  pushItem (i) {
    if (this.result) { this.init() }
    if (this.show === '0') { this.show = '' }
    if (!isNaN(i)) {
      this.tmp += i
      this.show += i
    }
    switch (i) {
      case '+':
        if (this.tmp) {
          this.isFunc()
          this.funcList.push('+')
          this.show += '+'
        }
        break;
      case '-':
        if (this.tmp) {
          this.isFunc()
          this.funcList.push('-')
          this.show += '-'
        }
        break;
      case '.':
        if (this.tmp.indexOf('.') === -1 && this.tmp) {
          this.tmp += '.'
          this.show += '.'
        }
        break;
      case 'C':
        if (!this.tmp.length) {
          let tmp = this.funcList.length === this.numList.length ? this.funcList.pop() : this.numList.pop()
          this.tmp = tmp || ''
        }
        this.tmp = this.tmp.slice(0, -1)
        this.show = this.show.slice(0, -1) || '0'
        break;
      case '=':
        this.getResult()
        this.show = this.result
        break;
      default:
        break;
    }
    // console.log('tmp:', this.tmp)
    // console.log('result:', this.result)
    // console.log('funcList:', this.funcList)
    // console.log('numList:', this.numList)
  }

  isFunc () {
    if (this.tmp.slice(-1) === '.') {
      this.tmp = this.tmp.slice(0, -1)
    }
    this.numList.push(this.tmp)
    this.tmp = ''

  }

  getResult () {
    this.isFunc()
    let res = Number(this.numList[0])
    for (let i = 1, len = this.numList.length; i < len; i++) {
      let item = Number(this.numList[i])
      if (this.funcList[i - 1] === '+') {
        res += item
      } else {
        res -= item
      }
    }
    this.result = res.toFixed(2)
    this.init(true)
  }

  setItem (item) {
    this.tmp = item
    this.show = item
  }
}

export default class Calculator extends Component {

  state = {
    calculator: new CalculatorClass(),
    showStr: '0',
    result: 0,
    date: '',
    remark: '',
    keyboardHeight: 0,
    id:0
  }

  onClick = e => {
    const val = e.target.dataset.val
    if (val === '=' && this.state.result) {
      let date = this.state.date ? +new Date(this.state.date) : +new Date()
      this.props.onSubmit({
        count: this.state.result,
        date,
        id:this.state.id,
        remark: this.state.remark
      })
    } else if (val) {
      this.state.calculator.pushItem(val)
      this.setState({
        showStr: this.state.calculator.show
      })
      if (val === 'C' && this.state.result) {
        this.setState({
          result: 0
        })
      }
      if (val === '=') {
        this.setState({
          result: this.state.calculator.result
        })
      }
    }
  }

  handleDateChange = e => {
    this.setState({
      date: e.detail.value
    })
  }

  handleRemarkChange = e => {
    this.setState({
      remark: e.detail.value
    })
  }

  handleSetKeyboardHeight = e => {
    this.setState({
      keyboardHeight: e.detail.height || 0
    })
  }

  componentDidMount () {
    // console.log(this.props.detailData)
    this.state.calculator.init()
  }

  // componentDidShow () {
  //   console.log(this.props.detailData)
  // }

  componentWillReceiveProps (props) {
    // console.log(props)
    if (props.detailData._id&&!this.state.id) {
      console.log(props.detailData)
      const data = props.detailData
      this.setState({
        date: `${data.year}-${data.month}-${data.day}`,
        remark: data.remark,
        showStr: data.count,
        id:data._id
      })
      this.state.calculator.setItem(data.count)
    }
  }

  render () {
    const { show } = this.props
    const { showStr, result, date, remark, keyboardHeight } = this.state

    const keyboardStyle = {
      position: 'fixed',
      bottom: keyboardHeight + 'px',
      left: 0,
      zIndex: 1000
    }

    return <View className='calculator' style={{ bottom: show ? '0rpx' : '-' + 90 * 6 + 'rpx' }} onClick={this.onClick}>
      <View className='remark clearfix' style={keyboardHeight ? keyboardStyle : {}}>
        <View className='text fl'>备注:</View>
        <Input
          className='input fl'
          adjust-position={false}
          placeholder=''
          onChange={this.handleRemarkChange}
          onKeyboardheightchange={this.handleSetKeyboardHeight}
          onFocus={this.handleSetKeyboardHeight}
          onBlur={this.handleSetKeyboardHeight}
          type='text'
          value={remark}
        />
      </View>
      <View className='show' >{ showStr }</View>
      <View className='item' data-val='7'>7</View>
      <View className='item' data-val='8'>8</View>
      <View className='item' data-val='9'>9</View>
      <View className='item'>
        <Picker mode='date' onChange={this.handleDateChange}>
          <View class='picker'>
            { date ? date : '今天' }
          </View>
        </Picker>
      </View>
      <View className='item' data-val='4'>4</View>
      <View className='item' data-val='5'>5</View>
      <View className='item' data-val='6'>6</View>
      <View className='item' data-val='+'>+</View>
      <View className='item' data-val='1'>1</View>
      <View className='item' data-val='2'>2</View>
      <View className='item' data-val='3'>3</View>
      <View className='item' data-val='-'>-</View>
      <View className='item' data-val='.'>.</View>
      <View className='item' data-val='0'>0</View>
      <View className='item' data-val='C'>C</View>
      <View className='item' data-val='='>{ result ? '完成' : '=' }</View>
    </View>
  }
}