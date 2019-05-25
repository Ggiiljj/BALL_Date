let locatedata
Page({

  /**
   * 页面的初始数据
   */
  data: {
      longitude: 113.3245211,
      latitude: 23.10229,
      markers: [],
  },
  // controls: [{
  //   id: 1,
  //   iconPath: '../../res/icon_1.png',
  //   position: {
  //     left: 0,
  //     top: 10,
  //     width: 40,
  //     height: 40
  //   },
  //   clickable: true
  // }],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    var varmarkers=[];
    const db=wx.cloud.database();
    db.collection('locate').get({
      success:res=>{
        console.log(res.data)
        console.log(res.data.length)
        for(var i=0;i<res.data.length;i++)
        {
          varmarkers.push({
            latitude:res.data[i].latitude,
            longitude:res.data[i].longitude,
            id:res.data[i].id,
            callout:{
              content:res.data[i].description+"点击气泡加入该小组",
              fontSize: '60',
              padding: true,
              color: '#444',
              textAlign: 'center',
              borderRadius: 15
            }
          })
        }
            _this.setData({
               markers:varmarkers
             })
      }
    })
  
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          longitude: longitude,
          latitude: latitude,
        })
      }
    });
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
  regionchange(e) {
   // console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    wx.showToast({
      title: 'ss',
    })
    
  },
  callouttap(e)
  {
    console.log(e)
    var s=e.markerId
    wx.navigateTo({
      url: '../detail/detail?id='+s
    })
  },
  controltap(e) {
    console.log(e.controlId)
  },
})