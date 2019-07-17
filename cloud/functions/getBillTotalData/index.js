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


function getData (openId, year) {
  return db.collection('B_acount')
    .where({
      openId,
      year,
      deleteTime: _.eq(0)
    }).get()
}


// 云函数入口函数
exports.main = async (event, context) => {
  const { year, userInfo } = event
  let res = await getData(userInfo.openId, year)
  const result = res.data
  let data = {}
  let income = 0
  let pay = 0


  result.forEach(i => {
    if (!data[i.month + '月']) {
      data[i.month + '月'] = {
        pay: 0,
        income: 0
      }
    }
    if (i.type==='支出') {
      data[i.month + '月'].pay += +i.count
      pay += +i.count
    } else {
      data[i.month + '月'].income += +i.count
      income += +i.count
    }
  })
  
  return {
    pay,
    income,
    data
  }
}