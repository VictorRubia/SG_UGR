class CocheEnemigo {
    //Necesitamos la escena
    constructor(scene, posx, posz, colorCoche) {
      this.posx = posx;
      this.posz = posz;
      this.colorCoche = colorCoche;
      this.scene = scene;

		//Recorrido para los competidores
		this.spline = new THREE.CatmullRomCurve3([
		new THREE.Vector3(159,0,26),	//A1
		new THREE.Vector3(85.1308422440323,0,-151.3435390622595),	//B1
		new THREE.Vector3(114.3008118019079,0,-159.2989853053165),	//C1
		new THREE.Vector3(150,0,-150),				//D1
		new THREE.Vector3(169.9889355033067,0,-114.2181232613268),	//E1
		new THREE.Vector3(172.4307574205346,0,-16.7345196483699),	//C
		new THREE.Vector3(172.4307574205346,0,6.6954948315576),	//D
		new THREE.Vector3(171.1755780733956,0,31.799081774337),	//E
		new THREE.Vector3(159.0421777177189,0,47.2796270557177),	//F
		new THREE.Vector3(143.1432393206254,0,56.9026687171164),	//G
		new THREE.Vector3(122.2235835349759,0,69.0360690727932),	//H
		new THREE.Vector3(-80.8111847991999,0,163.4788060105528), 	//I
		new THREE.Vector3(-100.5897684510866,0,171.8466683248126),	//J
		new THREE.Vector3(-121.889781614657,0,175.6502421040217),	//K  ///MITAD
		new THREE.Vector3(-141.6683652665438,0,172.9877404585753),	//L
		new THREE.Vector3(-158.7844472729842,0,163.0984486326319),	//M
		new THREE.Vector3(-168.2933817210067,0,144.4609371145078),	//N
		new THREE.Vector3(-172.0969555002157,0,125.4430682184627),	//O
		new THREE.Vector3(-172.0969555002157,0,102.2412681652878),	//P
		new THREE.Vector3(-170.955883366453,0,-39.2516764212873),	//Q
		new THREE.Vector3(-171.2180640201861,0,-69.4929517070511),	//R
		new THREE.Vector3(-159.323509396816,0,-87.5047058510117),	//S
		new THREE.Vector3(-136.5539334035075,0,-87.1648614332011),	//T
		new THREE.Vector3(-116.8429571704941,0,-77.9890621523156),	//U
		new THREE.Vector3(-29.5029417931764,0,-36.5280431794252),	//V
		new THREE.Vector3(-1.9755439505198,0,-29.3913104054031),	//W
		new THREE.Vector3(24.1924762208945,0,-50.8015087274694),	//Z
		new THREE.Vector3(66.0377712606955,0,-131.1897419131817)	//A2
		]);

		this.geometryLine = new THREE.Geometry();
		this.geometryLine.vertices = this.spline.getPoints(100);
		var material = new THREE.LineBasicMaterial({color: 0xFF0000});
		var visibleSpline = new THREE.Line (this.geometryLine,material);
		// visibleSpline.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));
      
		this.competidor = new Coche(scene,158,51,0x238ea5);
		this.animarCompetidor(this.competidor, this.spline);
      
		scene.add(this.competidor);
		scene.add(visibleSpline);

    }
  
    animarCompetidor(objeto,spline){
			var origen2 = {p:0.45}; // Desde la mitad del recorrido hasta el final (6 segs)
			var destino2 = {p:1.0};
			var that = objeto;

			var animacion2 = new TWEEN.Tween(origen2)
			.to(destino2, 20000) // ( 6 segundos)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(function(){
					var posicion = spline.getPointAt(origen2.p);
					that.coche.mesh.position.copy(posicion);
					// that.coche.wheels[0].position.copy(posicion);
					var tangente = spline.getTangentAt(origen2.p);
					posicion.add(tangente);
					that.coche.mesh.lookAt(posicion);
			})
			.onComplete(function(){animacion1.start()})


			var origen1 = {p: 0.0}; // Desde el principio hasta la mitad del recorrido (4 segs)
			var destino1 = {p:0.45}; 
			var animacion1 = new TWEEN.Tween(origen1)
			.to(destino1, 20000)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(function(){
					var posicion = spline.getPointAt(origen1.p);
					that.coche.mesh.position.copy(posicion);
					// that.coche.wheels[0].position.copy(posicion);
					var tangente = spline.getTangentAt(origen1.p);
					posicion.add(tangente);
					that.coche.mesh.lookAt(posicion);
			})
			.onComplete(function(){animacion2.start()}) // BUCLE INFINITO
			.start();

	}


  
    //Metodo que actualiza
    update() {
  
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
  