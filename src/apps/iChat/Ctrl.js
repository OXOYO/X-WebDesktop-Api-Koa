/**
 * Created by OXOYO on 2017/10/9.
 */

// import Model from './Model'
import axios from 'axios'

export default {
  doSendMessage: async (ctx, next) => {
    await next()
    // TODO 处理参数
    let reqBody = ctx.request.body
    // 查询结果
    let res
    try {
      res = await axios.post('http://openapi.tuling123.com/openapi/api/v2', reqBody)
      res = {
        status: 200,
        msg: '发送消息成功！',
        data: res.data
      }
    } catch (err) {
      res = {
        status: 5000,
        msg: '发送消息失败',
        data: err
      }
    }
    ctx.body = res || {}
  }
}
