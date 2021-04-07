import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_telefonos } from "../../interfaces/seg_seguridad.interface";

export const createTelefono = async (req: Request, resp: Response) => {
    let newPost: Iseg_telefonos = req.body;        
    
    try {
        const result = await db.querySelect("INSERT INTO seg_telefonos SET ?", [newPost]);    
        newPost.idSegTelefono = result.insertId;
        return resp.status(201).json(newPost.idSegTelefono);
                
    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateTelefono = async (req: Request, resp: Response) => {
    let idx = req.params.getid;
    let update: Iseg_telefonos = req.body;

    let consulta = ("UPDATE seg_telefonos SET ? WHERE idSegTelefono = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Telefono actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deletetelefonosTodo = async (req: Request, resp: Response) => {
    let idx = req.params.getidUsuario;

    let consulta = ("DELETE FROM seg_telefonos WHERE idSegUsuario = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Telefonos de usuario eliminado(S) correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteTelefonos = async (req: Request, resp: Response) => {
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
