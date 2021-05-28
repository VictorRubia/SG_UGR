class Mapa {
    constructor(scene) {

        //Definir los materiales que se van a usar
        var texture = new THREE.TextureLoader().load('../imgs/circuito.png');
        var material = new THREE.MeshPhongMaterial({ map: texture });
        var materialDark = new THREE.MeshPhongMaterial({ map: texture, color: 0xbfbfbf });
        var physiMaterial = Physijs.createMaterial(material, 1, 0.4);
        var material_transparent = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.01 })
        var physiMaterial_transparent = Physijs.createMaterial(material_transparent, 1, 0.1);
        
        var material_ = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.01 })
        var physiMaterial_ = Physijs.createMaterial(material_, 1, 0.1);
        
        //Material para los muros
        var muro = new THREE.TextureLoader().load('../imgs/block.png');
        muro.wrapS = THREE.MirroredRepeatWrapping;
        muro.wrapT = THREE.MirroredRepeatWrapping;
        muro.repeat.set( 30, 4 );
        var material_muro = new THREE.MeshPhongMaterial({ map: muro });
        //var material_muro = new THREE.MeshBasicMaterial({ color: 0xa29a96})
        var physiMaterial_muro = Physijs.createMaterial(material_muro, 1, 0.1);
        
        //Material Para la bandera de la linea de meta
        var bandera = new THREE.TextureLoader().load('../imgs/bandera.png');
        var meta = new THREE.MeshPhongMaterial({ map: bandera });
        var metaDark = new THREE.MeshPhongMaterial({ map: bandera, color: 0xbfbfbf });
        var physiMaterial_meta = Physijs.createMaterial(meta, 1, 0.4);
        
        //Material para las barras de la linea de meta
        var material_barra = new THREE.MeshBasicMaterial({ color: 0x95979b })
        var physiMaterial_barra = Physijs.createMaterial(material_barra, 1, 0.1);

        physiMaterial.wrapS = physiMaterial.wrapT = THREE.RepeatWrapping;

        //Crear el suelo
        var geometry = new THREE.BoxGeometry(400, 0.2, 400);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.1, 0));
        this.ground = new Physijs.BoxMesh(geometry, physiMaterial, 0);
        this.ground.receiveShadow = true;


        //Load background texture
        const loader = new THREE.TextureLoader();
        loader.load('../imgs/fondo.png' , function(texture)
                {
                scene.background = texture;  
                });


        var paredes = new THREE.TextureLoader().load('../imgs/images.jpg');
        paredes.wrapS = THREE.MirroredRepeatWrapping;
        paredes.wrapT = THREE.MirroredRepeatWrapping;
        paredes.repeat.set( 3, 1 );
        var material_paredes = new THREE.MeshPhongMaterial({ map: paredes });
        var physiMaterial_paredes = Physijs.createMaterial(material_paredes, 1, 0.1);


        //Paredes alrededor del mapa
        //Pared SUR
        geometry = new THREE.BoxGeometry(405, 40, 5);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 15, 0));
        var physiPared = new Physijs.BoxMesh(geometry, physiMaterial_paredes, 0);
        physiPared.position.z = 200;
        this.ground.add(physiPared);

        //Pared NORTE
        physiPared = new Physijs.BoxMesh(geometry, physiMaterial_paredes, 0);
        physiPared.position.z = -200;
        this.ground.add(physiPared);


        //Pared ESTE
        var geometry1 = new THREE.BoxGeometry(405, 40, 5);
        geometry1.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 15, 0));
        geometry1.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        physiPared = new Physijs.BoxMesh(geometry1, physiMaterial_paredes, 0);
        physiPared.position.x = 200;
        this.ground.add(physiPared);

        //Pared OESTE
        physiPared = new Physijs.BoxMesh(geometry1, physiMaterial_paredes, 0);
        physiPared.position.x = -200;
        this.ground.add(physiPared);
        

        //Creo los muros interiores del circuito
        geometry = new THREE.BoxGeometry(187, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -7.8;
	physiMuro.position.x = -3;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(125, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 56;
	physiMuro.position.x = 89;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(29, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 117;
	physiMuro.position.x = 104;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(153, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 39;
	physiMuro.position.x = 117;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(50.5, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -36;
	physiMuro.position.x = 91;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(14, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -44;
	physiMuro.position.x = 67.25;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(165.5, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -51.75;
	physiMuro.position.x = -14.25;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(85, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -95.5;
	physiMuro.position.x = -95.5;
        this.ground.add(physiMuro);
        
        
        geometry = new THREE.BoxGeometry(40.25, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -136.5;
	physiMuro.position.x = -114.25;
        this.ground.add(physiMuro);
        
        
        geometry = new THREE.BoxGeometry(154, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -58.5;
	physiMuro.position.x = -132.9;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(14, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 17;
	physiMuro.position.x = -140;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(41.8, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 38.5;
	physiMuro.position.x = -145.5;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(14, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 57.9;
	physiMuro.position.x = -138.25;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(29.25, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 42.75;
	physiMuro.position.x = -132.75;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(39.5, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 29.70;
	physiMuro.position.x = -113;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(40.25, 4, 3.5);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 10.8;
	physiMuro.position.x = -95;
        this.ground.add(physiMuro);


	//Muros que estan en las esquinas
	geometry = new THREE.BoxGeometry(187.5, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 142;
	physiMuro.position.x = -106;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(58, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 170;
	physiMuro.position.x = -13.75;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(112, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -139,5;
	physiMuro.position.x = 143.5;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(60, 4, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -170;
	physiMuro.position.x = 89;
        this.ground.add(physiMuro);
        
        
        //LINEA DE META
        //Palo izquierdo
        geometry = new THREE.BoxGeometry(3, 35, 1);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMeta = new Physijs.BoxMesh(geometry, physiMaterial_barra, 0);
	physiMeta.position.z = 17.5;
	physiMeta.position.x = 149.5;
        this.ground.add(physiMeta);
        
        //Palo derecho
        geometry = new THREE.BoxGeometry(3, 35, 1);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMeta = new Physijs.BoxMesh(geometry, physiMaterial_barra, 0);
	physiMeta.position.z = 17.5;
	physiMeta.position.x = 182;
        this.ground.add(physiMeta);
        
        //Bandera de la linea de meta
        geometry = new THREE.BoxGeometry(32, 5, 3);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMeta = new Physijs.BoxMesh(geometry, physiMaterial_meta, 0);
	physiMeta.position.z = 17.5;
	physiMeta.position.x = 165.7;
	physiMeta.position.y = 15;
	
        this.ground.add(physiMeta);


	//Recorrido para los competidores
       this.spline = new THREE.CatmullRomCurve3([
      	  new THREE.Vector3(66.0377712606955,0,-131.1897419131817),	//A1
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
          new THREE.Vector3(-121.889781614657,0,175.6502421040217),	//K
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
      
     /*this.geometryLine = new THREE.Geometry();
     this.geometryLine.vertices = this.spline.getPoints(100);
      var visibleSpline = new THREE.Line (this.geometryLine,physiMaterial_barra);
      visibleSpline.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));
      this.ground.add(visibleSpline);
      */
        scene.add(this.ground);



    }

    //Funcion que crea los muros de manera aleatoria
    // createMuros(ground, material) {
    //     //Muros de frente
    //     var geometry = new THREE.BoxGeometry(30, 10, 3);
    //     geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    //     for (var i = 0; i < 15; i++) {
    //         var physiMuro = new Physijs.BoxMesh(geometry, rojo, 0);
    //         physiMuro.position.x = Math.floor(Math.random() * 170) - 85;
    //         physiMuro.position.z = Math.floor(Math.random() * 170) - 85;
    //         ground.add(physiMuro);
    //     }

    //     //Muros de lado
    //     var geometry1 = new THREE.BoxGeometry(30, 10, 3);
    //     geometry1.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    //     geometry1.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    //     for (var i = 0; i < 15; i++) {
    //         var physiMuro = new Physijs.BoxMesh(geometry1, material, 0);
    //         physiMuro.position.x = Math.floor(Math.random() * 170) - 85;
    //         physiMuro.position.z = Math.floor(Math.random() * 170) - 85;
    //         ground.add(physiMuro);
    //     }
    // }
}
