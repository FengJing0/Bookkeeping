const app = getApp()
Page({
  data: {
    tabbar: {},
  },
  //事件处理函数
  onLoad: function () {
    app.editTabbar();
  },

})
