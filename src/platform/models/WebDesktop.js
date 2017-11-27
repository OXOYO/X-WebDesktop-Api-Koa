/**
 * Created by OXOYO on 2017/7/19.
 */

import db from '../../db'

const userAppsModel = '../../schema/platform_user_apps'
// const appsModel = '../../schema/platform_apps'
const userAppsSchema = db.import(userAppsModel)
// const appsSchema = db.import(appsModel)

// const include = [
//   {
//     association: userAppsSchema.belongsTo(appsSchema, {foreignKey: 'app_id', as: 'appDetail'})
//   }
// ]

export default {
  // 应用列表
  getApplicationListByUserId: async function (userId) {
    return await userAppsSchema.findAndCountAll({
      where: {
        user_id: userId,
        status: 1
      },
      order: [
        ['id', 'ASC']
      ],
      logging: true
    })
  },
  // 获取用户应用详情
  getApplicationDetailByUserId: async function (data) {
    return await userAppsSchema.findOne({
      where: {
        user_id: data['user_id'],
        app_id: data['app_id']
      },
      logging: true
    })
  },
  // 更新用户应用锁定
  doAppPinnedUpdate: async function (data) {
    return await userAppsSchema.update(data, {
      where: {
        user_id: data['user_id'],
        app_id: data['app_id']
      },
      logging: true
    })
  }
}
