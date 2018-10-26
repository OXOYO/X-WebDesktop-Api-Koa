/**
 * Created by OXOYO on 2017/7/12.
 */

import Model from './Model'
import { uploadConfig } from '../../config'
const path = require('path')
const multer = require('koa-multer')

export default {
  getCategoryList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    let res
    // 查询结果
    res = await Model.getCategoryList(reqQuery)
    // 处理结果
    if (res) {
      res = {
        status: 200,
        msg: '查询应用分类列表成功！',
        data: {
          count: res.count,
          list: res.rows
        }
      }
    } else {
      res = {
        status: 5000,
        msg: '查询失败！',
        data: res
      }
    }
    ctx.body = res || {}
  },
  getApplicationList: async (ctx, next) => {
    await next()
    // TODO 处理参数
    let reqQuery = ctx.query
    let userInfo = ctx.state.userInfo
    let res
    // 查询结果
    res = await Model.getApplicationList(reqQuery, userInfo)
    // 处理结果
    if (res) {
      res = {
        status: 200,
        msg: '查询成功！',
        data: {
          count: res.count,
          list: res.rows
        }
      }
    } else {
      res = {
        status: 5000,
        msg: '查询失败！',
        data: res
      }
    }
    ctx.body = res || {}
  },
  doEditApp: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let res
    if (reqBody) {
      let timeNow = new Date()
      let data = {
        ...reqBody,
        update_time: timeNow
      }
      // 查询结果
      res = await Model.doEditApp(data)
      // 处理结果
      if (res && res[0]) {
        res = {
          status: 200,
          msg: '编辑应用成功！',
          data: res
        }
      } else {
        res = {
          status: 5000,
          msg: '编辑应用失败',
          data: res
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '编辑应用失败，上送参数有误！',
        data: {}
      }
    }
    ctx.body = res || {}
  },
  doAddApp: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let res
    if (reqBody) {
      let timeNow = new Date()
      let data = {
        ...reqBody,
        create_time: timeNow,
        update_time: timeNow
      }
      // 1.查找是否存在重名app
      let hasSameApp = await Model.getApplicationByAppName({
        name: reqBody['name']
      })
      if (hasSameApp) {
        res = {
          status: 5000,
          msg: '添加应用失败，存在同名应用，请修改应用名称！',
          data: {}
        }
      } else {
        // 2.查找app_id
        let maxAppId = await Model.getMaxAppId()
        data['app_id'] = maxAppId + 1
        // 查询结果
        res = await Model.doAddApp(data)
        // 处理结果
        if (res) {
          res = {
            status: 200,
            msg: '添加应用成功！',
            data: res
          }
        } else {
          res = {
            status: 5000,
            msg: '添加应用失败',
            data: res
          }
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '添加应用失败，上送参数有误！',
        data: {}
      }
    }
    ctx.body = res || {}
  },
  // FIXME 废弃
  doUpdateApp: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let userInfo = ctx.state.userInfo
    let res
    if (reqBody && reqBody.userId && parseInt(reqBody.userId) === userInfo.userId) {
      let timeNow = new Date()
      let data = {
        id: reqBody['id'],
        user_id: reqBody['userId'],
        app_id: reqBody['appId'],
        status: reqBody['status'],
        update_time: timeNow
      }
      // 查询结果
      res = await Model.doUpdateApp(data)
      // 处理结果
      if (res) {
        res = {
          status: 200,
          msg: reqBody['status'] === 1 ? '启用成功！' : '停用成功！',
          data: res
        }
      } else {
        res = {
          status: 5000,
          msg: reqBody['status'] === 1 ? '启用失败！' : '停用失败！',
          data: res
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
  // FIXME 废弃
  doRemoveApp: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let userInfo = ctx.state.userInfo
    let res
    if (reqBody && reqBody.userId && parseInt(reqBody.userId) === userInfo.userId) {
      let data = {
        id: reqBody['id'],
        user_id: reqBody['userId'],
        app_id: reqBody['appId']
      }
      // 查询结果
      res = await Model.doRemoveApp(data)
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
    } else {
      res = {
        status: 5001,
        msg: '卸载失败，上送参数有误！',
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
      let isInstalled = await Model.getApplicationByUserId({
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
        let appInfo = await Model.getApplicationByAppId({
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
          user_type: appInfo.user_type,
          status: 1,
          private: 0,
          config: appInfo.config,
          create_time: timeNow,
          update_time: timeNow
        }
        // 执行安装
        res = await Model.doInstallApp(installData)
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
  // 上传图标
  doUploadIcon: async (ctx, next) => {
    await next()
    let uploadDir = uploadConfig.uploadDir || 'assets/uploads/'
    // 配置
    let storage = multer.diskStorage({
      // 文件保存路径
      destination: (req, file, cb) => {
        cb(null, path.resolve(uploadDir))
      },
      // 文件重命名
      filename: (req, file, cb) => {
        let originalnameArr = file.originalname.split('.')
        let postfix = originalnameArr[originalnameArr.length - 1]
        let timeNow = Date.now()
        cb(null, timeNow + '.' + postfix)
      }
    })
    // 上传实例
    let upload = multer({
      storage: storage
    })
    // 执行单文件上传
    let handle = await upload.single('file')
    let response = await handle(ctx)
    let res
    if (response) {
      res = {
        status: 200,
        msg: '上传成功！',
        data: {
          file: response.req.file,
          filename: response.req.file.filename,
          url: uploadConfig.host + uploadDir + response.req.file.filename
        }
      }
    } else {
      res = {
        status: 5000,
        msg: '上传失败！',
        data: response
      }
    }
    ctx.body = res || {}
  }
}
