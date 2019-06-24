// pages/fill_detail/fill_detail.js
const db = wx.cloud.database();
const app = getApp()

let xx
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    date: "",
    people: 0,
    details:null,
    id:0,
    _id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.mm)
   
    var _this=this
    const db2 = wx.cloud.database();
    const userinfo = db2.collection('userinfo')
    userinfo.doc(options.mm_id).update({
      data: {
       locateid: options._idd//创建者的sym值为1.
      },
      success(res) {
        console.log(res.data)
      }
    })
   _this.setData({
     _id:options._idd
   })
  }
  ,

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
  bindTimeChange(e) {
    let { value } = e.detail;
    console.log("时间改变:", value);
    this.setData({
      time: value
    })
    console.log(this.data.time)
  },
  bindDateChange(e) {
    let { value } = e.detail;
    console.log("日期改变:", value);
    this.setData({
      date: value
    })
  },
  toppeople: function (e) {
    this.data.people = e.detail.value;
    console.log(this.data.people)
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },
  bindbuttonttap(e)
  {
    var xx
    const _=db.command
    const _this=this
    if(_this.data)
    console.log(_this.data._id)
    console.log(_this.data.date)
    if(_this.data.date=='')
    {
      wx.showModal({
        title: '提示',
        content: '日期不能为空',
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }
    else if (_this.data.time == '') {
      wx.showModal({
        title: '提示',
        content: '时间不能为空',
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }
    else if(_this.data.people<=1)
    {
      wx.showModal({
        title: '提示',
        content: '人数要大于1个',
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }
    else{
    db.collection('locate').doc(_this.data._id).update({
      data: {
         date:_this.data.date,
         people:_this.data.people,
         time:_this.data.time,
         details:_this.data.details
      },
      success(res) {
        wx.switchTab({
          url: '../group/group?_id='+_this.data._id,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
    
  }}
})