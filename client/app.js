App({
  onLaunch: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();

    wx.cloud.init({
      env: 'cloudminiapp-579a16', // 前往云控制台获取环境id
      traceUser: true //是否要捕捉每个用户的访问记录。设置为true，用户可在管理端看到用户访问记录
    })


  },

  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },

  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;

    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }

    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar
    });
  },

  globalData: {
    systemInfo: null,//客户端设备信息
    userInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#F97F59",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "asset.png",
          "selectedIconPath": "asset@selected.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/report/report",
          "iconPath": "report.png",
          "selectedIconPath": "report@selected.png",
          "text": "报表"
        },
        {
          "pagePath": "/pages/bookkeeping/bookkeeping",
          "iconPath": "bookkeeping.png",
          "isSpecial": true,
          "text": "记账"
        },
        {
          "pagePath": "/pages/bill/bill",
          "iconPath": "bill.png",
          "selectedIconPath": "bill@selected.png",
          "text": "账单"
        },
        {
          "pagePath": "/pages/my/my",
          "iconPath": "my.png",
          "selectedIconPath": "my@selected.png",
          "text": "我的"
        }
      ]
    }
  }
})
