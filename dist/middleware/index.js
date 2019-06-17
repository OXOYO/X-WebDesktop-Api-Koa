'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middleware;

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaHelmet = require('koa-helmet');

var _koaHelmet2 = _interopRequireDefault(_koaHelmet);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaGenericSession = require('koa-generic-session');

var _koaGenericSession2 = _interopRequireDefault(_koaGenericSession);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _pipe = require('./pipe');

var _pipe2 = _interopRequireDefault(_pipe);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FIXME 如下中间件存在问题，会导致路由加载失败，待查。
/**
 * Created by OXOYO on 2017/7/10.
 *
 * 中间件处理函数
 */

function middleware(app) {
  return (0, _koaCompose2.default)([(0, _koaLogger2.default)(), (0, _koaHelmet2.default)(), (0, _koaStatic2.default)('.'),
  // 跨域处理
  (0, _koaConvert2.default)((0, _koaCors2.default)({
    origin: true,
    exposeHeaders: [],
    maxAge: 5,
    credentials: true,
    // headers: ['Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'token'],
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS']
  })), (0, _koaConvert2.default)((0, _koaBodyparser2.default)({
    enableTypes: ['json', 'form'],
    strict: false,
    jsonLimit: '20mb',
    formLimit: '10mb',
    textLimit: '20mb'
  })), (0, _koaConvert2.default)((0, _koaGenericSession2.default)(app)), (0, _pipe2.default)()]);
}