/**
 * Created by OXOYO on 2017/7/11.
 *
 * resCode [Number]
 * 200 成功
 * 400 用户级别错误
 * 500 服务器级别错误
 * 511 校验级别错误
 */

export default function pipe () {
  let spellRespone = function (code, msg, body) {
    // mongod validation failed callback
    msg.indexOf('validation failed') !== -1
      ? msg = '数据格式非法'
      : msg

    // callback
    return {
      code,
      msg,
      data: body
    }
  }

  return async (ctx, next) => {
    try {
      await next()
      const status = ctx.status || 404
      if (status === 404) {
        ctx.throw(400)
      }
      if (ctx.body) {
        ctx.body = spellRespone(status, ctx.message, ctx.body)
      }
    } catch (err) {
      const status = err.status || 400
      if (status === 400) {
        ctx.body = spellRespone(status, err.message)
      } else {
        ctx.app.emit('error', err, ctx)
      }
    }
  }
}
