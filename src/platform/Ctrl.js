/**
 * Created by OXOYO on 2018/3/9.
 */

import axios from 'axios'
import Model from './Model'
import utils from '../utils'
import auth from '../auth'
import { cookieConfig, accountConfig } from '../config'

export default {
  user: {
    // 执行登录
    doSignIn: async (ctx, next) => {
      await next()
      let reqBody = ctx.request.body
      let res
      if (reqBody && reqBody.account && reqBody.password) {
        // 执行平台内用户查询
        // 加密密码
        let password = utils.des.encrypt(accountConfig.key, reqBody.password, 0)
        res = await Model.user.doSignIn({
          account: reqBody.account,
          password: password
        })
        let data = {
          userInfo: res
        }
        // 处理结果
        if (res) {
          let userInfo = {
            account: res.account,
            name: res.name,
            userId: res.id,
            type: res.type,
            status: res.status
          }
          let token = auth.sign(userInfo)

          if (token) {
            // 设置返回token
            data[cookieConfig.keys.token] = token
            res = {
              status: 200,
              msg: '登录成功！',
              data: data
            }
          } else {
            res = {
              status: 5000,
              msg: '登录失败，生成Token失败！',
              data: data
            }
          }
        } else {
          // 动态获取管理员
          let adminInfo = await Model.user.getOneAdmin()
          res = {
            status: 5000,
            msg: '登录失败！' + (adminInfo && adminInfo.account && adminInfo.name ? '请联系管理员 ' + adminInfo.name + ' (' + adminInfo.account + ')' : ''),
            data: data
          }
        }
      } else {
        res = {
          status: 5001,
          msg: '登录失败，上送参数有误！',
          data: {}
        }
      }
      ctx.body = res || {}
    },
    // 获取用户基本信息
    getBaseInfo: async (ctx, next) => {
      await next()
      // TODO 处理参数
      let userInfo = ctx.state.userInfo
      let res
      if (userInfo && userInfo.userId) {
        // 查询结果
        res = await Model.user.getBaseInfo(userInfo.userId)
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
    },
    // 获取用户的平台配置信息
    getPlatformConfigByUserId: async (ctx, next) => {
      await next()
      // 处理参数
      let reqQuery = ctx.query
      let res
      if (reqQuery && reqQuery.userId) {
        // 查询结果
        res = await Model.user.getPlatformConfigByUserId(reqQuery.userId)
        // 处理结果
        if (res) {
          res = {
            status: 200,
            msg: '查询成功！',
            data: res
          }
        } else {
          res = {
            status: 5000,
            msg: '查询失败！',
            data: res
          }
        }
      } else {
        res = {
          status: 5001,
          msg: '查询失败，上送参数有误！',
          data: {}
        }
      }

      ctx.body = res || {}
    },
    getApplicationListByUserId: async (ctx, next) => {
      await next()
      // 处理参数
      let reqQuery = ctx.query
      let userInfo = ctx.state.userInfo
      let res
      if (userInfo && userInfo.userId) {
        // 查询结果
        res = await Model.user.getApplicationListByUserId(reqQuery, userInfo)
        // 处理结果
        if (res) {
          res = {
            status: 200,
            msg: '获取用户应用列表成功！',
            data: {
              count: res.count,
              list: res.rows
            }
          }
        } else {
          res = {
            status: 5000,
            msg: '获取用户应用列表失败！',
            data: res
          }
        }
      } else {
        res = {
          status: 5001,
          msg: '获取用户应用列表失败，上送参数有误！',
          data: {}
        }
      }
      ctx.body = res || {}
    },
    doAppPinnedUpdate: async (ctx, next) => {
      await next()
      let reqBody = ctx.request.body
      let userInfo = ctx.state.userInfo
      let res
      if (userInfo && userInfo.userId) {
        // 1.先查找用户应用
        let appDetail = await Model.user.getApplicationDetailByUserId({
          user_id: userInfo.userId,
          app_id: reqBody['app_id']
        })
        // 2.处理config
        if (appDetail) {
          let appConfig = appDetail.config ? JSON.parse(appDetail.config) : { 'taskBar': {} }
          appConfig['taskBar']['isPinned'] = reqBody['isPinned']
          // 3.执行更新
          let timeNow = new Date()
          let data = {
            user_id: userInfo.userId,
            app_id: reqBody['app_id'],
            config: JSON.stringify(appConfig),
            update_time: timeNow
          }
          // 查询结果
          res = await Model.user.doAppPinnedUpdate(data)
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
    },
    doInstallApp: async (ctx, next) => {
      await next()
      let reqBody = ctx.request.body
      let userInfo = ctx.state.userInfo
      let res
      if (reqBody && userInfo && userInfo.userId) {
        // 1.查询是否已经安装过
        let isInstalled = await Model.user.getApplicationByUserId({
          app_id: reqBody['id'],
          user_id: userInfo['userId'],
          private: 0
        })
        if (isInstalled) {
          res = {
            status: 5000,
            msg: '该应用已安装，请勿重复安装！',
            data: {}
          }
        } else {
          // 2.1查找应用
          let appInfo = await Model.user.getApplicationByAppId({
            id: reqBody['id']
          })
          let timeNow = new Date()
          let installData = {
            user_id: userInfo.userId,
            app_id: appInfo.id,
            app_name: appInfo.name,
            app_title: appInfo.title,
            app_description: appInfo.description,
            app_type: appInfo.type,
            app_publish: appInfo.publish,
            app_category: appInfo.category,
            user_type: appInfo.user_type,
            status: 1,
            private: 0,
            config: appInfo.config,
            create_time: timeNow,
            update_time: timeNow
          }
          // 执行安装
          res = await Model.user.doInstallApp(installData)
          // 处理结果
          if (res) {
            res = {
              status: 200,
              msg: '安装成功！',
              data: res
            }
          } else {
            res = {
              status: 5000,
              msg: '安装失败！',
              data: res
            }
          }
        }
      } else {
        res = {
          status: 5001,
          msg: '安装失败，上送参数有误！',
          data: {}
        }
      }
      ctx.body = res || {}
    },
    doUninstallApp: async (ctx, next) => {
      await next()
      let reqBody = ctx.request.body
      let userInfo = ctx.state.userInfo
      let res
      if (reqBody && reqBody.user_id && parseInt(reqBody.user_id) === userInfo.userId) {
        let data = {
          id: reqBody['id'],
          user_id: reqBody['user_id'],
          app_id: reqBody['app_id']
        }
        // 查询该应用信息，判断是否支持卸载
        let appInfo = await Model.user.getApplicationByAppId({
          id: data['app_id']
        })
        if (appInfo) {
          // 0 默认应用 1 普通应用
          if (appInfo.type === 0) {
            res = {
              status: 5000,
              msg: '卸载失败！默认应用禁止卸载！',
              data: appInfo
            }
          } else {
            // 执行卸载
            res = await Model.user.doUninstallApp(data)
            // 处理结果
            if (res) {
              res = {
                status: 200,
                msg: '卸载成功！',
                data: res
              }
            } else {
              res = {
                status: 5000,
                msg: '卸载失败！',
                data: res
              }
            }
          }
        } else {
          res = {
            status: 5000,
            msg: '卸载失败！',
            data: res
          }
        }
      } else {
        res = {
          status: 5001,
          msg: '卸载失败，上送参数有误！',
          data: {}
        }
      }
      ctx.body = res || {}
    }
  },
  components: {
    getBingWallpaper: async (ctx, next) => {
      await next()
      let reqQuery = ctx.query
      let bingApi = 'http://cn.bing.com/HPImageArchive.aspx'
      let payload = {
        format: reqQuery.format || 'js',
        idx: reqQuery.idx || 0,
        n: reqQuery.n || 1
      }
      let res
      try {
        res = await axios.get(bingApi, {
          params: payload
        })
        res = {
          status: 200,
          msg: '获取bing壁纸成功！',
          data: res.data
        }
      } catch (err) {
        res = {
          status: 5000,
          msg: '获取bing壁纸失败',
          data: err
        }
      }
      ctx.body = res || {}
    }
  }
}
