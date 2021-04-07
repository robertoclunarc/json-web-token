import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_direcciones } from "../../interfaces/seg_seguridad.interface";

export const createDireccion = async (req: Request, resp: Response) => {
    let newPost: Iseg_direcciones = req.body;        
    
    try {
        const result = await db.querySelect("INSERT INTO seg_direcciones SET ?", [newPost]);    
        newPost.idSegDireccion = result.insertId;
        return resp.status(201).json(newPost.idSegDireccion);
                
    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateDireccion = async (req: Request, resp: Response) => {
    let idx = req.params.getid;
    let update: Iseg_direcciones = req.body;

    let consulta = ("UPDATE seg_direcciones SET ? WHERE idSegDireccion = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Direccion actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteDireccionesTodo = async (req: Request, resp: Response) => {
    let idx = req.params.getidUsuario;

    let consulta = ("DELETE FROM seg_direcciones WHERE idSegUsuario = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Direcciones de usuario eliminado(S) correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteDireccion = async (req: Request, resp: Response) => {
    let idx = req.params.getiddireccion;

    let consulta = ("DELETE FROM seg_direcciones WHERE idSegDireccion = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Direccion de usuario eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}
