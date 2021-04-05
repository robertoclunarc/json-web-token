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
exports.deleteCorreosId = exports.deleteCorreos = exports.updateCorreos = exports.Insertcorreos = void 0;
const database_1 = __importDefault(require("../../database"));
exports.Insertcorreos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = req.body;
    try {
        const result = yield database_1.default.querySelect("INSERT INTO seg_correos SET ?", [newPost]);
        newPost.idSegCorreo = result.insertId;
        return resp.status(201).json(newPost.idSegCorreo);
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.updateCorreos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idSegCorreo = req.params.getidSegCorreo;
    let update = req.body;
    let consulta = ("UPDATE seg_correos SET ? WHERE idSegCorreo = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [update, idSegCorreo]);
        resp.status(201).json("Correo de usuario actualizado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.deleteCorreos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idx = req.params.getidSegUsuario;
    let consulta = ("DELETE FROM seg_correos WHERE idSegUsuario = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idx]);
        resp.status(201).json("Correo(s) de usuario eliminado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.deleteCorreosId = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idx = req.params.getidSegCorreo;
    let consulta = ("DELETE FROM seg_correos WHERE idSegCorreo = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idx]);
        resp.status(201).json("Correo de usuario eliminado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
//# sourceMappingURL=seg_correos.js.map