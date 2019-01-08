'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _config = require('./config');

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var env = process.env.NODE_ENV || 'development'; // Current mode

app.keys = [_config.System.sessionKey];

app.proxy = true;

// 注册log
app.use(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var startTime, ms;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            startTime = new Date();
            ms = void 0;
            _context.prev = 2;
            _context.next = 5;
            return next();

          case 5:
            ms = new Date() - startTime;
            _utils2.default.log.response(ctx, ms);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](2);

            ms = new Date() - startTime;
            _utils2.default.log.error(ctx, _context.t0, ms);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// 注册qs
require('koa-qs')(app);
// import KoaStatic from 'koa-static'
// app.use(KoaStatic('assets'))
// 注册路由
app.use((0, _api2.default)());
// 注册中间件
app.use((0, _middleware2.default)(app));

if (env === 'development') {
  // logger
  app.use(function (ctx, next) {
    var start = new Date();
    return next().then(function () {
      var ms = new Date() - start;
      console.log(ctx.method + ' ' + ctx.url + ' - ' + ms + 'ms');
    });
  });
}

// token验证返回
app.use(function (ctx, next) {
  return next().catch(function (err) {
    if (err.status === 401) {
      // ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n';
      return;
    } else {
      throw err;
    }
  });
});

app.on('error', function (err, ctx) {
  console.log('server error', err);
});

app.listen(_config.System.port, function () {
  console.log('x-webdesktop-api is listening to http://localhost:' + _config.System.port);
});

exports.default = app;