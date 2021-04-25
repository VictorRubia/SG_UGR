import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../../libs/tween.esm.js'
import * as THREEBSP from '../../libs/ThreeBSP.js'

class Android extends THREE.Object3D {
    constructor(gui, titleGui, material){
        super();

        // Se crea la parte de la interfaz que corresponde a la caja
        // Creamos primero esta parte ya que otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);

        this.materialamarillo = new THREE.MeshPhongMaterial({color: 0xFFFF00});

        var cabeza = new THREE.SphereGeometry(3,20,20,0,2*Math.PI,0,Math.PI/2);
        this.cabeza = new THREE.Mesh(cabeza, material);
        // this.cabeza.position.y +=10;

        var ojo1 = new THREE.CylinderGeometry (0.4, 0.4, 5, 20);
        ojo1.rotateX(Math.PI/2);
        ojo1.translate(-1, 2, 0);
        this.ojo1 = new THREE.Mesh(ojo1, this.materialamarillo);

        var ojo2 = new THREE.CylinderGeometry (0.4, 0.4, 5, 20);
        ojo2.rotateX(Math.PI/2);
        ojo2.translate(1, 2, 0);
        this.ojo2 = new THREE.Mesh(ojo2, this.materialamarillo);

        var cabezabsp = new THREEBSP.ThreeBSP(cabeza);
        var ojo1bsp = new THREEBSP.ThreeBSP(ojo1);
        var ojo2bsp = new THREEBSP.ThreeBSP(ojo2);

        var partialresult = cabezabsp.subtract(ojo1bsp);
        var finalresult = partialresult.subtract(ojo2bsp);

        this.carafinal = finalresult.toMesh(material);
        this.carafinal.geometry.computeFaceNormals();
        this.carafinal.geometry.computeVertexNormals();

        this.carafinal.position.y += 10;

        this.add(this.carafinal);

        var cuerpoGeom = new THREE.CylinderGeometry(3,3,5,20);
        this.cuerpo = new THREE.Mesh (cuerpoGeom, material);
        // this.cuerpo.rotation.y += 10.2;
        this.cuerpo.position.y += 7;

        var brazoGeom = new THREE.CylinderGeometry (0.5, 0.5, 5, 20);
        brazoGeom.translate(0,-3,0);
        this.brazo1 = new THREE.Mesh (brazoGeom, material);
        this.brazo1.position.x += 4;
        this.brazo1.position.y +=9;

        this.brazo2 = new THREE.Mesh (brazoGeom, material);
        this.brazo2.position.x += -4;
        this.brazo2.position.y +=9;

        var piernas = new THREE.CylinderGeometry (0.7, 0.7, 5, 20);
        piernas.translate(0,-2,0)
        this.pierna1 = new THREE.Mesh(piernas,material);
        this.pierna1.position.y+= 4;
        this.pierna1.position.x -= 1;

        this.pierna2 = new THREE.Mesh(piernas,material);
        this.pierna2.position.y+= 4;
        this.pierna2.position.x += 1;

        var antenas = new THREE.CylinderGeometry (0.2, 0.2, 2, 20);
        this.antena1 = new THREE.Mesh(antenas,material);
        this.antena1.position.y+= 3;
        this.antena1.rotation.z += 10;
        this.antena1.position.x -= 2;

        this.antena2 = new THREE.Mesh(antenas,material);
        this.antena2.position.y += 3;
        this.antena2.rotation.z -= 10;
        this.antena2.position.x += 2;


        this.carafinal.add(this.antena1);
        this.carafinal.add(this.antena2);

        // this.add(this.cabeza);
        this.add(this.cuerpo);
        this.add(this.brazo1);
        this.add(this.brazo2);
        this.add(this.pierna1);
        this.add(this.pierna2);
        // this.add(this.ojo);

        this.tiempoAnterior = Date.now();
        this.sentidoGiroBrazo = 1;
        this.velocidad = Math.PI/2;     //  En un segundo se recorren Pi medios para una vuelta completa en 4 segundos
        this.animarCabeza();    // Creamos la animación y la lanzamos
        this.animarBrazo1();    // Creamos la animación y la lanzamos
        this.animarBrazo2();    // Creamos la animación y la lanzamos
        this.animarPierna1();    // Creamos la animación y la lanzamos
        this.animarPierna2();    // Creamos la animación y la lanzamos
        this.animarCuerpo();    // Creamos la animación y la lanzamos
    }

    createGUI (gui, titleGui){
        //  Controles para el tamaño, la orientación y la posición de la caja
        var that = this;
        this.guiControls = new function() {
            this.Brazogiro = 0;
            this.velocidadBrazo = 0;
            this.activarBrazo = false;
            //  Un botón para dejarlo todo en su posición inicial
            //  Cuando se pulse se ejecutará esta función
            this.reset = function (){
                this.Brazogiro = 0;
                this.activarBrazo = false;
            }
        }

        //  Se crea una sección para los controles de la caja
        var folder = gui.addFolder("Animación");
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'Brazogiro', -Math.PI/4, Math.PI/4, 0.1).name ('Rotacion Brazo Dcho: ').listen().onChange(function (value){

        });

        folder.add(this.guiControls, 'reset').name ('[ Restaurar ]');

    }

    animarCabeza(){
        var origen = {y: -Math.PI/3};
        var destino = {y: Math.PI/3};

        var that = this;
        var movimientoSinusoidal = new TWEEN.Tween(origen)
            .to(destino, 750)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .repeat(Infinity)
            .onUpdate(function(value) {that.carafinal.rotation.y = origen.y})
            .yoyo(true)
            .start();
    }

    animarBrazo1(){
        var origen = {x: -Math.PI/4};
        var destino = {x: Math.PI/4};

        var that = this;
        var movimientoSinusoidal = new TWEEN.Tween(origen)
            .to(destino, 1000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .repeat(Infinity)
            .onUpdate(function(value) {that.brazo1.rotation.x = origen.x})
            .yoyo(true)
            .start();
    }

    animarBrazo2(){
        var origen = {z: Math.PI/4};
        var destino = {z: -Math.PI/4};

        var that = this;
        var movimientoSinusoidal = new TWEEN.Tween(origen)
            .to(destino, 1000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .repeat(Infinity)
            .onUpdate(function(value) {that.brazo2.rotation.x = origen.z})
            .yoyo(true)
            .start();
    }

    animarPierna1(){
        var origen = {z: -Math.PI/4};
        var destino = {z: Math.PI/4};

        var that = this;
        var movimientoSinusoidal = new TWEEN.Tween(origen)
            .to(destino, 1000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .repeat(Infinity)
            .onUpdate(function(value) {that.pierna1.rotation.x = origen.z})
            .yoyo(true)
            .start();
    }

    animarPierna2(){
        var origen = {z: Math.PI/4};
        var destino = {z: -Math.PI/4};

        var that = this;
        var movimientoSinusoidal = new TWEEN.Tween(origen)
            .to(destino, 1000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .repeat(Infinity)
            .onUpdate(function(value) {that.pierna2.rotation.x = origen.z})
            .yoyo(true)
            .start();
    }

    animarCuerpo(){
        var origen = {y: 0};
        var destino = {y: 0.5};

        var that = this;
        var movimientoSinusoidal = new TWEEN.Tween(origen)
            .to(destino, 1000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
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

        if(this.guiControls.activarBrazo){
            this.guiControls.Brazogiro += this.guiControls.velocidadBrazo * segundosTranscurridos * this.sentidoGiroBrazo;

            if(this.guiControls.Brazogiro >= Math.PI/4){
                this.guiControls.Brazogiro = Math.PI/4;
                this.sentidoGiroBrazo *=-1;
            }

            if(this.guiControls.Brazogiro <= -Math.PI/4){
                this.guiControls.Brazogiro = -Math.PI/4;
                this.sentidoGiroBrazo *= -1;
            }
        }

        this.brazo1.rotation.x = this.guiControls.Brazogiro;

        // this.position.z+= this.velocidad*3 * segundosTranscurridos;
        this.tiempoAnterior = tiempoActual;
    }
}

export {Android}