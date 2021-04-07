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
exports.delperfilrol = exports.perfilrol = exports.noperfilroles = exports.perfilroles = void 0;
const database_1 = __importDefault(require("../../database"));
exports.perfilroles = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const idperfil = req.params.getidSegPerfil;
    try {
        const result = yield database_1.default.querySelect("SELECT per.nombre AS nombrePerfil,  per.codigo AS codigoPerfil,  per.idSegPerfil, rol.nombre AS nombreRol,  rol.codigo AS codigoRol, rol.idSegRol FROM seg_perfiles per JOIN seg_roles_perfiles perRol ON per.idSegPerfil = perRol.idSegPerfil JOIN seg_roles rol ON rol.idSegRol = perRol.idSegRol WHERE per.idSegPerfil = ? group by per.nombre, per.codigo, per.idSegPerfil,rol.nombre, rol.codigo,  rol.idSegRol, rol.idSegRol", [idperfil]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.noperfilroles = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const idSegPerfil = req.params.getidSegPerfil;
    try {
        const result = yield database_1.default.querySelect("SELECT rol.nombre AS nombreRol, rol.codigo AS codigoRol, rol.idSegRol FROM seg_roles rol LEFT JOIN (SELECT idSegRol, idSegRolPerfil FROM seg_roles_perfiles WHERE idSegPerfil= ?) perRol ON rol.idSegRol = perRol.idSegRol WHERE perRol.idSegRolPerfil IS NULL AND rol.estatus = 1", [idSegPerfil]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.perfilrol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = req.body;
    try {
        const result = yield database_1.default.querySelect("INSERT INTO seg_roles_perfiles SET ?", [newPost]);
        newPost.idSegRolPerfil = result.insertId;
        return resp.status(201).json(newPost.idSegRolPerfil);
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.delperfilrol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegPerfil = req.params.getidSegPerfil;
    let idSegRol = req.params.getidSegRol;
    let consulta = ("DELETE FROM seg_roles_perfiles WHERE idSegPerfil = ? AND idSegRol = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idSegPerfil, idSegRol]);
        resp.status(201).json("Rol de perfil eliminado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
//# sourceMappingURL=seg_perfil_rol.js.map