const db = require('../utils/db')

module.exports = {
  getTransaction: () => {
    const table = 'transactions'
    const querySql = `SELECT * FROM ${table}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  },
  createTransaction: price => {
    const table = 'transactions'
    const querySql = `INSERT INTO ${table} (price) VALUES (${price})`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results.insertId)
      })
    })
  },
  updateTransaction: (id, price) => {
    const table = 'transactions'
    const querySql = `UPDATE ${table} SET price=${price} WHERE id_transaction=${id}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) {
          reject(err)
        } else if (results.affectedRows) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  },
  deleteTransaction: id => {
    const table = 'transactions'
    const querySql = `DELETE FROM ${table} WHERE id_transaction=${id}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) {
          reject(err)
        } else if (results.affectedRows) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }
}
