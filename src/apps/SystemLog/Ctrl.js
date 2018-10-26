/**
 * Created by OXOYO on 2018/4/25.
 */

import Model from './Model'

export default {
  getLogList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    // 查询结果
    let res = await Model.getLogList(reqQuery, ctx)
    // 处理结果
    if (res && res.statusText === 'success') {
      res = {
        status: 200,
        msg: res.msg || '查询日志列表成功！',
        data: res
      }
    } else {
      res = {
        status: 5000,
        msg: res.msg || '查询日志列表失败！',
        data: res
      }
    }

    ctx.body = res || {}
  }
}
