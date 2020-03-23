const db = require('../utils/db')

db.query(`
  CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(30) NOT NULL,
    name VARCHAR(40) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, function () {
  db.query(`
    INSERT INTO roles (code,name,description) VALUES
    ('superadmin', 'Super Administrator', 'This is a Superuser can access all feature on the application'),
    ('admin', 'Administrator', 'This is administrator with elevated access'),
    ('user', 'General User', 'This is general user')
  `)
})

db.query(`
  CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    picture TEXT,
    username VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    verification_code VARCHAR(37),
    is_active TINYINT(2) DEFAULT 0,
    is_verified TINYINT(2) DEFAULT 0,
    role_id INT DEFAULT 3,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)

db.query(`
  CREATE TABLE user_detail (
    id_detail INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id),
    name VARCHAR(40) NOT NULL,
    age INT NOT NULL,
    phone VARCHAR(40) NOT NULL,
    email VARCHAR(40),
    balance INT (40) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)
