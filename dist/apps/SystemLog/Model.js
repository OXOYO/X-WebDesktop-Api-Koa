'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by OXOYO on 2018/4/25.
 */

var readline = require('readline');
var fs = require('fs');

exports.default = {
  getLogList: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data, ctx) {
      var fileName, filePath, fileStream, reg, wait, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 1.读取指定日期的文件
              fileName = data.logType + '-' + data.date + '.log';
              filePath = './logs/' + fileName;
              fileStream = void 0;
              reg = {
                error: {
                  blockStart: /^\[\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*\]\s\[ERROR\]\serror\s-$/,
                  blockCreateTimeStr: /^\[\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*\]/,
                  blockCreateTime: /\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*/,
                  start: /^\*+\sERROR\sSTART\s\*+$/,
                  end: /^\*+\sERROR\sEND\s\*+$/
                },
                result: {
                  blockStart: /^\[\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*\]\s\[INFO\]\sresult\s-$/,
                  blockCreateTimeStr: /^\[\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*\]/,
                  blockCreateTime: /\d{4}-\d{2}-\d{2}[\w\s]*\d{2}:\d{2}:\d{2}[.\d]*/,
                  start: /^\*+\sRESPONSE\sSTART\s\*+$/,
                  end: /^\*+\sRESPONSE\sEND\s\*+$/
                },
                common: {
                  userInfo: /^request userInfo:/,
                  method: /^request method:/,
                  origin: /^request originalUrl:/,
                  client_ip: /^request client ip:/,
                  requestQuery: /^request query:/,
                  requestBody: /^request body:/,
                  responseTime: /^response time:/,
                  responseStatus: /^response status:/,
                  responseBody: /^response body:/,
                  errName: /^err name:/,
                  errMessage: /^err message:/,
                  errStack: /^err stack:/
                }
                // 判断文件是否存在
              };
              _context.prev = 4;

              fs.statSync(filePath);
              fileStream = fs.createReadStream(filePath);
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](4);
              return _context.abrupt('return', {
                msg: '读取日志文件失败，日志文件不存在！',
                statusText: 'error',
                list: []
              });

            case 12:
              wait = function wait() {
                return new _promise2.default(function (resolve, reject) {
                  var logMap = {};
                  var lineList = [];
                  try {
                    var rl = readline.createInterface({
                      input: fileStream
                    });
                    rl.on('line', function (line) {
                      lineList.push(line.trim());
                    });
                    rl.on('close', function () {
                      if (lineList.length) {
                        (function () {
                          var blockFlag = false;
                          var blockCreateTime = null;
                          var requestBodyFlag = false;
                          var responseBodyFlag = false;
                          var commonKeys = (0, _keys2.default)(reg.common);
                          var commonKeysLen = commonKeys.length;

                          var _loop = function _loop(i, len, _line) {
                            _line = lineList[i];
                            // 处理日志块起始
                            if (reg[data.logType].blockStart.test(_line)) {
                              var matchRes = _line.match(reg[data.logType].blockCreateTimeStr);
                              var createTime = void 0;
                              if (matchRes && matchRes[0]) {
                                createTime = matchRes[0].match(reg[data.logType].blockCreateTime)[0];
                                var random = Math.floor(Math.random(0, 1) * 10000);
                                blockCreateTime = createTime + '_' + random;
                              }
                              if (createTime && blockCreateTime && !logMap[blockCreateTime]) {
                                // 初始化
                                logMap[blockCreateTime] = {
                                  create_at: createTime
                                };
                                return 'continue';
                              }
                            }
                            if (!logMap[blockCreateTime]) {
                              return 'continue';
                            }
                            // 处理flag
                            if (reg[data.logType].start.test(_line)) {
                              blockFlag = true;
                              requestBodyFlag = false;
                              responseBodyFlag = false;
                              return 'continue';
                            }
                            if (reg.common.responseTime.test(_line)) {
                              requestBodyFlag = false;
                            }
                            if (reg[data.logType].end.test(_line)) {
                              // 处理requestBody、responseBody
                              ['requestBody', 'responseBody'].map(function (key) {
                                if (logMap[blockCreateTime][key]) {
                                  var bodyStr = logMap[blockCreateTime][key].join('');
                                  var bodyObj = {};
                                  if (bodyStr) {
                                    try {
                                      bodyObj = JSON.parse(bodyStr);
                                    } catch (e) {
                                      bodyObj = bodyStr;
                                    }
                                  }
                                  logMap[blockCreateTime][key] = bodyObj;
                                }
                              });
                              blockFlag = false;
                              blockCreateTime = null;
                              requestBodyFlag = false;
                              responseBodyFlag = false;
                              return 'continue';
                            }
                            if (blockCreateTime && blockFlag) {
                              if (!requestBodyFlag) {
                                for (var j = 0, key; j < commonKeysLen; j++) {
                                  key = commonKeys[j];
                                  if (['requestBody'].includes(key) && reg.common[key].test(_line)) {
                                    requestBodyFlag = key;
                                    break;
                                  } else {
                                    requestBodyFlag = false;
                                  }
                                }
                              }
                              if (!responseBodyFlag) {
                                for (var _j = 0, _key; _j < commonKeysLen; _j++) {
                                  _key = commonKeys[_j];
                                  if (['errStack', 'responseBody'].includes(_key) && reg.common[_key].test(_line)) {
                                    responseBodyFlag = _key;
                                    break;
                                  } else {
                                    responseBodyFlag = false;
                                  }
                                }
                              }
                              if (requestBodyFlag) {
                                if (!logMap[blockCreateTime][requestBodyFlag]) {
                                  logMap[blockCreateTime][requestBodyFlag] = [];
                                }
                                var val = _line.replace(reg.common[requestBodyFlag], '').trim();
                                if (val) {
                                  logMap[blockCreateTime][requestBodyFlag].push(val);
                                }
                              } else if (responseBodyFlag) {
                                if (!logMap[blockCreateTime][responseBodyFlag]) {
                                  logMap[blockCreateTime][responseBodyFlag] = [];
                                }
                                var _val = _line.replace(reg.common[responseBodyFlag], '').trim();
                                if (_val) {
                                  logMap[blockCreateTime][responseBodyFlag].push(_val);
                                }
                              } else {
                                (0, _keys2.default)(reg.common).map(function (key) {
                                  if (!['requestBody', 'errStack', 'responseBody'].includes(key) && reg.common[key].test(_line)) {
                                    var _val2 = _line.replace(reg.common[key], '').trim();
                                    switch (key) {
                                      case 'userInfo':
                                        if (_val2 && _val2 !== 'undefined') {
                                          try {
                                            _val2 = JSON.parse(_val2);
                                          } catch (e) {
                                            _val2 = {};
                                          }
                                        } else {
                                          _val2 = {};
                                        }
                                        break;
                                      case 'responseTime':
                                        _val2 = parseInt(_val2);
                                        break;
                                    }
                                    logMap[blockCreateTime][key] = _val2;
                                  }
                                });
                              }
                            }
                            line = _line;
                          };

                          for (var i = 0, len = lineList.length, line; i < len; i++) {
                            var _ret2 = _loop(i, len, line);

                            if (_ret2 === 'continue') continue;
                          }
                        })();
                      }
                      var list = (0, _values2.default)(logMap);
                      logMap = null;
                      lineList = null;
                      resolve(list);
                    });
                  } catch (e) {
                    logMap = null;
                    lineList = null;
                    reject(e);
                  }
                }).then(function (logList) {
                  if (logList && logList.length) {
                    // 执行过滤
                    // 默认过滤掉一些接口
                    var unlessApi = ['api/SystemLog/list'];
                    unlessApi.map(function (val) {
                      logList = logList.filter(function (item) {
                        if (item.origin) {
                          return !item.origin.includes(val);
                        }
                        return false;
                      });
                    });

                    // 处理OA账号、用户名过滤
                    if (data.filterUserType && data.filterUserKeywords) {
                      logList = logList.filter(function (item) {
                        if (item.userInfo && (0, _keys2.default)(item.userInfo).length) {
                          return item.userInfo[data.filterUserType].includes(data.filterUserKeywords);
                        }
                        return false;
                      });
                    }
                    // 处理用户类别过滤
                    if (data.userType && data.userType.length) {
                      logList = logList.filter(function (item) {
                        if (item.userInfo && (0, _keys2.default)(item.userInfo).length) {
                          return data.userType.includes(item.userInfo.type);
                        }
                        return false;
                      });
                    }
                    // 处理origin过滤
                    if (data.origin) {
                      logList = logList.filter(function (item) {
                        if (item.origin) {
                          return item.origin.includes(data.origin);
                        }
                        return false;
                      });
                    }
                    // 处理method过滤
                    if (data.method) {
                      logList = logList.filter(function (item) {
                        if (item.method) {
                          return data.method.includes(item.method);
                        }
                        return false;
                      });
                    }
                    // 处理status过滤
                    if (data.status) {
                      var statusArr = data.status.split(',');
                      logList = logList.filter(function (item) {
                        if (item.responseStatus) {
                          return statusArr.includes(item.responseStatus);
                        }
                        return false;
                      });
                    }
                    // 处理关键字过滤
                    if (data.filterType && data.filterKeywords) {
                      logList = logList.filter(function (item) {
                        var key = void 0;
                        if (data.filterType === 'request') {
                          if (item.method === 'GET') {
                            key = 'requestQuery';
                          } else {
                            key = 'requestBody';
                          }
                        } else if (data.filterType === 'response') {
                          if (data.logType === 'error') {
                            key = 'errStack';
                          } else if (data.logType === 'result') {
                            key = 'responseBody';
                          }
                        }
                        if (key && item[key]) {
                          if (typeof item[key] === 'string' || item[key] instanceof Array) {
                            return item[key].includes(data.filterKeywords);
                          } else if (item[key] instanceof Object) {
                            try {
                              return (0, _stringify2.default)(item[key]).includes(data.filterKeywords);
                            } catch (e) {
                              return false;
                            }
                          } else {
                            return false;
                          }
                        }
                        return false;
                      });
                    }
                  }
                  var ret = {
                    msg: '读取日志文件成功！',
                    statusText: 'success',
                    list: [].concat((0, _toConsumableArray3.default)(logList))
                  };
                  logList = null;
                  fileStream = null;
                  return ret;
                }, function (err) {
                  fileStream = null;
                  return {
                    msg: '读取日志文件失败，日志文件解析出错！',
                    statusText: 'error',
                    err: err,
                    list: []
                  };
                });
              };

              _context.next = 15;
              return wait();

            case 15:
              res = _context.sent;
              return _context.abrupt('return', res);

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[4, 9]]);
    }));

    return function getLogList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
};