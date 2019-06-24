//app.js
App({
  globalData:{
     openId:''
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  getOpenId: function () {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'getOpenId',
        complete: res => {
          console.log(res.result.openid)
          // this.globalData.openid = res.result.openid
          // console.log("this.globalData.openid" + this.globalData.openid)
          //wx.setStorageSync("openId", res.result.openid)
          wx.setStorageSync("openId", res.result.openid)
          resolve(res.result.openid)
        }
      })
    })
  }
})
