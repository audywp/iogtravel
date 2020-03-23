const db = require('../utils/db')

db.query(`
  CREATE TABLE busess (
    id_busess INT PRIMARY KEY AUTO_INCREMENT,
    id_agen INT,
    FOREIGN KEY (id_agen) REFERENCES agen(id_agen),
    class VARCHAR(40) NOT NULL,
    sheets INT NOT NULL,
    price INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)
