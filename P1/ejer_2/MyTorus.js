
import * as THREE from '../libs/three.module.js'

class MiToro extends THREE.Object3D {
  constructor(gui,titleGui, torusMat) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y de material
    var torusGeo = new THREE.TorusGeometry (1, 0.2, 3, 3);

    //  Ya podemos construir el Mesh
    this.torus = new THREE.Mesh (torusGeo, torusMat);

    //  Lo añadimos como hijo del Object3D (this)
    this.add (this.torus);

    //  Las geometrías se crean centradas en su origen

  }
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = new function () {
        this.radio_p = 1.0;
        this.radio_t = 0.2;
        this.res_toro = 3.0;
        this.res_tubo = 3.0;
      
      //  Un botón para dejarlo todo en posicion inicial (reset)
      //  Cuando se pulse se ejecuta la función
      this.reset = function () {
        this.radio_p = 1.0;
        this.radio_t = 0.2;
        this.res_toro = 3.0;
        this.res_tubo = 3.0;
        that.torus.geometry = new THREE.TorusGeometry(this.radio_p, this.radio_t, this.res_toro, this.res_tubo);
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método listen() nos permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice.
    //                                     Min, Max, Incr
    folder.add (this.guiControls, 'radio_p', 1.0, 5.0, 0.1).name ('Radio Principal : ').listen().onChange(function (value){
        that.torus.geometry = new THREE.TorusGeometry(value, that.guiControls.radio_t, that.guiControls.res_toro, that.guiControls.res_tubo);
    });
    folder.add (this.guiControls, 'radio_t', 0.2, 5.0, 0.1).name ('Radio Tubo : ').listen().onChange(function (value){
        that.torus.geometry = new THREE.TorusGeometry(that.guiControls.radio_p, value, that.guiControls.res_toro, that.guiControls.res_tubo);
    });
    folder.add (this.guiControls, 'res_toro', 3.0, 15.0, 1.0).name ('Resolución Toro : ').listen().onChange(function (value){
        that.torus.geometry = new THREE.TorusGeometry(that.guiControls.radio_p, that.guiControls.radio_t, value, that.guiControls.res_tubo);
    });
    folder.add (this.guiControls, 'res_tubo', 3.0, 15.0, 1.0).name ('Resolucion Tubo : ').listen().onChange(function (value){
        that.torus.geometry = new THREE.TorusGeometry(that.guiControls.radio_p, that.guiControls.radio_t, that.guiControls.res_toro, value);
    });


    folder.add (this.guiControls, 'reset').name ('[ Restaurar ]');
  }
  
  update () {
    //  Con independencia de cómo se escriban las 3 lineas siguientes, el orden en el que se aplican las transformaciones es:
    //  1º. Escalado
    //  2º. Rotación en Z
    //  3º. Rotación en Y
    //  4º. Rotación en X
    //  5º. Traslaciones


    //  Animación para la rotación en los tres ejes
    this.rotation.x += 0.01
    this.rotation.y += 0.01
    this.rotation.z += 0.01
  }
}

export { MiToro }