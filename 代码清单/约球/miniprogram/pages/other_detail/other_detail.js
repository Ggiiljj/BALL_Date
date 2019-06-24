// pages/other_detail/other_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    hostd:[],
    otherd:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const db=wx.cloud.database();
    var _this=this
    db.collection('userinfo').where({
      _openid: options.hostoid
    }).get({
      success(res) {
        console.log(res)
        _this.setData({
          hostd:res.data[0],
          num:options.people_num,
          otherd:JSON.parse(options.dpeople)
        })
      }
    })
   

    console.log(JSON.parse(options.dpeople))
      // for (var index in _this.data.dpeopleid) {
      //   var notes = _this.data.dpeopleid;
      //   if (notes[index] == _this.data.userid) {
      //     notes.splice(index, 1);
      //     console.log(notes)
      //   }
      //   _this.setData({
      //     dpeopleid: notes,
      //     peoplenum: _this.data.peoplenu
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

  }
})