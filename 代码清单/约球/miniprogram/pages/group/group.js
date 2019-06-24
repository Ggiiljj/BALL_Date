const app=getApp()
let openId = wx.getStorageSync("openId");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:app.globalData.openId,
    sym:0,
    userid:'',
    locateid:'',
    locateinfo:[],
    dpeopleid:[],
    peoplenum:0,
    chuangjianid:''
  },

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
    var _this = this;
    openId = wx.getStorageSync("openId");
    const db1 = wx.cloud.database();
    const userInfo = db1.collection('userinfo')
    userInfo.where({
      _openid: openId
    }).
      get({
        success(res) {
          console.log(res)
          //if(res.data[0].sym!=0)
          _this.setData({
            sym: res.data[0].sym,
            openid: res.data[0]._openid,
            userid: res.data[0]._id,
            locateid: res.data[0].locateid
          })
          db1.collection('locate').where({
            _id: res.data[0].locateid
          }).get({
            success(res) {
              console.log(res)
              _this.setData({
                locateinfo: res.data[0],
                dpeopleid: res.data[0].d_peoples,
                peoplenum: res.data[0].people_num,
                chuangjianid: res.data[0]._id
              })
            }
          })
          db1.collection('locate').where({
            _id: res.data[0].locateid
          }).count().then(res => {
            console.log(res.total)
            if (res.total == 0) {
              _this.setData({
                sym: 0
              })
            }
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
  tapp(e){
    var _this=this
    wx.navigateTo({
      url: '../detail/detail?locateid='+_this.data.locateid+'&userid='+_this.data.userid+'&sym='+_this.data.sym+'&locateinfo='+JSON.stringify(_this.data.locateinfo)
    })
  },
  tappdelete(e){
    var _this=this
    const db=wx.cloud.database();
  
    console.log(_this.data.locateid),
   
    wx.showModal({
      title: '提示',
      content: '确定退出公告',
      success:function(res){
        if(res.confirm)
        {
          for (var index in _this.data.dpeopleid) {
            var notes = _this.data.dpeopleid;
            if (notes[index] == _this.data.userid) {
              notes.splice(index, 1);
              console.log(notes)
            }
            _this.setData({
              dpeopleid: notes,
              peoplenum:_this.data.peoplenum-1
            })
          }
        wx.cloud.callFunction({
          name: 'jianlocate',
          data: {
            id:_this.data.locateid,
            dpeopleid:_this.data.dpeopleid
          },
          success(res) {
            console.log(res)
            console.log(_this.data.locateid)
            db.collection('userinfo').doc(_this.data.userid).update({
              data: {
                sym: 0
              },
              success(res) {
                _this.setData({
                  sym:0
                })
              }
            })
          }
        })
        }
      }
    })
  },
  tapp1delete(e){
    var _this = this
    const db = wx.cloud.database();
    
    wx.showModal({
      title: '提示',
      content: '确定解散公告',
      success: function (res) {
        if (res.confirm) {
          console.log(_this.data.locateid)
          wx.cloud.callFunction({
            name: 'deleteinfo',
            data: {
              id: _this.data.locateid,
              chuangjianid:_this.data.chuangjianid
            },
            success: res => {
              // output: res.result === 3
              console.log(res)
            },
            fail: err => {
              // handle error
              console.log("meie")
            },
          })
          db.collection('locate').doc(_this.data.locateid).get({
            success:function(res){
              console.log(res.data);
              db.collection('delete_locate').add({
                 data:{
                   d_peoples:res.data.d_peoples,
                   date:res.data.date,
                   description:res.data.description,
                   time:res.data.time,
                   people_num:res.data.people_num
                 },
                success: function (res) {
                  console.log(res)
                }
              }),
             
              db.collection('locate').doc(_this.data.locateid).remove({

              })
            }
          })
            
            // db.collection('userinfo').doc(_this.data.userid).update({
            //   data:{
            //     sym:0
            //   }
            // })
            _this.setData({
              sym:0
            })
        }
  }
  })}


})