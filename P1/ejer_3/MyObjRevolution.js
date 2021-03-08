import * as THREE from '../libs/three.module.js'

class MyObjRevolution extends THREE.Object3D {
    constructor(gui, titleGui, points, latheMat){
        super();

        // Se crea la parte de la interfaz que corresponde a la grapadora
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        
        this.mypoints = points;

        // Ya podemos construir el Mesh
        var latheGeom = new THREE.LatheGeometry(points, 3, 0, 1);

        this.latheObject = new THREE.Mesh(latheGeom, latheMat);

        // Lo añadimos como hijo del Object3D (this)
        this.add (this.latheObject);
    }

    update () {

    }
}

export {MyObjRevolution}