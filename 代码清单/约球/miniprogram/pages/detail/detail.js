// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locateinfo:[],
    dpeople:[],
    people_num:0,
    hostid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this
    _this.setData({
      locateinfo: JSON.parse(options.locateinfo),
      // dpeople: JSON.parse(options.locateinfo).d_peoples,
      people_num: JSON.parse(options.locateinfo).people_num,
      hostid: JSON.parse(options.locateinfo)._openid
    })
    const db1=wx.cloud.database();
    for (var index in JSON.parse(options.locateinfo).d_peoples) {
      var notes = JSON.parse(options.locateinfo).d_peoples;
      db1.collection('userinfo').doc(notes[index]).get({
        success(res) {
         _this.data.dpeople.push(res.data)
        }
      })
    }
    console.log(_this.data.people_num)
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
  on_click(e)
  {
    var _this=this
    wx.navigateTo({
      url: '../other_detail/other_detail?dpeople=' + JSON.stringify(_this.data.dpeople)+'&people_num='+_this.data.people_num+'&hostoid='+_this.data.hostid
    })
  }
})