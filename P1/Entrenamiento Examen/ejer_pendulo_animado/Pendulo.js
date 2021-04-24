import * as THREE from '../../libs/three.module.js'

class Pendulo extends THREE.Object3D{
    constructor(gui, titleGui){
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Creamos primero esta parte ya que otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);

        // Materiales a usar
        // Rojo
        this.materialrojo = new THREE.MeshPhongMaterial({color: 0xFF0000});
        // Verde
        this.materialverde = new THREE.MeshPhongMaterial({color: 0x00FF00 });
        // Azul
        this.materialazul = new THREE.MeshPhongMaterial({color: 0x0000FF});
        // Amarillo
        this.materialamarillo = new THREE.MeshPhongMaterial({color: 0xFFFF00});

        // Grosor y anchura de las cajas

        var boxGeomP = new THREE.BoxGeometry(4.0, 1.0, 1.0);
        var boxGeomS = new THREE.BoxGeometry(2.0, 1.0, 1.0);

        // Las colocamos en el y = 0
        boxGeomP.translate(0, -0.5, 0);
        boxGeomS.translate(0, -0.5, 0);

        // Construimos el pendulo principal
        this.PPpartearriba = new THREE.Mesh(boxGeomP, this.materialverde);
        this.PPpartearriba.scale.y = 4.0;
        this.PPparteabajo = new THREE.Mesh(boxGeomP, this.materialverde);
        this.PPparteabajo.scale.y = 4.0;
        this.PPpartemedio = new THREE.Mesh(boxGeomP, this.materialrojo);
        this.PPpartemedio.scale.y = 1.0 * this.guiControls.PPlongitud;
        this.PPpartemedio.position.y = -4.0;
        this.PPparteabajo.position.y = -4.0 - 1.0 * this.guiControls.PPlongitud;

        // Su punto de giro
        var ejeGeomPP = new THREE.CylinderGeometry(1.0, 1.0, 1.5, 20);
        ejeGeomPP.rotateX(Math.PI/2);
        ejeGeomPP.translate(0, -2, 0);
        this.PPeje = new THREE.Mesh(ejeGeomPP, this.materialamarillo);

        // Montamos la figura
        this.PPnodo = new THREE.Object3D();
        this.PPnodo.add(this.PPpartearriba);
        this.PPnodo.add(this.PPparteabajo);
        this.PPnodo.add(this.PPpartemedio);
        this.PPnodo.add(this.PPeje);

        // Construyo el segundo péndulo
        this.PSparteprincipal = new THREE.Mesh(boxGeomS, this.materialazul);
        this.PSparteprincipal.scale.y = 1.0 * this.guiControls.PSlongitud;
        this.PSparteprincipal.position.z = 1.0;

        // Su punto de giro (el circulo amarillo)
        var ejeGeomPS = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 20);
        ejeGeomPS.rotateX(Math.PI/2);
        ejeGeomPS.translate(0, -1, 1);
        this.PSeje = new THREE.Mesh(ejeGeomPS, this.materialamarillo);

        // Monto la figura
        this.PSnodo = new THREE.Object3D();
        this.PSnodo.add(this.PSparteprincipal);
        this.PSnodo.add(this.PSeje);

        // Ajusto la colocación
        this.PSnodo.position.y = 1.0;

        this.PSaux = new THREE.Object3D();
        this.PSaux.add(this.PSnodo);
        this.PSaux.position.y = -5.0 - ((this.guiControls.PSposicion/100)*this.guiControls.PPlongitud);

        // Añadimos al nodo del pendulo principal el secundario
        this.PPnodo.add(this.PSaux);

        this.add(this.PPnodo);
        this.PPnodo.position.y += 2;

        //  Velocidad independiente del ordenador
        this.tiempoAnterior = Date.now();
        this.sentidoGiroPP = 1;
        this.sentidoGiroPS = 1;
    }

    createGUI(gui, titleGui){

        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function (){
            this.PPlongitud = 5;
            this.PPgiro = 0;

            this.PSlongitud = 10;
            this.PSposicion = 10;
            this.PSgiro = 0;

            this.velocidadPP = 0;
            this.velocidadPS = 0;
            this.activarPP = false;
            this.activarPS = false;

            // Un botón para dejarlo todo en su posición incial
            // Cuando se pulse se ejecutará esta función
            this.reset = function(){
                this.PPlongitud = 5;
                this.PPgiro = 0;

                this.PSlongitud = 10;
                this.PSposicion = 10;
                this.PSgiro= 0;

                this.velocidadPP = 0;
                this.velocidadPS = 0;
                this.activarPP = false;
                this.activarPS = false
            }

        }

        // Creamos una sección para los controles de la caja
        var folder = gui.addFolder ("Primer Péndulo");

        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add(this.guiControls, 'PPlongitud', 5.0, 10.0, 0.1).name ('Longitud : ').listen();
        folder.add(this.guiControls, 'PPgiro', -Math.PI/4, Math.PI/4, 0.1).name ('Rotación superior : ').listen();

        var folder2 = gui.addFolder("Segundo Péndulo");

        folder2.add (this.guiControls, 'PSlongitud', 10.0, 20.0, 0.1). name('Longitud : ').listen();
        folder2.add (this.guiControls, 'PSposicion', 10, 90, 0.1).name ('Posicion (%): ').listen();
        folder2.add (this.guiControls, 'PSgiro', -Math.PI/4, Math.PI/4, 0.1).name ('Rotacion inferior: ').listen();

        var folder3 = gui.addFolder ("Animación");
        folder3.add (this.guiControls, 'activarPP').name("Péndulo 1").listen();
        folder3.add (this.guiControls, 'velocidadPP', 0.0, 2.0, 0.1).name("Velocidad (rad/s): ").listen();
        folder3.add (this.guiControls, 'activarPS').name("Péndulo 2").listen();
        folder3.add (this.guiControls, 'velocidadPS', 0, 2, 0.1).name("Velocidad (rad/s): ").listen();

        

        gui.add(this.guiControls, 'reset').name ('[ Restaurar ]');

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
        if(this.guiControls.activarPP){
            //  Cambiamos el giro PP
            this.guiControls.PPgiro += this.guiControls.velocidadPP * segundosTranscurridos * this.sentidoGiroPP;

            if(this.guiControls.PPgiro >= Math.PI/4){
                this.guiControls.PPgiro = Math.PI/4;
                this.sentidoGiroPP *= -1;
            }

            if(this.guiControls.PPgiro <= -Math.PI/4){
                this.guiControls.PPgiro = -Math.PI/4;
                this.sentidoGiroPP *= -1;
            }
        }

        if(this.guiControls.activarPS){
            //  Cambiamos el giro PS
            this.guiControls.PSgiro += this.guiControls.velocidadPS * segundosTranscurridos * this.sentidoGiroPS;

            if(this.guiControls.PSgiro >= Math.PI/4){
                this.guiControls.PSgiro = Math.PI/4;
                this.sentidoGiroPS *= -1;
            }

            if(this.guiControls.PSgiro <= -Math.PI/4){
                this.guiControls.PSgiro = -Math.PI/4;
                this.sentidoGiroPS *= -1;
            }
        }

        this.PPpartemedio.scale.y = 1.0 * this.guiControls.PPlongitud;
        this.PPparteabajo.position.y = -4.0 - 1.0 * this.guiControls.PPlongitud;
        this.PSparteprincipal.scale.y = 1.0 * this.guiControls.PSlongitud;
        this.PSaux.position.y = 1.0 - 5.0 - ((this.guiControls.PSposicion/100) * this.guiControls.PPlongitud);

    this.PSaux.rotation.z = this.guiControls.PSgiro;
    this.rotation.z = this.guiControls.PPgiro;

    this.tiempoAnterior = tiempoActual;
    }
}

export {Pendulo}