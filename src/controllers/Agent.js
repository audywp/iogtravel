const BusModel = require('../models/Bus')
const AgentModel = require('../models/Agent')

module.exports = {
  createBus: async function (req, res) {
    const info = req.user
    const info2 = await AgentModel.findAgentByIdUser(info.id)
    let { nameCar, busClass, size } = req.body
    nameCar = nameCar || `Car ${info2.name}`
    size = size || 5
    // console.log(info2.id_user)
    if (info.roleId === 2 || info.roleId === 1) {
      await BusModel.CreateBus(info2.id, nameCar, busClass, size)
      const data = {
        success: true,
        msg: `Bus added by ${info2.name}`
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: 'You cannot access this feature',
        value: info2
      }
      res.send(data)
    }
  },
  getBusses: async function (req, res) {
    if (req.user.roleId === 1) {
      const bus = await BusModel.findBusByAgent()
      const data = {
        success: true,
        bus
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: 'You cant access this feature'
      }
      res.send(data)
    }
  },
  updateBusses: async function (req, res) {
    if (req.user.roleId === 1) {
      const { id } = req.params
      let { nameCar, busClass, seat } = req.body
      const pastBus = await BusModel.findBusById(id) // get id buss for change name
      if (pastBus) {
        nameCar = nameCar || pastBus.name
        seat = seat || pastBus.bus_seat
        await BusModel.updateBuss(id, nameCar, busClass, seat)
        const newCar = await BusModel.findBusById(id)
        const data = {
          success: true,
          msg: 'Car has been updated',
          newCar
        }
        res.send(data)
      } else {
        const data = {
          success: false,
          mgs: 'Id Bus Salah'
        }
        res.send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'You cant access this feature'
      }
      res.send(data)
    }
  },
  deleteBuss: async function (req, res) {
    const { idBuss } = req.params
    if (req.user.roleId === 2 || req.user.roleId === 1) {
      const bus = await BusModel.deleteBuss(idBuss)
      if (bus) {
        const data = {
          success: true,
          msg: 'Your bus deleted'
        }
        res.send(data)
      } else {
        const data = {
          success: false,
          msg: 'Your id bus is not found'
        }
        res.send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'You cannot access this feature'
      }
      res.send(data)
    }
  }
}
