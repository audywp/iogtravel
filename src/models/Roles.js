const db = require('../utils/db')

module.exports = {
  createAdmin: (username, password, isActive, isVerified, roleId) => {
    const table = 'users'
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table} (username, password, is_active, is_verified, role_id)
      VALUES ('${username}', '${password}',${isActive}, ${isVerified}, ${roleId})
      `, (err, results, fields) => {
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
