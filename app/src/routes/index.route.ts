import { Router, Request } from "express";
import { usuarios, usuariosGerencia, ip, usuarioCargo, direcciones, telefonos, correos, createUser, login, updateUsuario, deleteUsuario, verificaGerencia, subirImagen } from "../controllers/seguridad/seg_usuarios.controller";
import { roles, tipoAcciones, rol, createRol, updateRol, deleteRol, userLocalStorage } from "../controllers/seguridad/seg_roles.controller";
import { createUsuarioRol, deleteUsuarioRol, usuarioRoles, usuariosRoles, noUsuarioRoles } from "../controllers/seguridad/seg_usuario_rol.controller";
import { insertCorreos, updateCorreos, deleteCorreos, deleteCorreosId } from "../controllers/seguridad/seg_correos";
import { Insertlog, selectLog, getLog } from "../controllers/seguridad/seg_log_transac";
import { perfiles, perfilesID, createPerfil, updatePerfil, deletePerfil} from '../controllers/seguridad/seg_perfiles';
import { perfilesUser, perfilesUsuarios, noPerfilUsuario, porPerfil, delPerfilUsuario } from '../controllers/seguridad/seg_perfiles_usuarios';
import { perfilRoles, noPerfilRoles, perfilRol, delPerfilRol } from '../controllers/seguridad/seg_perfil_rol';
import { createDireccion, updateDireccion, deleteDireccionesTodo, deleteDireccion } from '../controllers/seguridad/seg_direcciones';
import { createTelefono, updateTelefono, deleteTelefTodos, deleteTelefonos } from '../controllers/seguridad/seg_telefonos';
import { menus, items, icons, menusID, menusItems, obtenerMenuUsuario, insertarItemMenu, updateMenu, deleteMenu, obtenerBreakCrumb } from '../controllers/seguridad/seg_menus';
import { getJWT, verifyToken, getAuth } from "../controllers/auth.controller";
//import passport from "passport";
import multer from "../lib/multer";
//

const router:Router = Router();

//Rutas:
//rutas pruebas: chritian mejias
/*
router.post("/api/seg_usuarios", getJWT);
//router.get("/api/verify", passport.authenticate("jwt", { session: false }), verifyToken);
*/
//rutas seguridad: usuarios
router.get("/usuarios", verifyToken, getAuth(18), usuarios);
router.post('/usuarios', createUser);
router.get('/usuarios/cargo/:getidSegUsuario', verifyToken, usuarioCargo);
router.get('/usuarios/direcciones/:getid', verifyToken,  direcciones);
router.get('/usuarios/telefonos/:getid', verifyToken, telefonos);
router.get('/usuarios/correos/:getid', verifyToken, correos);
router.get("/usuarios/gerencia/:idConfigGerencia", usuariosGerencia);
router.post('/usuarios/login', login);
router.put('/usuarios/update/:getidSegUsuario', updateUsuario);
router.delete('/usuarios/delete/:getidSegUsuario', verifyToken, deleteUsuario);
router.get('/usuarios/verificagerencia/:idConfigGerencia', verifyToken, verificaGerencia);
//esta carpeta sera para almacenar los archivos publicos
router.post('/usuarios/subirimagen', multer.single('image'), subirImagen);
router.get('/usuarios/ip', ip);
//rutas seguridad: direcciones
router.post('/usuarios/direcciones', verifyToken, createDireccion);
router.put('/usuarios/direcciones/:getid', verifyToken, updateDireccion);
router.delete('/usuarios/direcciones/todos/:getidUsuario', verifyToken, deleteDireccionesTodo);
router.delete('/usuarios/direcciones/:getiddireccion', verifyToken, deleteDireccion);
//rutas seguridad: telefonos
router.post('/usuarios/telefonos', verifyToken, createTelefono);
router.put('/usuarios/telefonos/:getid', verifyToken, updateTelefono);
router.delete('/usuarios/telefonos/todos/:getidUsuario', verifyToken, deleteTelefTodos);
router.delete('/usuarios/telefonos/:getiddireccion', verifyToken, deleteTelefonos );
//rutas seguridad: correos
router.post('/usuarios/correos', verifyToken, insertCorreos);
router.put('/usuarios/correos/:getidSegCorreo', verifyToken, updateCorreos);
router.delete('/usuarios/correos/deleteCorreo/:getidSegUsuario', verifyToken, deleteCorreos);
router.delete('/usuarios/correos/:getidSegCorreo', verifyToken, deleteCorreosId);
//rutas seguridad: roles
router.get('/roles/', verifyToken, roles);
router.get('/roles/tipoacciones', verifyToken, tipoAcciones);
router.get('/roles/:getidSegRol',verifyToken, rol);
router.post('/roles/', verifyToken, createRol);
router.put('/roles/:getidSegRol', verifyToken, updateRol);
router.delete('/roles/:getidSegRol', verifyToken, deleteRol);
router.get('/roles/userLocalStorage/:getidSegRol', verifyToken, userLocalStorage);
//rutas seguridad: usuarios roles
router.post('/usuariorol', verifyToken, createUsuarioRol);
router.delete('/usuariorol/:getidSegUsuario/:getidSegRol', verifyToken, deleteUsuarioRol);
router.get('/usuariorol/:getidSegUsuario', verifyToken, usuarioRoles);
router.get('/usuariorol/usuarios-por-roles/:getcodigoRol',verifyToken, usuariosRoles);
router.get('/usuriorol/nousuarioroles/:idSegUsuario', verifyToken, noUsuarioRoles);
//rutas seguridad: log transacciones
router.post('/log', Insertlog);
router.get('/log', selectLog);
router.get('/getlog', getLog);
//rutas seguridad: perfiles
router.get('/perfiles', verifyToken, perfiles);
router.get('/perfiles/:getidSegPerf', verifyToken, perfilesID);
router.post('/perfiles', verifyToken, createPerfil);
router.put('/perfiles/:getidSegPerf',  verifyToken, updatePerfil);
router.delete('/perfiles/:getidSegPerf', verifyToken, deletePerfil);
//rutas seguridad: perfiles de usuarios
router.get('/perfiles/user', verifyToken, perfilesUser);
router.get('/perfilles/usuarios/:getidSegUser', verifyToken, perfilesUsuarios);
router.get('/perfiles/noperfilesusuario/:getidSegPerfil', verifyToken, noPerfilUsuario);
router.get('/perfiles/porperfil/:getidSegPerfil', verifyToken, porPerfil);
router.delete('perfiles/perfilusuario/:getidSegPerfil/:idSegUsuario', verifyToken, delPerfilUsuario);
//rutas seguridad: roles de perfil
router.get('/perfilroles/:getidSegPerfil', verifyToken, perfilRoles);
router.get('/perfilroles/noperfil/:getidSegPerfil', verifyToken, noPerfilRoles);
router.post('/perfilroles/perfilrol', verifyToken, perfilRol);
router.delete('/perfilroles/:getidSegPerfil/:getidSegRol', verifyToken, delPerfilRol);
//rutas seguridad: menus
router.get('/menus',menus);
router.get('/menus/items',items);
router.get('/menus/icons',icons);
router.get('/menus/menusID/:getidMenu',menusID);
router.get('/menus/menusitems',menusItems);
router.get('/menus/obtenerMenuPorUsuario/:getidUsuario', obtenerMenuUsuario);
router.post('/menus', insertarItemMenu);
router.put('/menus/:getidSegMenu', updateMenu);
router.delete('/menus/:getidSegMenu', deleteMenu);
router.get('/menus/obtenerBreakCrumb/:getidSegMenu', obtenerBreakCrumb);

export default router;