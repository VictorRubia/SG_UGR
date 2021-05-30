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
        geometry.translate(0,-0.1,0);
        // geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -0.1, 0));
        this.ground = new Physijs.BoxMesh(geometry, physiMaterial, 0);
        this.ground.receiveShadow = true;

        //Load background texture
        //var path = "../imgs/";
        //var format = '.png';
        //var urls = [

        //]
        
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
        geometry = new THREE.BoxGeometry(405, 30, 5);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 15, 0));
        var physiPared = new Physijs.BoxMesh(geometry, physiMaterial_paredes, 0);
        physiPared.position.z = 200;
        this.ground.add(physiPared);

        //Pared NORTE
        physiPared = new Physijs.BoxMesh(geometry, physiMaterial_paredes, 0);
        physiPared.position.z = -200;
        this.ground.add(physiPared);


        //Pared ESTE
        var geometry1 = new THREE.BoxGeometry(405, 30, 5);
        geometry1.applyMatrix(new THREE.Matrix4().makeTranslation(0, 15, 0));
        geometry1.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        physiPared = new Physijs.BoxMesh(geometry1, physiMaterial_paredes, 0);
        physiPared.position.x = 200;
        this.ground.add(physiPared);

        //Pared OESTE
        physiPared = new Physijs.BoxMesh(geometry1, physiMaterial_paredes, 0);
        physiPared.position.x = -200;
        this.ground.add(physiPared);
        

        //Creo los muros interiores del circuito
        geometry = new THREE.BoxGeometry(187, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -7.8;
	physiMuro.position.x = -3;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(125, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 56;
	physiMuro.position.x = 89;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(29, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 117;
	physiMuro.position.x = 104;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(153, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 39;
	physiMuro.position.x = 117;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(50.5, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -36;
	physiMuro.position.x = 91;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(14, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -44;
	physiMuro.position.x = 67.25;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(165.5, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -51.75;
	physiMuro.position.x = -14.25;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(85, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -95.5;
	physiMuro.position.x = -95.5;
        this.ground.add(physiMuro);
        
        
        geometry = new THREE.BoxGeometry(40.25, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -136.5;
	physiMuro.position.x = -114.25;
        this.ground.add(physiMuro);
        
        
        geometry = new THREE.BoxGeometry(154, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -58.5;
	physiMuro.position.x = -132.9;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(14, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 17;
	physiMuro.position.x = -140;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(41.8, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 38.5;
	physiMuro.position.x = -145.5;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(14, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 57.9;
	physiMuro.position.x = -138.25;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(29.25, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 42.75;
	physiMuro.position.x = -132.75;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(39.5, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 29.70;
	physiMuro.position.x = -113;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(40.25, 4, 3.5);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 10.8;
	physiMuro.position.x = -95;
        this.ground.add(physiMuro);


	//Muros que estan en las esquinas
	geometry = new THREE.BoxGeometry(187.5, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 142;
	physiMuro.position.x = -106;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(58, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = 170;
	physiMuro.position.x = -13.75;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(112, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -139,5;
	physiMuro.position.x = 143.5;
        this.ground.add(physiMuro);
        
        geometry = new THREE.BoxGeometry(60, 4, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
	physiMuro.position.z = -170;
	physiMuro.position.x = 89;
        this.ground.add(physiMuro);
        
        
        //LINEA DE META
        //Palo izquierdo
        geometry = new THREE.BoxGeometry(3, 35, 1);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMeta = new Physijs.BoxMesh(geometry, physiMaterial_barra, 0);
	physiMeta.position.z = 17.5;
	physiMeta.position.x = 149.5;
        this.ground.add(physiMeta);
        
        //Palo derecho
        geometry = new THREE.BoxGeometry(3, 35, 1);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        var physiMeta = new Physijs.BoxMesh(geometry, physiMaterial_barra, 0);
				physiMeta.position.z = 17.5;
				physiMeta.position.x = 182;
        this.ground.add(physiMeta);
        
        //Bandera de la linea de meta
        geometry = new THREE.BoxGeometry(32, 5, 3);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
        var physiMeta = new Physijs.BoxMesh(geometry, physiMaterial_meta, 0);
				physiMeta.position.z = 17.5;
				physiMeta.position.x = 165.7;
				physiMeta.position.y = 15;
        this.ground.add(physiMeta);
        
        var material_muro = new THREE.MeshBasicMaterial({ color: 0xFF0000})

        this.muro1 = new MurosPosicion(scene, 163.9, 17.62, 0, 1);
        this.muro2 = new MurosPosicion(scene, 161.9, -27.62, 0, 2);        
        this.muro4 = new MurosPosicion(scene, -135.2, -171.6, Math.PI/2, 4);
        this.muro5 = new MurosPosicion(scene, -165.4, 57.4, 0, 5);
        this.muro6 = new MurosPosicion(scene, 117.8, 147.5, Math.PI/2, 6);

        // console.log(this.muro1);
        // console.log(this.muro2);
        // console.log(this.muro4);
        // console.log(this.muro5);
        // console.log(this.muro6);


      
     scene.add(this.ground);

    }

animarCompetidor(){
        var origen2 = {p:0.45}; //Desde la mitad del recorrido hasta el final
        var destino2 = {p:1.0};
        var that = this;
  
        var animacion2 = new TWEEN.Tween(origen2)
        .to(destino2, 8000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){ 
          var posicion = that.spline.getPointAt(origen2.p);
          that.competidor.position.copy(posicion);
          var tangente = that.spline.getTangentAt(origen2.p);
          posicion.add(tangente);
          that.competidor.lookAt(posicion);
        })
        .onComplete(function(){animacion1.start()})
        
        
        var origen1 = {p:0.0}; //Desde el principio hasta la mitad del recorrido
        var destino1 = {p:0.45};
        var animacion1 = new TWEEN.Tween(origen1)
        .to(destino1, 4000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){ 
          var posicion = that.spline.getPointAt(origen1.p);
          that.competidor.position.copy(posicion);
          var tangente = that.spline.getTangentAt(origen1.p);
          posicion.add(tangente);
          that.competidor.lookAt(posicion);
        })
        .onComplete(function(){animacion2.start()}) //Bucle infinito
        .start();
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
