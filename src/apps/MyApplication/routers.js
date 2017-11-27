/**
 * Created by OXOYO on 2017/7/12.
 */

import Ctrl from './Ctrl'
import auth from '../../auth'

const namespace = '/MyApplication/'

export default (router) => {
  router
    .get(namespace + 'list', auth.verifyToken, Ctrl.getApplicationList)
    .post(namespace + 'edit', auth.verifyToken, Ctrl.doEditApp)
    .post(namespace + 'add', auth.verifyToken, Ctrl.doAddApp)
    .post(namespace + 'update', auth.verifyToken, Ctrl.doUpdateApp)
    .post(namespace + 'remove', auth.verifyToken, Ctrl.doRemoveApp)
    .post(namespace + 'icon/upload', auth.verifyToken, Ctrl.doUploadIcon)
}
