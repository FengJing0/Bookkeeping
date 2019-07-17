import Taro from '@tarojs/taro'
// 填写 env
Taro.cloud.init({
  env: 'cloudminiapp-579a16'
})

function isSuccess(res) {
  if (res.errMsg.slice(-2) === 'ok') {
    return res.result
  }
}


export const getCategory = () => {
  return Taro.cloud.callFunction({
    name: 'getCategory',
  }).then(res => {
    return isSuccess(res)
  })
}

export const saveData = data => {
  return Taro.cloud.callFunction({
    name: 'saveData',
    data
  }).then(res => {
    return isSuccess(res)
  })
}

export const getData = data => {
  return Taro.cloud.callFunction({
    name: 'getData',
    data
  }).then(res => {
    return isSuccess(res)
  })
}

export const checkLogin = () => {
  return Taro.cloud.callFunction({
    name: 'userInfo'
  }).then(res => {
    return isSuccess(res)
  })
}

export const getBillDetail = (data) => {
  return Taro.cloud.callFunction({
    name: 'getBillDetail',
    data
  }).then(res => {
    return isSuccess(res)
  })
}

export const deleteBillDetail = (data) => {
  return Taro.cloud.callFunction({
    name: 'saveData',
    data
  }).then(res => {
    return isSuccess(res)
  })
}

export const getChartData = (data) => {
  return Taro.cloud.callFunction({
    name: 'getChartData',
    data
  }).then(res => {
    return isSuccess(res)
  })
}