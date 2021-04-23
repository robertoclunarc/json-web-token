# JWT administrador
Modulo que da permisos a travez de un JWT acceso a los API segun si el microservicio esta registrado o no 

- test:
"/api/getauth" Con esta ruta optienes el JWT pasandole el nro de la aplicacion que tenga registrado dentro de la BD
"/api/verify", Verifica si una solicitud es permitida segun el JWT (Usa PASSPORT)

## Loguear y creacion de usuarios

## Insert, Update, Delete, Select a las tablas de la BD relacionadas con:
- seguridad:
      1. Usuarios,
      2. Roles,
      3. Perfiles
      4. direcciones
      5. Telefonos
      6. correos

## Aplicacion de JWT a los api de seguridad (Usa PASSWORD):
- seguridad:
      1. Usuarios,
      2. Roles,
      3. Perfiles
      4. direcciones
      5. Telefonos
      6. correos

## Variables de entorno:
- PORT
- JWT_SECRET
- MYSQL_SERVER
- MYSQL_USER
- MYSQL_PW
- MYSQL_DB
- MYSQL_PORT

## Muestra la data de la tabla seg_user
get "api/seguridad/usuarios"

## Muestra la data de la tabla seg_perfil
get "api/seguridad/perfiles"

## Muestra la data de la tabla seg_rol
get "api/seguridad/roles"
