const RouteModel = require('../models/Route')

module.exports = {
  read: async (req, res) => {
    const results = await RouteModel.showRoute()
    const data = {
      success: true,
      results
    }
    res.send(data)
  },
  create: async (req, res) => {
    const { firstPlace, destination } = req.body
    const results = await RouteModel.createRoutes(firstPlace, destination)
    const data = {
      success: true,
      msg: 'routes has been created',
      data: results
    }
    res.send(data)
  },
  update: async (req, res) => {
    const { id } = req.params
    const { firstPlace, destination } = req.body
    const results = await RouteModel.updateRoutes(id, firstPlace, destination)
    if (results) {
      const data = {
        success: true,
        msg: 'data has been changed',
        data: { id, ...req.body }
      }
      res.send(data)
    }
  },
  delete: async (req, res) => {
    const { id } = req.params
    const results = await RouteModel.deleteRoutes(id)
    if (results) {
      const data = {
        success: true,
        msg: 'busses has been deleted',
        data: { id, ...req.body }
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
