import Taro, { Component } from "@tarojs/taro"
import { connect } from '@tarojs/redux'
import { View, Text, Button } from "@tarojs/components"

import HeaderComponent from '../../components/header/header'
import IconComponent from '../../components/icon/icon'

import { getBillDetail, deleteBillDetail } from '../../api/index'

import './billDetail.scss'

const mapStateToProps = state => ({
  statusBarHeight: state.systemInfo.statusBarHeight,
  category: state.category
})

const mapDispatchToProps = dispatch => ({})

@connect(mapStateToProps, mapDispatchToProps)
export default class BillDetail extends Component {
  state = {
    detailData: {},
    headerInfo: {},
    id: 0
  }

  componentDidMount () {
    const id = this.$router.params.id
    Taro.showLoading({
      title: '正在加载...'
    })
    this.setState({
      id
    })
    getBillDetail({ id }).then(res => {
      this.setState({
        detailData: res,
        headerInfo: this.props.category.filter(i => i._id === res.category)[0] || {}
      })
      Taro.hideLoading()
    })
  }

  handleEdit = () => {
    Taro.setStorage({ key: 'detailData', data: this.state.detailData }).then(res => {
      Taro.navigateTo({ url: '/pages/bookkeeping/bookkeeping?detail=true' })
    })
  }

  handleDelete = () => {
    Taro.showModal({
      title: '删除',
      content: '是否删除该账单？一旦删除将无法恢复！',
    })
      .then(res => {
        if (res.confirm) {
          Taro.showLoading({
            title: '删除中...'
          })
          deleteBillDetail({
            id: this.state.id,
            deleteTime: +new Date()
          }).then(result => {
            if (result === 1) {
              console.log(result)
              Taro.hideLoading()
              Taro.navigateBack()
            }
          })
        }
      })
  }

  render () {
    const { detailData, headerInfo } = this.state
    const height = this.props.statusBarHeight + 56 + 36 + 54
    return (
      <View className='billDetail'>
        <HeaderComponent title='账单详情' height={height} goBack></HeaderComponent>
        <View className='header'>
          <View className='icon'><IconComponent name={headerInfo.icon}></IconComponent></View>
          <View className='title'><Text>{ headerInfo.name }</Text></View>
        </View>
        <View className='wrapper' style={{ marginTop: height + 'px' }}>
          <View className='item'>
            <View className='lable'>类型</View>
            <View>{ detailData.type }</View>
          </View>
          <View className='item'>
            <View className='lable'>金额</View>
            <View>{ detailData.count }</View>
          </View>
          <View className='item'>
            <View className='lable'>日期</View>
            <View>{ detailData.year && `${detailData.year}-${detailData.month}-${detailData.day}` }</View>
          </View>
          <View className='item'>
            <View className='lable'>备注</View>
            <View>{ detailData.remark }</View>
          </View>
        </View>
        <View className='btnGroup'>
          <View className='btn' onClick={this.handleEdit}>编辑</View>
          <View className='btn' onClick={this.handleDelete}>删除</View>
        </View>
      </View>
    )
  }
}




