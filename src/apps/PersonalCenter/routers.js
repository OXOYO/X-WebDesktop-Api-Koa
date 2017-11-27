/**
 * Created by OXOYO on 2017/10/9.
 */

import Ctrl from './Ctrl'
import auth from '../../auth'

const namespace = '/PersonalCenter/'

export default (router) => {
  router
    .get(namespace + 'BaseInfo', auth.verifyToken, Ctrl.getBaseInfo)
}
