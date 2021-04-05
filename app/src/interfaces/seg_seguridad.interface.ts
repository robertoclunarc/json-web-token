export interface Iseg_usuarios {
    idSegUsuario?: number;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: string;
    sexo: string;
    usuario: string;
    contrasenia: string;
    fechaAlta: string;
    foto?: string;
    estatus: string;
    estadoCivil: string;
    idConfigCargo?: number;
    rutaImagen: string;
    idGerencia?: number;
}

export  interface IPayload{
    _id: string;
    iat: number;
    exp: number;
}

export interface Iseg_rol {
    idSegRol?: number;
    codigo?: string;
    nombre?: string;
    descripcion?: string;
    fechaAlta: string;
    estatus?: number;
    auditable: number;
    idSegMenu?: number;
}

export interface Iseg_roles_usuarios {
    idSegRolUsuario?: number;    
    idSegUsuario: number;
    idSegRol: number;
}

export interface Iseg_correos {
    idSegCorreo?: number;    
    correo: string;
    principal: number;
    idSegUsuario: number;
}

export interface Iseg_log_transac {
    idLogTransac?: number;
    fechaRegistro: string;
    ipPc: string;
    observacion: string;
    idSegUsuario: number;
    idSegRol: number;
    idTipoAccion: number;
    idSegMenu: number;
    idGerencia: number;
}
