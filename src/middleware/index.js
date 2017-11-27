/**
 * Created by OXOYO on 2017/7/10.
 *
 * 中间件处理函数
 */

import compose from 'koa-compose'
import convert from 'koa-convert'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import KoaStatic from 'koa-static'

import pipe from './pipe'
import { System as SystemConfig } from '../config'

// FIXME 如下中间件存在问题，会导致路由加载失败，待查。
export default function middleware (app) {
  return compose([
    logger(),
    helmet(),
    KoaStatic('.'),
    // 跨域处理
    convert(cors({
      origin: function (request) {
        let hostArr = [
          'localhost',
          '127.0.0.1'
        ]
        let host = request.header.origin
        let isIncludes = false
        // FIXME 安全起见，上线时需注掉如下判断
        if (!host) {
          return '*'
        }
        for (let i in hostArr) {
          if (host.includes(hostArr[i])) {
            isIncludes = true
            break
          }
        }
        if (isIncludes) {
          return host
        }
        return SystemConfig.host
      },
      exposeHeaders: [],
      maxAge: 5,
      credentials: true,
      // headers: ['Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'token'],
      methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS']
    })),
    convert(bodyParser({
      enableTypes: ['json', 'form'],
      strict: false,
      jsonLimit: '20mb',
      formLimit: '10mb',
      textLimit: '20mb'
    })),
    convert(session(app)),
    pipe()
  ])
}
