
import * as THREE from '../libs/three.module.js'

class MiIcosaedro extends THREE.Object3D {
  constructor(gui,titleGui, icoMat) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y de material
    var icoGeo = new THREE.IcosahedronGeometry (1, 0);

    //  Ya podemos construir el Mesh
    this.ico = new THREE.Mesh (icoGeo, icoMat);

    //  Lo añadimos como hijo del Object3D (this)
    this.add (this.ico);

    //  Las geometrías se crean centradas en su origen

  }
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = new function () {
        this.radio = 1.0;
        this.subdivision = 0.0;
      
      //  Un botón para dejarlo todo en posicion inicial (reset)
      //  Cuando se pulse se ejecuta la función
      this.reset = function () {
        this.radio = 1.0;
        this.subdivision = 0.0;
        that.ico.geometry = new THREE.IcosahedronGeometry(this.radio, this.subdivision);
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
        that.ico.geometry = new THREE.IcosahedronGeometry(value, that.guiControls.subdivision);
    });
    folder.add (this.guiControls, 'subdivision', 0.0, 3.0, 1.0).name ('Subdivision : ').listen().onChange(function (value){
        that.ico.geometry = new THREE.IcosahedronGeometry(that.guiControls.radio, value);
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

export { MiIcosaedro }