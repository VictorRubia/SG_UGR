
import * as THREE from '../libs/three.module.js'

class MiEsfera extends THREE.Object3D {
  constructor(gui,titleGui, sphereMat) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y de material
    var sphereGeo = new THREE.SphereGeometry (1, 3, 2);

    //  Ya podemos construir el Mesh
    this.sphere = new THREE.Mesh (sphereGeo, sphereMat);

    //  Lo añadimos como hijo del Object3D (this)
    this.add (this.sphere);

    //  Las geometrías se crean centradas en su origen

  }
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = new function () {
        this.radio = 1.0;
        this.res_ecuador = 3.0;
        this.res_meridiano = 2.0;
      
      //  Un botón para dejarlo todo en posicion inicial (reset)
      //  Cuando se pulse se ejecuta la función
      this.reset = function () {
        this.radio = 1.0;
        this.res_ecuador = 3.0;
        this.res_meridiano = 2.0;
        that.sphere.geometry = new THREE.SphereGeometry(this.radio, this.res_ecuador, this.res_meridiano);
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método listen() nos permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice.
    //                                     Min, Max, Incr
    folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio : ').listen().onChange(function (value){
        that.sphere.geometry = new THREE.SphereGeometry(value, that.guiControls.res_ecuador, that.guiControls.res_meridiano);
    });
    folder.add (this.guiControls, 'res_ecuador', 3.0, 15.0, 0.1).name ('Res. Ecuador : ').listen().onChange(function (value){
        that.sphere.geometry = new THREE.SphereGeometry(that.guiControls.radio, value, that.guiControls.res_meridiano);
    });
    folder.add (this.guiControls, 'res_meridiano', 2.0, 15.0, 1.0).name ('Res. Meridiano : ').listen().onChange(function (value){
        that.sphere.geometry = new THREE.SphereGeometry(that.guiControls.radio, that.guiControls.res_ecuador, value);
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

export { MiEsfera }