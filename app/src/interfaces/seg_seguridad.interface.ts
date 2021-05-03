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

export interface Iseg_perfiles {
    idSegPerfil?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    fechaAlta: string;
    estatus?: number;
}

export interface Iseg_perfiles_user {
    idSegPerfilUsuario?: number;
    idSegUsuario: number;
    idSegPerfil: number;
}

export interface Iseg_roles_perfiles {
    idSegRolPerfil?: number;
    idSegRol: number;
    idSegPerfil: number;
}

export interface Iseg_direcciones {
    idSegDireccion?: number;
    tipoResidencia?: string;
    tipoDireccion?: string;
    direccion: string;
    puntoReferencia?: string;
    idSegUsuario: number;
    idConfigZonaPostal: number;
    idConfigParroquia: number;
}

export interface Iseg_telefonos{
    idSegTelefono?: number;
    valor?: string;
    tipoTelefono?: string;
    idSegUsuario: number;
}

export interface Iseg_menus{
    idSegMenu?: number;
    idSegMenuPadre: number;
    titulo?: string;
    routeLink?: string;
    nivel?: number;
    ordenVisualizacion?: number;
    expandedIcon?: string;
    collapsedIcon?: string;
}

export interface Imenus_aux{
    idSegMenu?: number;
    idSegMenuPadre: number;
    label?: string;    
    routeLink?: string;
    nivel?: number;
    ordenVisualizacion?: number;
    expandedIcon?: string;
    collapsedIcon?: string;    
}

export interface IArbol {
    data?: Iseg_menus;
    children?: IArbol[];
}

export interface Icrum{
    idSegMenu?: number;
    idSegMenuPadre?: number;
    label?: string;
}