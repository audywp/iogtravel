const db = require('../utils/db')

module.exports = {
  createAgent: function (id) {
    const table = 'users'
    const query = `UPDATE ${table} SET role_id = 2 WHERE id = ${id}`
    return new Promise(function (resolve, reject) {
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  getEndRoute : (start) => {
    const table = 'routes'
    const query = `SELECT * FROM ${table} WHERE start='${start}'`
    return new Promise((resolve, reject) => {
      db.query(query, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  },
  updateScheduleByAdmin: (idSchedule, date) => {
    const table = 'schedules'
    const query = `UPDATE ${table} SET departure_date = '${date.slice(0, 20)}' WHERE id = ${idSchedule}`
    return new Promise((resolve, reject) => {
      db.query(query, (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  }
}
