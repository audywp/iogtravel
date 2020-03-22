const transactionModel = require('../models/Transaction')

module.exports = {
  read: async (req, res) => {
    const results = await transactionModel.getTransaction()
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  create: async (req, res) => {
    const { price } = req.body
    const results = await transactionModel.createTransaction(price)
    const data = {
      success: true,
      msg: 'transaction succes',
      data: results
    }
    res.send(data)
  },
  update: async (req, res) => {
    const { price } = req.body
    const { id } = req.params
    const results = await transactionModel.updateTransaction(id, price)
    if (results) {
      const data = {
        success: true,
        msg: 'update succesfully'
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'transaction can\'t be update'
      }
      res.send(data)
    }
  },
  delete: async (req, res) => {
    const { id } = req.params
    const results = await transactionModel.deleteTransaction(id)
    if (results) {
      const data = {
        success: true,
        msg: 'transaction deleted'
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'no data'
      }
      res.send(data)
    }
  }
}
