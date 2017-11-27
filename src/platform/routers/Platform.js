/**
 * Created by OXOYO on 2017/7/13.
 *
 * 平台配置信息路由
 */

import Ctrl from '../controllers/Platform'
import auth from '../../auth'

const namespace = '/Platform/'

export default (router) => {
  router
    .get(namespace + 'config/user', auth.verifyToken, Ctrl.config.getPlatformConfigByUserId)
    .post(namespace + 'user/signIn', Ctrl.user.doSignIn)
    .get(namespace + 'user/BaseInfo', auth.verifyToken, Ctrl.user.getBaseInfo)
    // .post(namespace + 'user/logout', Ctrl.user.doLogout)
    .get(namespace + 'components/wallpaper/bing', Ctrl.components.getBingWallpaper)
}
