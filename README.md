# X-WebDesktop-Api-Koa

基于 Koa 的 WebDesktop Api 服务

# Version

| FrontEnd | API |
| :-------- | :-------- |
| [3.x](https://github.com/OXOYO/X-WebDesktop-Vue/tree/master) | [3.x](https://github.com/OXOYO/X-WebDesktop-Api-Koa/tree/master) |
| [2.0.0](https://github.com/OXOYO/X-WebDesktop-Vue/tree/2.0.0) | [2.0.0](https://github.com/OXOYO/X-WebDesktop-Api-Koa/tree/2.0.0) |
| [1.0.1](https://github.com/OXOYO/X-WebDesktop-Vue/tree/1.0.1) | [1.0.1](https://github.com/OXOYO/X-WebDesktop-Api-Koa/tree/1.0.1) |
| [1.0.0](https://github.com/OXOYO/X-Desktop-Vue/tree/master) | - |

## Documentation

[中文文档 (2.0.0)](https://github.com/OXOYO/X-WebDesktop-Vue/blob/master/document/README.md)

## Start

```bash
  // 1.Clone repository;
  git clone

  // 2.Install packages;
  npm i

  // 3.Import the "./src/sql/x-webdesktop-v2.sql" file into the database;

  // 4.Start
  npm run dev
```

## Develop

```bash
  // Export the database to schema
  sequelize-auto -o "./src/schema" -d x-webdesktop-v2 -h localhost -u root -p 3306 -e mysql
```

## Build

```bash
  npm run build
```

## Production

```bash
  // 单纯pm2使用时
  pm2 start ecosystem.config.js --name x-webDesktop-api --env production
  // 配合alinode使用时
  ENABLE_NODE_LOG=YES pm2 start ecosystem.config.js --name x-webDesktop-api --env production
```

## Preview

  **Url**：[http://oxoyo.co/X-WebDesktop-Vue/](http://oxoyo.co/X-WebDesktop-Vue/)

  **Account**：`admin`

  **Password**：`123456`

## 目录结构
```bash
  \_ assets                   // 静态文件目录
  \_ build                    // 打包脚本
  \_ dist                     // 打包输出目录
  \_ logs                     // 日志输出目录
  \_ src                      // 源码
    \_ apps                   // 【应用】对应接口目录
      \_ AccountManagement    // 【账号管理】应用
        \_ Ctrl.js            // 控制器
        \_ Model.js           // 模型
        \_ Routers.js         // 路由
      \_ ApplicationMarket    // 【应用市场】应用
        \_ Ctrl.js            // 控制器
        \_ Model.js           // 模型
        \_ Routers.js         // 路由
      \_ MyApplication        // 【我的应用】应用
        \_ Ctrl.js            // 控制器
        \_ Model.js           // 模型
        \_ Routers.js         // 路由
      \_ PersonalCenter       // 【个人中心】应用
        \_ Ctrl.js            // 控制器
        \_ Model.js           // 模型
        \_ Routers.js         // 路由
    \_ middleware             // 中间件
    \_ schema                 // 数据库模型
    \_ platform               // 【平台】基础接口目录
      \_ Ctrl.js              // 控制器
      \_ Model.js             // 模型
      \_ Routers.js           // 路由
    \_ sql                    // 备份SQL文件
    \_ utils                  // 全局工具
    \_ api.js                 // 封装提供给前端的API
    \_ auth.js                // 鉴权
    \_ config.js              // 全局配置
    \_ db.js                  // 数据库实例
    \_ routers.js             // 封装应用路由表
  \_ ecosystem.config.js      // PM2配置
  \_ gulpfile.js              // gulp任务脚本
```
