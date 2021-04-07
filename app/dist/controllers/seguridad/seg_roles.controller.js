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
exports.userLocalStorage = exports.deleteRol = exports.updateRol = exports.createRol = exports.rol = exports.tipoacciones = exports.roles = void 0;
const database_1 = __importDefault(require("../../database"));
exports.roles = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.querySelect("SELECT * FROM seg_roles");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.tipoacciones = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.querySelect("SELECT idTipoAccion, fecha_alta, nombre FROM  gen_tipo_acciones ORDER BY nombre ASC");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.rol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const idx = req.params.getidSegRol;
    try {
        const result = yield database_1.default.querySelect("SELECT * FROM seg_roles WHERE idSegRol = ?", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result[0]);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.createRol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = req.body;
    try {
        const result = yield database_1.default.querySelect("INSERT INTO seg_roles SET ?", [newPost]);
        newPost.idSegRol = result.insertId;
        return resp.status(201).json(newPost.idSegRol);
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.updateRol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegRol = req.params.getidSegRol;
    let update = req.body;
    let consulta = ("UPDATE seg_roles SET ? WHERE idSegRol = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [update, idSegRol]);
        resp.status(201).json("Rol actualizado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.deleteRol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegRol = req.params.getidSegRol;
    let consulta = ("DELETE FROM seg_roles WHERE idSegRol = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idSegRol]);
        resp.status(201).json("Rol eliminado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.userLocalStorage = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.getidSegRol;
    try {
        const result = yield database_1.default.querySelect("CALL obtenerRolesLocalStorage(?)", [_id]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
//# sourceMappingURL=seg_roles.controller.js.map