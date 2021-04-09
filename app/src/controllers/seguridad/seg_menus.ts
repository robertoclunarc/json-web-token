import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_menus } from "../../interfaces/seg_seguridad.interface";

export const menus = async(req:Request, resp: Response ) => {
    const tablaMEnu : string = req.params.tablaMenu;
    const query: string = "SELECT * FROM seg_menus order by ordenVisualizacion, idSegMenu";
    try {
        const result = await db.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const items = async(req:Request, resp: Response ) => {
    const tablaMEnu : string = req.params.tablaMenu;
    const query: string = "SELECT titulo as label, idSegMenu as value, ordenVisualizacion FROM "+tablaMEnu+" where routeLink ='#'    order by ordenVisualizacion, idSegMenu";
    try {
        const result = await db.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const icons = async(req:Request, resp: Response ) => {
    
    const query: string = "SELECT concat('fa ', icon) as label, icon as value FROM seg_icons order by idSegIcon";
    try {
        const result = await db.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const menusID = async(req:Request, resp: Response ) => {
    const tablaMEnu : string = req.params.tablaMenu;
    let idx = req.params.getidMenu;
    const query: string = "SELECT * FROM "+tablaMEnu+" WHERE idSegMenu = ?";
    try {
        const result = await db.querySelect(query, [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const menusitems = async(req:Request, resp: Response ) => {
    
    const query: string = "SELECT idSegMenu, titulo, (SELECT titulo FROM seg_menus m WHERE m.idSegMenu = menu.idSegMenuPadre) padre  FROM seg_menus menu WHERE menu.routeLInk <> '#'  ORDER BY titulo";
    try {
        const result = await db.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const obtenerMenuUsuario = async(req:Request, resp: Response ) => {
    let idx = req.params.getidUsuario;
    const query: string = "CALL obtenerMenuPorUsuario(?)";
    try {
        const result = await db.querySelect(query, [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}