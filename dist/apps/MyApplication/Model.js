'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userAppsModel = '../../schema/platform_user_apps'; /**
                                                        * Created by OXOYO on 2017/7/12.
                                                        */

// import Sequelize from 'sequelize'

var appsModel = '../../schema/platform_apps';
var userAppsSchema = _db2.default.import(userAppsModel);
var appsSchema = _db2.default.import(appsModel);

exports.default = {
  // 应用列表
  getApplicationList: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
      var options, whereObj, statusInArr;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = {};
              // 拼装where条件

              whereObj = {};
              // 处理状态过滤

              statusInArr = data.appStatus || [];

              if (statusInArr.length) {
                whereObj['status'] = {
                  $in: statusInArr
                };
              }
              // 处理用户id
              if (data.userId) {
                whereObj['user_id'] = data.userId;
              }
              // 处理关键字
              if (data.filterType && data.keywords) {
                whereObj[data.filterType] = {
                  $like: '%' + data.keywords + '%'
                };
              }
              // 处理options
              if ((0, _keys2.default)(whereObj).length) {
                options['where'] = whereObj;
              }
              // 处理排序
              options['order'] = [['id', 'ASC']];
              // 打印日志
              options['logging'] = true;
              _context.next = 11;
              return userAppsSchema.findAndCountAll(options);

            case 11:
              return _context.abrupt('return', _context.sent);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getApplicationList(_x) {
      return _ref.apply(this, arguments);
    }

    return getApplicationList;
  }(),
  // 编辑应用
  doEditApp: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return userAppsSchema.update(data, {
                where: {
                  id: data.id
                },
                logging: true
              });

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function doEditApp(_x2) {
      return _ref2.apply(this, arguments);
    }

    return doEditApp;
  }(),
  // 添加应用
  doAddApp: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(data) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return userAppsSchema.create(data, {
                logging: true
              });

            case 2:
              return _context3.abrupt('return', _context3.sent);

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function doAddApp(_x3) {
      return _ref3.apply(this, arguments);
    }

    return doAddApp;
  }(),
  // 更新应用
  doUpdateApp: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(data) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return userAppsSchema.update(data, {
                where: {
                  id: data.id
                },
                logging: true
              });

            case 2:
              return _context4.abrupt('return', _context4.sent);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function doUpdateApp(_x4) {
      return _ref4.apply(this, arguments);
    }

    return doUpdateApp;
  }(),
  // 卸载应用
  doRemoveApp: function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return userAppsSchema.destroy({
                where: {
                  id: data.id,
                  user_id: data['user_id'],
                  app_id: data['app_id']
                },
                logging: true
              });

            case 2:
              return _context5.abrupt('return', _context5.sent);

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function doRemoveApp(_x5) {
      return _ref5.apply(this, arguments);
    }

    return doRemoveApp;
  }(),
  getMaxAppId: function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return appsSchema.max('id');

            case 2:
              return _context6.abrupt('return', _context6.sent);

            case 3:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getMaxAppId() {
      return _ref6.apply(this, arguments);
    }

    return getMaxAppId;
  }()
};