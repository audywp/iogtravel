const UserDetailModel = require('../models/UserDetail')

module.exports = {
  read: async (req, res) => {
    console.log(req.user)
    if (req.user.roleId !== 3) {
      const results = await UserDetailModel.getAllInformation()
      const data = {
        success: true,
        data: results
      }
      res.send(data)
    } else {
      const { id } = req.user.id
      const results = await UserDetailModel.getUserInformation(id)
      const data = {
        success: true,
        data: results
      }
      res.send(data)
    }
  },
  create: async (req, res) => {
    const { id } = req.user.id
    const { name, age, phone, email } = req.body
    const results = await UserDetailModel.createUserInformation(id, name, age, phone, email)
    const data = {
      success: true,
      msg: 'data has been created',
      data: results
    }
    res.send(data)
  },
  update: async (req, res) => {
    const { id } = req.params
    const { name, age, phone, email } = req.body
    const results = await UserDetailModel.updateUserInformation(id, name, age, phone, email)
    if (results) {
      const data = {
        success: true,
        msg: 'data succesfully updated',
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: 'no data'
      }
      res.send(data)
    }
  },
  delete: async (req, res) => {
    const { id } = req.params
    const results = await UserDetailModel.deleteUser(id)
    if (results) {
      const data = {
        success: true,
        msg: 'deleted'
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: 'there is no data to delete'
      }
      res.send(data)
    }
  }
}
