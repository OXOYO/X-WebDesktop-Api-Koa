'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 判断环境
/**
 * Created by OXOYO on 2017/7/11.
 *
 * 数据库
 */

var dbType = process.env.NODE_ENV === 'development' ? 'development' : 'production';

var db = new _sequelize2.default(_config.DB[dbType].database, _config.DB[dbType].username, _config.DB[dbType].password, {
  host: _config.DB[dbType].host,
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
});

exports.default = db;