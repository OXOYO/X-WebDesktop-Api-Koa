/**
 * Created by OXOYO on 2018/4/25.
 */

import Ctrl from './Ctrl'
import auth from '../../auth'

const namespace = '/SystemLog/'

export default (router) => {
  router
    .get(namespace + 'list', auth.verifyToken, Ctrl.getLogList)
}
