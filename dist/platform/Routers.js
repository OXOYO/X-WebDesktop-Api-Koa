'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Ctrl = require('./Ctrl');

var _Ctrl2 = _interopRequireDefault(_Ctrl);

var _auth = require('../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by OXOYO on 2018/3/9.
 */

var namespace = '/Platform/';

exports.default = function (router) {
  router.get(namespace + 'user/config', _auth2.default.verifyToken, _Ctrl2.default.user.getPlatformConfigByUserId).post(namespace + 'user/signIn', _Ctrl2.default.user.doSignIn).get(namespace + 'user/BaseInfo', _auth2.default.verifyToken, _Ctrl2.default.user.getBaseInfo)
  // .post(namespace + 'user/logout', Ctrl.user.doLogout)
  .get(namespace + 'user/application/list', _auth2.default.verifyToken, _Ctrl2.default.user.getApplicationListByUserId).post(namespace + 'user/application/pinned/update', _auth2.default.verifyToken, _Ctrl2.default.user.doAppPinnedUpdate).post(namespace + 'user/application/install', _auth2.default.verifyToken, _Ctrl2.default.user.doInstallApp).post(namespace + 'user/application/uninstall', _auth2.default.verifyToken, _Ctrl2.default.user.doUninstallApp).get(namespace + 'components/wallpaper/bing', _Ctrl2.default.components.getBingWallpaper);
};