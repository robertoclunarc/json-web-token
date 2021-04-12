import { Request, Response, NextFunction, json } from "express";
import db from "../database";
import jwt from "jsonwebtoken";
import { IPayload} from '../interfaces/seg_seguridad.interface';

function createJWT(idApp: number) {
    return jwt.sign({ _id: idApp }, process.env.JWT_SECRET || "secret", {
        expiresIn: 3600 * 24
    });
}

export const getJWT = async (req: Request, resp: Response) => {
    
    try {
        
        if (!req.idapp) {
            return resp.status(402).json({ msg: "No esta logueado" });
        }
        /*
        const result = await db.querySelect("SELECT * FROM seg_app_auth WHERE id = ?", [req.idapp]);
        if (result.length <= 0) {
            token = "app not authorized!";
        }
        */
        const token: string = createJWT(req.idapp);

        return token;

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Es necesario el token de autenticación');    
    let lastError = null;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as IPayload ;
        req.userId = payload._id;
        next();
    } catch(error) {
        
        lastError = error;
        if (error.message !== 'invalid signature') {
            res.status(401).json(lastError);
        }
    }
}