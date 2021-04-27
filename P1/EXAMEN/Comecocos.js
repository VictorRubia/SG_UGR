import * as THREE from '../libs/three.module.js'
import * as THREEBSP from '../libs/ThreeBSP.js';
import * as TWEEN from '../libs/tween.esm.js'

class Comecocos extends THREE.Object3D{
    constructor(gui,material){
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Creamos primero esta parte ya que otros métodos usan las variables que se definen para la interfaz

        this.createGUI(gui);

        this.materialamarillo = new THREE.MeshPhongMaterial({color: 0xFFFF00});

        var mandibulaGeom = new THREE.SphereGeometry(3,20,20,0,2*Math.PI,0);
        this.mand = new THREE.Mesh(mandibulaGeom,this.materialamarillo);

        var caja = new THREE.BoxGeometry(6,6,6);
        caja.translate(0, 3, 0);
        this.caja = new THREE.Mesh(caja, material);

        var mandibula = new THREEBSP.ThreeBSP(this.mand);
        var caja = new THREEBSP.ThreeBSP(this.caja);

        var mandresult = mandibula.subtract(caja);

        this.mandibula = mandresult.toMesh(this.materialamarillo);
        this.mandibula.geometry.computeFaceNormals();
        this.mandibula.geometry.computeVertexNormals();
        this.mandibula.rotation.y = Math.PI/2;

        var partearribaGeom = new THREE.SphereGeometry(3,20,20,0,2*Math.PI,0);
        this.Parriba = new THREE.Mesh(partearribaGeom,this.materialamarillo);
        
        var caja2 = new THREE.BoxGeometry(6,6,6);
        caja2.translate(0, -3, 0);
        this.caja2 = new THREE.Mesh(caja2, material);
        
        var ojo = new THREE.CylinderGeometry (0.5, 0.5, 6, 20);
        ojo.rotateZ(Math.PI/2);
        ojo.translate(0, 2, 1);
        this.ojo = new THREE.Mesh(ojo, material);
        
        var partearriba = new THREEBSP.ThreeBSP(this.Parriba);
        var caja2 = new THREEBSP.ThreeBSP(this.caja2);
        var ojos = new THREEBSP.ThreeBSP(this.ojo);
        
        var parcialresult = partearriba.subtract(caja2);
        var finalresult = parcialresult.subtract(ojos);
        
        this.ParteArriba = finalresult.toMesh(this.materialamarillo);
        this.ParteArriba.geometry.computeFaceNormals();
        this.ParteArriba.geometry.computeVertexNormals();
        
        this.ParteArriba.add(this.mandibula);
        
        this.spline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0,0,3),
            new THREE.Vector3(9,0,2),
            new THREE.Vector3(10,0,0),
            new THREE.Vector3(9,0,-2),
            new THREE.Vector3(0,0,-3), // la mitad del recorrido
            new THREE.Vector3(-3,0,-3),
            new THREE.Vector3(-3,0,-5),
            new THREE.Vector3(-5,0,-10),
            new THREE.Vector3(-11,0,-5),
            new THREE.Vector3(-11.5,0,-3),
            new THREE.Vector3(-10,0,3),
            new THREE.Vector3(0,0,3),
            
        ]);
        
        this.geometryLine = new THREE.Geometry();
        this.geometryLine.vertices = this.spline.getPoints(100);
        var material = new THREE.LineBasicMaterial({color: 0xFF0000});
        var visibleSpline = new THREE.Line (this.geometryLine, material);
        this.ParteArriba.scale.x = 0.4;
        this.ParteArriba.scale.y = 0.4;
        this.ParteArriba.scale.z = 0.4;
        

        this.add(visibleSpline);
        this.animarComecocos();
        this.add(this.ParteArriba);

        
        this.tiempoAnterior = Date.now();
        this.sentidoGiroPP = 1;
    }

    createGUI(gui){
        //  Controles para el tamaño, la orientación y la posición de la caja
        var that = this;
        this.guiControls = new function() {
            this.giro = Math.PI/4;;
            this.velocidad = 2;
            this.activarAnimacion = true;
            //  Un botón para dejarlo todo en su posición inicial
            //  Cuando se pulse se ejecutará esta función
            this.reset = function (){
                this.giro = Math.PI/4;;
                this.velocidad = 2;
                this.activarAnimacion = true;
            }
        }

        //  Se crea una sección para los controles de la caja
        var folder = gui.addFolder("Animación");
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'activarAnimacion').name("Animación").listen();
        folder.add (this.guiControls, 'velocidad', 0.0, 2.0, 0.1).name("Velocidad Cabeza (rad/s): ").listen();
        

        folder.add(this.guiControls, 'reset').name ('[ Restaurar ]');

    }

    animarComecocos(){
        var origen2 = {p:0.45}; // Desde la mitad del recorrido hasta el final (6 segs)
        var destino2 = {p:1.0};
        var that = this;

        var animacion2 = new TWEEN.Tween(origen2)
        .to(destino2, 6000) // ( 6 segundos)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
            var posicion = that.spline.getPointAt(origen2.p);
            that.ParteArriba.position.copy(posicion);
            var tangente = that.spline.getTangentAt(origen2.p);
            posicion.add(tangente);
            that.ParteArriba.lookAt(posicion);
        })
        .onComplete(function(){animacion1.start()})


        var origen1 = {p: 0.0}; // Desde el principio hasta la mitad del recorrido (4 segs)
        var destino1 = {p:0.45}; 
        var animacion1 = new TWEEN.Tween(origen1)
        .to(destino1, 4000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
            var posicion = that.spline.getPointAt(origen1.p);
            that.ParteArriba.position.copy(posicion);
            var tangente = that.spline.getTangentAt(origen1.p);
            posicion.add(tangente);
            that.ParteArriba.lookAt(posicion);
        })
        .onComplete(function(){animacion2.start()}) // BUCLE INFINITO
        .start();

    }

    update(){      
        var tiempoActual = Date.now();
        var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;
        
        if(this.guiControls.activarAnimacion){
            this.guiControls.giro += this.guiControls.velocidad * segundosTranscurridos * this.sentidoGiroPP;

            if(this.guiControls.giro >= Math.PI/4){
                this.guiControls.giro = Math.PI/4;
                this.sentidoGiroPP *= -1;
            }

            if(this.guiControls.giro <= 0){
                this.guiControls.giro = 0;
                this.sentidoGiroPP *= -1;
            }
        }

        this.mandibula.rotation.z = this.guiControls.giro;
        this.tiempoAnterior = tiempoActual;  
    }
}

export {Comecocos}