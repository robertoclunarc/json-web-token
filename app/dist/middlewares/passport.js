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
const passport_jwt_1 = require("passport-jwt");
const database_1 = __importDefault(require("../database"));
const strategy = new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "secret"
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.querySelect("SELECT * FROM seg_app_auth WHERE id = ?", [payload.idapp]);
        if (result.length < 0) {
            return done(null, false);
        }
        return done(null, result);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = strategy;
//# sourceMappingURL=passport.js.map