/**
 * Created by OXOYO on 2017/10/9.
 */

import Ctrl from './Ctrl'
import auth from '../../auth'

const namespace = '/iChat/'

export default (router) => {
  router
    .post(namespace + 'sendMessage', auth.verifyToken, Ctrl.doSendMessage)
}
