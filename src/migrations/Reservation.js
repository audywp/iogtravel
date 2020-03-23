const db = require('../utils/db')

db.query(`
  CREATE TABLE reservation (
    id_reservation INT PRIMARY KEY AUTO_INCREMENT,
    id_schedules INT,
    id_busess INT,
    id_agen INT,
    id_route INT,
    id_detail INT,
    FOREIGN KEY (id_detail) REFERENCES user_detail(id_detail),
    FOREIGN KEY (id_schedules) REFERENCES schedules(id_schedules),
    FOREIGN KEY (id_busess) REFERENCES busess(id_busess),
    FOREIGN KEY (id_agen) REFERENCES agen(id_agen),
    FOREIGN KEY (id_route) REFERENCES routes(id_route),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`)
