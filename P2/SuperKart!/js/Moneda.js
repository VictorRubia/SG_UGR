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
			var containerGeometry = new THREE.BoxGeometry(5.2, 3, 3);
				
			this.box_moneda = new Physijs.BoxMesh(
				containerGeometry,
				new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.0, transparent: true }),
				1
			);
		
			this.box_moneda.add(this.meshMoneda);

			this.box_moneda.position.set(this.posx, 2, this.posz);
			this.box_moneda.__dirtyPosition = true;

			//Añadir la caja a la escena
			this.scene.add(this.box_moneda);

			this.box_moneda.addEventListener('collision', function (objeto, v, r, n) {
				// console.log('COLISION');
				if(objeto.id == 13){
					that.scene.remove(that.box_moneda);
					that.scene.coche.monedas++;
					var source = ["100", "100", "100", "100"];
					
					var delay = 1000; // use 30000 for 30 seconds
					
					var currentIndex = 0;
					
					var A = source[currentIndex]; // Starting value
					
					window.console.log(A); // demo
					
					var intervalId = setInterval(function() {
						currentIndex += 1;
						A = source[currentIndex];
						
						window.console.log(A); // demo
						that.scene.coche.coche.applyEngineForce( A );
				
						// Clear interval 
						if (source.length === currentIndex + 1) {
							clearInterval(intervalId);
						}
					}, delay);
				}
				if(objeto.id == 33){ // 1
					that.scene.remove(that.box_moneda);
					that.scene.enemigo.monedas++;
				}
				if(objeto.id == 43){ //2
					that.scene.remove(that.box_moneda);
					that.scene.enemigo2.monedas++;
				}
				if(objeto.id == 53){ //2
					that.scene.remove(that.box_moneda);
					that.scene.enemigo2.monedas++;
				}
			});


    }
  
    //Crear el aspecto del personaje
    createMoneda(mesh) {

			var that = this;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        // Cada funcion load('archivo', function(materials/object))
        materialLoader.load('../models/Coin.mtl',
            function (materials) {
                objectLoader.setMaterials (materials);
                objectLoader.load('../models/Coin.obj',
                    function(object){
											var modelo = object;
											var modelo2 = object;
                        that.meshMoneda.add(modelo);
												// that.meshMoneda2.add(modelo);
                    },null,null);
            }
        );
    
    }
  
  
    //Metodo que actualiza
    update() {

			this.meshMoneda.rotation['y'] += 0.1;
			this.meshMoneda.rotation['x'] = 0;
			this.meshMoneda.rotation['z'] = 0;
			this.box_moneda.__dirtyRotation = true;


    }
  }