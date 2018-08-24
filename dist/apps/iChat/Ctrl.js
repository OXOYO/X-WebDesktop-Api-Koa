'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  doSendMessage: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var reqBody, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return next();

            case 2:
              // TODO 处理参数
              reqBody = ctx.request.body;
              // 查询结果

              res = void 0;
              _context.prev = 4;
              _context.next = 7;
              return _axios2.default.post('http://openapi.tuling123.com/openapi/api/v2', reqBody);

            case 7:
              res = _context.sent;

              res = {
                status: 200,
                msg: '发送消息成功！',
                data: res.data
              };
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](4);

              res = {
                status: 5000,
                msg: '发送消息失败',
                data: _context.t0
              };

            case 14:
              ctx.body = res || {};

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[4, 11]]);
    }));

    return function doSendMessage(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
}; /**
    * Created by OXOYO on 2017/10/9.
    */

// import Model from './Model'