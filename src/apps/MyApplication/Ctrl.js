/**
 * Created by OXOYO on 2017/7/12.
 */

import Model from './Model'
import { uploadConfig } from '../../config'
const path = require('path')
const multer = require('koa-multer')

export default {
  getApplicationList: async (ctx, next) => {
    await next()
    // TODO 处理参数
    let reqQuery = ctx.query
    let userInfo = ctx.state.userInfo
    let res
    if (reqQuery && userInfo.userId) {
      // 查询结果
      res = await Model.getApplicationList({
        ...reqQuery,
        userId: userInfo.userId
      })
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
    } else {
      res = {
        status: 5001,
        msg: '查询失败，上送参数有误！',
        data: {}
      }
    }
    ctx.body = res || {}
  },
  doEditApp: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let userInfo = ctx.state.userInfo
    let res
    if (reqBody && reqBody['user_id'] && parseInt(reqBody['user_id']) === userInfo.userId) {
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
    let userInfo = ctx.state.userInfo
    let res
    if (reqBody && userInfo.userId) {
      let timeNow = new Date()
      let data = {
        ...reqBody,
        'user_id': userInfo.userId,
        create_time: timeNow,
        update_time: timeNow
      }
      // 1.查找app_id
      let maxAppId = await Model.getMaxAppId()
      data['app_id'] = maxAppId + 1000
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
    } else {
      res = {
        status: 5001,
        msg: '添加应用失败，上送参数有误！',
        data: {}
      }
    }
    ctx.body = res || {}
  },
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
