## 目录结构说明

### 前端部门：share_space

### 后端接口：share_space_api

```

├── app                        # 源代码
│   ├── controllers            # 类方法
│   ├── models                 # 数据模型
│   ├──	public                 # 静态资源
│   ├── ├── uploads            # 上传的用户头像图片资源
│   |	└── uploads.html       # 上传图片的一个前端demo界面
│   ├── routes                 # 路由
│   ├── config.js              # 配置文件
│   └── index.js               # 入口文件  连接数据库、启动项目等
├── db                         # mongodb 数据库备份文件
├── .gitignore                 # 提交git时忽略掉一些的文件
├── package-lock.json          # 锁定依赖包的版本，确保再次下载时不会因为包版本不同而产生问题
└── package.json               # 项目描述文件，记录了当前项目信息，例如项目名称、版本、作者、GitHub地址、当前项目依赖
```