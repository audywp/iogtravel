const db = require('../utils/db')

db.query(`
  CREATE TABLE schedules (
    id_schedules INT PRIMARY KEY AUTO_INCREMENT,
    id_busess INT,
    FOREIGN KEY (id_busess) REFERENCES busess(id_busess),
    id_route INT,
    FOREIGN KEY (id_route) REFERENCES routes(id_route),
    id_agen INT DEFAULT 2,
    FOREIGN KEY (id_agen) REFERENCES agen(id_agen),
    date_time DATE NOT NULL,
    departure_time TIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)
