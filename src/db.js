/**
 * Created by OXOYO on 2017/7/11.
 *
 * 数据库
 */

import Sequelize from 'sequelize'
import { DB as dbConfig } from './config'

const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
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
