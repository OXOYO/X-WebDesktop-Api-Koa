/**
 * Created by OXOYO on 2017/7/13.
 *
 * 平台配置信息模型
 */

import db from '../../db'

const Model = '../../schema/platform_config'
const Schema = db.import(Model)

const usersModel = '../../schema/platform_users'
const usersSchema = db.import(usersModel)

export default {
  config: {
    // 用户平台配置信息
    getPlatformConfigByUserId: async function (userId) {
      return await Schema.findOne({
        where: {
          user_id: userId
        },
        logging: true
      })
    }
  },
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
    // 获取管理员信息
    getOneAdmin: async function () {
      return await usersSchema.findOne({
        where: {
          type: 0
        },
        logging: true
      })
    }
  }
}
