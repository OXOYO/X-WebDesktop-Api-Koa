/**
 * Created by OXOYO on 2018/4/25.
 */

const readline = require('readline')
const fs = require('fs')

export default {
  getLogList: async (data, ctx) => {
    // 1.读取指定日期的文件
    let fileName = data.logType + '-' + data.date + '.log'
    let filePath = './logs/' + fileName
    let fileStream
    let reg = {
      error: {
        blockStart: /^\[\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*\]\s\[ERROR\]\serror\s-$/,
        blockCreateTimeStr: /^\[\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*\]/,
        blockCreateTime: /\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*/,
        start: /^\*+\sERROR\sSTART\s\*+$/,
        end: /^\*+\sERROR\sEND\s\*+$/
      },
      result: {
        blockStart: /^\[\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*\]\s\[INFO\]\sresult\s-$/,
        blockCreateTimeStr: /^\[\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*\]/,
        blockCreateTime: /\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*/,
        start: /^\*+\sRESPONSE\sSTART\s\*+$/,
        end: /^\*+\sRESPONSE\sEND\s\*+$/
      },
      common: {
        userInfo: /^request userInfo:/,
        method: /^request method:/,
        origin: /^request originalUrl:/,
        client_ip: /^request client ip:/,
        requestQuery: /^request query:/,
        requestBody: /^request body:/,
        responseTime: /^response time:/,
        responseStatus: /^response status:/,
        responseBody: /^response body:/,
        errName: /^err name:/,
        errMessage: /^err message:/,
        errStack: /^err stack:/
      }
    }
    // 判断文件是否存在
    try {
      fs.statSync(filePath)
      fileStream = fs.createReadStream(filePath)
    } catch (e) {
      return {
        msg: '读取日志文件失败，日志文件不存在！',
        statusText: 'error',
        list: []
      }
    }
    let wait = function () {
      return new Promise((resolve, reject) => {
        let logMap = {}
        let lineList = []
        try {
          let rl = readline.createInterface({
            input: fileStream
          })
          rl.on('line', (line) => {
            lineList.push(line.trim())
          })
          rl.on('close', function () {
            if (lineList.length) {
              let blockFlag = false
              let blockCreateTime = null
              let requestBodyFlag = false
              let responseBodyFlag = false
              let commonKeys = Object.keys(reg.common)
              let commonKeysLen = commonKeys.length
              for (let i = 0, len = lineList.length, line; i < len; i++) {
                line = lineList[i]
                // 处理日志块起始
                if (reg[data.logType].blockStart.test(line)) {
                  let matchRes = line.match(reg[data.logType].blockCreateTimeStr)
                  let createTime
                  if (matchRes && matchRes[0]) {
                    createTime = matchRes[0].match(reg[data.logType].blockCreateTime)[0]
                    let random = Math.floor(Math.random(0, 1) * 10000)
                    blockCreateTime = createTime + '_' + random
                  }
                  if (createTime && blockCreateTime && !logMap[blockCreateTime]) {
                    // 初始化
                    logMap[blockCreateTime] = {
                      create_at: createTime
                    }
                    continue
                  }
                }
                if (!logMap[blockCreateTime]) {
                  continue
                }
                // 处理flag
                if (reg[data.logType].start.test(line)) {
                  blockFlag = true
                  requestBodyFlag = false
                  responseBodyFlag = false
                  continue
                }
                if (reg.common.responseTime.test(line)) {
                  requestBodyFlag = false
                }
                if (reg[data.logType].end.test(line)) {
                  // 处理requestBody、responseBody
                  ['requestBody', 'responseBody'].map(key => {
                    if (logMap[blockCreateTime][key]) {
                      let bodyStr = logMap[blockCreateTime][key].join('')
                      let bodyObj = {}
                      if (bodyStr) {
                        try {
                          bodyObj = JSON.parse(bodyStr)
                        } catch (e) {
                          bodyObj = bodyStr
                        }
                      }
                      logMap[blockCreateTime][key] = bodyObj
                    }
                  })
                  blockFlag = false
                  blockCreateTime = null
                  requestBodyFlag = false
                  responseBodyFlag = false
                  continue
                }
                if (blockCreateTime && blockFlag) {
                  if (!requestBodyFlag) {
                    for (let j = 0, key; j < commonKeysLen; j++) {
                      key = commonKeys[j]
                      if (['requestBody'].includes(key) && reg.common[key].test(line)) {
                        requestBodyFlag = key
                        break
                      } else {
                        requestBodyFlag = false
                      }
                    }
                  }
                  if (!responseBodyFlag) {
                    for (let j = 0, key; j < commonKeysLen; j++) {
                      key = commonKeys[j]
                      if (['errStack', 'responseBody'].includes(key) && reg.common[key].test(line)) {
                        responseBodyFlag = key
                        break
                      } else {
                        responseBodyFlag = false
                      }
                    }
                  }
                  if (requestBodyFlag) {
                    if (!logMap[blockCreateTime][requestBodyFlag]) {
                      logMap[blockCreateTime][requestBodyFlag] = []
                    }
                    let val = line.replace(reg.common[requestBodyFlag], '').trim()
                    if (val) {
                      logMap[blockCreateTime][requestBodyFlag].push(val)
                    }
                  } else if (responseBodyFlag) {
                    if (!logMap[blockCreateTime][responseBodyFlag]) {
                      logMap[blockCreateTime][responseBodyFlag] = []
                    }
                    let val = line.replace(reg.common[responseBodyFlag], '').trim()
                    if (val) {
                      logMap[blockCreateTime][responseBodyFlag].push(val)
                    }
                  } else {
                    Object.keys(reg.common).map(key => {
                      if (!['requestBody', 'errStack', 'responseBody'].includes(key) && reg.common[key].test(line)) {
                        let val = line.replace(reg.common[key], '').trim()
                        switch (key) {
                          case 'userInfo':
                            if (val && val !== 'undefined') {
                              try {
                                val = JSON.parse(val)
                              } catch (e) {
                                val = {}
                              }
                            } else {
                              val = {}
                            }
                            break
                          case 'responseTime':
                            val = parseInt(val)
                            break
                        }
                        logMap[blockCreateTime][key] = val
                      }
                    })
                  }
                }
              }
            }
            let list = Object.values(logMap)
            logMap = null
            lineList = null
            resolve(list)
          })
        } catch (e) {
          logMap = null
          lineList = null
          reject(e)
        }
      }).then((logList) => {
        if (logList && logList.length) {
          // 执行过滤
          // 默认过滤掉一些接口
          let unlessApi = [
            'api/SystemLog/list'
          ]
          unlessApi.map(val => {
            logList = logList.filter(item => {
              if (item.origin) {
                return !item.origin.includes(val)
              }
              return false
            })
          })

          // 处理OA账号、用户名过滤
          if (data.filterUserType && data.filterUserKeywords) {
            logList = logList.filter(item => {
              if (item.userInfo && Object.keys(item.userInfo).length) {
                return item.userInfo[data.filterUserType].includes(data.filterUserKeywords)
              }
              return false
            })
          }
          // 处理用户类别过滤
          if (data.userType && data.userType.length) {
            logList = logList.filter(item => {
              if (item.userInfo && Object.keys(item.userInfo).length) {
                return data.userType.includes(item.userInfo.type)
              }
              return false
            })
          }
          // 处理origin过滤
          if (data.origin) {
            logList = logList.filter(item => {
              if (item.origin) {
                return item.origin.includes(data.origin)
              }
              return false
            })
          }
          // 处理method过滤
          if (data.method) {
            logList = logList.filter(item => {
              if (item.method) {
                return data.method.includes(item.method)
              }
              return false
            })
          }
          // 处理status过滤
          if (data.status) {
            let statusArr = data.status.split(',')
            logList = logList.filter(item => {
              if (item.responseStatus) {
                return statusArr.includes(item.responseStatus)
              }
              return false
            })
          }
          // 处理关键字过滤
          if (data.filterType && data.filterKeywords) {
            logList = logList.filter(item => {
              let key
              if (data.filterType === 'request') {
                if (item.method === 'GET') {
                  key = 'requestQuery'
                } else {
                  key = 'requestBody'
                }
              } else if (data.filterType === 'response') {
                if (data.logType === 'error') {
                  key = 'errStack'
                } else if (data.logType === 'result') {
                  key = 'responseBody'
                }
              }
              if (key && item[key]) {
                if (typeof item[key] === 'string' || item[key] instanceof Array) {
                  return item[key].includes(data.filterKeywords)
                } else if (item[key] instanceof Object) {
                  try {
                    return JSON.stringify(item[key]).includes(data.filterKeywords)
                  } catch (e) {
                    return false
                  }
                } else {
                  return false
                }
              }
              return false
            })
          }
        }
        let ret = {
          msg: '读取日志文件成功！',
          statusText: 'success',
          list: [...logList]
        }
        logList = null
        fileStream = null
        return ret
      }, (err) => {
        fileStream = null
        return {
          msg: '读取日志文件失败，日志文件解析出错！',
          statusText: 'error',
          err: err,
          list: []
        }
      })
    }
    let res = await wait()
    return res
  }
}
