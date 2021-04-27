import * as THREE from '../libs/three.module.js'

class Reloj extends THREE.Object3D{
    constructor(gui){
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Creamos primero esta parte ya que otros métodos usan las variables que se definen para la interfaz

        this.createGUI(gui);

        // Materiales a usar
        // Rojo
        var MRojo = new THREE.MeshPhongMaterial({color: 0xFF0000});
        // Verde
        var MVerde = new THREE.MeshPhongMaterial({color: 0x00FF00 });

        var sphereGeom = new THREE.SphereGeometry(1,20,20);

        // Creamos la aguja y las posicionamos
        this.aguja = new THREE.Mesh(sphereGeom, MRojo);
        this.aguja.position.x += 10;
        this.aguja_ = new THREE.Object3D();
        this.aguja_.add(this.aguja);

        this.add(this.aguja_);

        // Creamos las marcas y las posicionamos en la escena
        for(var i = 0; i < 12; i++){
            var marca = new THREE.Mesh(sphereGeom, MVerde);
            marca.position.x += 13;
            
            var marca_ = new THREE.Object3D();
            marca_.add(marca);
            marca_.rotation.y += 0 + (i * Math.PI * 2 /12);
            this.add(marca_);
        }

        // Velocidad independiente del objeto
        this.tiempoAnterior = Date.now();
        this.velocidadAguja = this.guiControls.velocidad * (Math.PI * 2 / 12);
    }

    createGUI(gui){

        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function (){
            this.velocidad = 1;
        }

        gui.add(this.guiControls, 'velocidad', -10.0, 10, 1.0).name ('Velocidad : ').listen();

    }

    update(){
        //  Con independencia de cómo se escriban las 3 lineas siguientes, el orden en el que se aplican las transformaciones es:
        //  1º. Escalado
        //  2º. Rotación en Z
        //  3º. Rotación en Y
        //  4º. Rotación en X
        //  5º. Traslaciones

        var tiempoActual = Date.now();
        var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000;

        // Para sentido horario
        this.aguja_.rotation.y -= this.guiControls.velocidad * (this.velocidadAguja * segundosTranscurridos);
        this.tiempoAnterior = tiempoActual;
        
    }
}

export {Reloj}