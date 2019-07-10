// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloudminiapp-579a16'
})

const db = cloud.database({
  env: 'cloudminiapp-579a16'
})
const _ = db.command


async function checkUserInfo (userInfo) {
  let res = {}
  const user = await getUserInfo(userInfo)
  if (!user) {
    const data = {
      openId: userInfo.openId,
      createTime: +new Date(),
      count: 0
    }
    await db.collection('B_user').add({ data })
    res = data
  } else {
    res = user
  }
  return res
}

function getUserInfo (userInfo) {
  return db.collection('B_user')
    .where({
      openId: userInfo.openId,
    }).get().then(res => res.data[0])
}


// 云函数入口函数
exports.main = async (event, context) => {
  const {userInfo } = event
  return checkUserInfo(userInfo)
}