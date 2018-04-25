/**
 * Created by OXOYO on 2018/3/9.
 */

import db from '../db'

const configModel = '../schema/platform_config'
const configSchema = db.import(configModel)

const usersModel = '../schema/platform_users'
const usersSchema = db.import(usersModel)

const userAppsModel = '../schema/platform_user_apps'
const userAppsSchema = db.import(userAppsModel)

const appsModel = '../schema/platform_apps'
const appsSchema = db.import(appsModel)

export default {
  user: {
    // 系统登录
    doSignIn: async function (data) {
      return await usersSchema.findOne({
        where: {
          account: data.account,
          password: data.password
        },
        logging: true
      })
    },
    // 获取用户基本信息
    getBaseInfo: async function (userId) {
      return await usersSchema.findOne({
        where: {
          id: userId
        },
        logging: true
      })
    },
    // 用户平台配置信息
    getPlatformConfigByUserId: async function (userId) {
      return await configSchema.findOne({
        where: {
          user_id: userId
        },
        logging: true
      })
    },
    // 获取管理员信息
    getOneAdmin: async function () {
      return await usersSchema.findOne({
        where: {
          type: 0
        },
        logging: true
      })
    },
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
    // 安装应用
    doInstallApp: async function (data) {
      return await userAppsSchema.create(data, {
        logging: true
      })
    },
    // 卸载应用
    doUninstallApp: async function (data) {
      return await userAppsSchema.destroy({
        where: {
          id: data['id'],
          user_id: data['user_id'],
          app_id: data['app_id']
        },
        logging: true
      })
    }
  }
}
