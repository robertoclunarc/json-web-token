import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_roles_usuarios } from "../../interfaces/seg_seguridad.interface";

export const createUsuarioRol = async (req: Request, resp: Response) => {
    let newPost: Iseg_roles_usuarios = req.body;        
    
    try {
        const result = await db.querySelect("INSERT INTO seg_roles_usuarios SET ?", [newPost]);    
        newPost.idSegRolUsuario = result.insertId;
        return resp.status(201).json(newPost.idSegRolUsuario);
                
    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const deleteUsuarioRol = async (req: Request, resp: Response) => {
    let idSegUsuario = req.params.getidSegUsuario;
    let idSegRol = req.params.getidSegRol;

    let consulta = ("DELETE FROM seg_roles_usuarios WHERE idSegUsuario = ? AND idSegRol = ?");
    try {
        const result = await db.querySelect(consulta, [idSegUsuario,idSegRol]);
        resp.status(201).json("Rol de usuario eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const usuarioRoles = async (req: Request, resp: Response) => {
    let idSegUsuario = req.params.getidSegUsuario;
    let consulta = ("SELECT per.usuario AS nombreUsuario, per.idSegUsuario, rol.nombre AS nombreRol,  rol.codigo AS codigoRol,  rol.idSegRol FROM seg_usuarios per JOIN seg_roles_usuarios perRol ON per.idSegUsuario = perRol.idSegUsuario JOIN seg_roles rol ON rol.idSegRol = perRol.idSegRol WHERE per.idSegUsuario = ?");
    try {
        const result = await db.querySelect(consulta, [idSegUsuario]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const usuariosRoles = async (req: Request, resp: Response) => {
    let codigoRol = req.params.getcodigoRol;
    let consulta = ("SELECT per.usuario AS nombreUsuario, per.idSegUsuario,  rol.nombre AS nombreRol, rol.codigo AS codigoRol,  rol.idSegRol FROM seg_usuarios per JOIN seg_roles_usuarios perRol ON per.idSegUsuario = perRol.idSegUsuario JOIN seg_roles rol ON rol.idSegRol = perRol.idSegRol WHERE rol.codigo = ?");
    try {
        const result = await db.querySelect(consulta, [codigoRol]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const noUsuarioRoles = async (req: Request, resp: Response) => {
    let idSegUsuario = req.params.getidSegUsuario;
    let consulta = ("SELECT rol.nombre AS nombreRol, rol.codigo AS codigoRol, rol.idSegRol FROM seg_roles rol LEFT JOIN (SELECT idSegRol, idSegRolUsuario FROM seg_roles_usuarios WHERE idSegUsuario = ?) perRol ON rol.idSegRol = perRol.idSegRol WHERE perRol.idSegRolUsuario IS NULL AND rol.estatus = 1");
    try {
        const result = await db.querySelect(consulta, [idSegUsuario]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}