# X-WebDesktop-Api-Koa

基于 Koa 的 WebDesktop Api 服务

前端：[X-WebDesktop-Vue](https://github.com/OXOYO/X-WebDesktop-Vue)

## Start

```bash
  git clone
  npm i
  npm run dev
```

## 导出数据库到schema

```bash
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
