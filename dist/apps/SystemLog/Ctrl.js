'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getLogList: function () {
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
              return _Model2.default.getLogList(reqQuery, ctx);

            case 5:
              res = _context.sent;

              // 处理结果
              if (res && res.statusText === 'success') {
                res = {
                  status: 200,
                  msg: res.msg || '查询日志列表成功！',
                  data: res
                };
              } else {
                res = {
                  status: 5000,
                  msg: res.msg || '查询日志列表失败！',
                  data: res
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

    return function getLogList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
}; /**
    * Created by OXOYO on 2018/4/25.
    */