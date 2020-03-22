const db = require('../utils/db')

module.exports = {
  showRoute: () => {
    const table = 'routes'
    const querySql = `SELECT * FROM ${table}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  },
  createRoutes: (firstPlace, destination) => {
    const table = 'routes'
    const querySql = `INSERT INTO ${table} (first_place, destination) VALUES (
      '${firstPlace}', '${destination}'
    )`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  updateRoutes: (id, firstPlace, destination) => {
    const table = 'routes'
    const querySql = `UPDATE ${table} SET first_place='${firstPlace}',
    destination='${destination}' WHERE id_route=${id}`
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
  deleteRoutes: id => {
    const table = 'routes'
    const querySql = `DELETE FROM ${table} WHERE id_route=${id}`
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
