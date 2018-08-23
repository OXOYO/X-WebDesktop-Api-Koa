'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Ctrl = require('./Ctrl');

var _Ctrl2 = _interopRequireDefault(_Ctrl);

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by OXOYO on 2017/10/9.
 */

var namespace = '/PersonalCenter/';

exports.default = function (router) {
  router.get(namespace + 'BaseInfo', _auth2.default.verifyToken, _Ctrl2.default.getBaseInfo);
};