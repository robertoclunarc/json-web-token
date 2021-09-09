import { Iseg_menus, Imenus_aux, IArbol, Icrum } from '../interfaces/seg_seguridad.interface';

    let SQLseg_menus: Iseg_menus[];
    
    export const generarMenu = (datosSQL: Iseg_menus[], tipo: number)=>{
        
        SQLseg_menus = JSON.parse(JSON.stringify(datosSQL[0]));
        
        let arbol: IArbol[] = [];
        let nodo: IArbol= {};
        let data: Imenus_aux;
        let padres: Iseg_menus[] = obtenerPadres();
        
        padres.forEach(function(value , index) {
            data = value;        

            if (tipo==0){
                
                if ((value.expandedIcon=== null) || (typeof value.expandedIcon === "undefined") || (value.expandedIcon == "")){
                    data.expandedIcon = 'Sin asignar';
                }else{
                    data.expandedIcon = value.expandedIcon;
                    
                }
                if ((value.collapsedIcon === null) || (typeof value.collapsedIcon === "undefined") || (value.collapsedIcon == "")){
                    data.collapsedIcon = 'Sin asignar';
                }else{
                    data.collapsedIcon = value.collapsedIcon;
                    
                }
                
            }else{
                if ((value.expandedIcon=== null) || (typeof value.expandedIcon === "undefined") || (value.expandedIcon == "")){
                    data.expandedIcon = 'Sin asignar';
                }else{
                    data.expandedIcon = 'fa ' + value.expandedIcon;
                }
                if ((value.collapsedIcon === null) || (typeof value.collapsedIcon === "undefined") || (value.collapsedIcon == "")){
                    data.collapsedIcon = 'Sin asignar';
                }else{
                    data.collapsedIcon = 'fa ' + value.collapsedIcon;
                }                
            }
            nodo.data=data;
            console.log(data);
            nodo.children = generarMenuItems(value.idSegMenu, tipo) || [];
            arbol.push(nodo);
            nodo={};
        });
        
        return arbol;
    }

    const generarMenuItems = (item?: number, tipo?: number) => {        
        let data: Iseg_menus;
        let NewArbol: IArbol = {}
        let nodos: IArbol[] = []; 
        
        const  hijos: Iseg_menus[]= obtenerHijos(item);
        
        if (hijos.length == 0) {
            return null;
        }

        hijos.forEach(function(value , index) {             
            data = value;            
            
            if (tipo == 0){

                if ((value.expandedIcon === null) || (typeof value.expandedIcon === "undefined") || (value.expandedIcon == "")){
                    data.expandedIcon = 'Sin asignar';
                }else{
                    data.expandedIcon = 'fa ' + value.expandedIcon;
                }
    
                if ((value.collapsedIcon === null) || (typeof value.collapsedIcon === "undefined") || (value.collapsedIcon == "")){
                    data.collapsedIcon = 'Sin asignar';
                }else{
                    data.collapsedIcon = 'fa ' + value['collapsedIcon'];
                }                
            }
            else{
                if ((value.expandedIcon === null) || (typeof value.expandedIcon === "undefined") || (value.expandedIcon == "")){
                    data.expandedIcon = 'Sin asignar';
                }else{
                    data.expandedIcon = value.expandedIcon;
                }
    
                if ((value.collapsedIcon === null) || (typeof value.collapsedIcon === "undefined") || (value.collapsedIcon == "")){
                    data.collapsedIcon = 'Sin asignar';
                }else{
                    data.collapsedIcon = value['collapsedIcon'];
                }                
            }
            NewArbol.data = data;            
            NewArbol.children = <IArbol[]>generarMenuItems(value.idSegMenu, tipo);
            nodos.push(NewArbol);
            NewArbol = {};
        });
        return nodos;    
    }

    const obtenerHijos = (padre?: number)=>{
        
        const hijos: Iseg_menus[] = SQLseg_menus.filter((m) => m.idSegMenuPadre == padre);  
        return hijos;
    }

    const obtenerPadres = () => {       
        const padres: Iseg_menus[] = SQLseg_menus.filter((m) => m.idSegMenuPadre == 0);        
        return padres;
    }

    export const verBreakCrumb=(elements: any, id: number)=>{
        let salida: Icrum[] = recursiveBreakCrumb(elements, id); 
        return salida;
    }

    const recursiveBreakCrumb=(elements: Icrum[], id: number)=>{
        let branch : Icrum[]=[];
        const node: Icrum = elements.find((dato) => dato.idSegMenu == id)!;       
        if (node){
            branch = recursiveBreakCrumb(elements, node.idSegMenuPadre || 0);            
            branch.push(node);
        }
        
        return branch;
    }