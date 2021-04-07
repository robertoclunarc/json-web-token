import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_perfiles_user } from "../../interfaces/seg_seguridad.interface";

export const perfiles_user = async (req: Request, resp: Response) => {
    try {
        const result = await db.querySelect("SELECT * FROM seg_perfiles_usuarios");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const perfilesUsuarios = async (req: Request, resp: Response) => {
    const idx= req.params.getidSegUser;
    try {
        const result = await db.querySelect("SELECT per.nombre AS nombrePerfil,  per.codigo AS codigoPerfil,  per.idSegPerfil,      usrs.usuario AS nombreUsr, usrs.idSegUsuario FROM seg_perfiles per JOIN seg_perfiles_usuarios perUsr ON per.idSegPerfil = perUsr.idSegPerfil JOIN seg_usuarios usrs ON usrs.idSegUsuario = perUsr.idSegUsuario WHERE usrs.idSegUsuario = ?", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const noperfilesusuario = async (req: Request, resp: Response) => {
    const idx= req.params.getidSegPerfil;
    try {
        const result = await db.querySelect("SELECT per.nombre AS nombreper, per.codigo AS codigoper, per.idSegPerfil FROM seg_perfiles per LEFT JOIN (SELECT idSegUsuario, idSegPerfilUsuario, idSegPerfil FROM seg_perfiles_usuarios WHERE idSegUsuario= ?) perusr ON perusr.idSegPerfil = per.idSegPerfil WHERE perusr.idSegPerfilUsuario IS NULL AND per.estatus = 1", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const porperfil = async (req: Request, resp: Response) => {
    const idx= req.params.getidSegPerfil;
    try {
        const result = await db.querySelect("SELECT * FROM seg_perfiles_usuarios per WHERE per.idSegPerfil = ?", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const delperfilusuario = async (req: Request, resp: Response) => {
    let idSegPerfil = req.params.getidSegPerfil;
    let idSegUsuario = req.params.getidSegUsuario;
    let consulta = ("DELETE FROM seg_perfiles_usuarios WHERE idSegPerfil = ? AND idSegUsuario = ?");
    try {
        const result = await db.querySelect(consulta, [idSegPerfil, idSegUsuario]);
        resp.status(201).json("Perfil de usuario eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}