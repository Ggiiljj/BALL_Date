// pages/first_p/first_p.js
const db1 = wx.cloud.database();
const userInfo = db1.collection('userinfo')
const app = getApp()
var _this = this
let openId = wx.getStorageSync("openId");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  openid:'',
   weight:0,
   height:0,
   cp:'',
   kickname:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      openId=wx.getStorageSync("OpenId")
    if (openId == '') {
      app.getOpenId().then(res => {
        console.log(res)
        userInfo.where({
          _openid: res
        }).count().then(res => {
          console.log(res.total)
          if (res.total != 0) {
            wx.switchTab({
              url: '../find/find',
            })
          }
        })
        openId = wx.getStorageInfoSync("openId")
        console.log(openId)
      })
    }
    console.log(openId)
    
    
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
      
            }
          })
        }
      }
    })
  
    // wx.cloud.callFunction({
    //   name: 'getOpenId',
    //   complete: res => {
    //     console.log(res)
    //     console.log(res.result.openid)
    //     userInfo.where({
    //       _openid: res.result.openid
    //     }).count().then(res => {
    //       console.log(res.total)
    //       if(res.total!=0)
    //       {
    //         wx.switchTab({
    //           url: '../find/find',
    //         })
    //       }
         
    //     })
    //   }
    // })
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
      height:parseInt(event.detail.value)
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
  ttap(e)
  {
    const db2 = wx.cloud.database();
    var _this=this
    const userInfoo = db2.collection('userinfo')
    console.log(e.detail.userInfo)
    userInfoo.add({
      data:{
        weight:_this.data.weight,
        height:_this.data.height,
        kickname:_this.data.kickname,
        cp:_this.data.cp,
        nickName:e.detail.userInfo.nickName,
        gender: e.detail.userInfo.gender,
        avatarUrl: e.detail.userInfo.avatarUrl,
        language: e.detail.userInfo.language,
        province: e.detail.userInfo.province,
        city: e.detail.userInfo.city,
        sym:0,
        country: e.detail.userInfo.country,
        locateid:'00'
      }
    }).then(res=>{
      wx.switchTab({
        url: '../find/find',
      })
    })
  }
})