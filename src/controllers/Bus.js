const BusModel = require('../models/Bus')
module.exports = {
  read: async (req, res) => {
    const results = await BusModel.getAllBusess()
    const data = {
      success: true,
      msg: 'test',
      data: results
    }
    res.send(data)
  },
  create: async (req, res) => {
    const { _class, name } = req.body
    const results = await BusModel.createBusess(_class, name)
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  update: async (req, res) => {
    const { _class, name } = req.body
    const { id } = req.params
    const results = await BusModel.updateBusess(id, _class, name)
    if (results) {
      const data = {
        success: true,
        msg: `${id} has been update`,
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
    const results = await BusModel.deleteBusess(id)
    if (results) {
      const data = {
        success: true,
        msg: `${id} deleted`,
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
  }
}
