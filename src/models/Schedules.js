const db = require('../utils/db')

module.exports = {
  getSchedules: id => {
    const table = 'schedules'
    const querySql = `SELECT schedules.id_schedules, busess.class, busess.sheets, busess.price, routes.first_place, routes.destination, ${table}.date_time, ${table}.departure_time FROM (( ${table} INNER JOIN busess ON ${table}.id_busess = busess.id_busess) INNER JOIN routes ON ${table}.id_route = routes.id_route) WHERE schedules.id_schedules = ${id}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  },
  createSchedules: (id, dateTime, departureTime) => {
    const table = 'schedules'
    const querySql = `INSERT INTO ${table} (id_busess, id_route, id_agen, date_time, departure_time) VALUES (${id}, ${id}, ${id}, '${dateTime}', '${departureTime}')`
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
  updateSchedules: (id, departureTime) => {
    const table = 'schedules'
    const querySql = `UPDATE ${table} SET departure_time='${departureTime}' WHERE id_schedules=${id}`
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
  deleteSchedules: id => {
    const table = 'schedules'
    const querySql = `DELETE FROM ${table} WHERE id_schedules=${id}`
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
  createSchedulesUser: id => {
    const table = 'schedules'
    const querySql = `SELECT user_detail.name, busess.name, busess.class, busess.sheets, busess.price, routes.first_place, routes.destination, ${table}.date_time, ${table}.departure_time FROM ((( ${table} INNER JOIN busess ON ${table}.id_busess = busess.id_busess) INNER JOIN routes ON ${table}.id_route = routes.id_route) INNER JOIN user_detail ON ${table}.id_user = user_detail.id_detail) WHERE id_${table}=2`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
}
