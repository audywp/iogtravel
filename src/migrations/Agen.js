const db = require('../utils/db')

db.query(`
  CREATE TABLE agen(
    id_agen INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT DEFAULT 1,
    FOREIGN KEY (id_user) REFERENCES users(role_id),
    name_agen VARCHAR(40),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)
