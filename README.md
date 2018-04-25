# X-WebDesktop-Api-Koa

Version: 2.0.0 【开发中...】

基于 Koa 的 WebDesktop Api 服务

前端：[X-Desktop-Vue 2.0.0](https://github.com/OXOYO/X-WebDesktop-Vue/tree/master)

## Start

```bash
  // 1.Clone repository;
  git clone

  // 2.Install packages;
  npm i

  // 3.Import the "./src/sql/x-webdesktop.sql" file into the database;

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
  pm2 start ecosystem.config.js
```
