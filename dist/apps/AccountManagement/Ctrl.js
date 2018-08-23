'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // 获取账号列表
  getAccountList: function () {
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
              // 查询结果

              _context.next = 5;
              return _Model2.default.getAccountList(reqQuery);

            case 5:
              res = _context.sent;

              // 处理结果
              if (res) {
                res = {
                  status: 200,
                  msg: '查询账号列表成功！',
                  data: {
                    count: res.length,
                    list: res
                  }
                };
              } else {
                res = {
                  status: 5000,
                  msg: '查询账号列表失败！',
                  data: {}
                };
              }

              ctx.body = res || {};

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function getAccountList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  // 添加账号
  doAddAccount: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var reqBody, timeNow, data, res, password, _res, _res2, resAccount, isSuccess, apps, appList, userAppList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, userApps, userConfigRes;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return next();

            case 2:
              // 查询结果
              reqBody = ctx.request.body;
              timeNow = new Date();
              data = (0, _extends3.default)({}, reqBody, {
                create_time: timeNow,
                update_time: timeNow
              });
              res = void 0;

              if (!(data && data.account && data.name)) {
                _context2.next = 58;
                break;
              }

              // FIXME 初始化用户密码为 123456 并加密密码
              password = _utils2.default.des.encrypt(_config.accountConfig.key, '123456', 0);
              // FIXME 需改成事务

              _context2.next = 10;
              return _Model2.default.doAddAccount((0, _extends3.default)({}, data, {
                password: password
              }));

            case 10:
              res = _context2.sent;

              // 最后一项为插入成功与否标识
              _res = res, _res2 = (0, _slicedToArray3.default)(_res, 1), resAccount = _res2[0];
              isSuccess = res.pop();
              // 处理结果

              if (!isSuccess) {
                _context2.next = 55;
                break;
              }

              _context2.next = 16;
              return _Model2.default.getAppsInIds({
                ids: reqBody['apps']
              });

            case 16:
              apps = _context2.sent;

              if (!(apps && apps.count && apps.rows)) {
                _context2.next = 52;
                break;
              }

              // 处理数据
              appList = apps.rows;
              userAppList = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 23;

              for (_iterator = (0, _getIterator3.default)(appList); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                item = _step.value;

                userAppList.push({
                  user_id: resAccount.id,
                  app_id: item.id,
                  app_name: item.name,
                  app_title: item.title,
                  app_description: item.description,
                  app_type: item.type,
                  user_type: item.user_type,
                  app_publish: item.publish,
                  config: item.config,
                  status: 1,
                  private: 0,
                  create_time: timeNow,
                  update_time: timeNow
                });
              }
              // 批量处理
              _context2.next = 31;
              break;

            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2['catch'](23);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 31:
              _context2.prev = 31;
              _context2.prev = 32;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 34:
              _context2.prev = 34;

              if (!_didIteratorError) {
                _context2.next = 37;
                break;
              }

              throw _iteratorError;

            case 37:
              return _context2.finish(34);

            case 38:
              return _context2.finish(31);

            case 39:
              _context2.next = 41;
              return _Model2.default.doAddUserApps(userAppList);

            case 41:
              userApps = _context2.sent;

              if (!userApps) {
                _context2.next = 49;
                break;
              }

              _context2.next = 45;
              return _Model2.default.doAddUserConfig({
                user_id: resAccount.id,
                config: '{"themes":{"name":"webDesktop","config":{}}}',
                create_time: timeNow,
                update_time: timeNow
              });

            case 45:
              userConfigRes = _context2.sent;

              if (userConfigRes) {
                res = {
                  status: 200,
                  msg: '添加账号成功！初始化应用成功！添加平台配置成功！',
                  data: resAccount
                };
              } else {
                res = {
                  status: 200,
                  msg: '添加账号成功！初始化应用成功！添加平台配置失败！',
                  data: resAccount
                };
              }
              _context2.next = 50;
              break;

            case 49:
              res = {
                status: 5000,
                msg: '添加账号成功！初始化应用失败！',
                data: resAccount
              };

            case 50:
              _context2.next = 53;
              break;

            case 52:
              res = {
                status: 5000,
                msg: '添加账号成功！获取应用信息失败！',
                data: resAccount
              };

            case 53:
              _context2.next = 56;
              break;

            case 55:
              if (resAccount) {
                res = {
                  status: 5000,
                  msg: '添加账号失败，该账号已存在！',
                  data: resAccount
                };
              } else {
                res = {
                  status: 5000,
                  msg: '添加账号失败！',
                  data: {}
                };
              }

            case 56:
              _context2.next = 59;
              break;

            case 58:
              res = {
                status: 5001,
                msg: '添加账号失败，上送参数有误！',
                data: {}
              };

            case 59:

              ctx.body = res || {};

            case 60:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[23, 27, 31, 39], [32,, 34, 38]]);
    }));

    return function doAddAccount(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),
  // 删除账号
  doDelUserAccount: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var reqBody, data, res;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return next();

            case 2:
              reqBody = ctx.request.body;
              data = reqBody;
              res = void 0;

              if (!(0, _keys2.default)(data).length) {
                _context3.next = 12;
                break;
              }

              _context3.next = 8;
              return _Model2.default.doDelUserAccount(data);

            case 8:
              res = _context3.sent;

              // 处理结果
              if (res) {
                res = {
                  status: 200,
                  msg: '删除账号成功！',
                  data: res
                };
              } else {
                res = {
                  status: 5000,
                  msg: '删除账号失败！',
                  data: {}
                };
              }
              _context3.next = 13;
              break;

            case 12:
              res = {
                status: 5001,
                msg: '删除账号失败，上送参数有误！',
                data: {}
              };

            case 13:

              ctx.body = res || {};

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function doDelUserAccount(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),
  // 编辑账号
  doEditAccount: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var reqBody, timeNow, data, res, userApps, oldList, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, newList, addList, removeList, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, appId, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _appId, apps, appList, userAppList, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _item;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return next();

            case 2:
              reqBody = ctx.request.body;
              timeNow = new Date();
              data = (0, _extends3.default)({}, reqBody, {
                update_time: timeNow
              });
              res = void 0;

              if (!(data && data.account && data.name)) {
                _context4.next = 119;
                break;
              }

              _context4.next = 9;
              return _Model2.default.doEditAccount(data);

            case 9:
              res = _context4.sent;

              if (!(res && res[0])) {
                _context4.next = 116;
                break;
              }

              _context4.prev = 11;
              _context4.next = 14;
              return _Model2.default.getUserApps({
                user_id: reqBody['id']
              });

            case 14:
              userApps = _context4.sent;
              oldList = [];

              if (!(userApps && userApps.count && userApps.rows)) {
                _context4.next = 36;
                break;
              }

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context4.prev = 20;

              for (_iterator2 = (0, _getIterator3.default)(userApps.rows); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                item = _step2.value;

                oldList.push(item['app_id']);
              }
              _context4.next = 28;
              break;

            case 24:
              _context4.prev = 24;
              _context4.t0 = _context4['catch'](20);
              _didIteratorError2 = true;
              _iteratorError2 = _context4.t0;

            case 28:
              _context4.prev = 28;
              _context4.prev = 29;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 31:
              _context4.prev = 31;

              if (!_didIteratorError2) {
                _context4.next = 34;
                break;
              }

              throw _iteratorError2;

            case 34:
              return _context4.finish(31);

            case 35:
              return _context4.finish(28);

            case 36:
              // 2.获取用户新的应用列表
              newList = reqBody['apps'];
              // 3.比对userApps && newUserApps 找出变更项

              addList = [];
              removeList = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context4.prev = 42;

              for (_iterator3 = (0, _getIterator3.default)(oldList); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                appId = _step3.value;

                if (!newList.includes(appId)) {
                  removeList.push(appId);
                }
              }
              _context4.next = 50;
              break;

            case 46:
              _context4.prev = 46;
              _context4.t1 = _context4['catch'](42);
              _didIteratorError3 = true;
              _iteratorError3 = _context4.t1;

            case 50:
              _context4.prev = 50;
              _context4.prev = 51;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 53:
              _context4.prev = 53;

              if (!_didIteratorError3) {
                _context4.next = 56;
                break;
              }

              throw _iteratorError3;

            case 56:
              return _context4.finish(53);

            case 57:
              return _context4.finish(50);

            case 58:
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context4.prev = 61;
              for (_iterator4 = (0, _getIterator3.default)(newList); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                _appId = _step4.value;

                if (!oldList.includes(_appId)) {
                  addList.push(_appId);
                }
              }
              // 4.删除要移除的应用
              _context4.next = 69;
              break;

            case 65:
              _context4.prev = 65;
              _context4.t2 = _context4['catch'](61);
              _didIteratorError4 = true;
              _iteratorError4 = _context4.t2;

            case 69:
              _context4.prev = 69;
              _context4.prev = 70;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 72:
              _context4.prev = 72;

              if (!_didIteratorError4) {
                _context4.next = 75;
                break;
              }

              throw _iteratorError4;

            case 75:
              return _context4.finish(72);

            case 76:
              return _context4.finish(69);

            case 77:
              if (!(removeList && removeList.length)) {
                _context4.next = 80;
                break;
              }

              _context4.next = 80;
              return _Model2.default.doRemoveUserApps({
                user_id: reqBody['id'],
                appIds: removeList
              });

            case 80:
              if (!(addList && addList.length)) {
                _context4.next = 108;
                break;
              }

              _context4.next = 83;
              return _Model2.default.getAppsInIds({
                ids: addList
              });

            case 83:
              apps = _context4.sent;

              if (!(apps && apps.count && apps.rows)) {
                _context4.next = 108;
                break;
              }

              // 处理数据
              appList = apps.rows;
              userAppList = [];
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              _context4.prev = 90;

              for (_iterator5 = (0, _getIterator3.default)(appList); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                _item = _step5.value;

                userAppList.push({
                  user_id: reqBody['id'],
                  app_id: _item.id,
                  app_name: _item.name,
                  app_title: _item.title,
                  app_description: _item.description,
                  app_type: _item.type,
                  user_type: _item.user_type,
                  app_publish: _item.publish,
                  config: _item.config,
                  status: 1,
                  private: 0,
                  create_time: timeNow,
                  update_time: timeNow
                });
              }
              // 批量场景
              _context4.next = 98;
              break;

            case 94:
              _context4.prev = 94;
              _context4.t3 = _context4['catch'](90);
              _didIteratorError5 = true;
              _iteratorError5 = _context4.t3;

            case 98:
              _context4.prev = 98;
              _context4.prev = 99;

              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }

            case 101:
              _context4.prev = 101;

              if (!_didIteratorError5) {
                _context4.next = 104;
                break;
              }

              throw _iteratorError5;

            case 104:
              return _context4.finish(101);

            case 105:
              return _context4.finish(98);

            case 106:
              _context4.next = 108;
              return _Model2.default.doAddUserApps(userAppList);

            case 108:
              res = {
                status: 200,
                msg: '编辑账号成功！',
                data: res
              };
              _context4.next = 114;
              break;

            case 111:
              _context4.prev = 111;
              _context4.t4 = _context4['catch'](11);

              res = {
                status: 200,
                msg: '编辑账号成功！更新用户应用失败！',
                data: _context4.t4
              };

            case 114:
              _context4.next = 117;
              break;

            case 116:
              res = {
                status: 5000,
                msg: '编辑账号失败！',
                data: res
              };

            case 117:
              _context4.next = 120;
              break;

            case 119:
              res = {
                status: 5001,
                msg: '编辑账号失败，上送参数有误！',
                data: {}
              };

            case 120:

              ctx.body = res || {};

            case 121:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[11, 111], [20, 24, 28, 36], [29,, 31, 35], [42, 46, 50, 58], [51,, 53, 57], [61, 65, 69, 77], [70,, 72, 76], [90, 94, 98, 106], [99,, 101, 105]]);
    }));

    return function doEditAccount(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),
  // 获取所有的应用
  getAllApps: function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var reqQuery, res;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return next();

            case 2:
              reqQuery = ctx.query;
              res = void 0;

              if (!(reqQuery && reqQuery.hasOwnProperty('user_type'))) {
                _context5.next = 11;
                break;
              }

              _context5.next = 7;
              return _Model2.default.getAllApps({
                user_type: parseInt(reqQuery['user_type']),
                // 只查询已发布的应用
                publish: 1
              });

            case 7:
              res = _context5.sent;

              // 处理结果
              if (res) {
                res = {
                  status: 200,
                  msg: '查询应用列表成功！',
                  data: {
                    count: res.count,
                    list: res.rows
                  }
                };
              } else {
                res = {
                  status: 5000,
                  msg: '查询应用列表失败！',
                  data: res
                };
              }
              _context5.next = 12;
              break;

            case 11:
              res = {
                status: 5001,
                msg: '查询应用列表失败，上送参数有误！',
                data: {}
              };

            case 12:

              ctx.body = res || {};

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function getAllApps(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
}; /**
    * Created by OXOYO on 2017/7/11.
    *
    * 账号控制器
    */