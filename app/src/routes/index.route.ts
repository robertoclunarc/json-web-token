import { Router } from "express";
import { usuarios, usuariosgerencia, ip, idSegUsuario, direcciones, telefonos, correos, createUser, login, updateUsuario, deleteUsuario, usuariosverificagerencia, subirimagenusr } from "../controllers/seguridad/seg_usuarios.controller";
import { roles, tipoacciones, rol, createRol, updateRol, deleteRol, userLocalStorage } from "../controllers/seguridad/seg_roles.controller";
import { createUsuarioRol, deleteusuariorol, usuarioroles, usuarios_por_roles, nousuarioroles } from "../controllers/seguridad/seg_usuario_rol.controller";
import { Insertcorreos, updateCorreos, deleteCorreos, deleteCorreosId } from "../controllers/seguridad/seg_correos";
import { Insertlog, selectLog, GetLog } from "../controllers/seguridad/seg_log_transac";
import { perfiles, perfilesID, createPerfil, updatePerfil, deletePerfil} from '../controllers/seguridad/seg_perfiles';
import { perfiles_user, perfilesUsuarios, noperfilesusuario, porperfil, delperfilusuario } from '../controllers/seguridad/seg_perfiles_usuarios';
import { perfilroles, noperfilroles, perfilrol, delperfilrol } from '../controllers/seguridad/seg_perfil_rol';
import { createDireccion, updateDireccion, deleteDireccionesTodo, deleteDireccion } from '../controllers/seguridad/seg_direcciones';
import { createTelefono, updateTelefono, deletetelefonosTodo, deleteTelefonos } from '../controllers/seguridad/seg_telefonos';

import { getJWT, verifyToken } from "../controllers/auth.controller";
import passport from "passport";
import multer from "../lib/multer";

//

const router:Router = Router();
//Rutas:
//rutas pruebas
router.post("/api/seg_usuarios", getJWT);
router.get("/api/verify", passport.authenticate("jwt", { session: false }), verifyToken);
//rutas seguridad: usuarios
router.get("/usuarios", usuarios);
router.get("/usuariosgerencia", usuariosgerencia);
router.get('/ip', ip);
router.get('/obt_idSegUsuario/:getidSegUsuario', verifyToken, idSegUsuario);
router.get('/direcciones/:getid', verifyToken,  direcciones);
router.get('/telefonos/:getid', verifyToken, telefonos);
router.get('/correos/:getid', verifyToken, correos);
router.post('/usuarios', createUser);
router.post('/login', login);
router.put('/updateUser/:getidSegUsuario', verifyToken, updateUsuario);
router.delete('/deleteUser/:getidSegUsuario', verifyToken, deleteUsuario);
router.get('/usuariosverificagerencia/:idConfigGerencia', verifyToken, usuariosverificagerencia);
router.post('/subirimagenusr', multer.single('image'), subirimagenusr);
//rutas seguridad: roles
router.get('/roles', verifyToken, roles);
router.get('/tipoacciones', verifyToken, tipoacciones);
router.get('/rol/:getidSegRol',verifyToken, rol);
router.post('/rol', verifyToken, createRol);
router.put('/rol/:getidSegRol', verifyToken, updateRol);
router.delete('/rol/:getidSegRol', verifyToken, deleteRol);
router.get('/userLocalStorage/:getidSegRol', verifyToken, userLocalStorage);
//rutas seguridad: usuarios roles
router.post('/usuariorol', verifyToken, createUsuarioRol);
router.delete('/usuariorol/:getidSegUsuario/:getidSegRol', verifyToken, deleteusuariorol);
router.get('/usuarioroles/:getidSegUsuario', verifyToken, usuarioroles);
router.get('/usuarios-por-roles/:getcodigoRol',verifyToken, usuarios_por_roles);
router.get('/nousuarioroles/:idSegUsuario', verifyToken, nousuarioroles);
//rutas seguridad: correos
router.post('/usuarios/correos', verifyToken, Insertcorreos);
router.put('/usuarios/correos/:getidSegCorreo', verifyToken, updateCorreos);
router.delete('/usuarios/correos/deleteCorreo/:getidSegUsuario', verifyToken, deleteCorreos);
router.delete('/usuarios/correos/:getidSegCorreo', verifyToken, deleteCorreosId);
//rutas seguridad: log transacciones
router.post('/log', Insertlog);
router.get('/log', selectLog);
router.get('/getlog', GetLog);
//rutas seguridad: perfiles
router.get('/perfiles', verifyToken, perfiles);
router.get('/perfiles/:getidSegPerf', verifyToken, perfilesID);
router.post('/perfiles', verifyToken, createPerfil);
router.put('/perfiles/:getidSegPerf',  verifyToken, updatePerfil);
router.delete('/perfiles/:getidSegPerf', verifyToken, deletePerfil);
//rutas seguridad: perfiles de usuarios
router.get('/perfiles_user', verifyToken, perfiles_user);
router.get('/perfil_usuarios/:getidSegUser', verifyToken, perfilesUsuarios);
router.get('/noperfilesusuario/:getidSegPerfil', verifyToken, noperfilesusuario);
router.get('/porperfil/:getidSegPerfil', verifyToken, porperfil);
router.delete('/perfilusuario/:getidSegPerfil/:idSegUsuario', verifyToken, delperfilusuario);
//rutas seguridad: roles de perfil
router.get('/perfilroles/:getidSegPerfil', verifyToken, perfilroles);
router.get('/noperfilroles/:getidSegPerfil', verifyToken, noperfilroles);
router.post('/perfilrol', verifyToken, perfilrol);
router.delete('/perfilrol/:getidSegPerfil/:getidSegRol', verifyToken, delperfilrol);
//rutas seguridad: direcciones
router.post('/usuarios/direcciones', verifyToken, createDireccion);
router.put('/usuarios/direcciones/:getid', verifyToken, updateDireccion);
router.delete('/usuarios/direcciones/todos/:getidUsuario', verifyToken, deleteDireccionesTodo);
router.delete('/usuarios/direcciones/:getiddireccion', verifyToken, deleteDireccion);
//rutas seguridad: telefonos
router.post('/usuarios/telefonos', verifyToken, createTelefono);
router.put('/usuarios/telefonos/:getid', verifyToken, updateTelefono);
router.delete('/usuarios/telefonos/todos/:getidUsuario', verifyToken, deletetelefonosTodo);
router.delete('/usuarios/telefonos/:getiddireccion', verifyToken, deleteTelefonos );

export default router;