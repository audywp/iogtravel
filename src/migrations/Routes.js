const db = require('../utils/db')

db.query(`
  CREATE TABLE routes (
    id_route INT PRIMARY KEY AUTO_INCREMENT,
    id_busess INT,
    FOREIGN KEY (id_busess) REFERENCES busess(id_busess),
    first_place VARCHAR(40) NOT NULL,
    destination VARCHAR(40) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)
