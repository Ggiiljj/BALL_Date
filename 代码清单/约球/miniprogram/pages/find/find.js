let locatedata
var app=getApp()
let openId = wx.getStorageSync("openId");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      longitude: 113.3245211,
      latitude: 23.10229, 
      markers: [],
      sym:0,
      openid:'',
      id:'',
      locateid:'',
      ooo:0
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
    console.log(openId)

    if (openId == '') {
      app.getOpenId().then(res => {
        console.log("res")
        openId = wx.getStorageInfoSync("openId")
        console.log(openId)
      })
    }
    var _this=this
  
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
    const db1 = wx.cloud.database();
    const userInfo = db1.collection('userinfo')
    var _this = this
    openId = wx.getStorageSync("openId");

    userInfo.where({
      _openid: openId
    }).get({
      success(res) {
        console.log(res)
        _this.setData({
          sym: res.data[0].sym,
          openid: res.data[0]._openid,
          id: res.data[0]._id
        })
      }
    })
    var _this = this
    var varmarkers = [];
    const db = wx.cloud.database();
    db.collection('locate').get({
      success: res => {
        console.log(res.data)
        console.log(res.data[0].d_peoples[0])
        console.log(res.data.length)
        for (var i = 0; i < res.data.length; i++) {
          varmarkers.push({
            latitude: res.data[i].latitude,
            longitude: res.data[i].longitude,
            id: res.data[i].id,
            callout: {
              content: res.data[i].description + "点击气泡加入该小组",
              fontSize: '20',
              padding: true,
              color: '#444',
              textAlign: 'center',
              borderRadius: 15
            }
          })
        }
        _this.setData({
          markers: varmarkers
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
    
  },
  regionchange(e) {
   // console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  callouttap(e)
  {
    console.log(e)
    var s=e.markerId
    var _this = this
    const db = wx.cloud.database();
    const userInfo=db.collection('userinfo')
      userInfo.where({
        _openid: openId
      }).get({
        success(res) {
          console.log(res)
          if(res.data[0].sym!=0)
          {
            wx.showModal({
              title: '提示',
              content: '你已经创建了一个公告,请转移至群组页面',
              success: function (res) {
                if (res.confirm) {
            
                  wx.switchTab({
                    url: '../group/group',
                  })
                }
        
              }
            })
          }
          else{

            db.collection('locate').where({
              id: e.markerId
            }).get(
            ).then(res => {
              console.log(res);
              if(parseInt(res.data[0].people)<=res.data[0].people_num)
              {
                wx.showModal({
                  title: '提示',
                  content: '该公告人数已满',
                  success: function (res) {
                    if (res.confirm) {

                      wx.switchTab({
                        url: '../find/find',
                      })
                    }

                  }
                })
              }
              else{
                wx.showLoading({
                  title: '加载中',
                  mask: true
                })
              _this.setData({
                locateid:res.data[0]._id,
              })
              wx.cloud.callFunction({
                name: 'addcall',
                data: {
                  id: res.data[0]._id,
                  peo_id: _this.data.id
                },
                success(res) {
                  console.log(res)
                  console.log(_this.data.locateid)
                  db.collection('userinfo').doc(_this.data.id).update({
                    data: {
                      sym: 2 ,//如果该用户为加入用户，则设置sym为2
                      locateid: _this.data.locateid
                    },
                    success(res) {
                      wx.switchTab({
                        url: '../group/group',
                      })
                      setTimeout(
                        function () {
                          wx.hideLoading()
                        },1000
                      )
                    }
                  })
                }
              })
          }})
          }
      }   
        })
  },
  controltap(e) {
    console.log(e.controlId)
  },
})