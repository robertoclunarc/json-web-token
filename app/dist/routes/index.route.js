"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seg_usuarios_controller_1 = require("../controllers/seguridad/seg_usuarios.controller");
const seg_roles_controller_1 = require("../controllers/seguridad/seg_roles.controller");
const seg_usuario_rol_controller_1 = require("../controllers/seguridad/seg_usuario_rol.controller");
const seg_correos_1 = require("../controllers/seguridad/seg_correos");
const seg_log_transac_1 = require("../controllers/seguridad/seg_log_transac");
const seg_perfiles_1 = require("../controllers/seguridad/seg_perfiles");
const seg_perfiles_usuarios_1 = require("../controllers/seguridad/seg_perfiles_usuarios");
const seg_perfil_rol_1 = require("../controllers/seguridad/seg_perfil_rol");
const seg_direcciones_1 = require("../controllers/seguridad/seg_direcciones");
const seg_telefonos_1 = require("../controllers/seguridad/seg_telefonos");
const seg_menus_1 = require("../controllers/seguridad/seg_menus");
const auth_controller_1 = require("../controllers/auth.controller");
const multer_1 = __importDefault(require("../lib/multer"));
//
const router = express_1.Router();
//Rutas:
//rutas pruebas: chritian mejias
/*
router.post("/api/seg_usuarios", getJWT);
//router.get("/api/verify", passport.authenticate("jwt", { session: false }), verifyToken);
*/
//rutas seguridad: usuarios
router.get("/usuarios", auth_controller_1.verifyToken, seg_usuarios_controller_1.usuarios);
router.get("/usuariosgerencia", auth_controller_1.verifyToken, seg_usuarios_controller_1.usuariosgerencia);
router.get('/ip', seg_usuarios_controller_1.ip);
router.get('/obt_idSegUsuario/:getidSegUsuario', auth_controller_1.verifyToken, seg_usuarios_controller_1.idSegUsuario);
router.get('/direcciones/:getid', auth_controller_1.verifyToken, seg_usuarios_controller_1.direcciones);
router.get('/telefonos/:getid', auth_controller_1.verifyToken, seg_usuarios_controller_1.telefonos);
router.get('/correos/:getid', auth_controller_1.verifyToken, seg_usuarios_controller_1.correos);
router.post('/usuarios', seg_usuarios_controller_1.createUser);
router.post('/login', seg_usuarios_controller_1.login);
router.put('/updateUser/:getidSegUsuario', seg_usuarios_controller_1.updateUsuario);
router.delete('/deleteUser/:getidSegUsuario', auth_controller_1.verifyToken, seg_usuarios_controller_1.deleteUsuario);
router.get('/usuariosverificagerencia/:idConfigGerencia', auth_controller_1.verifyToken, seg_usuarios_controller_1.usuariosverificagerencia);
router.post('/subirimagenusr', multer_1.default.single('image'), seg_usuarios_controller_1.subirimagenusr);
//rutas seguridad: roles
router.get('/roles', auth_controller_1.verifyToken, seg_roles_controller_1.roles);
router.get('/tipoacciones', auth_controller_1.verifyToken, seg_roles_controller_1.tipoacciones);
router.get('/rol/:getidSegRol', auth_controller_1.verifyToken, seg_roles_controller_1.rol);
router.post('/rol', auth_controller_1.verifyToken, seg_roles_controller_1.createRol);
router.put('/rol/:getidSegRol', auth_controller_1.verifyToken, seg_roles_controller_1.updateRol);
router.delete('/rol/:getidSegRol', auth_controller_1.verifyToken, seg_roles_controller_1.deleteRol);
router.get('/userLocalStorage/:getidSegRol', auth_controller_1.verifyToken, seg_roles_controller_1.userLocalStorage);
//rutas seguridad: usuarios roles
router.post('/usuariorol', auth_controller_1.verifyToken, seg_usuario_rol_controller_1.createUsuarioRol);
router.delete('/usuariorol/:getidSegUsuario/:getidSegRol', auth_controller_1.verifyToken, seg_usuario_rol_controller_1.deleteusuariorol);
router.get('/usuarioroles/:getidSegUsuario', auth_controller_1.verifyToken, seg_usuario_rol_controller_1.usuarioroles);
router.get('/usuarios-por-roles/:getcodigoRol', auth_controller_1.verifyToken, seg_usuario_rol_controller_1.usuarios_por_roles);
router.get('/nousuarioroles/:idSegUsuario', auth_controller_1.verifyToken, seg_usuario_rol_controller_1.nousuarioroles);
//rutas seguridad: correos
router.post('/usuarios/correos', auth_controller_1.verifyToken, seg_correos_1.Insertcorreos);
router.put('/usuarios/correos/:getidSegCorreo', auth_controller_1.verifyToken, seg_correos_1.updateCorreos);
router.delete('/usuarios/correos/deleteCorreo/:getidSegUsuario', auth_controller_1.verifyToken, seg_correos_1.deleteCorreos);
router.delete('/usuarios/correos/:getidSegCorreo', auth_controller_1.verifyToken, seg_correos_1.deleteCorreosId);
//rutas seguridad: log transacciones
router.post('/log', seg_log_transac_1.Insertlog);
router.get('/log', seg_log_transac_1.selectLog);
router.get('/getlog', seg_log_transac_1.GetLog);
//rutas seguridad: perfiles
router.get('/perfiles', auth_controller_1.verifyToken, seg_perfiles_1.perfiles);
router.get('/perfiles/:getidSegPerf', auth_controller_1.verifyToken, seg_perfiles_1.perfilesID);
router.post('/perfiles', auth_controller_1.verifyToken, seg_perfiles_1.createPerfil);
router.put('/perfiles/:getidSegPerf', auth_controller_1.verifyToken, seg_perfiles_1.updatePerfil);
router.delete('/perfiles/:getidSegPerf', auth_controller_1.verifyToken, seg_perfiles_1.deletePerfil);
//rutas seguridad: perfiles de usuarios
router.get('/perfiles_user', auth_controller_1.verifyToken, seg_perfiles_usuarios_1.perfiles_user);
router.get('/perfil_usuarios/:getidSegUser', auth_controller_1.verifyToken, seg_perfiles_usuarios_1.perfilesUsuarios);
router.get('/noperfilesusuario/:getidSegPerfil', auth_controller_1.verifyToken, seg_perfiles_usuarios_1.noperfilesusuario);
router.get('/porperfil/:getidSegPerfil', auth_controller_1.verifyToken, seg_perfiles_usuarios_1.porperfil);
router.delete('/perfilusuario/:getidSegPerfil/:idSegUsuario', auth_controller_1.verifyToken, seg_perfiles_usuarios_1.delperfilusuario);
//rutas seguridad: roles de perfil
router.get('/perfilroles/:getidSegPerfil', auth_controller_1.verifyToken, seg_perfil_rol_1.perfilroles);
router.get('/noperfilroles/:getidSegPerfil', auth_controller_1.verifyToken, seg_perfil_rol_1.noperfilroles);
router.post('/perfilrol', auth_controller_1.verifyToken, seg_perfil_rol_1.perfilrol);
router.delete('/perfilrol/:getidSegPerfil/:getidSegRol', auth_controller_1.verifyToken, seg_perfil_rol_1.delperfilrol);
//rutas seguridad: direcciones
router.post('/usuarios/direcciones', auth_controller_1.verifyToken, seg_direcciones_1.createDireccion);
router.put('/usuarios/direcciones/:getid', auth_controller_1.verifyToken, seg_direcciones_1.updateDireccion);
router.delete('/usuarios/direcciones/todos/:getidUsuario', auth_controller_1.verifyToken, seg_direcciones_1.deleteDireccionesTodo);
router.delete('/usuarios/direcciones/:getiddireccion', auth_controller_1.verifyToken, seg_direcciones_1.deleteDireccion);
//rutas seguridad: telefonos
router.post('/usuarios/telefonos', auth_controller_1.verifyToken, seg_telefonos_1.createTelefono);
router.put('/usuarios/telefonos/:getid', auth_controller_1.verifyToken, seg_telefonos_1.updateTelefono);
router.delete('/usuarios/telefonos/todos/:getidUsuario', auth_controller_1.verifyToken, seg_telefonos_1.deletetelefonosTodo);
router.delete('/usuarios/telefonos/:getiddireccion', auth_controller_1.verifyToken, seg_telefonos_1.deleteTelefonos);
//rutas seguridad: menus
router.get('/menus/:tablaMenu', seg_menus_1.menus);
router.get('/menus/items/:tablaMenu', seg_menus_1.items);
router.get('/menus/icons', seg_menus_1.icons);
router.get('/menus/:tablaMenu/:getidMenu', seg_menus_1.menusID);
router.get('/menus/menusitems', seg_menus_1.menusitems);
router.get('/menus/obtenerMenuPorUsuario', seg_menus_1.obtenerMenuUsuario);
exports.default = router;
//# sourceMappingURL=index.route.js.map