/**
 * Created by OXOYO on 2017/10/9.
 */

import Model from './Model'

export default {
  getBaseInfo: async (ctx, next) => {
    await next()
    // TODO 处理参数
    let reqQuery = ctx.query
    let res
    if (reqQuery && reqQuery.userId) {
      // 查询结果
      res = await Model.getBaseInfo(reqQuery.userId)
      // 处理结果
      if (res) {
        res = {
          status: 200,
          msg: '获取用户基本信息成功！',
          data: res
        }
      } else {
        res = {
          status: 5000,
          msg: '获取用户基本信息失败！',
          data: res
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '获取用户基本信息失败，上送参数有误！',
        data: {}
      }
    }
    ctx.body = res || {}
  }
}
