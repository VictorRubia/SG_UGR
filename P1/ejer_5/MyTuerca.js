import * as THREE from '../libs/three.module.js'
import * as THREEBSP from '../libs/ThreeBSP.js'

class MyTuerca extends THREE.Object3D{
    constructor(material){
        super();
        
        // Se crea la geometría, se transforma y orienta

        var cilinderGeom = new THREE.CylinderGeometry(4, 4, 3, 6);
        var esferaGeom = new THREE.SphereGeometry(4.15, 16, 16);

        var cilindroagujerog = new THREE.CylinderGeometry(2, 2, 3, 32);

        //  toroGeom.translate(0, 2, 0);

        var toro = new THREE.Mesh(toroGeom, material)

        // Creamos los nodos BSP
        var cilindrobsp = new THREEBSP.ThreeBSP(cilinderGeom);
        var esferabsp = new THREEBSP.ThreeBSP(esferaGeom);
        var cilindroagujero = new THREEBSP.ThreeBSP(cilindroagujerog);

        // Operamos
        var piezaPrincipal = esferabsp.intersect(cilindrobsp);
        piezaPrincipal = piezaPrincipal.subtract(cilindroagujero);

        // Proceso para las muescas
        for(var i = 0; i < 10 ; i++){
            var toroGeom = new THREE.TorusGeometry(2, 0.15, 16, 16);
            toroGeom.rotateX(Math.PI/2);
            toroGeom.translate(0, 1.5-0.15-0.3*i, 0);
            var toromuesca = new THREEBSP.ThreeBSP(toroGeom);
            piezaPrincipal = piezaPrincipal.subtract(toromuesca);
        }

        // Formamos el mesh final
        var pieza = piezaPrincipal.toMesh(material);
        this.add(pieza);
        this.add(toro);

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

export {MyTuerca}