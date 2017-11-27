/**
 * Created by OXOYO on 2017/7/11.
 *
 * 账号路由
 */

import Ctrl from './Ctrl'
import auth from '../../auth'

const namespace = '/AccountManagement/'

export default (router) => {
  router
    .get(namespace + 'account/list', auth.verifyToken, Ctrl.getAccountList)
    .post(namespace + 'account/add', auth.verifyToken, Ctrl.doAddAccount)
    .post(namespace + 'account/edit', auth.verifyToken, Ctrl.doEditAccount)
    .post(namespace + 'account/remove', auth.verifyToken, Ctrl.doDelUserAccount)
    .get(namespace + 'apps/all', auth.verifyToken, Ctrl.getAllApps)
}
