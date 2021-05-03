import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_log_transac } from "../../interfaces/seg_seguridad.interface";

export const Insertlog = async (req: Request, resp: Response) => {
    let newPost: Iseg_log_transac = req.body;        
    
    try {
        const result = await db.querySelect("INSERT INTO seg_log_transac SET ?", [newPost]);    
        newPost.idLogTransac = result.insertId;
        return resp.status(201).json(newPost.idLogTransac);
                
    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const selectLog = async (req: Request, resp: Response) => {
    try {
        const result = await db.querySelect("SELECT * FROM seg_log_transac");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const getLog = async (req: Request, resp: Response) => {
    let modulo = req.body.modulo;
    let accion = req.body.accion;
    let rol = req.body.rol;
    let desde = req.body.desde;
    let hasta = req.body.hasta;
    let consulta = "SELECT 	t.idLogTransac, t.fechaRegistro, t.ipPc, t.observacion,  t.idSegUsuario, (SELECT usuario FROM seg_usuarios us WHERE us.idSegUsuario = t.idSegUsuario) usuario,    idSegRol, (SELECT codigo FROM seg_roles rols WHERE rols.idSegRol = t.idSegRol) rol, idTipoAccion, (SELECT nombre FROM gen_tipo_acciones tacc WHERE tacc.idTipoAccion = t.idTipoAccion)         tipo_accion, idSegMenu, (SELECT titulo FROM seg_menus men WHERE men.idSegMenu = t.idSegMenu) modulo, idGerencia,  (SELECT nombre FROM config_gerencias gen WHERE gen.idConfigGerencia = t.idGerencia) gerencia FROM seg_log_transac t WHERE 1 = 1";

    if (modulo !=-1) {       
        consulta = consulta + " and idSegMenu = " + modulo; 
             
    }   
    
    if (accion != -1) {
        consulta = consulta + " and idTipoAccion = " + accion;
    }
    if (rol != -1) {
        consulta = consulta + " and idSegRol = " + rol;
    }

    if ((desde != -1) && (hasta != -1)){
        consulta = consulta + " and DATE_FORMAT(fechaRegistro, '%Y-%m-%d') BETWEEN '" + desde + "' and '" + hasta + "'";
    }
    console.log(req.body); 
    console.log(consulta);
    try {
        const result = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}