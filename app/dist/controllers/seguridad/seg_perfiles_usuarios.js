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
exports.delperfilusuario = exports.porperfil = exports.noperfilesusuario = exports.perfilesUsuarios = exports.perfiles_user = void 0;
const database_1 = __importDefault(require("../../database"));
exports.perfiles_user = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.querySelect("SELECT * FROM seg_perfiles_usuarios");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.perfilesUsuarios = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const idx = req.params.getidSegUser;
    try {
        const result = yield database_1.default.querySelect("SELECT per.nombre AS nombrePerfil,  per.codigo AS codigoPerfil,  per.idSegPerfil,      usrs.usuario AS nombreUsr, usrs.idSegUsuario FROM seg_perfiles per JOIN seg_perfiles_usuarios perUsr ON per.idSegPerfil = perUsr.idSegPerfil JOIN seg_usuarios usrs ON usrs.idSegUsuario = perUsr.idSegUsuario WHERE usrs.idSegUsuario = ?", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.noperfilesusuario = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const idx = req.params.getidSegPerfil;
    try {
        const result = yield database_1.default.querySelect("SELECT per.nombre AS nombreper, per.codigo AS codigoper, per.idSegPerfil FROM seg_perfiles per LEFT JOIN (SELECT idSegUsuario, idSegPerfilUsuario, idSegPerfil FROM seg_perfiles_usuarios WHERE idSegUsuario= ?) perusr ON perusr.idSegPerfil = per.idSegPerfil WHERE perusr.idSegPerfilUsuario IS NULL AND per.estatus = 1", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.porperfil = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const idx = req.params.getidSegPerfil;
    try {
        const result = yield database_1.default.querySelect("SELECT * FROM seg_perfiles_usuarios per WHERE per.idSegPerfil = ?", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.delperfilusuario = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegPerfil = req.params.getidSegPerfil;
    let idSegUsuario = req.params.getidSegUsuario;
    let consulta = ("DELETE FROM seg_perfiles_usuarios WHERE idSegPerfil = ? AND idSegUsuario = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idSegPerfil, idSegUsuario]);
        resp.status(201).json("Perfil de usuario eliminado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
//# sourceMappingURL=seg_perfiles_usuarios.js.map