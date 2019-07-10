// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloudminiapp-579a16'
})

const db = cloud.database({
  env: 'cloudminiapp-579a16'
})
const _ = db.command


function saveData (data) {
  db.collection('B_user').where({
    openId: data.userInfo.openId,
  }).update({
    data: {
      count: _.inc(1)
    },
  })
  return db.collection('B_acount')
    .add({
      data: {
        openId: data.userInfo.openId,
        count: data.count,
        date: data.date,
        category: data.category,
        type:data.type,
        year: data.year,
        month: data.month,
        day: data.day,
        week: data.week,
        remark: data.remark,
        deleteTime: null,
        createTime:+new Date()
      }
    })
}


// 云函数入口函数
exports.main = async (event, context) => {
  const res = await saveData(event)
  return res._id
}