const app = getApp()

Page({
  data:{
    author:{}
  },
  onLoad:function(e){
    var that = this;
    wx.request({
      url: app.globalData.domain+'/author/'+e.id,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.status == "OK") {
            that.setData({
              author: data.data,
            })
          }

        }
      }
    })
  },
  goback:function(){
    wx.navigateBack({
      delta:1
    })
  },
  searchPoem:function(){
    var name = this.data.author.name;
    wx.navigateTo({
      url: '/pages/poem/list?field=author&key='+name,
    })
  }
})