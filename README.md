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

## Informacion y procesos sobre Usuarios
- get "/usuarios"
- get "/usuarios/cargo/:idSegUsuario"
- get "/usuarios/direcciones/:id"
- get "/usuarios/telefonos/:id"
- get "/usuarios/correos/:id"
- get "/usuarios/gerencia/:idConfigGerencia"
- get "/usuarios/verificagerencia/:idConfigGerencia"
- get "/usuarios/ip"
- post "/usuarios/login"
- put "/usuarios/update/:idSegUsuario"
- delete "/usuarios/- delete/:idSegUsuario"
- post "/usuarios"
- post "/usuarios/subirimagen"
## Informacion y procesos sobre direcciones de Usuarios
- post "/usuarios/direcciones"
- put "/usuarios/direcciones/:id"
- delete "/usuarios/direcciones/todos/:idUsuario"
- delete "/usuarios/direcciones/:iddireccion"
## Informacion y procesos sobre telefonos de Usuarios
- post "/usuarios/telefonos"
- put "/usuarios/telefonos/:id"
- delete "/usuarios/telefonos/todos/:idUsuario"
- delete "/usuarios/telefonos/:iddireccion"
## Informacion y procesos sobre correos de Usuarios
- post "/usuarios/correos"
- put "/usuarios/correos/:idSegCorreo"
- delete "/usuarios/correos/- deleteCorreo/:idSegUsuario"
- delete "/usuarios/correos/:idSegCorreo"
## Informacion y procesos roles
- get "/roles/"
- get "/roles/tipoacciones"
- get "/roles/:idSegRol"
- get "/roles/userLocalStorage/:idSegRol"
- post "/roles/"
- put "/roles/:idSegRol"
- delete "/roles/:idSegRol"
## Informacion y procesos sobre roles de Usuarios
- post "/usuariorol"
- get "/usuariorol/:idSegUsuario"
- get "/usuariorol/usuarios-por-roles/:codigoRol"
- get "/usuriorol/nousuarioroles/:idSegUsuario"
- delete "/usuariorol/:idSegUsuario/:idSegRol"
## Informacion y procesos sobre log transacciones
- post "/log"
- get "/log"
- get "/getlog"
## Informacion y procesos sobre Perfiles
- get "/perfiles"
- get "/perfiles/:idSegPerf"
- post "/perfiles"
- put "/perfiles/:idSegPerf"
- delete "/perfiles/:idSegPerf"
## Informacion y procesos sobre perfiles de Usuarios
- get "/perfiles/user"
- get "/perfilles/usuarios/:idSegUser"
- get "/perfiles/noperfilesusuario/:idSegPerfil"
- get "/perfiles/porperfil/:idSegPerfil"
- delete "perfiles/perfilusuario/:idSegPerfil/:idSegUsuario"
## Informacion y procesos sobre roles de perfiles
- get "/perfilroles/:idSegPerfil"
- get "/perfilroles/noperfil/:idSegPerfil"
- post "/perfilroles/perfilrol"
- delete "/perfilroles/:idSegPerfil/:idSegRol"