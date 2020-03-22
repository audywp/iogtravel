SELECT busses.name, routes.start, routes.end, schedules.price, schedules.departure_time, schedules.arrive_time 
FROM ((schedules 
INNER JOIN routes ON schedules.id_route = routes.id) 
INNER JOIN busses ON schedules.id_bus = busses.id)


SELECT busess.name, busess.class, routes.first_place, routes.destination, schedules.date_time, schedules.departure_time FROM (( schedules INNER JOIN busess ON schedules.id_busess = busess.id_busess) INNER JOIN routes ON schedules.id_route = routes.id_route)