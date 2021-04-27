import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../../libs/tween.esm.js'

class BolaHelicoidal extends THREE.Object3D {
    constructor(gui, titleGui, material, materiale){
        super();

        // Se crea la parte de la interfaz que corresponde a la caja
        // Creamos primero esta parte ya que otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);

        var cylinderGeom = new THREE.CylinderGeometry(10, 10, 20, 100);
        this.cilindro = new THREE.Mesh(cylinderGeom, material);
        this.cilindro.position.y += 10;


        var sphereGeom = new THREE.SphereGeometry(1, 20, 20);
        this.esfera = new THREE.Mesh(sphereGeom, materiale);
        this.esfera.position.x += 10;
        this.esfera.position.y += 1;

        this.add(this.esfera);
        this.add(this.cilindro);

        this.tiempoAnterior = Date.now();
        this.velocidad = Math.PI/2;     //  En un segundo se recorren Pi medios para una vuelta completa en 4 segundos
        this.animarEsfera();    // Creamos la animación y la lanzamos
    }

    createGUI (gui, titleGui){
        //  Controles para el tamaño, la orientación y la posición de la caja
        var that = this;
        this.guiControls = new function() {
            this.radio = 10;
            //  Un botón para dejarlo todo en su posición inicial
            //  Cuando se pulse se ejecutará esta función
            this.reset = function (){
                this.radio = 10;
                that.cilindro.geometry = new THREE.CylinderGeometry(this.radio, this.radio, 20, 100, 20);
                that.esfera.position.x = this.radio;
            }
        }

        //  Se crea una sección para los controles de la caja
        var folder = gui.addFolder("Cilindro");
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radio', 5, 30, 0.1).name ('Radio: ').listen().onChange(function (value){
            that.cilindro.geometry = new THREE.CylinderGeometry(value, value, 20, 100);
            that.esfera.position.x = value;
        });

        folder.add(this.guiControls, 'reset').name ('[ Restaurar ]');

    }

    animarEsfera(){
        var origen = {y: 1};
        var destino = {y: 19};

        var that = this;
        var movimientoSinusoidal = new TWEEN.Tween(origen)
            .to(destino, 20000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .repeat(Infinity)
            .onUpdate(function(value) {that.esfera.position.y = origen.y})
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

        this.rotation.y += this.velocidad * segundosTranscurridos;
        this.tiempoAnterior = tiempoActual;
    }
}

export {BolaHelicoidal}