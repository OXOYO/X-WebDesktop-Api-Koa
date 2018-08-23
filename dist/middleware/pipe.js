'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = pipe;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by OXOYO on 2017/7/11.
 *
 * resCode [Number]
 * 200 成功
 * 400 用户级别错误
 * 500 服务器级别错误
 * 511 校验级别错误
 */

function pipe() {
  var _this = this;

  var spellRespone = function spellRespone(code, msg, body) {
    // mongod validation failed callback
    msg.indexOf('validation failed') !== -1 ? msg = '数据格式非法' : msg;

    // callback
    return {
      code: code,
      msg: msg,
      data: body
    };
  };

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var status, _status;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return next();

            case 3:
              status = ctx.status || 404;

              if (status === 404) {
                ctx.throw(400);
              }
              if (ctx.body) {
                ctx.body = spellRespone(status, ctx.message, ctx.body);
              }
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);
              _status = _context.t0.status || 400;

              if (_status === 400) {
                ctx.body = spellRespone(_status, _context.t0.message);
              } else {
                ctx.app.emit('error', _context.t0, ctx);
              }

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}