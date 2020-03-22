const SchedulesModel = require('../models/Schedules')

module.exports = {
  read: async (req, res) => {
    const results = await SchedulesModel.showSchedules()
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  create: async (req, res) => {
    const { idBusees, idRoute, dateTime, departureTime } = req.body
    const results = await SchedulesModel.createSchedules(idBusees, idRoute, dateTime, departureTime)
    const data = {
      success: true,
      msg: 'Schedules has been created',
      data: results
    }
    res.send(data)
  },
  update: async (req, res) => {
    const { departureTime } = req.body
    const { id } = req.params
    const results = await SchedulesModel.updateSchedules(id, departureTime)
    const data = {
      success: true,
      msg: 'schedules updated',
      data: results
    }
    res.send(data)
  },
  delete: async (req, res) => {
    const { id } = req.params
    const results = await SchedulesModel.deleteSchedules(id)
    const data = {
      success: true,
      msg: 'schedules has been deleted',
      data: results
    }
    res.send(data)
  },
  showSchedules: async (req, res) => {
    const results = await SchedulesModel.showSchedules()
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  }
}
