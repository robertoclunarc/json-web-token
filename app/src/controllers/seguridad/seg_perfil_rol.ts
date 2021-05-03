import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_roles_perfiles } from "../../interfaces/seg_seguridad.interface";

export const perfilRoles = async (req: Request, resp: Response) => {
    const idperfil= req.params.getidSegPerfil;
    try {
        const result = await db.querySelect("SELECT per.nombre AS nombrePerfil,  per.codigo AS codigoPerfil,  per.idSegPerfil, rol.nombre AS nombreRol,  rol.codigo AS codigoRol, rol.idSegRol FROM seg_perfiles per JOIN seg_roles_perfiles perRol ON per.idSegPerfil = perRol.idSegPerfil JOIN seg_roles rol ON rol.idSegRol = perRol.idSegRol WHERE per.idSegPerfil = ? group by per.nombre, per.codigo, per.idSegPerfil,rol.nombre, rol.codigo,  rol.idSegRol, rol.idSegRol", [idperfil]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const noPerfilRoles = async (req: Request, resp: Response) => {
    const idSegPerfil= req.params.getidSegPerfil;
    try {
        const result = await db.querySelect("SELECT rol.nombre AS nombreRol, rol.codigo AS codigoRol, rol.idSegRol FROM seg_roles rol LEFT JOIN (SELECT idSegRol, idSegRolPerfil FROM seg_roles_perfiles WHERE idSegPerfil= ?) perRol ON rol.idSegRol = perRol.idSegRol WHERE perRol.idSegRolPerfil IS NULL AND rol.estatus = 1", [idSegPerfil]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const perfilRol = async (req: Request, resp: Response) => {
    let newPost: Iseg_roles_perfiles = req.body;        
    
    try {
        const result = await db.querySelect("INSERT INTO seg_roles_perfiles SET ?", [newPost]);    
        newPost.idSegRolPerfil = result.insertId;
        return resp.status(201).json(newPost.idSegRolPerfil);
                
    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const delPerfilRol = async (req: Request, resp: Response) => {
    let idSegPerfil = req.params.getidSegPerfil;
    let idSegRol = req.params.getidSegRol;
    let consulta = ("DELETE FROM seg_roles_perfiles WHERE idSegPerfil = ? AND idSegRol = ?");
    try {
        const result = await db.querySelect(consulta, [idSegPerfil,idSegRol]);
        resp.status(201).json("Rol de perfil eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}