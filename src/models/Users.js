const db = require('../utils/db')

module.exports = {
  getAllUsers: (conditions = {}) => {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: 'username', value: '' }
    const table = 'user_detail'
    return new Promise(function (resolve, reject) {
      const querSql = `
      SELECT * FROM ${table}
      WHERE ${search.key} LIKE '${search.value}%'
      ORDER BY ${sort.key} ${sort.value ? 'ASC' : 'DESC'}
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      console.log(querSql)
      db.query(querSql, (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getTotalUsers: (conditions = {}) => {
    let { search } = conditions
    search = search || { key: 'username', value: '' }
    const table = 'users'
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT COUNT (*) AS total FROM ${table}
      WHERE ${search.key} LIKE '${search.value}%'`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0].total)
        }
      })
    })
  },
  createUser: function (picture, username, password, roleId) {
    const table = 'users'
    roleId = roleId || 3
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (picture, username, password, role_id) VALUES (${picture},'${username}', '${password}', ${roleId})`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  updateUser: function (id, picture, username, password) {
    const table = 'users'
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET picture=${picture}, username='${username}', password='${password}' WHERE id=${id}`, function (err, results, fields) {
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
  deleteUser: function (id) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      db.query(`DELETE FROM ${table} WHERE id=${id}`, function (err, results, fields) {
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
  createUserDetail: (name, age, phone, email) => {
    const table = 'user_detail'
    const querySql = `INSERT INTO ${table} (name, age, phone,email) VALUES ('${name}', ${age}, '${phone}', '${email}')`
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
