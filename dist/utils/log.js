'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _log4js = require('log4js');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 格式化响应日志
/**
 * Created by OXOYO on 2017/11/2.
 */

var formatRes = function formatRes(ctx, ms) {
  var tmpArr = [];

  tmpArr.push('\n' + '********** RESPONSE START **********' + '\n\n');
  tmpArr.push('  request userInfo: ' + (0, _stringify2.default)(ctx.state.userInfo) + '\n\n');
  tmpArr.push(formatReq(ctx.request, ms) + '\n');
  tmpArr.push('  response status: ' + ctx.status + '\n');
  tmpArr.push('  response body: ' + '\n  ' + (0, _stringify2.default)(ctx.body) + '\n\n');
  tmpArr.push('********** RESPONSE END **********' + '\n');

  return tmpArr.join('');
};

// 格式化错误日志
var formatError = function formatError(ctx, err, ms) {
  var tmpArr = [];

  tmpArr.push('\n' + '********** ERROR START **********' + '\n\n');
  tmpArr.push('  request userInfo: ' + (0, _stringify2.default)(ctx.state.userInfo) + '\n\n');
  tmpArr.push(formatReq(ctx.request, ms));
  tmpArr.push('  err name: ' + err.name + '\n');
  tmpArr.push('  err message: ' + err.message + '\n');
  tmpArr.push('  err stack: ' + err.stack + '\n\n');
  tmpArr.push('********** ERROR END **********' + '\n');

  return tmpArr.join('');
};

// 格式化请求日志
var formatReq = function formatReq(req, ms) {
  var tmpArr = [];

  tmpArr.push('  request method: ' + req.method + '\n');
  tmpArr.push('  request originalUrl: ' + req.originalUrl + '\n');
  tmpArr.push('  request client ip: ' + req.ip + '\n');
  if (req.method === 'GET') {
    tmpArr.push('  request query: ' + (0, _stringify2.default)(req.query) + '\n');
  } else {
    tmpArr.push('  request body: ' + '\n  ' + (0, _stringify2.default)(req.body) + '\n');
  }
  tmpArr.push('  response time: ' + ms + '\n');

  return tmpArr.join('');
};

// 处理日志排除
var handleLogExclude = function handleLogExclude(ctx) {
  var originalUrl = ctx.request.originalUrl || '';
  // 是否排除标识
  var isExclude = false;
  if (!originalUrl || !_config.logExclude.length) {
    return false;
  }
  for (var i = 0, len = _config.logExclude.length; i < len; i++) {
    if (originalUrl.includes(_config.logExclude[i])) {
      isExclude = true;
      break;
    }
  }
  return isExclude;
};

// 加载配置文件
(0, _log4js.configure)(_config.Log);

// log 中间件
var log = {
  error: function error(ctx, _error, ms) {
    if (ctx && _error) {
      (0, _log4js.getLogger)('error').error(formatError(ctx, _error, ms));
    }
  },
  response: function response(ctx, ms) {
    if (ctx && !handleLogExclude(ctx)) {
      (0, _log4js.getLogger)('result').info(formatRes(ctx, ms));
    }
  }
};
exports.log = log;