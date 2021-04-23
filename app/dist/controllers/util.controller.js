"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    setData(datos) {
        this.data = datos;
    }
    generarMenu(tipo) {
        let arbol;
        let dts;
        let padres = this.obtenerPadres();
        padres.forEach(function (value, index) {
            dts = {
                label: value['titulo'],
                expandedIcon: '',
                collapsedIcon: '',
                routeLink: value['routeLink'],
                nivel: value['nivel'],
                idSegMenu: value['idSegMenu'],
                idSegMenuPadre: value['idSegMenuPadre'],
                ordenVisualizacion: value['ordenVisualizacion']
            };
            if ((value['expandedIcon'] === null) || (typeof value['expandedIcon'] === "undefined") || (value['expandedIcon'] == "")) {
                dts.expandedIcon = 'Sin asignar';
            }
            else {
                dts.expandedIcon = value['expandedIcon'];
            }
            if ((value['collapsedIcon'] === null) || (typeof value['collapsedIcon'] === "undefined") || (value['collapsedIcon'] == "")) {
                dts.collapsedIcon = 'Sin asignar';
            }
            else {
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
            if (tipo == 0) {
                arbol['label'] = value['titulo'];
                if ((value['expandedIcon'] === null) || (typeof value['expandedIcon'] === "undefined") || (value['expandedIcon'] == "")) {
                    arbol['expandedIcon'] = 'Sin asignar';
                }
                else {
                    arbol['expandedIcon'] = value['expandedIcon'];
                }
                if ((value['collapsedIcon'] === null) || (typeof value['collapsedIcon'] === "undefined") || (value['collapsedIcon'] == "")) {
                    arbol['collapsedIcon'] = 'Sin asignar';
                }
                else {
                    arbol['collapsedIcon'] = value['collapsedIcon'];
                }
                arbol['routeLink'] = value['routeLink'];
                arbol['nivel'] = value['nivel'];
                arbol['idSegMenu'] = value['idSegMenu'];
                arbol['idSegMenuPadre'] = value['idSegMenuPadre'];
                arbol['ordenVisualizacion'] = value['ordenVisualizacion'];
                arbol['children'] = "";
            }
            else {
                arbol['data'] = dts;
                // arbol['children']=  this.generarMenuItems(value['idSegMenu'], tipo);
            }
        });
        return arbol;
    }
    generarMenuItems(item, tipo) {
        let dts = this.data;
        let hijos = this.obtenerHijos(item);
        let data;
        /*hijos.forEach(function(value , index) {
            data.la
            data = {
                label: value.titulo || '',

            }
            
            if (tipo == 0){
                
            }
        });*/
    }
    obtenerHijos(padre) {
        let hijos = [];
        let dts = this.data;
        dts.forEach(function (dts, index) {
            if (padre == dts.idSegMenuPadre) {
                hijos.push(dts);
            }
        });
        return hijos;
    }
    obtenerPadres() {
        let padres = [];
        let dts = this.data;
        dts.forEach(function (dts, index) {
            if (dts.idSegMenuPadre == 0) {
                padres.push(dts);
            }
        });
        return padres;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.controller.js.map