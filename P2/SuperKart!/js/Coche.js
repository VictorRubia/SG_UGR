class Coche {
  //Necesitamos la escena
  constructor(scene, posx, posz, colorCoche, seccion) {
    this.posx = posx;
    this.posz = posz;
    this.colorCoche = colorCoche;
    this.index = -1;
    this.seccion = seccion;
    this.distancia = 0;
    this.vueltas = -1;
    this.scene = scene;
    this.numsecciones = 0;
    this.posicionCuadro = 0;
    this.monedas = 0;

    this.prueba = true;

    //Aspecto del personaje
    this.createCoche(scene);


    this.input = {
      power: null,
      direction: null,
      steering: 0,
      rear: null
    };

    var that = this

    this.coche.mesh.addEventListener('collision', function (objeto, v, r, n) {
      // console.log(objeto);
      if(objeto.id == 95 && that.seccion == 0){
        that.vueltas++;
        that.seccion++;
        that.numsecciones++;
      }

      if(objeto.id == 96 && that.seccion == 1){
        that.seccion++;
        that.numsecciones++;

      }
      // if(objeto.id == 68 && scene.coche.seccion == 2){
      //   console.log(objeto);
      //   scene.coche.seccion++;
      //   console.log(scene.coche);
      // }
      if(objeto.id == 97 && that.seccion == 2){
        that.seccion++;
        that.numsecciones++;
      }
      if(objeto.id == 98 && that.seccion == 3){
        that.seccion++;
        that.numsecciones++;
      }
      if(objeto.id == 99 && that.seccion == 4){
        that.seccion++;
        that.numsecciones++;
      }
      
    });

  }

  //Crear el aspecto del personaje
  createCoche(scene) {

    this.input;

    //0xA52523
    var colorCarroceria = new THREE.MeshLambertMaterial({color: this.colorCoche });

    var carroceriaGeom = new THREE.BoxGeometry(5.2,1.3,2.5);
    carroceriaGeom.rotateY(Math.PI / 2);
    this.carroceria = new THREE.Mesh(carroceriaGeom, colorCarroceria);
    
    this.carroceriaPhy = new Physijs.BoxMesh(
      carroceriaGeom,
      colorCarroceria
    );
    
    this.carroceriaPhy.position.y = 1.4; //1.3
    this.carroceriaPhy.castShadow = this.carroceriaPhy.receiveShadow = true;
    
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
    
    this.carroceriaPhy.add(this.ventanaFrontal);
    this.carroceriaPhy.add(this.ventanaTrasera);
    this.carroceriaPhy.add(this.ventanaDcha1);
    this.carroceriaPhy.add(this.ventanaDcha2);
    this.carroceriaPhy.add(this.ventanaIzqda1);
    this.carroceriaPhy.add(this.ventanaIzqda2);
    this.carroceriaPhy.add(this.cabina);
    
    this.coche = new Physijs.Vehicle(this.carroceriaPhy, new Physijs.VehicleTuning(
      10,//10.88,//stiffness
      1.83,//1.83,   //compression
      0.28,//0.28, //travel
      500.0,
      10.5,
      6000
      )
    );
      //x =190 z= 80
      this.coche.mesh.position.x = this.posx;
      this.coche.mesh.position.z = this.posz;
      this.coche.mesh.rotation.y = -Math.PI;

    var ruedaGeom = new THREE.CylinderGeometry( 0.5, 0.5, 1, 8 );
    // ruedaGeom.rotateX(-Math.PI / 2);
    ruedaGeom.rotateZ(-Math.PI / 2);
    // var ruedaGeom = new THREE.CircleGeometry( 10, 5 );
      var materialRueda = new THREE.MeshLambertMaterial({ color: 0x333333 });
      // console.log(this.coche);
      scene.add(this.coche);
      for ( var i = 0; i < 4; i++ ) {
        this.coche.addWheel(
          ruedaGeom,
          materialRueda,
          new THREE.Vector3(
            i % 2 === 0 ? -1.3 : 1.3, 
            -0.3, // Altura ruedas
            i < 2 ? 1.5 : -1.5    // Como de separadas estan las ruedas
            ),
            new THREE.Vector3( 0, -1, 0 ),  // Ruedas motrices
            new THREE.Vector3( -1, 0, 0 ),
            0.75, // Altura coche respecto a ruedas
            0.5,
            i < 2 ? false : true
            );
      }	
        
    }

  //Metodo que actualiza
  update() {

    var velZ = this.coche.mesh.getLinearVelocity().z.toFixed(2);
    var velX = this.coche.mesh.getLinearVelocity().x.toFixed(2);
    
    var velocidad = Math.sqrt(Math.pow(velZ,2) + Math.pow(velX,2));

    //  Controlamos motor del coche
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
        this.coche.setBrake( 2, 2 );
        this.coche.setBrake( 2, 3 );
      } 
      else {
        // this.coche.setBrake( 1, 2 );
        // this.coche.setBrake( 1, 3 );
        this.coche.applyEngineForce( 0 );
      }
    }

    
    if(this.vueltas == 2){

      var target = document.getElementById('tabla');
      target.style.display = 'block';

      if(this.prueba){
        this.scene.finalizado = false;
        console.log("JUEGO FINALIZADO");
      }
      
    }

    //  Limitamos la velocidad
    if(this.coche.mesh.getLinearVelocity().x > 50){
      this.coche.mesh.setLinearVelocity({x: 50, y: this.coche.mesh.getLinearVelocity().y, z:this.coche.mesh.getLinearVelocity().z});
    }
    else if(this.coche.mesh.getLinearVelocity().z > 50){
      this.coche.mesh.setLinearVelocity({x: this.coche.mesh.getLinearVelocity().x , y: this.coche.mesh.getLinearVelocity().y, z:50});
    }
    else if(this.coche.mesh.getLinearVelocity().x < -50){
      this.coche.mesh.setLinearVelocity({x: -50, y: this.coche.mesh.getLinearVelocity().y, z:this.coche.mesh.getLinearVelocity().z});
    }
    else if(this.coche.mesh.getLinearVelocity().z < -50){
      this.coche.mesh.setLinearVelocity({x: this.coche.mesh.getLinearVelocity().x , y: this.coche.mesh.getLinearVelocity().y, z:-50});
    }

    //  rotacion sucia a 0
    // modulo de vel lineal x y z es velocidad
    // un spline general y predeterminado
    // compararse mi spline con el spline genérico para saber mi posición
    // ecuación
  }
}
