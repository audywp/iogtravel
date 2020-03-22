const db = require('../utils/db')

module.exports = {
  getAllInformation: () => {
    const table = 'user_detail'
    const querySql = `SELECT * FROM ${table}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results.insertId)
      })
    })
  },
  createUserInformation: (id, name, age, phone, email) => {
    const table = 'user_detail'
    const querySql = `INSERT INTO ${table} (id_user, name, age, phone, email) VALUES (
      ${id}, '${name}', ${age}, '${phone}', '${email}'
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
  updateUserInformation: (id, name, age, phone, email) => {
    const table = 'user_detail'
    const querySql = `UPDATE ${table} SET name='${name}', age=${age}, phone='${phone}', email='${email}'`
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
  deleteUser: id => {
    const table = 'user_detail'
    const querySql = `DELETE FROM ${table} WHERE id_detail=${id}`
    return new Promise((resolve, reject) => [
      db.query(querySql, (err, results, fields) => {
        if (err) {
          reject(err)
        } else if (results.affectedRows) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    ])
  },
  getUserInformation: id => {
    const table = 'user_detail'
    const querySql = `SELECT * FROM ${table} WHERE id_detail=${id}`
    return new Promise((resolve, reject) => {
      db.query(querySql, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  }
}
