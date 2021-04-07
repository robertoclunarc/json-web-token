import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_perfiles } from "../../interfaces/seg_seguridad.interface";

export const perfiles = async (req: Request, resp: Response) => {
    try {
        const result = await db.querySelect("SELECT * FROM seg_perfiles");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const perfilesID = async (req: Request, resp: Response) => {
    const idx= req.params.getidSegPerf;
    try {
        const result = await db.querySelect("SELECT * FROM seg_perfiles WHERE idSegPerfil = ?", [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createPerfil = async (req: Request, resp: Response) => {
    let newPost: Iseg_perfiles = req.body;        
    
    try {
        const result = await db.querySelect("INSERT INTO seg_perfiles SET ?", [newPost]);    
        newPost.idSegPerfil = result.insertId;
        return resp.status(201).json(newPost.idSegPerfil);
                
    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updatePerfil = async (req: Request, resp: Response) => {
    let idSegPerf = req.params.getidSegPerf;
    let update: Iseg_perfiles = req.body;

    let consulta = ("UPDATE seg_perfiles SET ? WHERE idSegPerfil = ?");
    try {
        const result = await db.querySelect(consulta, [update, idSegPerf]);
        resp.status(201).json("Perfil actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deletePerfil = async (req: Request, resp: Response) => {
    let idSegPerf = req.params.getidSegPerf;

    let consulta = ("DELETE FROM seg_perfiles WHERE idSegPerfil = ?");
    try {
        const result = await db.querySelect(consulta, [idSegPerf]);
        resp.status(201).json("Perfil eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}