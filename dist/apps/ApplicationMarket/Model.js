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

var appsModel = '../../schema/platform_apps'; /**
                                               * Created by OXOYO on 2017/7/12.
                                               */

var appsCategoryModel = '../../schema/platform_apps_category';
var userAppsModel = '../../schema/platform_user_apps';
var appsSchema = _db2.default.import(appsModel);
var appsCategorySchema = _db2.default.import(appsCategoryModel);
var userAppsSchema = _db2.default.import(userAppsModel);

exports.default = {
  getCategoryList: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data, userInfo) {
      var options, whereObj;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = {};
              // 拼装where条件

              whereObj = {};

              if (data.hasOwnProperty('parent')) {
                whereObj['parent'] = data.parent;
              }
              // 处理options
              if ((0, _keys2.default)(whereObj).length) {
                options['where'] = whereObj;
              }
              // 处理排序
              options['order'] = [['id', 'ASC']];
              // 打印日志
              options['logging'] = true;
              _context.next = 8;
              return appsCategorySchema.findAndCountAll(options);

            case 8:
              return _context.abrupt('return', _context.sent);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getCategoryList(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return getCategoryList;
  }(),
  // 应用列表
  getApplicationList: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data, userInfo) {
      var options, whereObj, typeInArr, userTypeInArr, publishInArr;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
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
              if (data.hasOwnProperty('category') && parseInt(data.category) !== 1) {
                whereObj['category'] = data.category;
              }
              // 普通用户返回部分应用，管理员返回全部应用
              if (userInfo && userInfo.hasOwnProperty('type')) {
                if (userInfo.type) {
                  // 用户类别为普通用户的
                  whereObj['user_type'] = userInfo.type;
                  // 并且是已经发布的应用
                  whereObj['publish'] = 1;
                } else {
                  // 处理应用类别，默认只查普通应用
                  typeInArr = data['type'] || [1];

                  if (typeInArr.length) {
                    whereObj['type'] = {
                      $in: typeInArr
                    };
                  }
                  // 处理用户级别
                  userTypeInArr = data['user_type'] || [];

                  if (userTypeInArr.length) {
                    whereObj['user_type'] = {
                      $in: userTypeInArr
                    };
                  }
                  // 处理发布状态
                  publishInArr = data['publish'] || [];

                  if (publishInArr.length) {
                    whereObj['publish'] = {
                      $in: publishInArr
                    };
                  }
                }
              }
              // 处理options
              if ((0, _keys2.default)(whereObj).length) {
                options['where'] = whereObj;
              }
              // 处理排序
              options['order'] = [['id', 'ASC']];
              // 打印日志
              options['logging'] = true;
              _context2.next = 10;
              return appsSchema.findAndCountAll(options);

            case 10:
              return _context2.abrupt('return', _context2.sent);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getApplicationList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return getApplicationList;
  }(),
  // 编辑应用
  doEditApp: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(data) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return appsSchema.update(data, {
                where: {
                  id: data.id
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

    function doEditApp(_x5) {
      return _ref3.apply(this, arguments);
    }

    return doEditApp;
  }(),
  // 添加应用
  doAddApp: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(data) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return appsSchema.create(data, {
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

    function doAddApp(_x6) {
      return _ref4.apply(this, arguments);
    }

    return doAddApp;
  }(),
  // 更新应用
  doUpdateApp: function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return appsSchema.update(data, {
                where: {
                  id: data.id
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

    function doUpdateApp(_x7) {
      return _ref5.apply(this, arguments);
    }

    return doUpdateApp;
  }(),
  // 卸载应用
  doRemoveApp: function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(data) {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return appsSchema.destroy({
                where: {
                  id: data.id,
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

    function doRemoveApp(_x8) {
      return _ref6.apply(this, arguments);
    }

    return doRemoveApp;
  }(),
  // 安装应用
  doInstallApp: function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(data) {
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return userAppsSchema.create(data, {
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

    function doInstallApp(_x9) {
      return _ref7.apply(this, arguments);
    }

    return doInstallApp;
  }(),
  getMaxAppId: function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return appsSchema.max('id');

            case 2:
              return _context8.abrupt('return', _context8.sent);

            case 3:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getMaxAppId() {
      return _ref8.apply(this, arguments);
    }

    return getMaxAppId;
  }(),
  getApplicationByUserId: function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(data) {
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return userAppsSchema.findOne({
                where: {
                  app_id: data['app_id'],
                  user_id: data['user_id']
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

    function getApplicationByUserId(_x10) {
      return _ref9.apply(this, arguments);
    }

    return getApplicationByUserId;
  }(),
  getApplicationByAppId: function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(data) {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return appsSchema.findOne({
                where: {
                  id: data['id']
                },
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

    function getApplicationByAppId(_x11) {
      return _ref10.apply(this, arguments);
    }

    return getApplicationByAppId;
  }(),
  getApplicationByAppName: function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(data) {
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return appsSchema.findOne({
                where: {
                  name: data['name']
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

    function getApplicationByAppName(_x12) {
      return _ref11.apply(this, arguments);
    }

    return getApplicationByAppName;
  }()
};