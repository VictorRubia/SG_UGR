class Enemigos {
    //Necesitamos la escena
    constructor(scene, posx, posz, colorCoche, enemigo, factor, index) {
      this.posx = posx;
      this.posz = posz;
      this.colorCoche = colorCoche;
      this.enemigo = enemigo;
      this.factor = factor;
      this.index = index;
      this.seccion = 0;
      this.distancia = 0;
      this.vueltas = -1;
      this.numsecciones = 0;
      this.scene = scene;
      this.posicionCuadro=0;
      this.spline;
      this.prueba = true;
      this.monedas = 0;

      // 17 posiciones
      this.setNumeros = [0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07];
  
      //Aspecto del personaje
    	this.createCoche(scene);

        //Caja fisica del personaje
			var containerGeometry = new THREE.BoxGeometry(5.2, 1.7, 3);
      containerGeometry.translate(0,-1,0);
        
			this.box_container = new Physijs.BoxMesh(
				containerGeometry,
				new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.0, transparent: true }),
				1
			);

			this.box_container.add(this.meshCocheEnemigo);

			this.box_container.position.set(this.posx, 0, this.posz);
			this.box_container.__dirtyPosition = true;

      if(this.index === 2){
        this.spline = new THREE.CatmullRomCurve3([
          new THREE.Vector3(159.37,0.5,48.83),
          new THREE.Vector3(166.9,0.5,17.62),	
          new THREE.Vector3(158.7 ,0.5,-45.21),
          new THREE.Vector3(133.75,0.5,-59.21),
          new THREE.Vector3(-69.33,0.5,-161.38),
          new THREE.Vector3(-140.75,0.5,-172.27),	
          new THREE.Vector3(-168.88,0.5,-127.26),
          new THREE.Vector3(-169.56,0.5,47.71),
          new THREE.Vector3(-158.82,0.5,89.03),
          new THREE.Vector3(-124.4,0.5,82.57),
          new THREE.Vector3(-79.17*this.setNumeros[getRandom()],0.5,51.44*this.setNumeros[getRandom()]*1.4),
          new THREE.Vector3(-36.07*this.setNumeros[getRandom()],0.5,39.05*this.setNumeros[getRandom()]*1.4),
          new THREE.Vector3(-29.75,0.5,34.38*this.setNumeros[getRandom()]),
          new THREE.Vector3(7.51*this.setNumeros[getRandom()],0.5,28.55*this.setNumeros[getRandom()]), 	
          new THREE.Vector3(29.74*this.setNumeros[getRandom()],0.5,56.14 ),	
          new THREE.Vector3(70.5,0.5,141.95*this.setNumeros[getRandom()]),	
          new THREE.Vector3(124.28,0.5,160.02),
          new THREE.Vector3(168.47,0.5,130.49),
          new THREE.Vector3(159.37,0.5,48.83),
        ]);
      }
      if(this.index === 1){
        //Recorrido para los competidores
        this.spline = new THREE.CatmullRomCurve3([
          new THREE.Vector3(171.65,0.5,39.19),
          new THREE.Vector3(166.9*this.setNumeros[getRandom()],0.5,17.62),	
          new THREE.Vector3(158.7 *this.setNumeros[getRandom()],0.5,-45.21*this.setNumeros[getRandom()]),
          new THREE.Vector3(133.75*this.setNumeros[getRandom()],0.5,-59.21*this.setNumeros[getRandom()]),
          new THREE.Vector3(29.3*this.setNumeros[getRandom()],0.5,-104.34*this.setNumeros[getRandom()]),
          new THREE.Vector3(-69.33*this.setNumeros[getRandom()],0.5,-161.38*this.setNumeros[getRandom()]),
          new THREE.Vector3(-140.75*this.setNumeros[getRandom()],0.5,-172.27*this.setNumeros[getRandom()]),	
          new THREE.Vector3(-168.88*this.setNumeros[getRandom()],0.5,-127.26*this.setNumeros[getRandom()]),
          new THREE.Vector3(-169.56*this.setNumeros[getRandom()],0.5,47.71*this.setNumeros[getRandom()]),
          new THREE.Vector3(-158.82*this.setNumeros[getRandom()],0.5,89.03*this.setNumeros[getRandom()]),
          new THREE.Vector3(-124.4*this.setNumeros[getRandom()],0.5,82.57*this.setNumeros[getRandom()]),
          new THREE.Vector3(-83.17*this.setNumeros[getRandom()],0.5,51.44*this.setNumeros[getRandom()]),
          new THREE.Vector3(-36.07*this.setNumeros[getRandom()],0.5,39.05*this.setNumeros[getRandom()]),
          new THREE.Vector3(-29.75,0.5,34.38),
          new THREE.Vector3(-8.17,0.5,17.46),
          new THREE.Vector3(7.51*this.setNumeros[getRandom()] ,0.5,28.55*this.setNumeros[getRandom()]), 	
          new THREE.Vector3(29.74*this.setNumeros[getRandom()] ,0.5,56.14*this.setNumeros[getRandom()]),	
          new THREE.Vector3(70.5*this.setNumeros[getRandom()],0.5,141.95*this.setNumeros[getRandom()]),	
          new THREE.Vector3(124.28*this.setNumeros[getRandom()],0.5,160.02*this.setNumeros[getRandom()]),
          new THREE.Vector3(168.47*this.setNumeros[getRandom()],0.5,130.49*this.setNumeros[getRandom()]),
          new THREE.Vector3(171.65,0.5,39.19),
        ]);
      }
      if(this.index === 3){
        //Recorrido para los competidores
        this.spline = new THREE.CatmullRomCurve3([
          new THREE.Vector3(171.97,0.5,58.19),
          new THREE.Vector3(166.9*this.setNumeros[getRandom()],0.5,17.62*this.setNumeros[getRandom()]),	
          new THREE.Vector3(158.7 *this.setNumeros[getRandom()],0.5,-45.21*this.setNumeros[getRandom()]),
          new THREE.Vector3(133.75*this.setNumeros[getRandom()],0.5,-59.21*this.setNumeros[getRandom()]),
          new THREE.Vector3(46.37*this.setNumeros[getRandom()],0.5,-92.21*this.setNumeros[getRandom()]),
          new THREE.Vector3(-69.33*this.setNumeros[getRandom()],0.5,-161.38*this.setNumeros[getRandom()]),
          new THREE.Vector3(-140.75*this.setNumeros[getRandom()],0.5,-172.27*this.setNumeros[getRandom()]),	
          new THREE.Vector3(-168.88*this.setNumeros[getRandom()],0.5,-127.26*this.setNumeros[getRandom()]),
          new THREE.Vector3(-169.56*this.setNumeros[getRandom()],0.5,47.71*this.setNumeros[getRandom()]),
          new THREE.Vector3(-158.82*this.setNumeros[getRandom()],0.5,89.03*this.setNumeros[getRandom()]),
          new THREE.Vector3(-124.4*this.setNumeros[getRandom()],0.5,82.57*this.setNumeros[getRandom()]),
          new THREE.Vector3(-75.52*this.setNumeros[getRandom()],0.5,51.44*this.setNumeros[getRandom()]),
          new THREE.Vector3(-36.07*this.setNumeros[getRandom()],0.5,39.05),
          new THREE.Vector3(-29.75,0.5,34.38*this.setNumeros[getRandom()]),
          new THREE.Vector3(7.51*this.setNumeros[getRandom()],0.5,28.55*this.setNumeros[getRandom()]), 	// CURVA ABAJO
          new THREE.Vector3(29.74*this.setNumeros[getRandom()],0.5,56.14*this.setNumeros[getRandom()]),	
          new THREE.Vector3(70.5*this.setNumeros[getRandom()],0.5,141.95*this.setNumeros[getRandom()]),	
          new THREE.Vector3(124.28*this.setNumeros[getRandom()],0.5,160.02*this.setNumeros[getRandom()]),
          new THREE.Vector3(168.47*this.setNumeros[getRandom()],0.5,130.49*this.setNumeros[getRandom()]),
          new THREE.Vector3(171.97,0.5,58.19),
          ]);
      }

        this.geometryLine = new THREE.Geometry();
        this.geometryLine.vertices = this.spline.getPoints(100);
        var material = new THREE.LineBasicMaterial({color: 0xFF0000});
        var visibleSpline = new THREE.Line (this.geometryLine,material);

        this.animarCompetidor(this.box_container, this.spline, this.meshCocheEnemigo);

        var that = this;
        
        this.box_container.addEventListener('collision', function (objeto, v, r, n) {
          //Si el objeto es un zombie

            if(objeto.id == 95){
              that.seccion++; 
              that.vueltas++; 
              that.numsecciones++;
            }
            if(objeto.id == 96){
              that.seccion++;  
              that.numsecciones++;
            }
            if(objeto.id == 97){
              that.seccion++;  
              that.numsecciones++;
            }
            if(objeto.id == 98){
              that.seccion++;  
              that.numsecciones++;
            }
            if(objeto.id == 99){
              that.seccion++; 
              that.numsecciones++;
              // that.seccion = 0;
            }
          });
          //Añadir la caja a la escena
          scene.add(this.box_container);
          scene.add(visibleSpline);

    }
  
    //Crear el aspecto del personaje
    createCoche(scene) {

			this.meshCocheEnemigo = new THREE.Object3D();
    
			var colorCarroceria = new THREE.MeshLambertMaterial({color: this.colorCoche });

			var coche = new THREE.Group();

			this.ruedaDelanteDer = this.fabricaRuedas();
			this.ruedaDelanteDer.position.x = 1.5;
			this.ruedaDelanteDer.position.z = -1.3;
			this.ruedaDelanteDer.position.y = -0.5;
      
			this.ruedaDelanteIzq = this.fabricaRuedas();
			this.ruedaDelanteIzq.position.x = 1.5;
			this.ruedaDelanteIzq.position.z = 1.3;
			this.ruedaDelanteIzq.position.y = -0.5;
      
			this.ruedaDetrasDer = this.fabricaRuedas();
			this.ruedaDetrasDer.position.x = -1.5;
			this.ruedaDetrasDer.position.z = -1.3;
			this.ruedaDetrasDer.position.y = -0.5;
      
			this.ruedaDetrasIzq = this.fabricaRuedas();
			this.ruedaDetrasIzq.position.x = -1.5;
			this.ruedaDetrasIzq.position.z = 1.3;
			this.ruedaDetrasIzq.position.y = -0.5;

			var carroceriaGeom = new THREE.BoxGeometry(5.2,1.3,2.5);
			this.carroceria = new THREE.Mesh(carroceriaGeom, colorCarroceria);
			
			const carFrontTexture = getCarFrontTexture();
			const carBackTexture = getCarFrontTexture();
			const carRightSideTexture = getCarSideTexture();
			const carLeftSideTexture = getCarSideTexture();
			
			carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
			carLeftSideTexture.rotation = Math.PI;
			carLeftSideTexture.flipY = false;
			
			var cabinaGeom = new THREE.BoxGeometry(2.86,1.04,2);
			var cabina = new THREE.Mesh(cabinaGeom,[
					new THREE.MeshLambertMaterial({ map: carFrontTexture }),
					new THREE.MeshLambertMaterial({ map: carBackTexture }),
					new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
					new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
					new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
					new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
			]);
			
			// cabina.position.x = -6;
			cabina.position.y = 1;

			this.carroceria.add(cabina);
			this.carroceria.add(this.ruedaDelanteDer);
			this.carroceria.add(this.ruedaDelanteIzq);
			this.carroceria.add(this.ruedaDetrasDer);
			this.carroceria.add(this.ruedaDetrasIzq);
			// coche.add(this.carroceria);

			coche.scale.x= 0.3;
			coche.scale.y= 0.3;
			coche.scale.z= 0.3;

      this.carroceria.rotation.y = (-Math.PI / 2)

			this.meshCocheEnemigo.add(this.carroceria);
			
		}

    animarCompetidor(objeto,spline,mesh){
			var origen2 = {p:0.45}; // Desde la mitad del recorrido hasta el final (6 segs)
			var destino2 = {p:1.0};
			var that = objeto;

			var animacion2 = new TWEEN.Tween(origen2)
			.to(destino2, 16000 * getRandomArbitrary(0.8, 1.2)) // ( 6 segundos)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(function(){
				var posicion = spline.getPointAt(origen2.p);
        that.position.copy(posicion);
        that.__dirtyPosition = true;
        var tangente = spline.getTangentAt(origen2.p);
        posicion.add(tangente);
        // this.meshCocheEnemigo.lookAt(posicion);
        mesh.lookAt(posicion);
        that.children[0].lookAt(posicion);
        that.__dirtyRotation = true;
				})
				.onComplete(function(){animacion4.start()})
				
    
        var origen3 = {p: 0.02}; // Desde el principio hasta la mitad del recorrido (4 segs)
        var destino3 = {p:0.45}; 
        var animacion3 = new TWEEN.Tween(origen3)
        .to(destino3, 18000 * getRandomArbitrary(0.8, 1.2))
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function(){
          var posicion = spline.getPointAt(origen3.p);
          that.position.copy(posicion);
          that.__dirtyPosition = true;
          var tangente = spline.getTangentAt(origen3.p);
          posicion.add(tangente);
          // this.meshCocheEnemigo.lookAt(posicion);
          that.children[0].lookAt(posicion);
          mesh.lookAt(posicion);
          that.__dirtyRotation = true;
        })
        .onComplete(function(){animacion2.start()}) // BUCLE INFINITO

        var origen4 = {p: 0.0}; // Desde el principio hasta la mitad del recorrido (4 segs)
        var destino4 = {p:0.02}; 
        var animacion4 = new TWEEN.Tween(origen4)
        .to(destino4, 1000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function(){
          var posicion = spline.getPointAt(origen4.p);
          that.position.copy(posicion);
          that.__dirtyPosition = true;
          var tangente = spline.getTangentAt(origen4.p);
          posicion.add(tangente);
          // this.meshCocheEnemigo.lookAt(posicion);
          that.children[0].lookAt(posicion);
          mesh.lookAt(posicion);
          that.__dirtyRotation = true;
        })
        .onComplete(function(){animacion3.start()}) // BUCLE INFINITO
				
				var origen1 = {p: 0.0}; // Desde el principio hasta la mitad del recorrido (4 segs)
				var destino1 = {p:0.02}; 
				var animacion1 = new TWEEN.Tween(origen1)
				.to(destino1, 3000 * getRandomArbitrary(0.8, 1))
        .easing(TWEEN.Easing.Exponential.In)
        .onUpdate(function(){
          var posicion = spline.getPointAt(origen1.p);
					that.position.copy(posicion);
          that.__dirtyPosition = true;
					var tangente = spline.getTangentAt(origen1.p);
					posicion.add(tangente);
          // this.meshCocheEnemigo.lookAt(posicion);
          that.children[0].lookAt(posicion);
					mesh.lookAt(posicion);
          that.__dirtyRotation = true;
			})
      .delay(4000)
			.onComplete(function(){animacion3.start()}) // BUCLE INFINITO
			.start();
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

  
			//Evitar que el personaje se desestabilice
			this.box_container.rotation['x'] = 0;
			this.box_container.rotation['z'] = 0;
			this.box_container.rotation['y'] = 0;
			this.box_container.__dirtyRotation = true;

      if(this.vueltas == 2 && this.posicionCuadro == 3){

        var target = document.getElementById('tabla');
        target.style.display = 'block';
  
        if(this.prueba){
          this.scene.finalizado = false;
          console.log("JUEGO FINALIZADO");
        }
        
      }

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
  
// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandom(){
  return Math.floor(Math.random() * 16); 
}