import { Iseg_menus, Imenus_aux, IArbol, Icrum } from '../interfaces/seg_seguridad.interface'

    let SQLseg_menus: Iseg_menus[];
    
    export const generarMenu = (datosSQL: any, tipo: number)=>{
        SQLseg_menus = datosSQL;
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
            nodo.children = generarMenuItems(value.idSegMenu, tipo) || [];
            arbol.push(nodo);
            nodo={};
        });
        
        return arbol;
    }

    const generarMenuItems = (item?: number, tipo?: number) => {        
        const  hijos: Iseg_menus[]= obtenerHijos(item);
        let data: Iseg_menus;
        let NewArbol: IArbol = {}
        let nodos: IArbol[] = [];        
        
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

    const obtenerHijos = (seg_menus:any, padre?: number)=>{
        let hijos: Iseg_menus[]= [];        
        SQLseg_menus.forEach(function(dts , index) {
            if (padre == dts.idSegMenuPadre){
                hijos.push(dts);
            }
        });
        return hijos;
    }

    const obtenerPadres = () => {
        let padres: Iseg_menus[]= [];
        SQLseg_menus.forEach(function(dts , index) {
            if (dts.idSegMenuPadre== 0){
                padres.push(dts);
            }
        });

        return padres;
    }

   /* export const obtenerBreakCrumb=(elements: any, id: number)=>{

    }

    const recursiveBreakCrumb=(elements: Icrum[], id: number)=>{
        const node = elements.filter((dato) => dato.idSegMenu == id);
        if (node.length>0){

        }
    }

    const obtenerNodo=(elements: Icrum[], id: number)=>{
        elements.forEach(function(element , index) {
            if (element.idSegMenuPadre== id){
                return element;
            }
        });

        return null;
    }
*/

