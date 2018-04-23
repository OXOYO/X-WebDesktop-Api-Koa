/**
 * Created by OXOYO on 2017/7/12.
 */

import Ctrl from './Ctrl'
import auth from '../../auth'

const namespace = '/ApplicationMarket/'

export default (router) => {
  router
    .get(namespace + 'category/list', auth.verifyToken, Ctrl.getCategoryList)
    .get(namespace + 'application/list', auth.verifyToken, Ctrl.getApplicationList)
    .post(namespace + 'edit', auth.verifyToken, auth.verifyAdmin, Ctrl.doEditApp)
    .post(namespace + 'add', auth.verifyToken, auth.verifyAdmin, Ctrl.doAddApp)
    // .post(namespace + 'update', auth.verifyToken, Ctrl.doUpdateApp)
    // .post(namespace + 'remove', auth.verifyToken, Ctrl.doRemoveApp)
    .post(namespace + 'install', auth.verifyToken, Ctrl.doInstallApp)
    .post(namespace + 'icon/upload', auth.verifyToken, auth.verifyAdmin, Ctrl.doUploadIcon)
}
