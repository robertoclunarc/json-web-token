import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_rol } from "../../interfaces/seg_seguridad.interface";

export const roles = async (req: Request, resp: Response) => {
    try {
        const result = await db.querySelect("SELECT * FROM seg_roles");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const tipoAcciones = async (req: Request, resp: Response) => {
    try {
        const result = await db.querySelect("SELECT idTipoAccion, fecha_alta, nombre FROM  gen_tipo_acciones ORDER BY nombre ASC");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}
export const rol = async (req: Request, resp: Response) => {
    const idx= req.params.getidSegRol;
    try {
        const result = await db.querySelect("SELECT * FROM seg_roles WHERE idSegRol = ?", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result[0]);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRol = async (req: Request, resp: Response) => {
    let newPost: Iseg_rol = req.body;        
    
    try {
        const result = await db.querySelect("INSERT INTO seg_roles SET ?", [newPost]);    
        newPost.idSegRol = result.insertId;
        return resp.status(201).json(newPost.idSegRol);
                
    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRol = async (req: Request, resp: Response) => {
    let idSegRol = req.params.getidSegRol;
    let update: Iseg_rol = req.body;

    let consulta = ("UPDATE seg_roles SET ? WHERE idSegRol = ?");
    try {
        const result = await db.querySelect(consulta, [update, idSegRol]);
        resp.status(201).json("Rol actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRol = async (req: Request, resp: Response) => {
    let idSegRol = req.params.getidSegRol;

    let consulta = ("UPDATE seg_roles SET estatus=0 WHERE idSegRol = ?");
    try {
        const result = await db.querySelect(consulta, [idSegRol]);
        resp.status(201).json("Rol eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const userLocalStorage = async (req: Request, resp: Response) => {
    const _id= req.params.getidSegRol;
    try {
        const result = await db.querySelect("CALL obtenerRolesLocalStorage(?)", [_id]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}
