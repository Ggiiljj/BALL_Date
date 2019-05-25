var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tem:0,
   _idd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: 'YWMBZ-76YR2-VSRUE-CNKGK-5SXJE-ASFOD'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this=this
    db.collection('xsum').doc('9482a040-2d18-4669-bb52-c8c702dc19a0').get({
      success(res){
        // res.data 包含该记录的数据
        console.log(res.data.sum)
        _this.setData({
          tem: res.data.sum
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  formSubmit(e) {
    var _this = this;
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
       address: e.detail.value.geocoder, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function (res) {//成功后的回调
        wx.cloud.callFunction({
          // 云函数名称
          name: 'dbpro',
          // 传给云函数的参数
          success: function (res) {
            console.log(res)
          },
          fail: console.error
        })
        var res = res.result;
        console.log(res)
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        // const db = wx.cloud.database()
        const locate = db.collection('locate')
        var ix;//_id
        var that=this
        //根据地址解析在地图上标记解析地址位置
        _this.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
          markers: [{
            id: 0,
            title: res.title,
            latitude: latitude,
            longitude: longitude,
            iconPath: '../../res/icon_2.png',//图标路径
            width: 20,
            height: 20,
            callout: { //可根据需求是否展示经纬度
              content: latitude + ',' + longitude,
              color: '#000',
              display: 'ALWAYS'
            }
          }],
          poi: { //根据自己data数据设置相应的地图中心坐标变量名称
            latitude: latitude,
            longitude: longitude
          },
        });
        db.collection('locate').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            description: res.title,
            longitude: res.location.lng,
            latitude: res.location.lat,
            id: _this.data.tem,
            date:"2121",
            time:"123123",
            details:"123123",
            people:0
          }
        })
          .then(res => {
            console.log(res)
            _this.setData({
              _idd: res._id
            })
            var mm = _this.data.markers
            var mm_id = _this.data.tem
            var mm_poi = _this.data.poi
            console.log(_this.data._idd)
            wx.redirectTo({
              url: '../fill_detail/fill_detail?mm=' + JSON.stringify(mm) + "&mm_id=" + mm_id + "&mm_poi=" + JSON.stringify(mm_poi)+"&_idd="+_this.data._idd,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          })
        console.log(_this.data);
        // var mm=_this.data.markers
        // var mm_id=_this.data.tem
        // var mm_poi=_this.data.poi
        // wx.redirectTo({
        //   url: '../fill_detail/fill_detail?mm=' + JSON.stringify(mm) + "&mm_id=" + mm_id + "&mm_poi=" + JSON.stringify(mm_poi),
        //   success: function(res) {},
        //   fail: function(res) {},
        //   complete: function(res) {},
        // })
      },
      fail: function (error) {
        console.error(error);
      },
    })
  }
  ,
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].addr
        });
      }
    }
  },
  //触发关键词输入提示事件
  getsuggest: function (e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})