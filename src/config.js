/**
 * Created by OXOYO on 2017/7/11.
 *
 * 配置
 */

// 系统配置
export const System = {
  host: 'localhost',
  port: process.env.PORT || 3000,
  sessionKey: 'X-WebDesktop'
}

export const DB = {
  development: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'x-webdesktop-v2'
  },
  // heroku上数据库配置
  heroku: {
    host: 'a07yd3a6okcidwap.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    username: 'vuc6l55k1pqa7xn2',
    password: 'xt77i1x5fn5br18g',
    database: 'zaysac01ah85qxbg'
  }
}

export const Api = {
  prefix: '/api',
  version: 'v2.0.0'
}

// cookie相关配置
export const cookieConfig = {
  keys: {
    account: 'x-account',
    userName: 'x-userName',
    token: 'x-key',
    userType: 'x-type',
    userCode: 'x-code',
    secret: 'x-webdesktp'
  }
}

// 账号相关配置
export const accountConfig = {
  key: '12345678'
}

// 上传配置
export const uploadConfig = {
  host: '//localhost:3000/',
  uploadDir: 'assets/uploads/'
}

// 日志配置
export const Log = {
  appenders: {
    out: {
      type: 'console'
    },
    task: {
      type: 'dateFile',
      filename: 'logs/task',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    result: {
      type: 'dateFile',
      filename: 'logs/result',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    error: {
      type: 'dateFile',
      filename: 'logs/error',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    default: {
      type: 'dateFile',
      filename: 'logs/default',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    rate: {
      type: 'dateFile',
      filename: 'logs/rate',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: ['out', 'default'],
      level: 'info'
    },
    task: {
      appenders: ['task'],
      level: 'info'
    },
    result: {
      appenders: ['result'],
      level: 'info'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    },
    rate: {
      appenders: ['rate'],
      level: 'info'
    }
  }
}
