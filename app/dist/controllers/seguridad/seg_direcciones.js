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
exports.deleteDireccion = exports.deleteDireccionesTodo = exports.updateDireccion = exports.createDireccion = void 0;
const database_1 = __importDefault(require("../../database"));
exports.createDireccion = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = req.body;
    try {
        const result = yield database_1.default.querySelect("INSERT INTO seg_direcciones SET ?", [newPost]);
        newPost.idSegDireccion = result.insertId;
        return resp.status(201).json(newPost.idSegDireccion);
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.updateDireccion = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idx = req.params.getid;
    let update = req.body;
    let consulta = ("UPDATE seg_direcciones SET ? WHERE idSegDireccion = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [update, idx]);
        resp.status(201).json("Direccion actualizada correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.deleteDireccionesTodo = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idx = req.params.getidUsuario;
    let consulta = ("DELETE FROM seg_direcciones WHERE idSegUsuario = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idx]);
        resp.status(201).json("Direcciones de usuario eliminado(S) correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.deleteDireccion = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idx = req.params.getiddireccion;
    let consulta = ("DELETE FROM seg_direcciones WHERE idSegDireccion = ?");
    try {
        const result = yield database_1.default.querySelect(consulta, [idx]);
        resp.status(201).json("Direccion de usuario eliminado correctamente");
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
//# sourceMappingURL=seg_direcciones.js.map