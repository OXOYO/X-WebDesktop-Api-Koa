/**
 * Created by OXOYO on 2017/7/10.
 */

import compose from 'koa-compose'
import Router from 'koa-router'

// 导入配置信息
import { Api as ApiConfig } from './config'
// 导入路由表
import routers from './routers'
// TODO 鉴权、TOKEN
export default function api () {
  let prefix = [ApiConfig.prefix, ApiConfig.version].join('/')
  let router = new Router({prefix: prefix})
  Object.keys(routers).forEach(name => routers[name](router))
  return compose([
    router.routes(),
    router.allowedMethods({
      throw: true
    })
  ])
}
