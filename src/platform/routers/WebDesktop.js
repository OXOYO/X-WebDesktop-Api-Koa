/**
 * Created by OXOYO on 2017/7/19.
 */
import Ctrl from '../controllers/WebDesktop'
import auth from '../../auth'

const namespace = '/WebDesktop/'

export default (router) => {
  router
    .get(namespace + 'application/list', auth.verifyToken, Ctrl.getApplicationListByUserId)
    .post(namespace + 'application/pinned/update', auth.verifyToken, Ctrl.doAppPinnedUpdate)
}
