import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../../libs/tween.esm.js'

class Elipse extends THREE.Object3D {
	constructor(gui){
		super();

		// Se crea la parte de la interfaz que corresponde a la caja
		// Creamos primero esta parte ya que otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui);

		//  Material
		var matCilindro = new THREE.MeshNormalMaterial({opacity:0.35, transparent: true, flatShading: false});
		var matEsfera = new THREE.MeshNormalMaterial({flatShading: false});

		//  Hacemos la elipse
		//  Curva
		var curva = new THREE.EllipseCurve(0, 0, 10, 10);	// Genera los puntos en la curva de una elipse
		var puntos = curva.getPoints( 50 );
		
		this.camino = new THREE.SplineCurve(puntos);
		
		this.shape = new THREE.Shape(puntos);
		this.extrudeSettings = {
			steps: 2,
			depth: 2,
			bevelEnabled: false,
		};

		var geometry = new THREE.ExtrudeBufferGeometry(this.shape, this.extrudeSettings);
		
		this.elipse = new THREE.Mesh(geometry, matCilindro);
		this.elipse.rotation.x -= Math.PI/2;
		this.add(this.elipse);

		this.geomEsfera = new THREE.SphereGeometry(1, 20, 20);
		this.esfera = new THREE.Mesh(this.geomEsfera, matEsfera);
		this.esfera.position.x += 10;
		this.esfera.position.y += 1;


		this.velocidad = Math.PI/2; //  rad/s


		var tiempo = Date.now();
		var looptime = 20000;
		this.t = (tiempo % looptime) / looptime;

		this.esfera_ = new THREE.Object3D();
		this.esfera_.add(this.esfera);
		this.esfera_.position.y += 1;
		this.esfera_.rotation.x = Math.PI/2;
		this.add(this.esfera_);
		this.animarEsfera();
	}

	createGUI (gui){
		//  Controles para el tamaño, la orientación y la posición de la caja
		this.guiControls = new function() {
			this.extension = 1;
			//  Un botón para dejarlo todo en su posición inicial
			//  Cuando se pulse se ejecutará esta función
			this.reset = function (){
				this.extension = 1;
			}
		}

    var that = this;
    gui.add(this.guiControls, 'extension', 0, 20.0, 0.1).name('Extension: ').listen().onChange(function(value){
      var curva = new THREE.EllipseCurve(0, 0, 10, 10 + (10*value));
      var puntos = curva.getPoints( 50 );
      that.camino = new THREE.SplineCurve(puntos);
      that.shape = new THREE.Shape(puntos);
      that.elipse.geometry = new THREE.ExtrudeBufferGeometry(that.shape, that.extrudeSettings);
    })

    gui.add (this.guiControls, 'reset').name ('[ Restaurar ]');

	}

	animarEsfera(){
		var origen = {y: 0};
		var destino = {y: 1};

		var that = this;
		var animacion = new TWEEN.Tween(origen)
			.to(destino, 4000)
			.easing(TWEEN.Easing.Linear.None)
			.repeat(Infinity)
			.onUpdate(function(value) {
        var posicion = that.camino.getPointAt(origen.y);
        posicion.z = 0;
        that.esfera.position.copy(posicion);
      })
			.yoyo(false)
			.start();
	}

	update(){
		//  Con independencia de cómo se escriban las 3 lineas siguientes, el orden en el que se aplican las transformaciones es:
		//  1º. Escalado
		//  2º. Rotación en Z
		//  3º. Rotación en Y
		//  4º. Rotación en X
		//  5º. Traslaciones

	}
}

export {Elipse}