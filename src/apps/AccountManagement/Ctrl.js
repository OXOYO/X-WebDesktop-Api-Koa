/**
 * Created by OXOYO on 2017/7/11.
 *
 * 账号控制器
 */

import Model from './Model'
import utils from '../../utils'
import { accountConfig } from '../../config'

export default {
  // 获取账号列表
  getAccountList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    // 查询结果
    let res = await Model.getAccountList(reqQuery)
    // 处理结果
    if (res) {
      res = {
        status: 200,
        msg: '查询账号列表成功！',
        data: {
          count: res.length,
          list: res
        }
      }
    } else {
      res = {
        status: 5000,
        msg: '查询账号列表失败！',
        data: {}
      }
    }

    ctx.body = res || {}
  },
  // 添加账号
  doAddAccount: async (ctx, next) => {
    await next()
    // 查询结果
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = {
      ...reqBody,
      create_time: timeNow,
      update_time: timeNow
    }
    let res
    if (data && data.account && data.name) {
      // FIXME 初始化用户密码为 123456 并加密密码
      let password = utils.des.encrypt(accountConfig.key, '123456', 0)
      // FIXME 需改成事务
      res = await Model.doAddAccount({
        ...data,
        password
      })
      // 最后一项为插入成功与否标识
      let [resAccount] = res
      let isSuccess = res.pop()
      // 处理结果
      if (isSuccess) {
        // 获取要添加的应用信息
        let apps = await Model.getAppsInIds({
          ids: reqBody['apps']
        })
        // 更新用户应用
        if (apps && apps.count && apps.rows) {
          // 处理数据
          let appList = apps.rows
          let userAppList = []
          for (let item of appList) {
            userAppList.push({
              user_id: resAccount.id,
              app_id: item.id,
              app_name: item.name,
              app_title: item.title,
              app_description: item.description,
              app_type: item.type,
              user_type: item.user_type,
              app_publish: item.publish,
              config: item.config,
              status: 1,
              private: 0,
              create_time: timeNow,
              update_time: timeNow
            })
          }
          // 批量处理
          let userApps = await Model.doAddUserApps(userAppList)
          if (userApps) {
            // 添加用户配置信息
            let userConfigRes = await Model.doAddUserConfig({
              user_id: resAccount.id,
              config: '{"themes":{"name":"webDesktop","config":{}}}',
              create_time: timeNow,
              update_time: timeNow
            })
            if (userConfigRes) {
              res = {
                status: 200,
                msg: '添加账号成功！初始化应用成功！添加平台配置成功！',
                data: resAccount
              }
            } else {
              res = {
                status: 200,
                msg: '添加账号成功！初始化应用成功！添加平台配置失败！',
                data: resAccount
              }
            }
          } else {
            res = {
              status: 5000,
              msg: '添加账号成功！初始化应用失败！',
              data: resAccount
            }
          }
        } else {
          res = {
            status: 5000,
            msg: '添加账号成功！获取应用信息失败！',
            data: resAccount
          }
        }
      } else if (resAccount) {
        res = {
          status: 5000,
          msg: '添加账号失败，该账号已存在！',
          data: resAccount
        }
      } else {
        res = {
          status: 5000,
          msg: '添加账号失败！',
          data: {}
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '添加账号失败，上送参数有误！',
        data: {}
      }
    }

    ctx.body = res || {}
  },
  // 删除账号
  doDelUserAccount: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let data = reqBody
    let res
    if ((Object.keys(data)).length) {
      res = await Model.doDelUserAccount(data)
      // 处理结果
      if (res) {
        res = {
          status: 200,
          msg: '删除账号成功！',
          data: res
        }
      } else {
        res = {
          status: 5000,
          msg: '删除账号失败！',
          data: {}
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '删除账号失败，上送参数有误！',
        data: {}
      }
    }

    ctx.body = res || {}
  },
  // 编辑账号
  doEditAccount: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = {
      ...reqBody,
      update_time: timeNow
    }
    let res
    if (data && data.account && data.name) {
      res = await Model.doEditAccount(data)
      // 处理结果
      if (res && res[0]) {
        try {
          // 1.获取用户已添加的应用
          let userApps = await Model.getUserApps({
            user_id: reqBody['id']
          })
          let oldList = []
          if (userApps && userApps.count && userApps.rows) {
            for (let item of userApps.rows) {
              oldList.push(item['app_id'])
            }
          }
          // 2.获取用户新的应用列表
          let newList = reqBody['apps']
          // 3.比对userApps && newUserApps 找出变更项
          let addList = []
          let removeList = []
          for (let appId of oldList) {
            if (!newList.includes(appId)) {
              removeList.push(appId)
            }
          }
          for (let appId of newList) {
            if (!oldList.includes(appId)) {
              addList.push(appId)
            }
          }
          // 4.删除要移除的应用
          if (removeList && removeList.length) {
            await Model.doRemoveUserApps({
              user_id: reqBody['id'],
              appIds: removeList
            })
          }
          // 5.添加要新增的应用
          if (addList && addList.length) {
            // 更新用户应用
            let apps = await Model.getAppsInIds({
              ids: addList
            })
            if (apps && apps.count && apps.rows) {
              // 处理数据
              let appList = apps.rows
              let userAppList = []
              for (let item of appList) {
                userAppList.push({
                  user_id: reqBody['id'],
                  app_id: item.id,
                  app_name: item.name,
                  app_title: item.title,
                  app_description: item.description,
                  app_type: item.type,
                  user_type: item.user_type,
                  app_publish: item.publish,
                  config: item.config,
                  status: 1,
                  private: 0,
                  create_time: timeNow,
                  update_time: timeNow
                })
              }
              // 批量场景
              await Model.doAddUserApps(userAppList)
            }
          }
          res = {
            status: 200,
            msg: '编辑账号成功！',
            data: res
          }
        } catch (err) {
          res = {
            status: 200,
            msg: '编辑账号成功！更新用户应用失败！',
            data: err
          }
        }
      } else {
        res = {
          status: 5000,
          msg: '编辑账号失败！',
          data: res
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '编辑账号失败，上送参数有误！',
        data: {}
      }
    }

    ctx.body = res || {}
  },
  // 获取所有的应用
  getAllApps: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    let res
    if (reqQuery && reqQuery.hasOwnProperty('user_type')) {
      // 查询结果
      res = await Model.getAllApps({
        user_type: parseInt(reqQuery['user_type']),
        // 只查询已发布的应用
        publish: 1
      })
      // 处理结果
      if (res) {
        res = {
          status: 200,
          msg: '查询应用列表成功！',
          data: {
            count: res.count,
            list: res.rows
          }
        }
      } else {
        res = {
          status: 5000,
          msg: '查询应用列表失败！',
          data: res
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '查询应用列表失败，上送参数有误！',
        data: {}
      }
    }

    ctx.body = res || {}
  }
}
