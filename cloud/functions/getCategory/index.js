// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloudminiapp-579a16'
})

const db = cloud.database({
  env: 'cloudminiapp-579a16'
})
const _ = db.command


function getCategory () {
  return db.collection('B_category')
    .field({
      "id": true,
      "icon": true,
      "name": true,
      "type": true,
    })
    .get()
}

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  let result = await getCategory()
  return result.data
}