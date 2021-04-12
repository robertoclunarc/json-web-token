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
exports.ValidateUSer = exports.verifyToken = exports.getJWT = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createJWT(idApp) {
    return jsonwebtoken_1.default.sign({ _id: idApp }, process.env.JWT_SECRET || "secret", {
        expiresIn: 3600 * 24
    });
}
exports.getJWT = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.idapp) {
            return resp.status(402).json({ msg: "Must send id app" });
        }
        /*
        const result = await db.querySelect("SELECT * FROM seg_app_auth WHERE id = ?", [req.idapp]);
        if (result.length <= 0) {
            token = "app not authorized!";
        }
        */
        const token = createJWT(req.idapp);
        return token;
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json('Es necesario el token de autenticación');
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
    /*
    console.log(payload);
     console.log(req.idapp);
     console.log(req.userId);
     */
    if (ValidateUSer(payload._id)) {
        req.userId = payload._id;
        next();
    }
    else {
        res.status(401).json('Token inválido');
    }
};
function ValidateUSer(IDuser) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM seg_usuarios WHERE idSegUsuario =?";
        try {
            const result = yield database_1.default.querySelect(query, [IDuser]);
            if (result.length <= 0) {
                return false;
            }
            return true;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.ValidateUSer = ValidateUSer;
//# sourceMappingURL=auth.controller.js.map