'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by OXOYO on 2017/9/26.
 *
 * 鉴权
 */
exports.default = {
  // 生成token
  sign: function sign(data) {
    var token = _jsonwebtoken2.default.sign(data, _config.cookieConfig.keys.secret, { expiresIn: '1d' });
    return token;
  },
  // token 验证
  verifyToken: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var key, token, decoded, verifyRes;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 支持多种方式传递token
              key = _config.cookieConfig.keys.token;
              token = void 0;
              decoded = void 0;
              // 校验结果

              verifyRes = {
                // 标识
                flag: false,
                // 数据
                data: {}
              };

              if (ctx.body && Object.prototype.hasOwnProperty.call(ctx.body, key)) {
                token = ctx.body[key];
              } else if (ctx.query && Object.prototype.hasOwnProperty.call(ctx.query, key)) {
                token = ctx.query[key];
              } else if (ctx.headers && Object.prototype.hasOwnProperty.call(ctx.headers, key)) {
                token = ctx.headers[key];
              } else {
                token = null;
              }
              // 1.定义unless path
              // let unlessPath = []
              // 2.判断是否存在token
              if (token) {
                try {
                  // 2.1.verify验证token
                  decoded = _jsonwebtoken2.default.verify(token, _config.cookieConfig.keys.secret);
                  // 2.1.验证token是否过期
                  if (decoded.exp * 1000 <= new Date()) {
                    verifyRes = {
                      flag: false,
                      data: {
                        status: 9999,
                        msg: 'token过期！请重新登录！',
                        data: {}
                      }
                    };
                  } else {
                    verifyRes = {
                      flag: true,
                      data: {}
                    };
                  }
                } catch (err) {
                  verifyRes = {
                    flag: false,
                    data: {
                      status: 9999,
                      msg: 'token校验失败！请重新登录！',
                      data: err
                    }
                  };
                }
              } else {
                verifyRes = {
                  flag: false,
                  data: {
                    status: 9999,
                    msg: 'token无效！请重新登录！',
                    data: {}
                  }
                };
              }
              // 判断校验结果，分别处理

              if (!verifyRes.flag) {
                _context.next = 13;
                break;
              }

              // token有效，传递给上下文
              ctx.state['userInfo'] = decoded;
              _context.next = 10;
              return next();

            case 10:
              return _context.abrupt('return');

            case 13:
              _context.next = 15;
              return next();

            case 15:
              ctx.body = verifyRes.data;

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function verifyToken(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return verifyToken;
  }(),
  // 用户鉴权：管理员
  verifyAdmin: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var userInfo;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // TODO 鉴权用户级别
              userInfo = ctx.state.userInfo;

              if (!userInfo) {
                _context2.next = 13;
                break;
              }

              if (!(userInfo.type === 0)) {
                _context2.next = 8;
                break;
              }

              _context2.next = 5;
              return next();

            case 5:
              return _context2.abrupt('return');

            case 8:
              _context2.next = 10;
              return next();

            case 10:
              ctx.body = {
                status: 9999,
                msg: '用户权限不足！请重新登录！',
                data: {}
              };

            case 11:
              _context2.next = 16;
              break;

            case 13:
              _context2.next = 15;
              return next();

            case 15:
              ctx.body = {
                status: 9999,
                msg: '用户信息无效！请重新登录！',
                data: {}
              };

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function verifyAdmin(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return verifyAdmin;
  }()
};