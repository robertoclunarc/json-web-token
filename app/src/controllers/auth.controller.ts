import { Request, Response } from "express";
import db from "../database";
import jwt from "jsonwebtoken";
import passport from "passport";

function createJWT(idApp: number) {
    return jwt.sign({ idApp }, process.env.JWT_SECRET || "secret", {
        expiresIn: 3600 * 24
    });
}

export const getJWT = async (req: Request, resp: Response) => {
    try {
        //const result = await db.querySelect("SELECT * FROM seg_roles");
        if (!req.body.idapp) {
            return resp.status(402).json({ msg: "Must send id app" });
        }

        const result = await db.querySelect("SELECT * FROM seg_app_auth WHERE id = ?", [req.body.idapp]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "app not authorized!" });
        }

        return resp.status(201).json({ token: createJWT(req.body.idapp) });

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const verifyToken = (req: Request, resp: Response) => {
    return resp.status(201).json({ mgs: "Verify Token!!!" });
} 
