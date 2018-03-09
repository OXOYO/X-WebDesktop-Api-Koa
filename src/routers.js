/**
 * Created by OXOYO on 2017/7/10.
 *
 * API 路由表
 */
// import auth from './auth'
// import { cookieConfig } from './config'

// FIXME 实现动态加载路由，apps的路由动态加载已完成
// TODO platform的路由动态加载
const requireDirectory = require('require-directory')
const routersObj = {}

// 解析apps路由
let apps = requireDirectory(module, './apps')
for (let key in apps) {
  let routers = apps[key]['Routers']
  routersObj[key] = routers.default
}
// 解析平台路由
// let platform = requireDirectory(module, './platform/Routers')
let platform = require('./platform/Routers')
routersObj['Platform'] = platform.default

export default routersObj
