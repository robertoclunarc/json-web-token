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
exports.verifyToken = exports.getJWT = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createJWT(idApp) {
    return jsonwebtoken_1.default.sign({ idApp }, process.env.JWT_SECRET || "secret", {
        expiresIn: 3600 * 24
    });
}
exports.getJWT = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const result = await db.querySelect("SELECT * FROM seg_roles");
        if (!req.body.idapp) {
            return resp.status(402).json({ msg: "Must send id app" });
        }
        const result = yield database_1.default.querySelect("SELECT * FROM seg_app_auth WHERE id = ?", [req.body.idapp]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "app not authorized!" });
        }
        return resp.status(201).json({ token: createJWT(req.body.idapp) });
    }
    catch (error) {
        resp.status(401).json({ err: error });
    }
});
exports.verifyToken = (req, resp) => {
    return resp.status(201).json({ mgs: "Verify Token!!!" });
};
