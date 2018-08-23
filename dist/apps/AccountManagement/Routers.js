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
 * Created by OXOYO on 2017/7/11.
 *
 * 账号路由
 */

var namespace = '/AccountManagement/';

exports.default = function (router) {
  router.get(namespace + 'account/list', _auth2.default.verifyToken, _Ctrl2.default.getAccountList).post(namespace + 'account/add', _auth2.default.verifyToken, _Ctrl2.default.doAddAccount).post(namespace + 'account/edit', _auth2.default.verifyToken, _Ctrl2.default.doEditAccount).post(namespace + 'account/remove', _auth2.default.verifyToken, _Ctrl2.default.doDelUserAccount).get(namespace + 'apps/all', _auth2.default.verifyToken, _Ctrl2.default.getAllApps);
};