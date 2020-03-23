const SchedulesModel = require('../models/Schedules')

module.exports = {
  showSchedules: async (req, res) => {
    const { id } = req.body
    const results = await SchedulesModel.getSchedules(id)
    const data = {
      success: true,
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
  }
}
