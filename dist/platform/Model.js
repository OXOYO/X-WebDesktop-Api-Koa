'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configModel = '../schema/platform_config'; /**
                                                * Created by OXOYO on 2018/3/9.
                                                */

var configSchema = _db2.default.import(configModel);

var usersModel = '../schema/platform_users';
var usersSchema = _db2.default.import(usersModel);

var userAppsModel = '../schema/platform_user_apps';
var userAppsSchema = _db2.default.import(userAppsModel);

var appsModel = '../schema/platform_apps';
var appsSchema = _db2.default.import(appsModel);

exports.default = {
  user: {
    // 系统登录
    doSignIn: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return usersSchema.findOne({
                  where: {
                    account: data.account,
                    password: data.password
                  },
                  logging: true
                });

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function doSignIn(_x) {
        return _ref.apply(this, arguments);
      }

      return doSignIn;
    }(),
    // 获取用户基本信息
    getBaseInfo: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(userId) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return usersSchema.findOne({
                  where: {
                    id: userId
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

      function getBaseInfo(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getBaseInfo;
    }(),
    // 用户平台配置信息
    getPlatformConfigByUserId: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(userId) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return configSchema.findOne({
                  where: {
                    user_id: userId
                  },
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

      function getPlatformConfigByUserId(_x3) {
        return _ref3.apply(this, arguments);
      }

      return getPlatformConfigByUserId;
    }(),
    // 获取管理员信息
    getOneAdmin: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return usersSchema.findOne({
                  where: {
                    type: 0
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

      function getOneAdmin() {
        return _ref4.apply(this, arguments);
      }

      return getOneAdmin;
    }(),
    // 应用列表
    getApplicationListByUserId: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data, userInfo) {
        var options, whereObj;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = {};
                // 拼装where条件

                whereObj = {};

                if (data.hasOwnProperty('filterType') && data.hasOwnProperty('keywords')) {
                  whereObj[data.filterType] = {
                    $like: '%' + data.keywords + '%'
                  };
                }
                // 处理应用分类
                // FIXME category 1 为全部应用
                if (data.hasOwnProperty('app_category') && parseInt(data.app_category) !== 1) {
                  whereObj['app_category'] = data.app_category;
                }
                // 当前用户
                whereObj['user_id'] = userInfo.userId;
                // 状态 0 停用 1 启用
                whereObj['status'] = 1;
                // 处理options
                if ((0, _keys2.default)(whereObj).length) {
                  options['where'] = whereObj;
                }
                // 处理排序
                options['order'] = [['id', 'ASC']];
                // 打印日志
                options['logging'] = true;
                _context5.next = 11;
                return userAppsSchema.findAndCountAll(options);

              case 11:
                return _context5.abrupt('return', _context5.sent);

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getApplicationListByUserId(_x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return getApplicationListByUserId;
    }(),
    // 获取用户应用详情
    getApplicationDetailByUserId: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(data) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return userAppsSchema.findOne({
                  where: {
                    user_id: data['user_id'],
                    app_id: data['app_id']
                  },
                  logging: true
                });

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getApplicationDetailByUserId(_x6) {
        return _ref6.apply(this, arguments);
      }

      return getApplicationDetailByUserId;
    }(),
    // 更新用户应用锁定
    doAppPinnedUpdate: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(data) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return userAppsSchema.update(data, {
                  where: {
                    user_id: data['user_id'],
                    app_id: data['app_id']
                  },
                  logging: true
                });

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function doAppPinnedUpdate(_x7) {
        return _ref7.apply(this, arguments);
      }

      return doAppPinnedUpdate;
    }(),
    getApplicationByUserId: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(data) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return userAppsSchema.findOne({
                  where: {
                    app_id: data['app_id'],
                    user_id: data['user_id']
                  },
                  logging: true
                });

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getApplicationByUserId(_x8) {
        return _ref8.apply(this, arguments);
      }

      return getApplicationByUserId;
    }(),
    getApplicationByAppId: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(data) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return appsSchema.findOne({
                  where: {
                    id: data['id']
                  },
                  logging: true
                });

              case 2:
                return _context9.abrupt('return', _context9.sent);

              case 3:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getApplicationByAppId(_x9) {
        return _ref9.apply(this, arguments);
      }

      return getApplicationByAppId;
    }(),
    // 安装应用
    doInstallApp: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(data) {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return userAppsSchema.create(data, {
                  logging: true
                });

              case 2:
                return _context10.abrupt('return', _context10.sent);

              case 3:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function doInstallApp(_x10) {
        return _ref10.apply(this, arguments);
      }

      return doInstallApp;
    }(),
    // 卸载应用
    doUninstallApp: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(data) {
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return userAppsSchema.destroy({
                  where: {
                    id: data['id'],
                    user_id: data['user_id'],
                    app_id: data['app_id']
                  },
                  logging: true
                });

              case 2:
                return _context11.abrupt('return', _context11.sent);

              case 3:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function doUninstallApp(_x11) {
        return _ref11.apply(this, arguments);
      }

      return doUninstallApp;
    }()
  }
};