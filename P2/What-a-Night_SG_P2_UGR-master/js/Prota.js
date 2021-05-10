class Prota {
  //Necesitamos la escena
  constructor(scene) {
    this.scene = scene;
    //Vida del personaje
    this.vida = 100;
    this.vel_powerup = 2;

    //Aspecto del personaje
    this.createProta(scene);


    //Caja fisica del personaje
    var containerGeometry = new THREE.BoxGeometry(3, 7.8, 3);
    this.box_container = new Physijs.BoxMesh(
      containerGeometry,
      new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.0, transparent: true }),
      1
    );

    //Añadir el aspecto a la caja fisica
    this.box_container.add(this.meshProta);
    //Posicionar la caja fisica
    this.box_container.position.set(0, 4.5, 0);
    this.box_container.__dirtyPosition = true;

    //Añadir la caja a la escena
    scene.add(this.box_container);

    this.input = {
      power: null,
      direction: null,
      steering: 0,
      rear: null
    };

    //Variable que controla la animacion
    this.animando = false;

    //Variable auxiliar que establece que este es el personaje principal
    this.box_container.prota = true;

    //Colisiones
    var that = this;
    this.box_container.addEventListener('collision', function (objeto, v, r, n) {
      if (objeto.index > -1) {
        //Se le quita vida al protagonista
        that.vida -= 20;
      }
    });
  }

  //Funcion que dispara una bala dado un punto hacia el que disparar
  disparar(punto) {
    //Generar una bala y lanzarla hacia el punto
    //Calcular direccion de la bala:
    var direccion = new THREE.Vector3(punto['x'] - this.box_container.position['x'], 0, punto['z'] - this.box_container.position['z']);
    //Crear la bala
    var bala = new Bala(this.scene, direccion, this);
    //Disparar
    bala.disparar();

  }

  //Crear el aspecto del personaje
  createProta(scene) {

    this.input;
    this.meshProta = new THREE.Object3D();

    var colorCarroceria = new THREE.MeshLambertMaterial({color: 0xA52523 });

    
    var carroceriaGeom = new THREE.BoxGeometry(5.2,1.3,2.5);
    carroceriaGeom.rotateY(Math.PI / 2);
    this.carroceria = new THREE.Mesh(carroceriaGeom, colorCarroceria);
    
    var carroceriaPhy = new Physijs.BoxMesh(
      carroceriaGeom,
      colorCarroceria
    );
    
    carroceriaPhy.position.y = 1.4; //1.3
    carroceriaPhy.castShadow = carroceriaPhy.receiveShadow = true;
    
    
    var cabinaGeom = new THREE.BoxGeometry(2.86,1.04,2);
    cabinaGeom.rotateY(Math.PI / 2);
    this.cabina = new THREE.Mesh(cabinaGeom, new THREE.MeshLambertMaterial({ color: 0xFFFFFF }));
      
    var cabinaVentanaFrontal = new THREE.BoxGeometry(0.2, 0.7, 1.75);
    cabinaVentanaFrontal.rotateY(Math.PI / 2);
    this.ventanaFrontal = new Physijs.BoxMesh(cabinaVentanaFrontal, new THREE.MeshLambertMaterial({ color: 0x666666 }))
    this.ventanaFrontal.position.y = 1.1;
    this.ventanaFrontal.position.z = 1.35;
    
    this.ventanaTrasera = new Physijs.BoxMesh(cabinaVentanaFrontal, new THREE.MeshLambertMaterial({ color: 0x666666 }))
    this.ventanaTrasera.position.y = 1.1;
    this.ventanaTrasera.position.z = -1.35;
    
    var cabinaVentanaLateral = new THREE.BoxGeometry(0.87,0.7,0.2)
    cabinaVentanaLateral.rotateY(Math.PI / 2);
    this.ventanaIzqda1 = new Physijs.BoxMesh(cabinaVentanaLateral, new THREE.MeshLambertMaterial({ color: 0x666666 }))
    this.ventanaIzqda1.position.y = 1.1;
    this.ventanaIzqda1.position.z = 0.6;
    this.ventanaIzqda1.position.x = -1;
    
    this.ventanaIzqda2 = new Physijs.BoxMesh(cabinaVentanaLateral, new THREE.MeshLambertMaterial({ color: 0x666666 }))
    this.ventanaIzqda2.position.y = 1.1;
    this.ventanaIzqda2.position.z = -0.6;
    this.ventanaIzqda2.position.x = -1;
    
    this.ventanaDcha1 = new Physijs.BoxMesh(cabinaVentanaLateral, new THREE.MeshLambertMaterial({ color: 0x666666 }))
    this.ventanaDcha1.position.y = 1.1;
    this.ventanaDcha1.position.z = 0.6;
    this.ventanaDcha1.position.x = 0.92;
    
    this.ventanaDcha2 = new Physijs.BoxMesh(cabinaVentanaLateral, new THREE.MeshLambertMaterial({ color: 0x666666 }))
    this.ventanaDcha2.position.y = 1.1;
    this.ventanaDcha2.position.z = -0.6;
    this.ventanaDcha2.position.x = 0.92;
    
    this.cabina.position.y = 1;
    
    this.meshProta.add(this.ruedaDelante);
    
    
    this.meshProta.position.set(0, -10, 0);
    
    carroceriaPhy.add(this.ventanaFrontal);
    carroceriaPhy.add(this.ventanaTrasera);
    carroceriaPhy.add(this.ventanaDcha1);
    carroceriaPhy.add(this.ventanaDcha2);
    carroceriaPhy.add(this.ventanaIzqda1);
    carroceriaPhy.add(this.ventanaIzqda2);
    carroceriaPhy.add(this.cabina);
    
    this.coche = new Physijs.Vehicle(carroceriaPhy, new Physijs.VehicleTuning(
      10,//10.88,//stiffness
      1.0,//1.83,   //compression
      0.2,//0.28, //travel
      500.0,
      10.5,
      6000
      )
      );
    scene.add(this.coche);

    var ruedaGeom = new THREE.CylinderGeometry( 0.5, 0.5, 1, 8 );
    // ruedaGeom.rotateX(-Math.PI / 2);
    ruedaGeom.rotateZ(-Math.PI / 2);
    // var ruedaGeom = new THREE.CircleGeometry( 10, 5 );
    var materialRueda = new THREE.MeshLambertMaterial({ color: 0x333333 });

    for ( var i = 0; i < 4; i++ ) {
      this.coche.addWheel(
        ruedaGeom,
        materialRueda,
        new THREE.Vector3(
            i % 2 === 0 ? -1.3 : 1.3,
            -0.3,
            i < 2 ? 1 : -1
        ),
        new THREE.Vector3( 0, -1, 0 ),
        new THREE.Vector3( -1, 0, 0 ),
        0.75,
        0.5,
        i < 2 ? false : true
      );
    }	

      this.ruedaDelante = this.fabricaRuedas();
      this.ruedaDelante.position.y = 6.5;
      this.ruedaDelante.position.x = 1.5;
      // coche.add(this.ruedaDelante);
  
      this.ruedaAtras = this.fabricaRuedas();
      this.ruedaAtras.position.y = 6.5;
      this.ruedaAtras.position.x = -1.5;
      // this.ruedaDelante.add(this.ruedaAtras);
      
    }
    
    //Animaciones del personaje
    animar() {
      var origen1 = { p: 0 };
      var destino1 = { p: Math.PI / 4 };
      var that = this;
      //Primera parte de la animacion
    var movimiento1 = new TWEEN.Tween(origen1)
      .to(destino1, 200)
      .yoyo(true)
      .repeat(1)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function (value) {
        //Brazo d
        that.brazoD_.rotation.x = origen1.p;
        that.brazoI_.rotation.x = -origen1.p

        that.piernaD_.rotation.x = -origen1.p;
        that.piernaI_.rotation.x = origen1.p
      })
      .onComplete(function (value) {
        movimiento2.start();
      });


    var origen2 = { p: 0 };
    var destino2 = { p: -Math.PI / 4 };

    var movimiento2 = new TWEEN.Tween(origen2)
      .to(destino2, 200)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function (value) {
        //Brazo d
        that.brazoD_.rotation.x = origen2.p;
        that.brazoI_.rotation.x = -origen2.p

        that.piernaD_.rotation.x = -origen2.p;
        that.piernaI_.rotation.x = origen2.p;
      })
      .yoyo(true)
      .repeat(1)
      .onComplete(function () {
        that.animando = false;
      });

    movimiento1.start();
  }

  fabricaRuedas(){
    var ruedaGeom = new THREE.CylinderGeometry( 0.5, 0.5, 1, 8 );
    ruedaGeom.rotateX(Math.PI / 2);
    var materialRueda = new THREE.MeshLambertMaterial({ color: 0x333333 });

    var rueda = new THREE.Mesh(ruedaGeom, materialRueda);
    return rueda;
  }

  //Metodo que actualiza
  update() {
    if ( this.input && this.coche ) {
      if ( this.input.direction !== null ) {
        this.input.steering += this.input.direction / 50;
        if ( this.input.steering < -.6 ) this.input.steering = -.6;
        if ( this.input.steering > .6 ) this.input.steering = .6;
      }
      else{
        this.input.steering *=0.9;
      }
      this.coche.setSteering( this.input.steering, 0 );
      this.coche.setSteering( this.input.steering, 1 );

      if ( this.input.power === true ) {
        if(this.input.rear === true){
          this.coche.applyEngineForce(-15);
        }
        else{
          this.coche.applyEngineForce( 30 );
        }
      } else if ( this.input.power === false ) {
        this.coche.setBrake( 0.9, 2 );
        this.coche.setBrake( 0.9, 3 );
      } 
      else {
        this.coche.applyEngineForce( 0 );
      }
    }

    if(this.coche.mesh.getLinearVelocity().x > 20){
      this.coche.mesh.setLinearVelocity({x: 20, y: this.coche.mesh.getLinearVelocity().y, z:this.coche.mesh.getLinearVelocity().z});
    }
    else if(this.coche.mesh.getLinearVelocity().z > 20){
      this.coche.mesh.setLinearVelocity({x: this.coche.mesh.getLinearVelocity().x , y: this.coche.mesh.getLinearVelocity().y, z:20});
    }
    else if(this.coche.mesh.getLinearVelocity().x < -20){
      this.coche.mesh.setLinearVelocity({x: -20, y: this.coche.mesh.getLinearVelocity().y, z:this.coche.mesh.getLinearVelocity().z});
    }
    else if(this.coche.mesh.getLinearVelocity().z < -20){
      this.coche.mesh.setLinearVelocity({x: this.coche.mesh.getLinearVelocity().x , y: this.coche.mesh.getLinearVelocity().y, z:-20});
    }

    //Evitar que el personaje se desestabilice
    this.box_container.rotation['x'] = 0;
    this.box_container.rotation['z'] = 0;
    this.box_container.rotation['y'] = 0;
    this.box_container.__dirtyRotation = true;

    //Eliminar inercia para un mejor control
    var velocidadNula = new THREE.Vector3(0, 0, 0);
    this.box_container.setLinearVelocity(velocidadNula);

    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;

    this.tiempoAnterior = tiempoActual;

    // //Control de animaciones
    // if ((this.backward || this.forward || this.left || this.right) && this.animando == false) {
    //   this.animando = true;
    //   this.animar();
    // }

    // //Control de la vida del personaje
    // if (this.vida <= 0) {
    //   this.scene.t_vida.innerHTML = this.vida;
    //   if (!alert('Te han matado! ¿Quieres jugar de nuevo?')) { window.location.reload(); }
    // }

  }
}