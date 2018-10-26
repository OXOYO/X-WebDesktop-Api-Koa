'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _auth = require('../auth');

var _auth2 = _interopRequireDefault(_auth);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  user: {
    // 执行登录
    doSignIn: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
        var reqBody, res, password, data, userInfo, token, adminInfo;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();

              case 2:
                reqBody = ctx.request.body;
                res = void 0;

                if (!(reqBody && reqBody.account && reqBody.password)) {
                  _context.next = 22;
                  break;
                }

                // 执行平台内用户查询
                // 加密密码
                password = _utils2.default.des.encrypt(_config.accountConfig.key, reqBody.password, 0);
                _context.next = 8;
                return _Model2.default.user.doSignIn({
                  account: reqBody.account,
                  password: password
                });

              case 8:
                res = _context.sent;
                data = {
                  userInfo: res
                  // 处理结果
                };

                if (!res) {
                  _context.next = 16;
                  break;
                }

                userInfo = {
                  account: res.account,
                  name: res.name,
                  userId: res.id,
                  type: res.type,
                  status: res.status
                };
                token = _auth2.default.sign(userInfo);


                if (token) {
                  // 设置返回token
                  data[_config.cookieConfig.keys.token] = token;
                  res = {
                    status: 200,
                    msg: '登录成功！',
                    data: data
                  };
                } else {
                  res = {
                    status: 5000,
                    msg: '登录失败，生成Token失败！',
                    data: data
                  };
                }
                _context.next = 20;
                break;

              case 16:
                _context.next = 18;
                return _Model2.default.user.getOneAdmin();

              case 18:
                adminInfo = _context.sent;

                res = {
                  status: 5000,
                  msg: '登录失败！' + (adminInfo && adminInfo.account && adminInfo.name ? '请联系管理员 ' + adminInfo.name + ' (' + adminInfo.account + ')' : ''),
                  data: data
                };

              case 20:
                _context.next = 23;
                break;

              case 22:
                res = {
                  status: 5001,
                  msg: '登录失败，上送参数有误！',
                  data: {}
                };

              case 23:
                ctx.body = res || {};

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function doSignIn(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }(),
    // 获取用户基本信息
    getBaseInfo: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
        var userInfo, res;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return next();

              case 2:
                // TODO 处理参数
                userInfo = ctx.state.userInfo;
                res = void 0;

                if (!(userInfo && userInfo.userId)) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 7;
                return _Model2.default.user.getBaseInfo(userInfo.userId);

              case 7:
                res = _context2.sent;

                // 处理结果
                if (res) {
                  res = {
                    status: 200,
                    msg: '获取用户基本信息成功！',
                    data: res
                  };
                } else {
                  res = {
                    status: 5000,
                    msg: '获取用户基本信息失败！',
                    data: res
                  };
                }
                _context2.next = 12;
                break;

              case 11:
                res = {
                  status: 5001,
                  msg: '获取用户基本信息失败，上送参数有误！',
                  data: {}
                };

              case 12:
                ctx.body = res || {};

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function getBaseInfo(_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }(),
    // 获取用户的平台配置信息
    getPlatformConfigByUserId: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
        var reqQuery, res;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return next();

              case 2:
                // 处理参数
                reqQuery = ctx.query;
                res = void 0;

                if (!(reqQuery && reqQuery.userId)) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 7;
                return _Model2.default.user.getPlatformConfigByUserId(reqQuery.userId);

              case 7:
                res = _context3.sent;

                // 处理结果
                if (res) {
                  res = {
                    status: 200,
                    msg: '查询成功！',
                    data: res
                  };
                } else {
                  res = {
                    status: 5000,
                    msg: '查询失败！',
                    data: res
                  };
                }
                _context3.next = 12;
                break;

              case 11:
                res = {
                  status: 5001,
                  msg: '查询失败，上送参数有误！',
                  data: {}
                };

              case 12:

                ctx.body = res || {};

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function getPlatformConfigByUserId(_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }(),
    getApplicationListByUserId: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
        var reqQuery, userInfo, res;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return next();

              case 2:
                // 处理参数
                reqQuery = ctx.query;
                userInfo = ctx.state.userInfo;
                res = void 0;

                if (!(userInfo && userInfo.userId)) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 8;
                return _Model2.default.user.getApplicationListByUserId(reqQuery, userInfo);

              case 8:
                res = _context4.sent;

                // 处理结果
                if (res) {
                  res = {
                    status: 200,
                    msg: '获取用户应用列表成功！',
                    data: {
                      count: res.count,
                      list: res.rows
                    }
                  };
                } else {
                  res = {
                    status: 5000,
                    msg: '获取用户应用列表失败！',
                    data: res
                  };
                }
                _context4.next = 13;
                break;

              case 12:
                res = {
                  status: 5001,
                  msg: '获取用户应用列表失败，上送参数有误！',
                  data: {}
                };

              case 13:
                ctx.body = res || {};

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function getApplicationListByUserId(_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }(),
    doAppPinnedUpdate: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
        var reqBody, userInfo, res, appDetail, appConfig, timeNow, data;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return next();

              case 2:
                reqBody = ctx.request.body;
                userInfo = ctx.state.userInfo;
                res = void 0;

                if (!(userInfo && userInfo.userId)) {
                  _context5.next = 23;
                  break;
                }

                _context5.next = 8;
                return _Model2.default.user.getApplicationDetailByUserId({
                  user_id: userInfo.userId,
                  app_id: reqBody['app_id']
                });

              case 8:
                appDetail = _context5.sent;

                if (!appDetail) {
                  _context5.next = 20;
                  break;
                }

                appConfig = appDetail.config ? JSON.parse(appDetail.config) : { 'taskBar': {} };

                appConfig['taskBar']['isPinned'] = reqBody['isPinned'];
                // 3.执行更新
                timeNow = new Date();
                data = {
                  user_id: userInfo.userId,
                  app_id: reqBody['app_id'],
                  config: (0, _stringify2.default)(appConfig),
                  update_time: timeNow
                  // 查询结果
                };
                _context5.next = 16;
                return _Model2.default.user.doAppPinnedUpdate(data);

              case 16:
                res = _context5.sent;

                // 处理结果
                if (res) {
                  res = {
                    status: 200,
                    msg: reqBody['isPinned'] ? '锁定成功！' : '解锁成功！',
                    data: res
                  };
                } else {
                  res = {
                    status: 5000,
                    msg: reqBody['isPinned'] ? '锁定失败！' : '解锁失败！',
                    data: res
                  };
                }
                _context5.next = 21;
                break;

              case 20:
                res = {
                  status: 5000,
                  msg: reqBody['isPinned'] ? '锁定失败！' : '解锁失败！',
                  data: appDetail
                };

              case 21:
                _context5.next = 24;
                break;

              case 23:
                res = {
                  status: 5001,
                  msg: '更新失败，上送参数有误！',
                  data: {}
                };

              case 24:

                ctx.body = res || {};

              case 25:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function doAppPinnedUpdate(_x9, _x10) {
        return _ref5.apply(this, arguments);
      };
    }(),
    doInstallApp: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
        var reqBody, userInfo, res, isInstalled, appInfo, timeNow, installData;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return next();

              case 2:
                reqBody = ctx.request.body;
                userInfo = ctx.state.userInfo;
                res = void 0;

                if (!(reqBody && userInfo && userInfo.userId)) {
                  _context6.next = 24;
                  break;
                }

                _context6.next = 8;
                return _Model2.default.user.getApplicationByUserId({
                  app_id: reqBody['id'],
                  user_id: userInfo['userId'],
                  private: 0
                });

              case 8:
                isInstalled = _context6.sent;

                if (!isInstalled) {
                  _context6.next = 13;
                  break;
                }

                res = {
                  status: 5000,
                  msg: '该应用已安装，请勿重复安装！',
                  data: {}
                };
                _context6.next = 22;
                break;

              case 13:
                _context6.next = 15;
                return _Model2.default.user.getApplicationByAppId({
                  id: reqBody['id']
                });

              case 15:
                appInfo = _context6.sent;
                timeNow = new Date();
                installData = {
                  user_id: userInfo.userId,
                  app_id: appInfo.id,
                  app_name: appInfo.name,
                  app_title: appInfo.title,
                  app_description: appInfo.description,
                  app_type: appInfo.type,
                  app_publish: appInfo.publish,
                  app_category: appInfo.category,
                  user_type: appInfo.user_type,
                  status: 1,
                  private: 0,
                  config: appInfo.config,
                  create_time: timeNow,
                  update_time: timeNow
                  // 执行安装
                };
                _context6.next = 20;
                return _Model2.default.user.doInstallApp(installData);

              case 20:
                res = _context6.sent;

                // 处理结果
                if (res) {
                  res = {
                    status: 200,
                    msg: '安装成功！',
                    data: res
                  };
                } else {
                  res = {
                    status: 5000,
                    msg: '安装失败！',
                    data: res
                  };
                }

              case 22:
                _context6.next = 25;
                break;

              case 24:
                res = {
                  status: 5001,
                  msg: '安装失败，上送参数有误！',
                  data: {}
                };

              case 25:
                ctx.body = res || {};

              case 26:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      return function doInstallApp(_x11, _x12) {
        return _ref6.apply(this, arguments);
      };
    }(),
    doUninstallApp: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
        var reqBody, userInfo, res, data, appInfo;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return next();

              case 2:
                reqBody = ctx.request.body;
                userInfo = ctx.state.userInfo;
                res = void 0;

                if (!(reqBody && reqBody.user_id && parseInt(reqBody.user_id) === userInfo.userId)) {
                  _context7.next = 24;
                  break;
                }

                data = {
                  id: reqBody['id'],
                  user_id: reqBody['user_id'],
                  app_id: reqBody['app_id']
                  // 查询该应用信息，判断是否支持卸载
                };
                _context7.next = 9;
                return _Model2.default.user.getApplicationByAppId({
                  id: data['app_id']
                });

              case 9:
                appInfo = _context7.sent;

                if (!appInfo) {
                  _context7.next = 21;
                  break;
                }

                if (!(appInfo.type === 0)) {
                  _context7.next = 15;
                  break;
                }

                res = {
                  status: 5000,
                  msg: '卸载失败！默认应用禁止卸载！',
                  data: appInfo
                };
                _context7.next = 19;
                break;

              case 15:
                _context7.next = 17;
                return _Model2.default.user.doUninstallApp(data);

              case 17:
                res = _context7.sent;

                // 处理结果
                if (res) {
                  res = {
                    status: 200,
                    msg: '卸载成功！',
                    data: res
                  };
                } else {
                  res = {
                    status: 5000,
                    msg: '卸载失败！',
                    data: res
                  };
                }

              case 19:
                _context7.next = 22;
                break;

              case 21:
                res = {
                  status: 5000,
                  msg: '卸载失败！',
                  data: res
                };

              case 22:
                _context7.next = 25;
                break;

              case 24:
                res = {
                  status: 5001,
                  msg: '卸载失败，上送参数有误！',
                  data: {}
                };

              case 25:
                ctx.body = res || {};

              case 26:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      }));

      return function doUninstallApp(_x13, _x14) {
        return _ref7.apply(this, arguments);
      };
    }()
  },
  components: {
    getBingWallpaper: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
        var reqQuery, bingApi, payload, res;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return next();

              case 2:
                reqQuery = ctx.query;
                bingApi = 'http://cn.bing.com/HPImageArchive.aspx';
                payload = {
                  format: reqQuery.format || 'js',
                  idx: reqQuery.idx || 0,
                  n: reqQuery.n || 1
                };
                res = void 0;
                _context8.prev = 6;
                _context8.next = 9;
                return _axios2.default.get(bingApi, {
                  params: payload
                });

              case 9:
                res = _context8.sent;

                res = {
                  status: 200,
                  msg: '获取bing壁纸成功！',
                  data: res.data
                };
                _context8.next = 16;
                break;

              case 13:
                _context8.prev = 13;
                _context8.t0 = _context8['catch'](6);

                res = {
                  status: 5000,
                  msg: '获取bing壁纸失败',
                  data: _context8.t0
                };

              case 16:
                ctx.body = res || {};

              case 17:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined, [[6, 13]]);
      }));

      return function getBingWallpaper(_x15, _x16) {
        return _ref8.apply(this, arguments);
      };
    }()
  }
}; /**
    * Created by OXOYO on 2018/3/9.
    */