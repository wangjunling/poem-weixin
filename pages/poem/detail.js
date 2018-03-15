const app = getApp()
Page({
  data:{
    poem:{}
  },
  onLoad:function(e){
    var that = this;
    wx.request({
      url: app.globalData.domain +'/poem/'+e.id,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.status == "OK") {
            that.setData({
              poem: data.data,
            })
          }
        }
      }
    })
  }
})