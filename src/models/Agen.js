const db = require('../utils/db')

module.exports = {
  getAgen: () => {
    const table = 'agen'
    const querySql = `SELECT id_agen FROM ${table}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  },
  createAgen: (name) => {
    const table = 'agen'
    const querySql = `INSERT INTO ${table} (name_agen) VALUES ('${name}')`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results.insertId)
      })
    })
  },
  updateAgen: (id, name) => {
    const table = 'agen'
    const querySql = `UPDATE ${table} SET name_agen='${name}' WHERE id_agen=${id}`
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
  deleteAgen: id => {
    const table = 'agen'
    const querySql = `DELETE FROM ${table} WHERE id_agen=${id}`
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
