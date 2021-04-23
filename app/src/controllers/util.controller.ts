import express, { Application } from 'express';
import { Iseg_menus, Imenus_aux } from '../interfaces/seg_seguridad.interface'
export class Util {

    //private app: Application;
    private data: any;

    setData(datos: any){
        this.data=datos;
    }
    
    generarMenu(tipo: number){
        let arbol:any;       
        let dts: Imenus_aux;
        let padres: Iseg_menus[] = this.obtenerPadres();
        
        padres.forEach(function(value , index) {
            dts = { 
                label: value['titulo'],
                expandedIcon: '',
                collapsedIcon: '',
                routeLink: value['routeLink'],
                nivel: value['nivel'],
                idSegMenu: value['idSegMenu'],
                idSegMenuPadre: value['idSegMenuPadre'],
                ordenVisualizacion: value['ordenVisualizacion']
            }
            
            if ((value['expandedIcon'] === null) || (typeof value['expandedIcon'] === "undefined") || (value['expandedIcon'] == "")){
                dts.expandedIcon = 'Sin asignar';
            }else{
                dts.expandedIcon = value['expandedIcon'];
            }

            if ((value['collapsedIcon'] === null) || (typeof value['collapsedIcon'] === "undefined") || (value['collapsedIcon'] == "")){
                dts.collapsedIcon = 'Sin asignar';
            }else{
                dts.collapsedIcon = value['collapsedIcon'];
            } 
            /*
            if ((value['expandedIcon'] === null) || (typeof value['expandedIcon'] === "undefined") || (value['expandedIcon'] == "")){
                dts['expandedIcon'] = 'Sin asignar';
            }else{
                dts['expandedIcon'] = value['expandedIcon'];
            }
            if ((value['collapsedIcon'] === null) || (typeof value['collapsedIcon'] === "undefined") || (value['collapsedIcon'] == "")){
                dts['collapsedIcon'] = 'Sin asignar';
            }else{
                dts['collapsedIcon'] = value['collapsedIcon'];
            }            
            dts['routeLink'] = value['routeLink'];
            dts['nivel'] = value['nivel'];
            dts['idSegMenu'] = value['idSegMenu'];
            dts['idSegMenuPadre'] = value['idSegMenuPadre'];
            dts['ordenVisualizacion'] = value['ordenVisualizacion'];
            */

            if (tipo==0){
                arbol['label']=value['titulo'];
                if ((value['expandedIcon'] === null) || (typeof value['expandedIcon'] === "undefined") || (value['expandedIcon'] == "")){
                    arbol['expandedIcon'] = 'Sin asignar';
                }else{
                    arbol['expandedIcon'] = value['expandedIcon'];
                }
                if ((value['collapsedIcon'] === null) || (typeof value['collapsedIcon'] === "undefined") || (value['collapsedIcon'] == "")){
                    arbol['collapsedIcon'] = 'Sin asignar';
                }else{
                    arbol['collapsedIcon'] = value['collapsedIcon'];
                }            
                arbol['routeLink'] = value['routeLink'];
                arbol['nivel'] = value['nivel'];
                arbol['idSegMenu'] = value['idSegMenu'];
                arbol['idSegMenuPadre'] = value['idSegMenuPadre'];
                arbol['ordenVisualizacion'] = value['ordenVisualizacion'];
                arbol['children']="";
            }else{
                arbol['data']=dts;
               // arbol['children']=  this.generarMenuItems(value['idSegMenu'], tipo);
            }
        });
        
        return arbol;
    }

    generarMenuItems(item: number, tipo: number){        
        let dts: Iseg_menus[] = this.data;
        let hijos: Iseg_menus[]= this.obtenerHijos(item);
        let data: Imenus_aux[];        

        /*hijos.forEach(function(value , index) {
            data.la
            data = {
                label: value.titulo || '',

            }
            
            if (tipo == 0){
                
            }
        });*/
        
    }

    obtenerHijos(padre: number){
        let hijos: Iseg_menus[]= [];
        let dts: Iseg_menus[] = this.data;
        dts.forEach(function(dts , index) {
            if (padre == dts.idSegMenuPadre){
                hijos.push(dts);
            }
        });
        return hijos;
    }

    obtenerPadres(){
        let padres: Iseg_menus[]= [];
        let dts: Iseg_menus[] = this.data;

        dts.forEach(function(dts , index) {
            if (dts.idSegMenuPadre== 0){
               padres.push(dts);
            }
        });

        return padres;
    }
}