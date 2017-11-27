/**
 * Created by OXOYO on 2017/7/12.
 */

// import Sequelize from 'sequelize'
import db from '../../db'

const userAppsModel = '../../schema/platform_user_apps'
const appsModel = '../../schema/platform_apps'
const userAppsSchema = db.import(userAppsModel)
const appsSchema = db.import(appsModel)

export default {
  // 应用列表
  getApplicationList: async function (data) {
    let options = {}
    // 拼装where条件
    let whereObj = {}
    // 处理状态过滤
    let statusInArr = data.appStatus || []
    if (statusInArr.length) {
      whereObj['status'] = {
        $in: statusInArr
      }
    }
    // 处理用户id
    if (data.userId) {
      whereObj['user_id'] = data.userId
    }
    // 处理关键字
    if (data.filterType && data.keywords) {
      whereObj[data.filterType] = {
        $like: '%' + data.keywords + '%'
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
    return await userAppsSchema.findAndCountAll(options)
  },
  // 编辑应用
  doEditApp: async function (data) {
    return await userAppsSchema.update(data, {
      where: {
        id: data.id
      },
      logging: true
    })
  },
  // 添加应用
  doAddApp: async function (data) {
    return await userAppsSchema.create(data, {
      logging: true
    })
  },
  // 更新应用
  doUpdateApp: async function (data) {
    return await userAppsSchema.update(data, {
      where: {
        id: data.id
      },
      logging: true
    })
  },
  // 卸载应用
  doRemoveApp: async function (data) {
    // 删除账号
    return await userAppsSchema.destroy({
      where: {
        id: data.id,
        user_id: data['user_id'],
        app_id: data['app_id']
      },
      logging: true
    })
  },
  getMaxAppId: async function () {
    return await appsSchema.max('id')
  }
}
