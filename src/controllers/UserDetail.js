const UserdModel = require('../models/UserDetails')
const UserModel = require('../models/Users')
const AuthModel = require('../models/Auth')
module.exports = {
  getUserDetailByIdUser: async function (req, res) {
    const info = await AuthModel.getUserByUsername(req.user.username)
    const detail = await UserdModel.getUserDetailByIdUser(req.user.id)
    delete info.password
    delete info.verification_code
    delete info.is_active
    delete info.created_at
    delete info.updated_at
    if (detail) {
      const data = {
        success: true,
        detail,
        user: info
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'detail not created'
      }
      res.send(data)
    }
  },
  updateUserDetail: async function (req, res) {
    // const info = await UserdModel.getUserDetailByIdUser(req.user.id)
    // console.log(info.id_user)
    const picture = (req.file && req.file.filename) || null
    const { id } = req.params
    const { name, email, phone } = req.body
    const newName = name
    const newEmail = email
    const newPhone = phone
    await UserModel.uploadImage(id, picture)
    await UserdModel.updateUserDetailByIdUser(id, newName, newEmail, newPhone)
    const newDetail = await UserdModel.getUserDetailByIdUser(id)
    const data = {
      success: true,
      msg: 'update success',
      newDetail
    }
    res.send(data)
  }
}
