/**
 * Created by OXOYO on 2017/7/12.
 */

import db from '../../db'

const appsModel = '../../schema/platform_apps'
const appsCategoryModel = '../../schema/platform_apps_category'
const userAppsModel = '../../schema/platform_user_apps'
const appsSchema = db.import(appsModel)
const appsCategorySchema = db.import(appsCategoryModel)
const userAppsSchema = db.import(userAppsModel)

export default {
  getCategoryList: async function (data, userInfo) {
    let options = {}
    // 拼装where条件
    let whereObj = {}
    if (data.hasOwnProperty('parent')) {
      whereObj['parent'] = data.parent
    }
    // 处理options
    if ((Object.keys(whereObj)).length) {
      options['where'] = whereObj
    }
    // 处理排序
    options['order'] = [
      ['id', 'ASC']
    ]
    // 打印日志
    options['logging'] = true
    return await appsCategorySchema.findAndCountAll(options)
  },
  // 应用列表
  getApplicationList: async function (data, userInfo) {
    let options = {}
    // 拼装where条件
    let whereObj = {}
    if (data.hasOwnProperty('filterType') && data.hasOwnProperty('keywords')) {
      whereObj[data.filterType] = {
        $like: '%' + data.keywords + '%'
      }
    }
    // 处理应用分类
    // FIXME category 1 为全部应用
    if (data.hasOwnProperty('category') && parseInt(data.category) !== 1) {
      whereObj['category'] = data.category
    }
    // 普通用户返回部分应用，管理员返回全部应用
    if (userInfo && userInfo.hasOwnProperty('type')) {
      if (userInfo.type) {
        // 用户类别为普通用户的
        whereObj['user_type'] = userInfo.type
        // 并且是已经发布的应用
        whereObj['publish'] = 1
      } else {
        // 处理应用类别，默认只查普通应用
        let typeInArr = data['type'] || [1]
        if (typeInArr.length) {
          whereObj['type'] = {
            $in: typeInArr
          }
        }
        // 处理用户级别
        let userTypeInArr = data['user_type'] || []
        if (userTypeInArr.length) {
          whereObj['user_type'] = {
            $in: userTypeInArr
          }
        }
        // 处理发布状态
        let publishInArr = data['publish'] || []
        if (publishInArr.length) {
          whereObj['publish'] = {
            $in: publishInArr
          }
        }
      }
    }
    // 处理options
    if ((Object.keys(whereObj)).length) {
      options['where'] = whereObj
    }
    // 处理排序
    options['order'] = [
      ['id', 'ASC']
    ]
    // 打印日志
    options['logging'] = true
    return await appsSchema.findAndCountAll(options)
  },
  // 编辑应用
  doEditApp: async function (data) {
    return await appsSchema.update(data, {
      where: {
        id: data.id
      },
      logging: true
    })
  },
  // 添加应用
  doAddApp: async function (data) {
    return await appsSchema.create(data, {
      logging: true
    })
  },
  // 更新应用
  doUpdateApp: async function (data) {
    return await appsSchema.update(data, {
      where: {
        id: data.id
      },
      logging: true
    })
  },
  // 卸载应用
  doRemoveApp: async function (data) {
    // 删除账号
    return await appsSchema.destroy({
      where: {
        id: data.id,
        user_id: data['user_id'],
        app_id: data['app_id']
      },
      logging: true
    })
  },
  // 安装应用
  doInstallApp: async function (data) {
    return await userAppsSchema.create(data, {
      logging: true
    })
  },
  getMaxAppId: async function () {
    return await appsSchema.max('id')
  },
  getApplicationByUserId: async function (data) {
    return await userAppsSchema.findOne({
      where: {
        app_id: data['app_id'],
        user_id: data['user_id']
      },
      logging: true
    })
  },
  getApplicationByAppId: async function (data) {
    return await appsSchema.findOne({
      where: {
        id: data['id']
      },
      logging: true
    })
  },
  getApplicationByAppName: async function (data) {
    return await appsSchema.findOne({
      where: {
        name: data['name']
      },
      logging: true
    })
  }
}
