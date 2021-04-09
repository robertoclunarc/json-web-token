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
exports.obtenerMenuUsuario = exports.menusitems = exports.menusID = exports.icons = exports.items = exports.menus = void 0;
const database_1 = __importDefault(require("../../database"));
exports.menus = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const tablaMEnu = req.params.tablaMenu;
    const query = "SELECT * FROM seg_menus order by ordenVisualizacion, idSegMenu";
    try {
        const result = yield database_1.default.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.items = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const tablaMEnu = req.params.tablaMenu;
    const query = "SELECT titulo as label, idSegMenu as value, ordenVisualizacion FROM " + tablaMEnu + " where routeLink ='#'    order by ordenVisualizacion, idSegMenu";
    try {
        const result = yield database_1.default.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.icons = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT concat('fa ', icon) as label, icon as value FROM seg_icons order by idSegIcon";
    try {
        const result = yield database_1.default.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.menusID = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const tablaMEnu = req.params.tablaMenu;
    let idx = req.params.getidMenu;
    const query = "SELECT * FROM " + tablaMEnu + " WHERE idSegMenu = ?";
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
exports.menusitems = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT idSegMenu, titulo, (SELECT titulo FROM seg_menus m WHERE m.idSegMenu = menu.idSegMenuPadre) padre  FROM seg_menus menu WHERE menu.routeLInk <> '#'  ORDER BY titulo";
    try {
        const result = yield database_1.default.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.obtenerMenuUsuario = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let idx = req.params.getidUsuario;
    const query = "CALL obtenerMenuPorUsuario(?)";
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
//# sourceMappingURL=seg_menus.js.map