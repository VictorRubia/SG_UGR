import * as THREE from '../libs/three.module.js'
import * as THREEBSP from '../libs/ThreeBSP.js'

class MyPieza extends THREE.Object3D{
    constructor(material){
        super();
        
        // Se crea la geometría, se transforma y orienta
        var boxGeom = new THREE.BoxGeometry (5, 5, 2);
        var boxGeom2 = new THREE.BoxGeometry (0.5, 0.5, 2);
        var cilinderGeom = new THREE.CylinderGeometry( 0.5, 0.5, 3, 32);
        var piezaGeom = new THREE.BoxGeometry(5, 5, 2);

        var cilinderagujero1g = new THREE.CylinderGeometry(0.25, 0.25, 0.25, 32);
        var cilinderagujero2g = new THREE.CylinderGeometry(0.25, 0.25, 0.25, 32);
        
        cilinderagujero1g.translate(1, 0.25/2+2.75, 0);
        cilinderagujero2g.translate(1, -0.25/2+2.75, 0);
        
        var cilinderagujero3g = new THREE.CylinderGeometry(0.25, 0.25, 0.25, 32);
        var cilinderagujero4g = new THREE.CylinderGeometry(0.25, 0.4, 0.25, 32);

        cilinderagujero3g.rotateZ(Math.PI/2);
        cilinderagujero3g.translate(-0.25/2-2.75, 0, 0);
        cilinderagujero4g.rotateZ(Math.PI/2);
        cilinderagujero4g.translate(0.25/2-2.75, 0, 0);

        boxGeom2.translate(-2.25, 2.25, 0);
        cilinderGeom.rotateX(Math.PI/2);
        cilinderGeom.translate(-2, 2, 0);
        piezaGeom.translate(-0.5, 0.5, 0);

        // Creamos los nodos BSP
        var cajaAux = new THREEBSP.ThreeBSP(boxGeom);
        var cajaAux2 = new THREEBSP.ThreeBSP(boxGeom2);
        var cilindroAux = new THREEBSP.ThreeBSP(cilinderGeom);

        var cajaPrincipal = new THREEBSP.ThreeBSP(piezaGeom);
        
        var cilinderagujero1 = new THREEBSP.ThreeBSP(cilinderagujero1g);
        var cilinderagujero2 = new THREEBSP.ThreeBSP(cilinderagujero2g);
        
        var cilinderagujero3 = new THREEBSP.ThreeBSP(cilinderagujero3g);
        var cilinderagujero4 = new THREEBSP.ThreeBSP(cilinderagujero4g);

        // Operamos
        var restacajas = cajaAux.subtract(cajaAux2);
        cajaAux = restacajas.union(cilindroAux);

        var piezaPrincipal = cajaPrincipal.subtract(cajaAux);
        var agujero_arriba = cilinderagujero1.union(cilinderagujero2);
        var agujero_abajo = cilinderagujero3.union(cilinderagujero4);
        piezaPrincipal = piezaPrincipal.subtract(agujero_arriba);
        piezaPrincipal = piezaPrincipal.subtract(agujero_abajo);

        // Formamos el mesh final
        var pieza = piezaPrincipal.toMesh(material);
        this.add(pieza);

    }

    update(){
        //  Con independencia de cómo se escriban las 3 lineas siguientes, el orden en el que se aplican las transformaciones es:
        //  1º. Escalado
        //  2º. Rotación en Z
        //  3º. Rotación en Y
        //  4º. Rotación en X
        //  5º. Traslaciones
        this.rotation.x += 0.01;
        this.rotation.y += 0.01;
        this.rotation.z += 0.01;
    }
}

export {MyPieza}