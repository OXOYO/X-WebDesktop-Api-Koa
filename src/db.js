/**
 * Created by OXOYO on 2017/7/11.
 *
 * 数据库
 */

import Sequelize from 'sequelize'
import { DB as dbConfig } from './config'

// 判断环境
let dbType = process.env.NODE_ENV === 'development' ? 'development' : 'production'

const db = new Sequelize(
  dbConfig[dbType].database,
  dbConfig[dbType].username,
  dbConfig[dbType].password,
  {
    host: dbConfig[dbType].host,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8'
    },
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    },
    define: {
      timestamps: false
    }
  }
)

export default db
