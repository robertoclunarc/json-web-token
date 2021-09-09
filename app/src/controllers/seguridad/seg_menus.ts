import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_menus, IArbol, Icrum } from "../../interfaces/seg_seguridad.interface";
import {generarMenu, verBreakCrumb} from '../util.controller'

export const menus = async(req:Request, resp: Response ) => {
    
    const query: string = "SELECT * FROM seg_menus order by ordenVisualizacion, idSegMenu";
    console.log(query);
    try {
        const result = await db.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        const tree: IArbol[]= generarMenu(result,1);
        return resp.status(201).json(tree);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const items = async(req:Request, resp: Response ) => {
    const query: string = "SELECT titulo as label, idSegMenu as value, ordenVisualizacion FROM seg_menus where routeLink ='#' order by ordenVisualizacion, idSegMenu";
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
    let idx = req.params.getidMenu;
    const query: string = "SELECT * FROM segmenus WHERE idSegMenu = ?";
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

export const menusItems = async(req:Request, resp: Response ) => {
    
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
        //const result = await db.querySelect(query, [idx]);
        const result: Iseg_menus[] = await db.querySelect(query, [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        
        const tree: IArbol[]= generarMenu(result,0);
        return resp.status(201).json(tree);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const insertarItemMenu = async (req: Request, resp: Response) => {
    let newPost = {
        idSegMenu: "",
        idHijo: req.body.idHijo,
    idPadre: req.body.idPadre,
    titulo: req.body.titulo,
    rLink: req.body.rLink,
    nivel:req.body.nivel,
    ordVisual: req.body.ordVisual,
    expIcon: req.body.expIcon,
    colcon: req.body.colcon
    };        
    
    try {
        console.log(newPost);
        const result = await db.querySelect("CALL insertarItemMenu(?,?,?,?,?,?,?,?)", [newPost.idHijo, newPost.idPadre, newPost.titulo, newPost.rLink, newPost.nivel, newPost.ordVisual, newPost.expIcon, newPost.colcon]);    
        newPost.idSegMenu = result.insertId;
        console.log(result);
        return resp.status(201).json(newPost.idSegMenu);
                
    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateMenu = async (req: Request, resp: Response) => {
    let idx = req.params.getidSegMenu;
    let update: Iseg_menus = req.body;

    let consulta = ("UPDATE seg_menus  SET ? WHERE idSegMenu = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Item menu actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteMenu = async (req: Request, resp: Response) => {
    let idx = req.params.getidSegMenu;

    let consulta = ("DELETE FROM seg_menus WHERE idSegMenu = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Nodo del Menú eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const obtenerBreakCrumb  = async (req: Request, resp: Response) => {
   
    const idx = parseInt(req.params.getidSegMenu);
    
    const query: string = "SELECT * FROM seg_menus order by ordenVisualizacion, idSegMenu";
   
    try {
        const result = await db.querySelect(query);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        
        const breakCrumb: Icrum[]= verBreakCrumb(result, idx);
        return resp.status(201).json(breakCrumb);
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }
}     