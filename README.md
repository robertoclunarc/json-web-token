#JWT administrador
Modulo que da permisos a travez de un JWT acceso a los API segun si el microservicio esta regsitrado o no 


"/api/getauth" Con esta ruta optienes el JWT pasandole el nro de la aplicacion que tenga registrado dentro de la BD

"/api/verify", Verifica si una solicitud es permitida segun el JWT (Usa PASSPORT)