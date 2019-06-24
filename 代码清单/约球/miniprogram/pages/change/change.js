// pages/change/change.js
let openId = wx.getStorageSync("openId");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weight: 0,
    height: 0,
    cp: '',
    kickname: '',
    id:'',
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
    openId = wx.getStorageSync("openId");
    var _this = this
    const db2 = wx.cloud.database();
    const userinfo = db2.collection('userinfo');
    userinfo.where({
      _openid: openId
    }).get({
      success(res) {
        _this.setData({
          id:res.data[0]._id
        })
      }
  })},

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

  },
  onHeight(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      height: parseInt(event.detail.value)
    })
  },
  onWeight(event) {
    // event.detail 为当前输入的值
    //console.log(event.detail);
    this.setData({
      weight: parseInt(event.detail.value)
    })
  },
  onCp(event) {
    // event.detail 为当前输入的值
    //console.log(event.detail);
    this.setData({
      cp: event.detail.value
    })
  },
  onKick(event) {
    // event.detail 为当前输入的值
    //console.log(event.detail);
    this.setData({
      kickname: event.detail.value
    })
  },
  ttap(e) {
    const db2 = wx.cloud.database();
    var _this = this
    const userInfoo = db2.collection('userinfo')
    userInfoo.doc(_this.data.id).update({
      data: {
        weight: _this.data.weight,
        height: _this.data.height,
        cp: _this.data.cp,
        kickname: _this.data.kickname
      },
      success(res) {
        wx.switchTab({
          url: '../mine/mine',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  }
})