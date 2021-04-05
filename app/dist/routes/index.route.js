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
const auth_controller_1 = require("../controllers/auth.controller");
const passport_1 = __importDefault(require("passport"));
const multer_1 = __importDefault(require("../lib/multer"));
//
const router = express_1.Router();
//Rutas:
//rutas pruebas
router.post("/api/seg_usuarios", auth_controller_1.getJWT);
router.get("/api/verify", passport_1.default.authenticate("jwt", { session: false }), auth_controller_1.verifyToken);
//rutas seguridad: usuarios
router.get("/usuarios", seg_usuarios_controller_1.usuarios);
router.get("/usuariosgerencia", seg_usuarios_controller_1.usuariosgerencia);
router.get('/ip', seg_usuarios_controller_1.ip);
router.get('/obt_idSegUsuario/:getidSegUsuario', auth_controller_1.verifyToken, seg_usuarios_controller_1.idSegUsuario);
router.get('/direcciones/:getid', auth_controller_1.verifyToken, seg_usuarios_controller_1.direcciones);
router.get('/telefonos/:getid', auth_controller_1.verifyToken, seg_usuarios_controller_1.telefonos);
router.get('/correos/:getid', auth_controller_1.verifyToken, seg_usuarios_controller_1.correos);
router.post('/usuarios', seg_usuarios_controller_1.createUser);
router.post('/login', seg_usuarios_controller_1.login);
router.put('/updateUser/:getidSegUsuario', auth_controller_1.verifyToken, seg_usuarios_controller_1.updateUsuario);
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
exports.default = router;
//# sourceMappingURL=index.route.js.map