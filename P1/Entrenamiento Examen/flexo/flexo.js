import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../../libs/tween.esm.js'
import * as THREEBSP from '../../libs/ThreeBSP.js'

class Flexo extends THREE.Object3D {
    constructor(gui, titleGui, material){
        super();
        
        //  Colores
        var amarillo = new THREE.MeshPhongMaterial( {color: 0xffff00} );
        var blanco = new THREE.MeshPhongMaterial( {color: 0xffffff} );
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Creamos primero esta parte ya que otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);
        
        
        
        var circunferencia = new THREE.SphereGeometry(2,20,20);
        var circunferenciapeq = new THREE.SphereGeometry(1.8,20,20);
        var caja = new THREE.BoxGeometry(4,4,4);
        caja.translate(1.5,-4.25,0);
        circunferencia.translate(1.5, -2.25, 0);
        circunferenciapeq.translate(1.5, -2.25, 0);
        this.circunferencia = new THREE.Mesh(circunferencia, blanco);
        this.caja = new THREE.Mesh(caja, blanco);
        
        //  Nodos BSP
        var cabezaBSP = new THREEBSP.ThreeBSP(circunferencia);
        var cajaBSP = new THREEBSP.ThreeBSP(caja);
        var circunferencia = new THREEBSP.ThreeBSP(circunferenciapeq);

        //  Operamos
        var resultadoparcial = cabezaBSP.subtract(cajaBSP);
        var resultadofinal = resultadoparcial.subtract(circunferencia);
        
        // Formamos el mesh final
        var semicirculo = resultadofinal.toMesh(blanco);
        semicirculo.geometry.computeFaceNormals();
        semicirculo.geometry.computeVertexNormals();
        semicirculo.scale.set(1.3,1.3,1.3);
        semicirculo.position.x -= 0.5;


        var bombillaGeom = new THREE.SphereGeometry( 1, 32, 32 );
        bombillaGeom.scale(1,1.5,1);
        bombillaGeom.translate(0,4.5,0);
        this.bombilla = new THREE.Mesh( bombillaGeom, amarillo );

        var agarreCabeza = new THREE.CylinderGeometry (1.4, 1.4, 4.5, 20)
        agarreCabeza.translate(1.5,0,0);
        this.agarrecabeza = new THREE.Mesh(agarreCabeza, amarillo);

        var esferaAgarreCabeza = new THREE.SphereGeometry(1,15,15);
        // esferaAgarreCabeza.translate(-1, 6.5,0);
        this.esferaAgarreCabeza = new THREE.Mesh(esferaAgarreCabeza, material);

        // semicirculo.add(this.bombilla);
        // semicirculo.add(this.agarrecabeza);
        // semicirculo.add(this.esferaAgarreCabeza);

        var brazo2Geom = new THREE.CylinderGeometry(0.5,0.5,7,20);
        this.brazo2 = new THREE.Mesh (brazo2Geom, amarillo);
        this.brazo2.position.y += 3.5;
        this.brazo1 = new THREE.Mesh(brazo2Geom, amarillo);
        this.brazo1.position.y += 3.5;

        this.esferaAgarreMedio = new THREE.Mesh(esferaAgarreCabeza,material);
        this.esferaAgarreMedio.add(this.brazo2);
        this.esferaAgarreBajo = new THREE.Mesh(esferaAgarreCabeza, material);
        this.esferaAgarreBajo.add(this.brazo1);
        
        // this.brazo1.add(this.esferaAgarreBajo);
        // this.brazo2.add(this.esferaAgarreMedio);
        
        this.esferaAgarreCabeza.add(semicirculo);
        this.esferaAgarreCabeza.add(this.agarrecabeza);
        this.esferaAgarreCabeza.position.y += 7;
        this.esferaAgarreCabeza.rotation.z += Math.PI/3;
        
        this.esferaAgarreMedio.add(this.esferaAgarreCabeza);
        this.esferaAgarreMedio.position.y += 7;
        this.esferaAgarreMedio.rotation.z += -Math.PI/2;
        
        
        this.esferaAgarreBajo.add(this.esferaAgarreMedio);
        
        this.esferaAgarreBajo.rotation.z += Math.PI/4;
        this.esferaAgarreBajo.position.y += 1;


        var pie = new THREE.CylinderGeometry(3,3,1,20);
        pie.translate(0,0.5,0);
        this.pie = new THREE.Mesh(pie, amarillo);

        this.pie.add(this.esferaAgarreBajo);

        // this.add(this.esferaAgarreMedio);

        this.add(this.pie);

        this.animarCuerpo();
        
        this.tiempoAnterior = Date.now();
        this.sentidoGiroPP = 1;


        // Creamos la animación y la lanzamos
    }

    createGUI (gui, titleGui){
        //  Controles para el tamaño, la orientación y la posición de la caja
        var that = this;
        this.guiControls = new function() {
            this.activarAnimacion = false;
            this.giroCabeza = Math.PI/4;
            this.giroMedio = -Math.PI/2;
            this.giroBajo = 0;
            this.velocidadAnimacion_Cabeza = 0;
            this.velocidadAnimacion_Medio = 0;
            this.velocidadAnimacion_Bajo = 0;
            
            //  Un botón para dejarlo todo en su posición inicial
            //  Cuando se pulse se ejecutará esta función
            this.reset = function (){
                this.activarAnimacion = false;
                this.giroCabeza = Math.PI/4;
                this.giroMedio = -Math.PI/2;
                this.giroBajo = 0;
                this.velocidadAnimacion_Cabeza = 0;
                this.velocidadAnimacion_Medio = 0;
                this.velocidadAnimacion_Bajo = 0;
            }
        }

        //  Se crea una sección para los controles de la caja
        var folder = gui.addFolder("Animación");
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        // folder.add (this.guiControls, 'Brazogiro', -Math.PI/4, Math.PI/4, 0.1).name ('Rotacion Brazo Dcho: ').listen().onChange(function (value){
            
        // });
        folder.add (this.guiControls, 'activarAnimacion').name("Animación").listen();
        folder.add (this.guiControls, 'velocidadAnimacion_Cabeza', 0.0, 2.0, 0.1).name("Velocidad Cabeza (rad/s): ").listen();
        folder.add (this.guiControls, 'velocidadAnimacion_Medio', 0.0, 2.0, 0.1).name("Velocidad Medio (rad/s): ").listen();
        folder.add (this.guiControls, 'velocidadAnimacion_Bajo', 0.0, 2.0, 0.1).name("Velocidad Bajo (rad/s): ").listen();

        var folder2 = gui.addFolder ("Giros");
        folder2.add(this.guiControls, 'giroBajo', -Math.PI/4, Math.PI/4, 0.1).name ('Giro Bajo : ').listen();
        folder2.add(this.guiControls, 'giroMedio', -Math.PI/1.5, 0, 0.1).name ('Giro Medio : ').listen();
        folder2.add(this.guiControls, 'giroCabeza', Math.PI/4, Math.PI, 0.1).name ('Giro Cabeza : ').listen();

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

        //  Animación procedural: debemos cambiar la velocidad en tiempo real
        if(this.guiControls.activarAnimacion){
            //  Cambiamos el giro PP
            this.guiControls.giroCabeza += this.guiControls.velocidadAnimacion_Cabeza * segundosTranscurridos * this.sentidoGiroPP;

            if(this.guiControls.giroCabeza >= Math.PI){
                this.guiControls.giroCabeza = Math.PI;
                this.sentidoGiroPP *= -1;
            }

            if(this.guiControls.giroCabeza <= Math.PI/4){
                this.guiControls.giroCabeza = Math.PI/4;
                this.sentidoGiroPP *= -1;
            }
        }

        if(this.guiControls.activarAnimacion){
            //  Cambiamos el giro PP
            this.guiControls.giroMedio += this.guiControls.velocidadAnimacion_Medio * segundosTranscurridos * this.sentidoGiroPP;

            if(this.guiControls.giroMedio >= 0){
                this.guiControls.giroMedio = 0;
                this.sentidoGiroPP *= -1;
            }

            if(this.guiControls.giroMedio <= -Math.PI/1.5){
                this.guiControls.giroMedio = -Math.PI/1.5;
                this.sentidoGiroPP *= -1;
            }
        }
        if(this.guiControls.activarAnimacion){
            //  Cambiamos el giro PP
            this.guiControls.giroBajo += this.guiControls.velocidadAnimacion_Bajo * segundosTranscurridos * this.sentidoGiroPP;

            if(this.guiControls.giroBajo >= Math.PI/4){
                this.guiControls.giroBajo = Math.PI/4;
                this.sentidoGiroBrazo *=-1;
            }

            if(this.guiControls.giroBajo <= -Math.PI/4){
                this.guiControls.giroBajo = -Math.PI/4;
                this.sentidoGiroBrazo *= -1;
            }
        }

        // this.esferaAgarreCabeza.rotation.z += this.velocidad*3 * segundosTranscurridos;
        // this.rotation.z += this.velocidad*3 * segundosTranscurridos;
        this.esferaAgarreCabeza.rotation.z = this.guiControls.giroCabeza;
        this.esferaAgarreMedio.rotation.z = this.guiControls.giroMedio;
        this.esferaAgarreBajo.rotation.z = this.guiControls.giroBajo;
        // this.esferaAgarreMedio.rotation.z += 0.01;
        this.rotation.y += 0.01;
        this.tiempoAnterior = tiempoActual;
    }
}

export {Flexo}