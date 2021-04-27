import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Recorrido extends THREE.Object3D{
    constructor(gui){
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Creamos primero esta parte ya que otros métodos usan las variables que se definen para la interfaz

        this.createGUI(gui);

        this.spline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(3,0,3),
            new THREE.Vector3(6,0,0),
            new THREE.Vector3(3,0.5,-3),
            new THREE.Vector3(0,1,0), // la mitad del recorrido
            new THREE.Vector3(-3,1,3),
            new THREE.Vector3(-6,1,0),
            new THREE.Vector3(-3,0.5,-3),
            new THREE.Vector3(0,0,0),

        ]);

        this.geometryLine = new THREE.Geometry();
        this.geometryLine.vertices = this.spline.getPoints(100);
        var material = new THREE.LineBasicMaterial({color: 0x000000});
        var visibleSpline = new THREE.Line (this.geometryLine, material);

        var naveGeom = new THREE.ConeGeometry(0.25, 1.5, 3);
        // Orientamos la Z positiva del objeto
        naveGeom.rotateX(Math.PI/2);
        this.nave = new THREE.Mesh(naveGeom, new THREE.MeshNormalMaterial());

        this.add(this.nave);
        this.add(visibleSpline);
        this.animarNave();
    }

    createGUI(gui){

    }

    animarNave(){
        var origen2 = {p:0.5}; // Desde la mitad del recorrido hasta el final (8 segs)
        var destino2 = {p:1.0};
        var that = this;

        var animacion2 = new TWEEN.Tween(origen2)
        .to(destino2, 8000) // ( 8 segundos)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
            var posicion = that.spline.getPointAt(origen2.p);
            that.nave.position.copy(posicion);
            var tangente = that.spline.getTangentAt(origen2.p);
            posicion.add(tangente);
            that.nave.lookAt(posicion);
        })
        .onComplete(function(){animacion1.start()})


        var origen1 = {p: 0.0}; // Desde el principio hasta la mitad del recorrido (4 segs)
        var destino1 = {p:0.5}; 
        var animacion1 = new TWEEN.Tween(origen1)
        .to(destino1, 4000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
            var posicion = that.spline.getPointAt(origen1.p);
            that.nave.position.copy(posicion);
            var tangente = that.spline.getTangentAt(origen1.p);
            posicion.add(tangente);
            that.nave.lookAt(posicion);
        })
        .onComplete(function(){animacion2.start()}) // BUCLE INFINITO
        .start();

    }

    update(){        
    }
}

export {Recorrido}