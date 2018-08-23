'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = api;

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = require('./config');

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO 鉴权、TOKEN


// 导入配置信息
/**
 * Created by OXOYO on 2017/7/10.
 */

function api() {
  var prefix = [_config.Api.prefix, _config.Api.version].join('/');
  var router = new _koaRouter2.default({ prefix: prefix });
  (0, _keys2.default)(_routers2.default).forEach(function (name) {
    return _routers2.default[name](router);
  });
  return (0, _koaCompose2.default)([router.routes(), router.allowedMethods({
    throw: true
  })]);
}
// 导入路由表