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
exports.deletePerfil = exports.updatePerfil = exports.createPerfil = exports.perfilesID = exports.perfiles = void 0;
const database_1 = __importDefault(require("../../database"));
exports.perfiles = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.querySelect("SELECT * FROM seg_perfiles");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.perfilesID = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const idx = req.params.getidSegPerf;
    try {
        const result = yield database_1.default.querySelect("SELECT * FROM seg_perfiles WHERE idSegPerfil = ?", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.createPerfil = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = req.body;
    try {
        const result = yield database_1.default.querySelect("INSERT INTO seg_perfiles SET ?", [newPost]);
        newPost.idSegPerfil = result.insertId;
        return resp.status(201).json(newPost.idSegPerfil);
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.updatePerfil = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegPerf = req.params.getidSegPerf;
    let update = req.body;
    let consulta = ("UPDATE seg_perfiles SET ? WHERE idSegPerfil = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [update, idSegPerf]);
        resp.status(201).json("Perfil actualizado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.deletePerfil = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegPerf = req.params.getidSegPerf;
    let consulta = ("DELETE FROM seg_perfiles WHERE idSegPerfil = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idSegPerf]);
        resp.status(201).json("Perfil eliminado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
//# sourceMappingURL=seg_perfiles.js.map