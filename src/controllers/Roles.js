const RolesModel = require('../models/Roles')
const bcrypt = require('bcryptjs')

module.exports = {
  createAdmin: async function (req, res) {
    const { username, password, isActive, isVerified, roleId } = req.body
    const encryptedPassword = bcrypt.hashSync(password)

    const results = await RolesModel.createAdmin(username, encryptedPassword, isActive, isVerified, roleId)
    delete req.body.password
    const data = {
      success: true,
      msg: `User ${username} has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  }
}
