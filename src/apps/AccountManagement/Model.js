/**
 * Created by OXOYO on 2017/7/11.
 *
 * 账号模型
 */

import db from '../../db'

const usersModel = '../../schema/platform_users'
const appsModel = '../../schema/platform_apps'
const userAppsModel = '../../schema/platform_user_apps'
const configModel = '../../schema/platform_config'
const usersSchema = db.import(usersModel)
const appsSchema = db.import(appsModel)
const userAppsSchema = db.import(userAppsModel)
const configSchema = db.import(configModel)

const include = [
  {
    association: usersSchema.hasMany(userAppsSchema, {foreignKey: 'user_id', targetKey: 'id', as: 'apps'})
  }
]

export default {
  // 获取账号列表
  getAccountList: async function (data) {
    let options = {}
    // 处理分页
    let pageSize = data.pageSize || 10
    let currentPage = data.currentPage || 1
    options['limit'] = parseInt(pageSize)
    options['offset'] = parseInt((currentPage - 1) * pageSize)
    // 拼装where条件
    let whereObj = {}
    // 处理关键词过滤
    let filterType = data.filterType || null
    if (filterType && data.keywords) {
      // 模糊匹配
      whereObj[filterType] = {
        $like: '%' + data.keywords + '%'
      }
    }
    // 处理状态过滤
    let statusInArr = data.userStatus || []
    if (statusInArr.length) {
      whereObj['status'] = {
        $in: statusInArr
      }
    }
    // 处理用户级别
    let typeInArr = data.userType || []
    if (typeInArr.length) {
      whereObj['type'] = {
        $in: typeInArr
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
    // 处理关联关系
    options['include'] = include
    // 打印日志
    options['logging'] = true
    return await usersSchema.findAll(options)
  },
  // 添加账号
  doAddAccount: async function (data) {
    return await usersSchema.findOrCreate({
      where: {
        account: data.account
      },
      defaults: data,
      logging: true
    })
  },
  doDelUserAccount: async function (data) {
    // 删除账号
    return await usersSchema.destroy({
      where: {
        id: Object.values(data)
      },
      logging: true
    })
  },
  // 更新账号
  doEditAccount: async function (data) {
    return await usersSchema.update(data, {
      where: {
        id: data.id
      },
      logging: true
    })
  },
  // 获取所有的应用
  getAllApps: async function (data) {
    let whereObj = {
      publish: data['publish']
    }
    if (data['user_type'] === 1) {
      whereObj['user_type'] = data['user_type']
    }
    return await appsSchema.findAndCountAll({
      where: whereObj,
      order: [
        ['id', 'ASC']
      ],
      logging: true
    })
  },
  // 获取用户的应用
  getUserApps: async function (data) {
    return await userAppsSchema.findAndCountAll({
      where: {
        user_id: data['user_id'],
        status: 1
      },
      order: [
        ['id', 'ASC']
      ],
      logging: true
    })
  },
  // 获取指定id的应用列表
  getAppsInIds: async function (data) {
    let whereObj = {}
    let idInArr = data.ids || []
    if (idInArr.length) {
      whereObj['id'] = {
        $in: idInArr
      }
    }
    return await appsSchema.findAndCountAll({
      where: whereObj,
      order: [
        ['id', 'ASC']
      ],
      logging: true
    })
  },
  // 添加用户app
  doAddUserApps: async function (data) {
    return await userAppsSchema.bulkCreate(data, {
      logging: true
    })
  },
  // 删除该用户下的app
  doRemoveUserApps: async function (data) {
    return await userAppsSchema.destroy({
      where: {
        user_id: data['user_id'],
        app_id: {
          $in: data['appIds']
        }
      },
      logging: true
    })
  },
  doAddUserConfig: async function (data) {
    return await configSchema.create(data, {
      logging: true
    })
  }
}
