'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by OXOYO on 2017/7/12.
 */

var path = require('path');
var multer = require('koa-multer');

exports.default = {
  getCategoryList: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var reqQuery, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return next();

            case 2:
              reqQuery = ctx.query;
              res = void 0;
              // 查询结果

              _context.next = 6;
              return _Model2.default.getCategoryList(reqQuery);

            case 6:
              res = _context.sent;

              // 处理结果
              if (res) {
                res = {
                  status: 200,
                  msg: '查询应用分类列表成功！',
                  data: {
                    count: res.count,
                    list: res.rows
                  }
                };
              } else {
                res = {
                  status: 5000,
                  msg: '查询失败！',
                  data: res
                };
              }
              ctx.body = res || {};

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function getCategoryList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  getApplicationList: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var reqQuery, userInfo, res;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return next();

            case 2:
              // TODO 处理参数
              reqQuery = ctx.query;
              userInfo = ctx.state.userInfo;
              res = void 0;
              // 查询结果

              _context2.next = 7;
              return _Model2.default.getApplicationList(reqQuery, userInfo);

            case 7:
              res = _context2.sent;

              // 处理结果
              if (res) {
                res = {
                  status: 200,
                  msg: '查询成功！',
                  data: {
                    count: res.count,
                    list: res.rows
                  }
                };
              } else {
                res = {
                  status: 5000,
                  msg: '查询失败！',
                  data: res
                };
              }
              ctx.body = res || {};

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function getApplicationList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),
  doEditApp: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var reqBody, res, timeNow, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return next();

            case 2:
              reqBody = ctx.request.body;
              res = void 0;

              if (!reqBody) {
                _context3.next = 13;
                break;
              }

              timeNow = new Date();
              data = (0, _extends3.default)({}, reqBody, {
                update_time: timeNow
                // 查询结果
              });
              _context3.next = 9;
              return _Model2.default.doEditApp(data);

            case 9:
              res = _context3.sent;

              // 处理结果
              if (res && res[0]) {
                res = {
                  status: 200,
                  msg: '编辑应用成功！',
                  data: res
                };
              } else {
                res = {
                  status: 5000,
                  msg: '编辑应用失败',
                  data: res
                };
              }
              _context3.next = 14;
              break;

            case 13:
              res = {
                status: 5001,
                msg: '编辑应用失败，上送参数有误！',
                data: {}
              };

            case 14:
              ctx.body = res || {};

            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function doEditApp(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),
  doAddApp: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var reqBody, res, timeNow, data, hasSameApp, maxAppId;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return next();

            case 2:
              reqBody = ctx.request.body;
              res = void 0;

              if (!reqBody) {
                _context4.next = 24;
                break;
              }

              timeNow = new Date();
              data = (0, _extends3.default)({}, reqBody, {
                create_time: timeNow,
                update_time: timeNow
                // 1.查找是否存在重名app
              });
              _context4.next = 9;
              return _Model2.default.getApplicationByAppName({
                name: reqBody['name']
              });

            case 9:
              hasSameApp = _context4.sent;

              if (!hasSameApp) {
                _context4.next = 14;
                break;
              }

              res = {
                status: 5000,
                msg: '添加应用失败，存在同名应用，请修改应用名称！',
                data: {}
              };
              _context4.next = 22;
              break;

            case 14:
              _context4.next = 16;
              return _Model2.default.getMaxAppId();

            case 16:
              maxAppId = _context4.sent;

              data['app_id'] = maxAppId + 1;
              // 查询结果
              _context4.next = 20;
              return _Model2.default.doAddApp(data);

            case 20:
              res = _context4.sent;

              // 处理结果
              if (res) {
                res = {
                  status: 200,
                  msg: '添加应用成功！',
                  data: res
                };
              } else {
                res = {
                  status: 5000,
                  msg: '添加应用失败',
                  data: res
                };
              }

            case 22:
              _context4.next = 25;
              break;

            case 24:
              res = {
                status: 5001,
                msg: '添加应用失败，上送参数有误！',
                data: {}
              };

            case 25:
              ctx.body = res || {};

            case 26:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function doAddApp(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),
  // FIXME 废弃
  doUpdateApp: function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var reqBody, userInfo, res, timeNow, data;
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

              if (!(reqBody && reqBody.userId && parseInt(reqBody.userId) === userInfo.userId)) {
                _context5.next = 14;
                break;
              }

              timeNow = new Date();
              data = {
                id: reqBody['id'],
                user_id: reqBody['userId'],
                app_id: reqBody['appId'],
                status: reqBody['status'],
                update_time: timeNow
                // 查询结果
              };
              _context5.next = 10;
              return _Model2.default.doUpdateApp(data);

            case 10:
              res = _context5.sent;

              // 处理结果
              if (res) {
                res = {
                  status: 200,
                  msg: reqBody['status'] === 1 ? '启用成功！' : '停用成功！',
                  data: res
                };
              } else {
                res = {
                  status: 5000,
                  msg: reqBody['status'] === 1 ? '启用失败！' : '停用失败！',
                  data: res
                };
              }
              _context5.next = 15;
              break;

            case 14:
              res = {
                status: 5001,
                msg: '更新失败，上送参数有误！',
                data: {}
              };

            case 15:
              ctx.body = res || {};

            case 16:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function doUpdateApp(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(),
  // FIXME 废弃
  doRemoveApp: function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var reqBody, userInfo, res, data;
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

              if (!(reqBody && reqBody.userId && parseInt(reqBody.userId) === userInfo.userId)) {
                _context6.next = 13;
                break;
              }

              data = {
                id: reqBody['id'],
                user_id: reqBody['userId'],
                app_id: reqBody['appId']
                // 查询结果
              };
              _context6.next = 9;
              return _Model2.default.doRemoveApp(data);

            case 9:
              res = _context6.sent;

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
              _context6.next = 14;
              break;

            case 13:
              res = {
                status: 5001,
                msg: '卸载失败，上送参数有误！',
                data: {}
              };

            case 14:
              ctx.body = res || {};

            case 15:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function doRemoveApp(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),
  doInstallApp: function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var reqBody, userInfo, res, isInstalled, appInfo, timeNow, installData;
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

              if (!(reqBody && userInfo && userInfo.userId)) {
                _context7.next = 24;
                break;
              }

              _context7.next = 8;
              return _Model2.default.getApplicationByUserId({
                app_id: reqBody['id'],
                user_id: userInfo['userId'],
                private: 0
              });

            case 8:
              isInstalled = _context7.sent;

              if (!isInstalled) {
                _context7.next = 13;
                break;
              }

              res = {
                status: 5000,
                msg: '该应用已安装，请勿重复安装！',
                data: {}
              };
              _context7.next = 22;
              break;

            case 13:
              _context7.next = 15;
              return _Model2.default.getApplicationByAppId({
                id: reqBody['id']
              });

            case 15:
              appInfo = _context7.sent;
              timeNow = new Date();
              installData = {
                user_id: userInfo.userId,
                app_id: appInfo.id,
                app_name: appInfo.name,
                app_title: appInfo.title,
                app_description: appInfo.description,
                app_type: appInfo.type,
                app_publish: appInfo.publish,
                user_type: appInfo.user_type,
                status: 1,
                private: 0,
                config: appInfo.config,
                create_time: timeNow,
                update_time: timeNow
                // 执行安装
              };
              _context7.next = 20;
              return _Model2.default.doInstallApp(installData);

            case 20:
              res = _context7.sent;

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
              _context7.next = 25;
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
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function doInstallApp(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }(),
  // 上传图标
  doUploadIcon: function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var uploadDir, storage, upload, handle, response, res;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return next();

            case 2:
              uploadDir = _config.uploadConfig.uploadDir || 'assets/uploads/';
              // 配置

              storage = multer.diskStorage({
                // 文件保存路径
                destination: function destination(req, file, cb) {
                  cb(null, path.resolve(uploadDir));
                },
                // 文件重命名
                filename: function filename(req, file, cb) {
                  var originalnameArr = file.originalname.split('.');
                  var postfix = originalnameArr[originalnameArr.length - 1];
                  var timeNow = Date.now();
                  cb(null, timeNow + '.' + postfix);
                }
              });
              // 上传实例

              upload = multer({
                storage: storage
              });
              // 执行单文件上传

              _context8.next = 7;
              return upload.single('file');

            case 7:
              handle = _context8.sent;
              _context8.next = 10;
              return handle(ctx);

            case 10:
              response = _context8.sent;
              res = void 0;

              if (response) {
                res = {
                  status: 200,
                  msg: '上传成功！',
                  data: {
                    file: response.req.file,
                    filename: response.req.file.filename,
                    url: _config.uploadConfig.host + uploadDir + response.req.file.filename
                  }
                };
              } else {
                res = {
                  status: 5000,
                  msg: '上传失败！',
                  data: response
                };
              }
              ctx.body = res || {};

            case 14:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function doUploadIcon(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }()
};