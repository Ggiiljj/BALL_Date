// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event.id)
  try {
    return await db.collection('locate').doc(event.id).update({
      data: {
        d_peoples: _.push(event.peo_id),
        people_num:_.inc(1)
      }
    })
  } catch (e) {
    console.error(e)
  }
  
}