## 钱迹帐小程序

这是由 `Taro` 开发的基于云函数的小程序，由于小程序自带的tabbar样式无法满足需求，所以自定义了tabbar组件，首页的四个页面都以组件的形式动态挂载

.
├── client
│   ├── config
│   └── src
│       ├── actions // redux
│       ├── api // api
│       ├── asstes
│       │   ├── css // 样式
│       │   └── imgs //图片
│       │       └── icon // icon
│       ├── components
│       │   ├── Charts // 图表
│       │   │   └── ec-canvas
│       │   ├── SegmentedControl // 分页器组件
│       │   ├── billPage // 账单页面
│       │   ├── calculator // 计算器组件
│       │   ├── header // 头部组件
│       │   ├── home //页面布局组件
│       │   ├── icon // icon组件
│       │   ├── indexPage // 资产页面
│       │   ├── loginBtn // 登陆按钮组件
│       │   ├── myPage // 我的页面
│       │   ├── reportPage // 图表页面
│       │   └── tabbar // 地步tabbar组件
│       ├── constants
│       ├── pages
│       │   ├── billDetail // 账单详情页面
│       │   ├── bookkeeping // 记账页面
│       │   └── index // 首页
│       ├── reducers // redux
│       ├── store // redux入口
│       └── util // 工具函数
└── cloud // 云函数文件
    └── functions
        ├── getBillDetail
        ├── getBillTotalData
        ├── getCategory
        ├── getChartData
        ├── getData
        ├── login
        ├── saveData
        └── userInfo

