"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirimagenusr = exports.usuariosverificagerencia = exports.deleteUsuario = exports.updateUsuario = exports.login = exports.createUser = exports.correos = exports.telefonos = exports.direcciones = exports.idSegUsuario = exports.ip = exports.usuariosgerencia = exports.usuarios = void 0;
const database_1 = __importDefault(require("../../database"));
const password_1 = require("../../middlewares/password");
const auth_controller_1 = require("../auth.controller");
exports.usuarios = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.querySelect("SELECT * FROM seg_usuarios");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.usuariosgerencia = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT seg_usuarios.*,  (cargos.idConfigGerencia)  idGerencia, (CONCAT(seg_usuarios.primerNombre, ' ', seg_usuarios.primerApellido)) nombre_completo  FROM seg_usuarios JOIN config_cargos cargos ON cargos.idConfigCargo = seg_usuarios.idConfigCargo WHERE cargos.idConfigGerencia = ?";
    try {
        const result = yield database_1.default.querySelect(query, [req.body.idGerencia]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.ip = (req, resp) => {
    let _ip = "No se consiguio el IP";
    if (req.connection.remoteAddress !== "") {
        _ip = req.connection.remoteAddress || "";
    }
    else {
        if (req.header('x-forwarded-for') !== "") {
            _ip = req.header('x-forwarded-for') || "";
        }
        else {
            if (req.header('x-forwarded') !== "") {
                _ip = req.header('x-forwarded') || "";
            }
            else {
                if (req.header('forwarded-for') !== "") {
                    _ip = req.header('forwarded-for') || "";
                }
                else {
                    if (req.header('forwarded') !== "") {
                        _ip = req.header('forwarded') || "";
                    }
                }
            }
        }
    }
    return resp.status(201).json(_ip);
};
function idSegUsuario(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const _idSegUsuario = req.params.getidSegUsuario;
        const query = "SELECT *, (SELECT cargos.idConfigGerencia FROM config_cargos cargos WHERE cargos.idConfigCargo = seg_usuarios.idConfigCargo) idGerencia FROM seg_usuarios WHERE idSegUsuario = ?";
        try {
            const result = yield database_1.default.querySelect(query, [_idSegUsuario]);
            if (result.length <= 0) {
                return resp.status(402).json({ msg: "No Data!" });
            }
            return resp.status(201).json(result[0]);
        }
        catch (error) {
            resp.status(401).json({ err: error });
        }
    });
}
exports.idSegUsuario = idSegUsuario;
function direcciones(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const idx = req.params.getid;
        const query = "SELECT * FROM seg_direcciones WHERE idSegUsuario =?";
        try {
            const result = yield database_1.default.querySelect(query, [idx]);
            if (result.length <= 0) {
                return resp.status(402).json({ msg: "No Data!" });
            }
            return resp.status(201).json(result);
        }
        catch (error) {
            resp.status(401).json({ err: error });
        }
    });
}
exports.direcciones = direcciones;
function telefonos(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const idx = req.params.getid;
        const query = "SELECT * FROM seg_telefonos WHERE idSegUsuario =?";
        try {
            const result = yield database_1.default.querySelect(query, [idx]);
            if (result.length <= 0) {
                return resp.status(402).json({ msg: "No Data!" });
            }
            return resp.status(201).json(result);
        }
        catch (error) {
            resp.status(401).json({ err: error });
        }
    });
}
exports.telefonos = telefonos;
function correos(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const idx = req.params.getid;
        const query = "SELECT * FROM seg_correos WHERE idSegUsuario =?";
        try {
            const result = yield database_1.default.querySelect(query, [idx]);
            if (result.length <= 0) {
                return resp.status(402).json({ msg: "No Data!" });
            }
            return resp.status(201).json(result);
        }
        catch (error) {
            resp.status(401).json({ err: error });
        }
    });
}
exports.correos = correos;
exports.createUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = req.body;
    newPost.contrasenia = yield password_1.encryptPassword(newPost.contrasenia);
    try {
        const result = yield database_1.default.querySelect("INSERT INTO seg_usuarios SET ?", [newPost]);
        newPost.idSegUsuario = result.insertId;
        req.idapp = newPost.idSegUsuario;
        //token             
        let token = yield auth_controller_1.getJWT(req, resp);
        resp.header('auth-token', token).json(newPost.idSegUsuario);
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.login = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let usuario = req.body.user;
    let contrasenia = req.body.password;
    try {
        const result = yield database_1.default.querySelect("SELECT u.*,(SELECT cargos.idConfigGerencia FROM config_cargos cargos WHERE cargos.idConfigCargo = u.idConfigCargo) idGerencia  FROM seg_usuarios as u WHERE  u.usuario=?", [usuario]);
        console.log(result);
        if (!result.length) {
            return resp.status(400).json('Usuario No Encontrado');
        }
        else {
            const rset = result[0];
            const correctPassword = yield password_1.validatePassword(contrasenia, rset.contrasenia);
            if (!correctPassword)
                return resp.status(400).json('Clave Incorrecta');
            req.idapp = rset.idSegUsuario;
            //token             
            let token = yield auth_controller_1.getJWT(req, resp);
            resp.header('auth-token', token).json(rset);
        }
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.updateUsuario = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegUsuario = req.params.getidSegUsuario;
    let update = req.body;
    let consulta = ("UPDATE seg_usuarios SET ? WHERE idSegUsuario = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [update, idSegUsuario]);
        resp.status(201).json("Usuario actualizado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.deleteUsuario = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegUsuario = req.params.getidSegUsuario;
    let consulta = ("DELETE FROM seg_usuarios WHERE idSegUsuario = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idSegUsuario]);
        resp.status(201).json("Usuario eliminado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
function usuariosverificagerencia(req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const idx = req.params.idConfigGerencia;
        const query = "SELECT 	usr.idSegUsuario,    usr.primerNombre,    usr.usuario,    usr.idConfigCargo,    cargos.nombre,    gerencia.idConfigGerencia,    gerencia.nombre,    perfiles.idSegPerfil,    rolper.idSegRol AS roles_perfil,    roles_dir.idSegRol AS roles_directos,    roles.nombre, roles.codigo FROM seg_usuarios AS usr INNER JOIN config_cargos cargos ON cargos.idConfigCargo = usr.idConfigCargo INNER JOIN config_gerencias gerencia ON gerencia.idConfigGerencia = cargos.idConfigGerencia LEFT JOIN seg_perfiles_usuarios perfiles ON usr.idSegUsuario = perfiles.idSegUsuario LEFT JOIN seg_roles_perfiles rolper ON perfiles.idSegPerfil = rolper.idSegPerfil LEFT JOIN seg_roles_usuarios roles_dir ON roles_dir.idSegUsuario = usr.idSegUsuario LEFT JOIN seg_roles roles ON roles.idSegRol = roles_dir.idSegRol OR roles.idSegRol = rolper.idSegRol WHERE gerencia.idConfigGerencia = ? AND roles.codigo = 'ROL-VTS' GROUP BY usr.usuario";
        try {
            const result = yield database_1.default.querySelect(query, [idx]);
            console.log(result);
            if (result.length <= 0) {
                return resp.status(402).json({ msg: "No Data!" });
            }
            return resp.status(201).json(result);
        }
        catch (error) {
            resp.status(401).json({ err: error });
        }
    });
}
exports.usuariosverificagerencia = usuariosverificagerencia;
function subirimagenusr(req, resp) {
    const newPhoto = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagePath: req.file.path
    };
    console.log(newPhoto);
    return resp.status(201).json(newPhoto.imagePath);
}
exports.subirimagenusr = subirimagenusr;
//# sourceMappingURL=seg_usuarios.controller.js.map