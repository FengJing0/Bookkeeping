// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloudminiapp-579a16'
})

const db = cloud.database({
  env: 'cloudminiapp-579a16'
})
const _ = db.command
const $ = db.command.aggregate


function getData (type, dateType, date, openId) {
  const dateTypeList = {
    '周': 'week',
    '月': 'month',
    '年': 'year'
  }
  return db.collection('B_acount')
    .where({
      openId,
      type,
      [dateTypeList[dateType]]: date,
      deleteTime: _.eq(0)
    }).get()
}

function getCategory (id) {
  return db.collection('B_category').doc(id).get()
}


// 云函数入口函数
exports.main = async (event, context) => {
  const { type, dateType, date, userInfo } = event
  let res = await getData(type, dateType, date, userInfo.openId)
  const result = res.data
  let total = 0
  let data = []
  let categoryData = {}
  for (let i = 0, len = result.length; i < len; i++) {
    const item = result[i];
    const category = item.category
    const count = +item.count
    total += count

    data.push(item)

    if (!categoryData[category]) {
      categoryData[category] = count
    } else {
      categoryData[category] += count
    }
  }
  return {
    total,
    categoryData,
    data
  }
}