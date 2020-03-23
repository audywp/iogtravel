const db = require('../utils/db')

db.query(`
  CREATE TABLE transactions (
    id_transaction INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id),
    id_schedules INT,
    FOREIGN KEY (id_schedules) REFERENCES schedules(id_schedules),
    id_userDetail INT,
    FOREIGN KEY (id_userDetail) REFERENCES user_detail(id_detail),
    verified_payment VARCHAR(37),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)
