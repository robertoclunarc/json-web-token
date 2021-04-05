import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_correos } from "../../interfaces/seg_seguridad.interface";

export const Insertcorreos = async (req: Request, resp: Response) => {
    let newPost: Iseg_correos = req.body;        
    
    try {
        const result = await db.querySelect("INSERT INTO seg_correos SET ?", [newPost]);    
        newPost.idSegCorreo = result.insertId;
        return resp.status(201).json(newPost.idSegCorreo);
                
    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateCorreos = async (req: Request, resp: Response) => {
    let idSegCorreo = req.params.getidSegCorreo;
    let update: Iseg_correos = req.body;

    let consulta = ("UPDATE seg_correos SET ? WHERE idSegCorreo = ?");
    try {
        const result = await db.querySelect(consulta, [update, idSegCorreo]);
        resp.status(201).json("Correo de usuario actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteCorreos = async (req: Request, resp: Response) => {
    let idx = req.params.getidSegUsuario;

    let consulta = ("DELETE FROM seg_correos WHERE idSegUsuario = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Correo(s) de usuario eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteCorreosId = async (req: Request, resp: Response) => {
    let idx = req.params.getidSegCorreo;

    let consulta = ("DELETE FROM seg_correos WHERE idSegCorreo = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Correo de usuario eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}