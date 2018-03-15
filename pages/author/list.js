const app = getApp()
Page({
  data: {
    authorList: [],
    hasMore: true,
    loadComplate: false,
    loading: false,
    pageNum: 1
  },
  onLoad: function (e) {
    var that = this;
    this.loadData(that, this.data.pageNum);
  },
  loadData: function (that, pageNum) {
    this.setData({
      loading: true,
    });
    wx.request({
      url: app.globalData.domain+'/author',
      data: {
        pageNum: pageNum
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.status == "OK") {
            var page = data.data;
            var c = that.data.authorList.concat(page.data);
            var num = page.pageNum;
            var hasM = true;
            if (page.totalPage <= num) {
              hasM = false;
            }
            that.setData({
              authorList: c,
              pageNum: num,
              hasMore: hasM
            });
            that.setData({
              loading: false,
            });
          }
        }
      }
    })
  },
  lower: function (e) {
    if (!this.data.hasMore || this.data.loading) {
      return;
    }
    var num = this.data.pageNum + 1;
    this.loadData(this, num);
  }
})