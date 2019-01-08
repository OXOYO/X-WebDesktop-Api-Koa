import Koa from 'koa'
import { System as SystemConfig } from './config'
import middleware from './middleware'
import utils from './utils'
import api from './api'

const app = new Koa()
const env = process.env.NODE_ENV || 'development' // Current mode

app.keys = [SystemConfig.sessionKey]

app.proxy = true

// 注册log
app.use(async (ctx, next) => {
  let startTime = new Date()
  let ms
  try {
    await next()
    ms = new Date() - startTime
    utils.log.response(ctx, ms)
  } catch (err) {
    ms = new Date() - startTime
    utils.log.error(ctx, err, ms)
  }
})

// 注册qs
require('koa-qs')(app)
// import KoaStatic from 'koa-static'
// app.use(KoaStatic('assets'))
// 注册路由
app.use(api())
// 注册中间件
app.use(middleware(app))

if (env === 'development') { // logger
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}

// token验证返回
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      // ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n'
      return
    } else {
      throw err
    }
  })
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

app.listen(SystemConfig.port, function () {
  console.log('x-webdesktop-api is listening to http://localhost:' + SystemConfig.port)
})

export default app
