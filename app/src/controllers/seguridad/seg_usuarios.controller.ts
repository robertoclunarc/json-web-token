import { json, Request, Response } from "express";
import db from "../../database";
import { Iseg_usuarios } from "../../interfaces/seg_seguridad.interface";
import { encryptPassword, validatePassword } from "../../middlewares/password";
import  { getJWT } from "../auth.controller";


export const usuarios = async (req: Request, resp: Response) => {
    try {
        const result = await db.querySelect("SELECT * FROM seg_usuarios");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const usuariosgerencia = async (req: Request, resp: Response) => { 
    
   const query: string = "SELECT seg_usuarios.*,  (cargos.idConfigGerencia)  idGerencia, (CONCAT(seg_usuarios.primerNombre, ' ', seg_usuarios.primerApellido)) nombre_completo  FROM seg_usuarios JOIN config_cargos cargos ON cargos.idConfigCargo = seg_usuarios.idConfigCargo WHERE cargos.idConfigGerencia = ?";
    
    try {
        const result = await db.querySelect(query,[req.body.idGerencia]);
        
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        
        resp.status(401).json({ err: error });
    }
}

export const ip = (req: Request, resp: Response) => { 
    let _ip: string= "No se consiguio el IP";
    if (req.connection.remoteAddress!==""){
        _ip = req.connection.remoteAddress || "";
    }else{
        if (req.header('x-forwarded-for')!==""){
            _ip = req.header('x-forwarded-for') || "";
        }else{
            if (req.header('x-forwarded')!==""){
                _ip=req.header('x-forwarded') || "";
            }else{
                if (req.header('forwarded-for')!==""){
                    _ip=req.header('forwarded-for') || "";
                }else{
                    if (req.header('forwarded')!==""){
                        _ip=req.header('forwarded') || "";
                    }
                }
            }    
        }
    }    
    return resp.status(201).json(_ip);   
}

export async function idSegUsuario(req:Request, resp: Response) {
    const _idSegUsuario = req.params.getidSegUsuario;
    const query: string = "SELECT *, (SELECT cargos.idConfigGerencia FROM config_cargos cargos WHERE cargos.idConfigCargo = seg_usuarios.idConfigCargo) idGerencia FROM seg_usuarios WHERE idSegUsuario = ?";
    try {
        const result = await db.querySelect(query, [_idSegUsuario]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result[0]);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export async function direcciones(req:Request, resp: Response) {
    const idx = req.params.getid;
    const query: string = "SELECT * FROM seg_direcciones WHERE idSegUsuario =?";
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

export async function telefonos(req:Request, resp: Response) {
    const idx = req.params.getid;
    const query: string = "SELECT * FROM seg_telefonos WHERE idSegUsuario =?";
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

export async function correos(req:Request, resp: Response) {
    const idx = req.params.getid;
    const query: string = "SELECT * FROM seg_correos WHERE idSegUsuario =?";
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

export const createUser = async (req: Request, resp: Response) => {
    let newPost: Iseg_usuarios = req.body;        
    newPost.contrasenia = await encryptPassword(newPost.contrasenia); 
    try {
        const result = await db.querySelect("INSERT INTO seg_usuarios SET ?", [newPost]);    
        newPost.idSegUsuario = result.insertId;
        
        //token 
        req.idapp = newPost.idSegUsuario;          
        let token: string = await getJWT(req, resp) as string; 
        
        resp.header('auth-token', token).json(newPost.idSegUsuario);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
};


export const login = async (req: Request, resp: Response) => {
    let usuario: string = req.body.usuario;
    let contrasenia: string = req.body.contrasenia;      
    
    try {
        const result = await db.querySelect("SELECT u.*,(SELECT cargos.idConfigGerencia FROM config_cargos cargos WHERE cargos.idConfigCargo = u.idConfigCargo) idGerencia  FROM seg_usuarios as u WHERE  u.usuario=?", [usuario]);    
        console.log(result);
        if (!result.length){
            return resp.status(400).json('Usuario No Encontrado');
                   
        }else{
            const rset: Iseg_usuarios = result[0];            
            const correctPassword: boolean = await validatePassword(contrasenia, rset.contrasenia);                     
            if (!correctPassword) return resp.status(400).json('Clave Incorrecta');
            
            //token
            req.idapp = rset.idSegUsuario;
            let token: string = await getJWT(req, resp) as string; 
            
            resp.header('auth-token', token).json(rset);            
        }

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
};

export const updateUsuario = async (req: Request, resp: Response) => {
    let idSegUsuario = req.params.getidSegUsuario;
    let update: Iseg_usuarios = req.body;
    update.contrasenia= await encryptPassword(update.contrasenia);
    let consulta = ("UPDATE seg_usuarios SET ? WHERE idSegUsuario = ?");
    try {
        const result = await db.querySelect(consulta, [update, idSegUsuario]);
        resp.status(201).json("Usuario actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteUsuario = async (req: Request, resp: Response) => {
    let idSegUsuario = req.params.getidSegUsuario;

    let consulta = ("DELETE FROM seg_usuarios WHERE idSegUsuario = ?");
    try {
        const result = await db.querySelect(consulta, [idSegUsuario]);
        resp.status(201).json("Usuario eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export async function usuariosverificagerencia(req:Request, resp: Response) {
    const idx = req.params.idConfigGerencia;
    const query: string = "SELECT 	usr.idSegUsuario,    usr.primerNombre,    usr.usuario,    usr.idConfigCargo,    cargos.nombre,    gerencia.idConfigGerencia,    gerencia.nombre,    perfiles.idSegPerfil,    rolper.idSegRol AS roles_perfil,    roles_dir.idSegRol AS roles_directos,    roles.nombre, roles.codigo FROM seg_usuarios AS usr INNER JOIN config_cargos cargos ON cargos.idConfigCargo = usr.idConfigCargo INNER JOIN config_gerencias gerencia ON gerencia.idConfigGerencia = cargos.idConfigGerencia LEFT JOIN seg_perfiles_usuarios perfiles ON usr.idSegUsuario = perfiles.idSegUsuario LEFT JOIN seg_roles_perfiles rolper ON perfiles.idSegPerfil = rolper.idSegPerfil LEFT JOIN seg_roles_usuarios roles_dir ON roles_dir.idSegUsuario = usr.idSegUsuario LEFT JOIN seg_roles roles ON roles.idSegRol = roles_dir.idSegRol OR roles.idSegRol = rolper.idSegRol WHERE gerencia.idConfigGerencia = ? AND roles.codigo = 'ROL-VTS' GROUP BY usr.usuario";
    try {
        const result = await db.querySelect(query, [idx]);
        console.log(result);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export function subirimagenusr(req:Request, resp: Response) {
    const newPhoto = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagePath: req.file.path
    }
    console.log(newPhoto);

    return resp.status(201).json(newPhoto.imagePath);
}
