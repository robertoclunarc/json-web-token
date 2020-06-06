"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const passport_1 = __importDefault(require("passport"));
//import verifyPassport from "../controller"
const router = express_1.Router();
//rutas
router.post("/api/getauth", auth_controller_1.getJWT);
router.get("/api/verify", passport_1.default.authenticate("jwt", { session: false }), auth_controller_1.verifyToken);
exports.default = router;
