import { Router } from "express";

import { getJWT, verifyToken } from "../controllers/auth.controller"
import passport from "passport";
//import verifyPassport from "../controller"

const router = Router();
//rutas
router.post("/api/getauth", getJWT);
router.get("/api/verify", passport.authenticate("jwt", { session: false }), verifyToken);

export default router; 