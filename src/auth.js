/**
 * Created by OXOYO on 2017/9/26.
 *
 * 鉴权
 */
import jsonwebtoken from 'jsonwebtoken'
import { cookieConfig } from './config'

export default {
  // 生成token
  sign: function (data) {
    let token = jsonwebtoken.sign(data, cookieConfig.keys.secret, { expiresIn: '1d' })
    return token
  },
  // token 验证
  verifyToken: async function (ctx, next) {
    // 支持多种方式传递token
    let key = cookieConfig.keys.token
    let token
    let decoded
    // 校验结果
    let verifyRes = {
      // 标识
      flag: false,
      // 数据
      data: {}
    }
    if (ctx.body && Object.prototype.hasOwnProperty.call(ctx.body, key)) {
      token = ctx.body[key]
    } else if (ctx.query && Object.prototype.hasOwnProperty.call(ctx.query, key)) {
      token = ctx.query[key]
    } else if (ctx.headers && Object.prototype.hasOwnProperty.call(ctx.headers, key)) {
      token = ctx.headers[key]
    } else {
      token = null
    }
    // 1.定义unless path
    // let unlessPath = []
    // 2.判断是否存在token
    if (token) {
      try {
        // 2.1.verify验证token
        decoded = jsonwebtoken.verify(token, cookieConfig.keys.secret)
        // 2.1.验证token是否过期
        if (decoded.exp * 1000 <= new Date()) {
          verifyRes = {
            flag: false,
            data: {
              status: 9999,
              msg: 'token过期！请重新登录！',
              data: {}
            }
          }
        } else {
          verifyRes = {
            flag: true,
            data: {}
          }
        }
      } catch (err) {
        verifyRes = {
          flag: false,
          data: {
            status: 9999,
            msg: 'token校验失败！请重新登录！',
            data: err
          }
        }
      }
    } else {
      verifyRes = {
        flag: false,
        data: {
          status: 9999,
          msg: 'token无效！请重新登录！',
          data: {}
        }
      }
    }
    // 判断校验结果，分别处理
    if (verifyRes.flag) {
      // token有效，传递给上下文
      ctx.state['userInfo'] = decoded
      await next()
      return
    } else {
      // token无效，直接返回
      await next()
      ctx.body = verifyRes.data
    }
  },
  // 用户鉴权：管理员
  verifyAdmin: async function (ctx, next) {
    // TODO 鉴权用户级别
    let userInfo = ctx.state.userInfo
    if (userInfo) {
      if (userInfo.type === 0) {
        await next()
        return
      } else {
        await next()
        ctx.body = {
          status: 9999,
          msg: '用户权限不足！请重新登录！',
          data: {}
        }
      }
    } else {
      await next()
      ctx.body = {
        status: 9999,
        msg: '用户信息无效！请重新登录！',
        data: {}
      }
    }
  }
}
