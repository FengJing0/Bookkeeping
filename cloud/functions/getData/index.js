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


function getData (openId, year, month) {
  return db.collection('B_acount')
    .where({
      openId,
      year,
      month
    }).orderBy('date','desc').get()
}

function getCategory (id) {
  return db.collection('B_category').doc(id).get()
}


// 云函数入口函数
exports.main = async (event, context) => {
  const { year, month, userInfo } = event
  let res = await getData(userInfo.openId, year, month)
  const result = res.data
  let data = []
  let pay = 0
  let income = 0
  for (let i = 0,
    len = result.length,
    tmp = {
      pay: 0,
      day: 0,
      income: 0,
      list: []
    },
    day;
    i < len; i++) {
    let item = result[i];
    if (!day) day = item.day

    let category = await getCategory(result.category)
    item.category = category.data

    if (day !== item.day && tmp.list.length) {
      day = item.day
      data.push(tmp)
      pay += tmp.pay
      income += tmp.income
      tmp = {
        pay: 0,
        income: 0,
        day: 0,
        list: []
      }
    }
    tmp.list.push(item)
    tmp.day = day

    if (item.type === '支出') {
      tmp.pay += +item.count
    } else {
      tmp.income += +item.count
    }

    if (i === len - 1) {
      data.push(tmp)
      pay += tmp.pay
      income += tmp.income
    }
  }
  return {
    pay: pay,
    income: income,
    data
  }
}