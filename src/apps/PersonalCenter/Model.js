/**
 * Created by OXOYO on 2017/10/9.
 */

import db from '../../db'

const usersModel = '../../schema/platform_users'
const usersSchema = db.import(usersModel)

export default {
  getBaseInfo: async function (userId) {
    return await usersSchema.findOne({
      where: {
        'id': userId
      },
      logging: true
    })
  }
}
