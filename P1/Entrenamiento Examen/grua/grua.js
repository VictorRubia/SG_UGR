import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../../libs/tween.esm.js'
import * as THREEBSP from '../../libs/ThreeBSP.js'

class Grua extends THREE.Object3D {
    constructor(gui, titleGui, verde){
        super();
        
        //  Colores
        var amarillo = new THREE.MeshPhongMaterial( {color: 0xffff00} );
        var rojo = new THREE.MeshPhongMaterial( {color: 0xff0000} );
        var azul = new THREE.MeshPhongMaterial( {color: 0x0000ff} );
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Creamos primero esta parte ya que otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);


        var cuerdaGeometry = new THREE.CylinderGeometry(0.2,0.2,1,20,20);
        cuerdaGeometry.translate(0,-0.5,0);
        this.cuerda = new THREE.Mesh(cuerdaGeometry, azul);
        this.cuerda.scale.y = 1.0 * this.guiControls.longitud;

        var engancheGeometry = new THREE.CylinderGeometry(2,2,0.5,20,20);
        this.enganche = new THREE.Mesh(engancheGeometry, amarillo);
        this.enganche.position.y -= 1;
        
        var cajaEngancheGeometry = new THREE.BoxGeometry(1,1,1);
        this.cajaEnganche = new THREE.Mesh(cajaEngancheGeometry, verde);

        var barraGeom = new THREE.CylinderGeometry(0.5,0.5,10,20,20);
        barraGeom.translate(0,5,0);
        this.barra = new THREE.Mesh(barraGeom,amarillo);

        var parteArribaGeom = new THREE.BoxGeometry(10,1,1);
        parteArribaGeom.translate(-2.5,10,0)
        this.parteArriba = new THREE.Mesh(parteArribaGeom, rojo);

        var pie = new THREE.CylinderGeometry(3,3,1,20,20);
        this.pie = new THREE.Mesh(pie, amarillo);

        this.barra.add(this.cajaEnganche);
        this.barra.add(this.parteArriba);
        this.barra.position.y += 0.5;

        this.cajaEnganche.add(this.enganche);
        this.cajaEnganche.add(this.cuerda);
        this.cajaEnganche.position.y +=9;

        this.add(this.pie);
        this.add(this.barra);
        // this.add(this.cajaEnganche);
        

        // Creamos la animación y la lanzamos
    }

    createGUI (gui, titleGui){
        //  Controles para el tamaño, la orientación y la posición de la caja
        var that = this;
        this.guiControls = new function() {
            this.longitud = 1;
            this.posicion = -2.5;
            this.rotacion = 0;
            
            //  Un botón para dejarlo todo en su posición inicial
            //  Cuando se pulse se ejecutará esta función
            this.reset = function (){
                this.longitud = 1;
                this.posicion = -2.5;
                this.rotacion = 0;
            }
        }

        //  Se crea una sección para los controles de la caja
        var folder = gui.addFolder("Controles");
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'longitud', 1, 10, 0.1).name ('Longitud Cuerda: ').listen();
        folder.add (this.guiControls, 'posicion', -7, -2.5, 0.1).name ('Posicion Cuerda: ').listen();
        folder.add (this.guiControls, 'rotacion', -Math.PI/2, Math.PI/2, 0.1).name ('Rotacion Grua: ').listen();


        folder.add(this.guiControls, 'reset').name ('[ Restaurar ]');

    }

    animarCuerpo(){
        var origen = {y: 0};
        var destino = {y: 2.5};

        var that = this;
        var movimientoSinusoidal = new TWEEN.Tween(origen)
            .to(destino, 500)
            .easing(TWEEN.Easing.Cubic.Out)
            .repeat(Infinity)
            .onUpdate(function(value) {that.position.y = origen.y})
            .yoyo(true)
            .start();
    }

    update(){
        //  Con independencia de cómo se escriban las 3 lineas siguientes, el orden en el que se aplican las transformaciones es:
        //  1º. Escalado
        //  2º. Rotación en Z
        //  3º. Rotación en Y
        //  4º. Rotación en X
        //  5º. Traslaciones

        var tiempoActual = Date.now();
        var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;

        this.cuerda.scale.y = 1.0 * this.guiControls.longitud;
        this.enganche.position.y = -this.guiControls.longitud;
        this.cajaEnganche.position.x = this.guiControls.posicion;
        this.barra.rotation.y = this.guiControls.rotacion;
        // this.rotation.z += this.velocidad*3 * segundosTranscurridos;
        // this.rotation.y += 0.01;
        this.tiempoAnterior = tiempoActual;
    }
}

export {Grua}