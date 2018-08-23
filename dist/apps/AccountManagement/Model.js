'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersModel = '../../schema/platform_users'; /**
                                                 * Created by OXOYO on 2017/7/11.
                                                 *
                                                 * 账号模型
                                                 */

var appsModel = '../../schema/platform_apps';
var userAppsModel = '../../schema/platform_user_apps';
var configModel = '../../schema/platform_config';
var usersSchema = _db2.default.import(usersModel);
var appsSchema = _db2.default.import(appsModel);
var userAppsSchema = _db2.default.import(userAppsModel);
var configSchema = _db2.default.import(configModel);

var include = [{
  association: usersSchema.hasMany(userAppsSchema, { foreignKey: 'user_id', targetKey: 'id', as: 'apps' })
}];

exports.default = {
  // 获取账号列表
  getAccountList: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
      var options, pageSize, currentPage, whereObj, filterType, statusInArr, typeInArr;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = {};
              // 处理分页

              pageSize = data.pageSize || 10;
              currentPage = data.currentPage || 1;

              options['limit'] = parseInt(pageSize);
              options['offset'] = parseInt((currentPage - 1) * pageSize);
              // 拼装where条件
              whereObj = {};
              // 处理关键词过滤

              filterType = data.filterType || null;

              if (filterType && data.keywords) {
                // 模糊匹配
                whereObj[filterType] = {
                  $like: '%' + data.keywords + '%'
                };
              }
              // 处理状态过滤
              statusInArr = data.userStatus || [];

              if (statusInArr.length) {
                whereObj['status'] = {
                  $in: statusInArr
                };
              }
              // 处理用户级别
              typeInArr = data.userType || [];

              if (typeInArr.length) {
                whereObj['type'] = {
                  $in: typeInArr
                };
              }
              // 处理options
              if ((0, _keys2.default)(whereObj).length) {
                options['where'] = whereObj;
              }
              // 处理排序
              options['order'] = [['id', 'ASC']];
              // 处理关联关系
              options['include'] = include;
              // 打印日志
              options['logging'] = true;
              _context.next = 18;
              return usersSchema.findAll(options);

            case 18:
              return _context.abrupt('return', _context.sent);

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getAccountList(_x) {
      return _ref.apply(this, arguments);
    }

    return getAccountList;
  }(),
  // 添加账号
  doAddAccount: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return usersSchema.findOrCreate({
                where: {
                  account: data.account
                },
                defaults: data,
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

    function doAddAccount(_x2) {
      return _ref2.apply(this, arguments);
    }

    return doAddAccount;
  }(),
  doDelUserAccount: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(data) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return usersSchema.destroy({
                where: {
                  id: (0, _values2.default)(data)
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

    function doDelUserAccount(_x3) {
      return _ref3.apply(this, arguments);
    }

    return doDelUserAccount;
  }(),
  // 更新账号
  doEditAccount: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(data) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return usersSchema.update(data, {
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

    function doEditAccount(_x4) {
      return _ref4.apply(this, arguments);
    }

    return doEditAccount;
  }(),
  // 获取所有的应用
  getAllApps: function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data) {
      var whereObj;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              whereObj = {
                publish: data['publish']
              };

              if (data['user_type'] === 1) {
                whereObj['user_type'] = data['user_type'];
              }
              _context5.next = 4;
              return appsSchema.findAndCountAll({
                where: whereObj,
                order: [['id', 'ASC']],
                logging: true
              });

            case 4:
              return _context5.abrupt('return', _context5.sent);

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getAllApps(_x5) {
      return _ref5.apply(this, arguments);
    }

    return getAllApps;
  }(),
  // 获取用户的应用
  getUserApps: function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(data) {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return userAppsSchema.findAndCountAll({
                where: {
                  user_id: data['user_id'],
                  status: 1
                },
                order: [['id', 'ASC']],
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

    function getUserApps(_x6) {
      return _ref6.apply(this, arguments);
    }

    return getUserApps;
  }(),
  // 获取指定id的应用列表
  getAppsInIds: function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(data) {
      var whereObj, idInArr;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              whereObj = {};
              idInArr = data.ids || [];

              if (idInArr.length) {
                whereObj['id'] = {
                  $in: idInArr
                };
              }
              _context7.next = 5;
              return appsSchema.findAndCountAll({
                where: whereObj,
                order: [['id', 'ASC']],
                logging: true
              });

            case 5:
              return _context7.abrupt('return', _context7.sent);

            case 6:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getAppsInIds(_x7) {
      return _ref7.apply(this, arguments);
    }

    return getAppsInIds;
  }(),
  // 添加用户app
  doAddUserApps: function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(data) {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return userAppsSchema.bulkCreate(data, {
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

    function doAddUserApps(_x8) {
      return _ref8.apply(this, arguments);
    }

    return doAddUserApps;
  }(),
  // 删除该用户下的app
  doRemoveUserApps: function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(data) {
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return userAppsSchema.destroy({
                where: {
                  user_id: data['user_id'],
                  app_id: {
                    $in: data['appIds']
                  }
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

    function doRemoveUserApps(_x9) {
      return _ref9.apply(this, arguments);
    }

    return doRemoveUserApps;
  }(),
  doAddUserConfig: function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(data) {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return configSchema.create(data, {
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

    function doAddUserConfig(_x10) {
      return _ref10.apply(this, arguments);
    }

    return doAddUserConfig;
  }()
};