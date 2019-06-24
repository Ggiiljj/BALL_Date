// pages/mine/mine.js
var app = getApp()
let openId = wx.getStorageSync("openId");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      height:0,
      weight:0,
      cp:'',
      kickname:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (openId == '') {
      app.getOpenId().then(res => {
        console.log("res")
        openId = wx.getStorageInfoSync("openId")
        console.log(openId)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    openId = wx.getStorageSync("openId");
    const db1 = wx.cloud.database()
    const userInfo = db1.collection('userinfo')
    var _this = this
    userInfo.where({
      _openid: openId
    }).get({
      success(res) {
        console.log(res)
        _this.setData({
          height: res.data[0].height,
          weight: res.data[0].weight,
          kickname: res.data[0].kickname,
          cp: res.data[0].cp
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})