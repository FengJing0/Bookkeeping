// 填写 env
wx.cloud.init({
  env: 'cloudminiapp-579a16'
})

function isSuccess(res) {
  if (res.errMsg.slice(-2) === 'ok') {
    return res.result
  }
}


export const getCategory = () => {
  return wx.cloud.callFunction({
    name: 'getCategory',
  }).then(res => {
    return isSuccess(res)
  })
}

export const saveData = data => {
  return wx.cloud.callFunction({
    name: 'saveData',
    data
  }).then(res => {
    return isSuccess(res)
  })
}

export const getData = data => {
  return wx.cloud.callFunction({
    name: 'getData',
    data
  }).then(res => {
    return isSuccess(res)
  })
}