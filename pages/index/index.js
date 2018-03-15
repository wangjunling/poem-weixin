//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    poemList:{},
    tagList: {},
    authorList: {},
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain +'/index',
      success:function(res){
        console.log(res);
        if (res.statusCode ==200){
          var data = res.data;
          if(data.status=="OK"){
            that.setData({
              poemList: data.data.poemList,
              tagList: data.data.tagList,
              authorList: data.data.authorList
            })
          }
        
        }
      }
    })
  },
})
