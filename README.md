# X-WebDesktop-Api-Koa

基于 Koa 的 WebDesktop Api 服务

前端：[X-WebDesktop-Vue](https://github.com/OXOYO/X-WebDesktop-Vue)

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
  sequelize-auto -o "./src/schema" -d x-webdesktop -h localhost -u root -p 3306 -e mysql
```

## Build

```bash
  npm run build
```

## Production

```bash
  pm2 start ecosystem.config.js
```
