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
 * Created by OXOYO on 2017/7/12.
 */

var namespace = '/ApplicationMarket/';

exports.default = function (router) {
  router.get(namespace + 'category/list', _auth2.default.verifyToken, _Ctrl2.default.getCategoryList).get(namespace + 'application/list', _auth2.default.verifyToken, _Ctrl2.default.getApplicationList).post(namespace + 'edit', _auth2.default.verifyToken, _auth2.default.verifyAdmin, _Ctrl2.default.doEditApp).post(namespace + 'add', _auth2.default.verifyToken, _auth2.default.verifyAdmin, _Ctrl2.default.doAddApp)
  // .post(namespace + 'update', auth.verifyToken, Ctrl.doUpdateApp)
  // .post(namespace + 'remove', auth.verifyToken, Ctrl.doRemoveApp)
  .post(namespace + 'install', _auth2.default.verifyToken, _Ctrl2.default.doInstallApp).post(namespace + 'icon/upload', _auth2.default.verifyToken, _auth2.default.verifyAdmin, _Ctrl2.default.doUploadIcon);
};