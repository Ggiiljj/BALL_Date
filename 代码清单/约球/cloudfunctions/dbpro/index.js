// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('xsum').doc('9482a040-2d18-4669-bb52-c8c702dc19a0').update({
      // data 传入需要局部更新的数据
      data: {
        sum:_.inc(1)
      }
    })
  } catch (e) {
    console.error(e)
  }
}