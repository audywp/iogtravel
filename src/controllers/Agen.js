const AgenModel = require('../models/Agen')
const BusModel = require('../models/Bus')
module.exports = {
  getUserDetail: async (req, res) => {
    const results = await AgenModel.getAgen()
    console.log(results)
    const data = {
      succes: true,
      data: results
    }
    res.send(data)
  },
  create: async (req, res) => {
    if (req.user.roleId === 3) {
      const data = {
        success: false,
        msg: 'You\'re not allowed to access this feature'
      }
      res.send(data)
    }
    const { roleId } = req.user
    const { name, classBus, nameBus, sheets } = req.body
    const results = await AgenModel.createAgen(name)
    const createBus = await BusModel.createBusess(roleId, classBus, nameBus, sheets)
    console.log(roleId)
    console.log(results)
    const data = {
      success: true,
      msg: 'agen has been created',
      data: results,
      createBus
    }
    res.send(data)
  },
  update: async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const results = await AgenModel.updateAgen(id, name)
    const data = {
      success: true,
      msg: 'data uptodated',
      data: results.inserId
    }
    res.send(data)
  },
  delete: async (req, res) => {
    const { id } = req.params
    const results = await AgenModel.deleteAgen(id)
    const data = {
      success: true,
      msg: 'data uptodated',
      data: results.inserId
    }
    res.send(data)
  }
}
