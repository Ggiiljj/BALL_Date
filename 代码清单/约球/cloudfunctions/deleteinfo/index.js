const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('userinfo').where({
      locateid: event.id
    })
      .update({
        data: {
          sym:0,
        },
      })
  } catch (e) {
    console.error(e)
  }
}