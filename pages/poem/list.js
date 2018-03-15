const app = getApp()
Page({
  data:{
    poemList:[],
    pageNum: 1,
    key:'',
    field:'',
    tagId:'',
    hasMore:true,
    loading:false
  },
  onLoad:function(e){
    console.log(e);
    var key = '';
    if(e.key!=undefined){
       key = e.key;
    }
    var tagId = '';
    if (e.tagId != undefined) {
      tagId = e.tagId;
    }
    var field = '';
    if (e.field != undefined) {
      field = e.field;
    }
    var that = this;
    this.setData({
      key:key,
      tagId:tagId,
      field:field,
    })
    this.loadPoemList(that, key, tagId, field,this.data.pageNum);
  },
  loadPoemList:function(that,key,tagId,field,pageNum){
    this.setData({
      loading:true,
    })
    wx.request({
      url: app.globalData.domain +'/poem',
      data: {
        key: key,
        field: field,
        tagId: tagId,
        pageNum:pageNum
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.status == "OK") {
            var page = data.data;
            var c = that.data.poemList.concat(page.data);
            var num = page.pageNum;
            var hasM = true;
            if (page.totalPage <= num) {
              hasM = false;
            }
            that.setData({
              poemList: c,
              pageNum:page.pageNum,
              hasMore:hasM
            })
            that.setData({
              loading: false,
            })
          }
        }
      }
    })
  },
  lower: function (e) {
    if(this.data.loadding || !this.data.hasMore){
      return;
    }
    var pageNum = this.data.pageNum +1;
    this.loadPoemList(this, this.data.key, this.data.tagId, this.data.field, pageNum);
  }
})