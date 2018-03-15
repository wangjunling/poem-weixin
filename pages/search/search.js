
Page({
  data:{
    poemList:{}
  },
  onLoad:function(){

  },
  search:function(e){
    console.log(e.detail);
    wx.navigateTo({
      url: '/pages/poem/list?key=' + e.detail.value
    })
  }
})