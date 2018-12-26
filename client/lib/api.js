// 填写 env
wx.cloud.init({
  env: ''
})


export const demo = (id) => {
  return wx.cloud.callFunction({
    name: 'demo',
    data: {
      id
    }
  })
}
