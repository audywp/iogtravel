const db = require('../utils/db')

module.exports = {
  showSchedules: () => {
    const table = 'schedules'
    const querySql = `SELECT busess.name, busess.class, routes.first_place, routes.destination, ${table}.date_time, ${table}.departure_time FROM (( ${table} INNER JOIN busess ON ${table}.id_busess = busess.id_busess) INNER JOIN routes ON ${table}.id_route = routes.id_route)`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  },
  createSchedules: (idBusees, idRoute, dateTime, departureTime) => {
    const table = 'schedules'
    const querySql = `INSERT INTO ${table} (id_busess, id_route, date_time, departure_time) VALUES (${idBusees}, ${idRoute}, '${dateTime}', '${departureTime}')`
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
  }
}
