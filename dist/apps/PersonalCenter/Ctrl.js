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
  getBaseInfo: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var reqQuery, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return next();

            case 2:
              // TODO 处理参数
              reqQuery = ctx.query;
              res = void 0;

              if (!(reqQuery && reqQuery.userId)) {
                _context.next = 11;
                break;
              }

              _context.next = 7;
              return _Model2.default.getBaseInfo(reqQuery.userId);

            case 7:
              res = _context.sent;

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
              _context.next = 12;
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
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function getBaseInfo(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
}; /**
    * Created by OXOYO on 2017/10/9.
    */