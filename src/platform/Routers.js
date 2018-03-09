/**
 * Created by OXOYO on 2018/3/9.
 */

import Ctrl from './Ctrl'
import auth from '../auth'

const namespace = '/Platform/'

export default (router) => {
  router
    .get(namespace + 'user/config', auth.verifyToken, Ctrl.user.getPlatformConfigByUserId)
    .post(namespace + 'user/signIn', Ctrl.user.doSignIn)
    .get(namespace + 'user/BaseInfo', auth.verifyToken, Ctrl.user.getBaseInfo)
    // .post(namespace + 'user/logout', Ctrl.user.doLogout)
    .get(namespace + 'user/application/list', auth.verifyToken, Ctrl.user.getApplicationListByUserId)
    .post(namespace + 'user/application/pinned/update', auth.verifyToken, Ctrl.user.doAppPinnedUpdate)
    .get(namespace + 'components/wallpaper/bing', Ctrl.components.getBingWallpaper)
}
