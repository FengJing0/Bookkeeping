// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloudminiapp-579a16'
})

const db = cloud.database({
  env: 'cloudminiapp-579a16'
})
const _ = db.command


function getDetail (id, openId) {
  return db.collection('B_acount')
    .where({ _id: id, openId })
    .get()
}

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  let result = await getDetail(event.id,event.userInfo.openId)
  return result.data[0]||{}
}