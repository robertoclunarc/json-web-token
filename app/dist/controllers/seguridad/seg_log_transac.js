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
exports.GetLog = exports.selectLog = exports.Insertlog = void 0;
const database_1 = __importDefault(require("../../database"));
exports.Insertlog = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = req.body;
    try {
        const result = yield database_1.default.querySelect("INSERT INTO seg_log_transac SET ?", [newPost]);
        newPost.idLogTransac = result.insertId;
        return resp.status(201).json(newPost.idLogTransac);
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
exports.selectLog = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.querySelect("SELECT * FROM seg_log_transac");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.GetLog = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let modulo = req.body.modulo;
    let accion = req.body.accion;
    let rol = req.body.rol;
    let desde = req.body.desde;
    let hasta = req.body.hasta;
    let consulta = "SELECT 	t.idLogTransac, t.fechaRegistro, t.ipPc, t.observacion,  t.idSegUsuario, (SELECT usuario FROM seg_usuarios us WHERE us.idSegUsuario = t.idSegUsuario) usuario,    idSegRol, (SELECT codigo FROM seg_roles rols WHERE rols.idSegRol = t.idSegRol) rol, idTipoAccion, (SELECT nombre FROM gen_tipo_acciones tacc WHERE tacc.idTipoAccion = t.idTipoAccion)         tipo_accion, idSegMenu, (SELECT titulo FROM seg_menus men WHERE men.idSegMenu = t.idSegMenu) modulo, idGerencia,  (SELECT nombre FROM config_gerencias gen WHERE gen.idConfigGerencia = t.idGerencia) gerencia FROM seg_log_transac t WHERE 1 = 1";
    if (modulo != -1) {
        consulta = consulta + " and idSegMenu = " + modulo;
    }
    if (accion != -1) {
        consulta = consulta + " and idTipoAccion = " + accion;
    }
    if (rol != -1) {
        consulta = consulta + " and idSegRol = " + rol;
    }
    if ((desde != -1) && (hasta != -1)) {
        consulta = consulta + " and DATE_FORMAT(fechaRegistro, '%Y-%m-%d') BETWEEN '" + desde + "' and '" + hasta + "'";
    }
    console.log(req.body);
    console.log(consulta);
    try {
        const result = yield database_1.default.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
//# sourceMappingURL=seg_log_transac.js.map