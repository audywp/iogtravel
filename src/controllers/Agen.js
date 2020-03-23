const AgenModel = require('../models/Agen')
const BusModel = require('../models/Bus')
const RouteModel = require('../models/Route')
const SchedulesModel = require('../models/Schedules')
module.exports = {
  getUserDetail: async (req, res) => {
    const results = await AgenModel.getAgen()
    console.log(results)
    const data = {
      succes: true,
      data: { results }
    }
    res.send(data)
  },
  create: async (req, res) => {
    // if (req.user.roleId === 3) {
    //   const data = {
    //     success: false,
    //     msg: 'you need to login as administrator'
    //   }
    //   res.send(data)
    // }

    const { name, classBus, sheets, price, firstPlace, destination, dateTime, departureTime } = req.body
    const results = await AgenModel.createAgen(name)
    const id = results.insertId
    const createBus = await BusModel.createBusess(id, classBus, sheets, price)
    const createRoles = await RouteModel.createRoutes(id, firstPlace, destination)
    const createSchedules = await SchedulesModel.createSchedules(id, dateTime, departureTime)
    console.log(createBus, createRoles, createSchedules)
    const data = {
      success: true,
      msg: 'agen has been created',
      data: { ...req.body }
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
