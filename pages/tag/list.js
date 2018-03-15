const app = getApp()
Page({
  data:{
    tagList:[],
    pageNum:1,
    hasMore:true,
    loading:false
  },
  onLoad:function(e){
    this.loadData(this,this.data.pageNum);
  },
  loadData:function(that,pageNum){
    that.setData({
      loading: true
    })
    wx.request({
      url: app.globalData.domain +'/tag',
      data:{
        pageNum:pageNum
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.status == "OK") {
            var page = data.data;
            var tagList = that.data.tagList.concat(page.data);
            if(page.pageNum>=page.pageTotal){
              that.setData({
                hasMore: false,
              })
            }
            that.setData({
              tagList: tagList,
            })
            that.setData({
              loading:false
            })
          }
        }
      }
    })
  },
  lower:function(e){
    if(!this.data.hasMore || this.data.loading){
      return;
    }
    var pageNum = this.data.pageNum+1;
    this.loadData(this,pageNum);
  }
})