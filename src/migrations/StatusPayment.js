const bcrypt = require('bcryptjs')
const db = require('../utils/db')
const table = 'payment'
const query = `CREATE TABLE IF NOT EXISTS ${table} (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_user INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  order_id VARCHAR(50) NOT NULL,
  amount INT (20) NOT NULL,
  store VARCHAR (20) NOT NULL,
  method VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  CONSTRAINT fk_user1 FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)`
db.query(query, function () {
  
})