// 填写 env
wx.cloud.init({
  env: 'cloudminiapp-579a16'
})


export const getCategory = () => {
  return wx.cloud.callFunction({
    name: 'getCategory',
  })
}