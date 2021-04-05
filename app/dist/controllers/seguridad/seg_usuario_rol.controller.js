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
exports.nousuarioroles = exports.usuarios_por_roles = exports.usuarioroles = exports.deleteusuariorol = exports.createUsuarioRol = void 0;
const database_1 = __importDefault(require("../../database"));
exports.createUsuarioRol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = req.body;
    try {
        const result = yield database_1.default.querySelect("INSERT INTO seg_roles_usuarios SET ?", [newPost]);
        newPost.idSegRolUsuario = result.insertId;
        return resp.status(201).json(newPost.idSegRolUsuario);
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.deleteusuariorol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegUsuario = req.params.getidSegUsuario;
    let idSegRol = req.params.getidSegRol;
    let consulta = ("DELETE FROM seg_roles_usuarios WHERE idSegUsuario = ? AND idSegRol = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idSegUsuario, idSegRol]);
        resp.status(201).json("Rol de usuario eliminado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.usuarioroles = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegUsuario = req.params.getidSegUsuario;
    let consulta = ("SELECT per.usuario AS nombreUsuario, per.idSegUsuario, rol.nombre AS nombreRol,  rol.codigo AS codigoRol,  rol.idSegRol FROM seg_usuarios per JOIN seg_roles_usuarios perRol ON per.idSegUsuario = perRol.idSegUsuario JOIN seg_roles rol ON rol.idSegRol = perRol.idSegRol WHERE per.idSegUsuario = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idSegUsuario]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.usuarios_por_roles = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let codigoRol = req.params.getcodigoRol;
    let consulta = ("SELECT per.usuario AS nombreUsuario, per.idSegUsuario,  rol.nombre AS nombreRol, rol.codigo AS codigoRol,  rol.idSegRol FROM seg_usuarios per JOIN seg_roles_usuarios perRol ON per.idSegUsuario = perRol.idSegUsuario JOIN seg_roles rol ON rol.idSegRol = perRol.idSegRol WHERE rol.codigo = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [codigoRol]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.nousuarioroles = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegUsuario = req.params.getidSegUsuario;
    let consulta = ("SELECT rol.nombre AS nombreRol, rol.codigo AS codigoRol, rol.idSegRol FROM seg_roles rol LEFT JOIN (SELECT idSegRol, idSegRolUsuario FROM seg_roles_usuarios WHERE idSegUsuario = ?) perRol ON rol.idSegRol = perRol.idSegRol WHERE perRol.idSegRolUsuario IS NULL AND rol.estatus = 1");
    try {
        const result = yield database_1.default.querySelect(consulta, [idSegUsuario]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
//# sourceMappingURL=seg_usuario_rol.controller.js.map