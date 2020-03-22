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
    role_id INT DEFAULT 1,
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)

db.query(`
  CREATE TABLE agen(
    id_agen INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(role_id),
    name_agen VARCHAR(40),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)

db.query(`
  CREATE TABLE busess (
    id_busess INT PRIMARY KEY AUTO_INCREMENT,
    id_agen INT,
    FOREIGN KEY (id_agen) REFERENCES agen(id_agen),
    class VARCHAR(40) NOT NULL,
    name VARCHAR(60) NOT NULL,
    sheets INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)

db.query(`
  CREATE TABLE routes (
    id_route INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id),
    first_place VARCHAR(40) NOT NULL,
    destination VARCHAR(40) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)

db.query(`
  CREATE TABLE schedules (
    id_schedules INT PRIMARY KEY AUTO_INCREMENT,
    id_busess INT,
    FOREIGN KEY (id_busess) REFERENCES busess(id_busess),
    id_route INT,
    FOREIGN KEY (id_route) REFERENCES routes(id_route),
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id),
    date_time DATE NOT NULL,
    departure_time TIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)

db.query(`
  CREATE TABLE transactions (
    id_transaction INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id),
    id_schedules INT,
    FOREIGN KEY (id_schedules) REFERENCES schedules(id_schedules),
    verified_payment VARCHAR(37),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)

db.query(`
  CREATE TABLE reservation (
    id_reservation INT PRIMARY KEY AUTO_INCREMENT,
    id_schedules INT,
    id_busess INT,
    id_agen INT,
    id_route INT,
    price INT DEFAULT 0,
    FOREIGN KEY (id_schedules) REFERENCES schedules(id_schedules),
    FOREIGN KEY (id_busess) REFERENCES busess(id_busess),
    FOREIGN KEY (id_agen) REFERENCES agen(id_agen),
    FOREIGN KEY (id_route) REFERENCES routes(id_route),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)
