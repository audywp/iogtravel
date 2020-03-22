const ReservationModel = require('../models/Reservation')

module.exports = {
  checkTicket: async (req, res) => {
    const { idReservation } = req.body
    const results = await ReservationModel.checkReservation(idReservation)
    const data = {
      success: true,
      msg: 'ticket Reservation',
      results
    }
    res.send(data)
  }
}
