/**
 * Created by OXOYO on 2017/7/19.
 */
import Model from '../models/WebDesktop'

export default {
  getApplicationListByUserId: async (ctx, next) => {
    await next()
    // TODO 处理参数
    // let reqQuery = ctx.query
    let userInfo = ctx.userInfo
    let res
    if (userInfo && userInfo.userId) {
      // 查询结果
      res = await Model.getApplicationListByUserId(userInfo.userId)
      // 处理结果
      if (res) {
        res = {
          status: 200,
          msg: '获取应用列表成功！',
          data: {
            count: res.count,
            list: res.rows
          }
        }
      } else {
        res = {
          status: 5000,
          msg: '获取应用列表失败！',
          data: res
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '获取应用列表失败，上送参数有误！',
        data: {}
      }
    }
    ctx.body = res || {}
  },
  doAppPinnedUpdate: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let userInfo = ctx.userInfo
    let res
    if (userInfo && userInfo.userId) {
      // 1.先查找用户应用
      let appDetail = await Model.getApplicationDetailByUserId({
        user_id: userInfo.userId,
        app_id: reqBody['appId']
      })
      // 2.处理config
      if (appDetail) {
        let appConfig = appDetail.config ? JSON.parse(appDetail.config) : { 'taskBar': {} }
        appConfig['taskBar']['isPinned'] = reqBody['isPinned']
        // 3.执行更新
        let timeNow = new Date()
        let data = {
          user_id: userInfo.userId,
          app_id: reqBody['appId'],
          config: JSON.stringify(appConfig),
          update_time: timeNow
        }
        // 查询结果
        res = await Model.doAppPinnedUpdate(data)
        // 处理结果
        if (res) {
          res = {
            status: 200,
            msg: reqBody['isPinned'] ? '锁定成功！' : '解锁成功！',
            data: res
          }
        } else {
          res = {
            status: 5000,
            msg: reqBody['isPinned'] ? '锁定失败！' : '解锁失败！',
            data: res
          }
        }
      } else {
        res = {
          status: 5000,
          msg: reqBody['isPinned'] ? '锁定失败！' : '解锁失败！',
          data: appDetail
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '更新失败，上送参数有误！',
        data: {}
      }
    }

    ctx.body = res || {}
  }
}
