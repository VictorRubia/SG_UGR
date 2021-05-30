class Moneda {
    //Necesitamos la escena
    constructor(scene, posx, posz, index) {
      this.posx = posx;
      this.posz = posz;
      this.index = index
      this.scene = scene;
			this.meshMoneda = new THREE.Object3D();

			var that = this;

			this.createMoneda(this.meshMoneda);

			//Caja fisica del personaje
			var containerGeometry = new THREE.BoxGeometry(5.2, 1.7, 3);
			containerGeometry.translate(0,0,0);
				
			this.box_moneda = new Physijs.BoxMesh(
				containerGeometry,
				new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.0, transparent: true }),
				1
			);


			this.box_moneda.add(this.meshMoneda);

			this.box_moneda.position.set(0, 2, 0);
			this.box_moneda.__dirtyPosition = true;

			//Añadir la caja a la escena
			this.scene.add(this.box_moneda);

    }
  
    //Crear el aspecto del personaje
    createMoneda(mesh) {

        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        // Cada funcion load('archivo', function(materials/object))
        materialLoader.load('../models/Coin.mtl',
            function (materials) {
                objectLoader.setMaterials (materials);
                objectLoader.load('../models/Coin.obj',
                    function(object){
                        var modelo = object;
												console.log(modelo);
                        mesh.add(modelo);
                    },null,null);
            }
        );

        // this.position.y = 0.6;
    
    }
  
  
    //Metodo que actualiza
    update() {

  
			//Evitar que el personaje se desestabilice
			this.box_container.rotation['x'] = 0;
			this.box_container.rotation['z'] = 0;
			this.box_container.rotation['y'] = 0;
			this.box_container.__dirtyRotation = true;

      // if(this.vueltas == 2 && this.posicionCuadro == 3){
      //   window.alert('Juego finalizado!\n Has quedado último :(');
      // }

      //  Limitamos la velocidad
      // if(this.coche.mesh.getLinearVelocity().x > 20){
      //   this.coche.mesh.setLinearVelocity({x: 20, y: this.coche.mesh.getLinearVelocity().y, z:this.coche.mesh.getLinearVelocity().z});
      // }
      // else if(this.coche.mesh.getLinearVelocity().z > 20){
      //   this.coche.mesh.setLinearVelocity({x: this.coche.mesh.getLinearVelocity().x , y: this.coche.mesh.getLinearVelocity().y, z:20});
      // }
      // else if(this.coche.mesh.getLinearVelocity().x < -20){
      //   this.coche.mesh.setLinearVelocity({x: -20, y: this.coche.mesh.getLinearVelocity().y, z:this.coche.mesh.getLinearVelocity().z});
      // }
      // else if(this.coche.mesh.getLinearVelocity().z < -20){
      //   this.coche.mesh.setLinearVelocity({x: this.coche.mesh.getLinearVelocity().x , y: this.coche.mesh.getLinearVelocity().y, z:-20});
      // }
  
      //  rotacion sucia a 0
      // modulo de vel lineal x y z es velocidad
      // un spline general y predeterminado
      // compararse mi spline con el spline genérico para saber mi posición
      // ecuación
    }
  }