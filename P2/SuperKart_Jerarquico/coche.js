import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import * as THREEBSP from '../libs/ThreeBSP.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'
import * as PHYSI from './libs/physi.js'

class Coche extends THREE.Object3D {
    constructor(gui, titleGui, material){
        super();
        
        //Forma del coche
        this.createGUI(gui);

        var colorCarroceria = new THREE.MeshLambertMaterial({color: 0xA52523 });

        var coche = new THREE.Group();

        this.ruedaDelante = this.fabricaRuedas();
        this.ruedaDelante.position.y = -6;
        this.ruedaDelante.position.x = 18;
        // coche.add(this.ruedaDelante);

        this.ruedaAtras = this.fabricaRuedas();
        this.ruedaAtras.position.y = -6;
        this.ruedaAtras.position.x = -18;
        // this.ruedaDelante.add(this.ruedaAtras);


        var carroceriaGeom = new THREE.BoxGeometry(60,15,30);
        this.carroceria = new THREE.Mesh(carroceriaGeom, colorCarroceria);

        this.carroceria.position.y = 12;
        
        const carFrontTexture = getCarFrontTexture();
        const carBackTexture = getCarFrontTexture();
        const carRightSideTexture = getCarSideTexture();
        const carLeftSideTexture = getCarSideTexture();
        
        carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
        carLeftSideTexture.rotation = Math.PI;
        carLeftSideTexture.flipY = false;
        
        var cabinaGeom = new THREE.BoxGeometry(33,12,24);
        var cabina = new THREE.Mesh(cabinaGeom,[
            new THREE.MeshLambertMaterial({ map: carFrontTexture }),
            new THREE.MeshLambertMaterial({ map: carBackTexture }),
            new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
            new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
            new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
            new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
        ]);
        
        cabina.position.x = -6;
        cabina.position.y = 13;
        this.carroceria.add(this.ruedaDelante);
        this.carroceria.add(this.ruedaAtras);

        this.carroceria.add(cabina);
        // coche.add(this.carroceria);

        coche.scale.x= 0.3;
        coche.scale.y= 0.3;
        coche.scale.z= 0.3;
        
        this.add(this.carroceria);    

    }

    createGUI (gui, titleGui){
        //  Controles para el tamaño, la orientación y la posición de la caja
        var that = this;
        this.guiControls = new function() {
            this.color = 0xA52523;

            this.reset = function (){
                this.color = 0xA52523;
            }
        }

        //  Se crea una sección para los controles de la caja
        var folder = gui.addFolder("Colores");
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        //.onChange( function() { this.carroceria.material.color.set( this.guiControls.color ); } )
        folder.addColor( this.guiControls, 'color' ).listen();

        folder.add(this.guiControls, 'reset').name ('[ Restaurar ]');

    }

    fabricaRuedas(){
        var ruedaGeom = new THREE.BoxGeometry(12,12,33);
        // var ruedaGeom = new THREE.CircleGeometry( 10, 5 );
        var materialRueda = new THREE.MeshLambertMaterial({ color: 0x333333 });
        var rueda = new THREE.Mesh(ruedaGeom, materialRueda);
        return rueda;
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

        this.carroceria.material.color.set(this.guiControls.color);
        this.ruedaDelante.rotation.z -= 0.08;
        this.ruedaAtras.rotation.z -= 0.08;

        this.tiempoAnterior = tiempoActual;
    }
}

function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);

    return new THREE.CanvasTexture(canvas);
}

export {Coche}
