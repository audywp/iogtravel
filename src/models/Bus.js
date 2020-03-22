const db = require('../utils/db')

module.exports = {
  getAllBusess: () => {
    const table = 'busess'
    const querySql = `SELECT * FROM ${table}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  },
  createBusess: (roleId, classBus, nameBus, sheets) => {
    const table = 'busess'
    const querySql = `INSERT INTO ${table} (id_agen, class, name, sheets) VALUES
    (${roleId}, '${classBus}', '${nameBus}', ${sheets})`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  },
  updateBusess: (id, _class, name) => {
    const table = 'busess'
    const querySql = `UPDATE ${table} SET class='${_class}', name='${name}' WHERE id_busess=${id}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) {
          reject(err)
        } else if (results.affectedRows) {
          resolve(results)
        } else {
          resolve(false)
        }
      })
    })
  },
  deleteBusess: id => {
    const table = 'busess'
    const querySql = `DELETE FROM ${table} WHERE id_busess=${id}`
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
