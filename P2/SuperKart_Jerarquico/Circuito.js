
class Circuito{
    constructor(scene) {

        // var loader = new THREE.TextureLoader();
		// // Materials
		// var ground_material = Physijs.createMaterial(
		// 	new THREE.MeshLambertMaterial({ map: loader.load( 'imgs/circuito.png' ) }),
		// 	.8, // high friction
		// 	.4 // low restitution
		// );
		// ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		// ground_material.map.repeat.set( 3, 3 );
		
		// // Ground
		// var ground = new Physijs.BoxMesh(
		// 	new THREE.BoxGeometry(100, 1, 100),
		// 	ground_material,
		// 	0 // mass
		// );
		// ground.receiveShadow = true;
		// scene.add( ground );

        var ground_material = new THREE.TextureLoader().load('./imgs/circuito.png');

        //Crear el suelo
        var geometry = new THREE.BoxGeometry(200, 0.2, 200);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -0.1, 0));
        this.ground = new Physijs.BoxMesh(geometry, ground_material, 0);

        scene.add(this.ground);

    }

}
export {Circuito}
