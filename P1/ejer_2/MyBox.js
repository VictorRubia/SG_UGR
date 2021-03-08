
import * as THREE from '../libs/three.module.js'

class MiCubo extends THREE.Object3D {
  constructor(gui,titleGui, boxMat) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y de material
    var boxGeo = new THREE.BoxGeometry (1, 1, 1);

    //  Ya podemos construir el Mesh
    var box = new THREE.Mesh (boxGeo, boxMat);

    //  Lo añadimos como hijo del Object3D (this)
    this.add (box);

    //  Las geometrías se crean centradas en su origen

  }
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;

      //  Un botón para dejarlo todo en posicion inicial (reset)
      //  Cuando se pulse se ejecuta la función
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método listen() nos permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice.
    //                                     Min, Max, Incr
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Restaurar ]');

  }
  
  update () {
    //  Con independencia de cómo se escriban las 3 lineas siguientes, el orden en el que se aplican las transformaciones es:
    //  1º. Escalado
    //  2º. Rotación en Z
    //  3º. Rotación en Y
    //  4º. Rotación en X
    //  5º. Traslaciones
    
    //  Permitimos que el usuario pueda escalar
    this.scale.set (this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);

    //  Animación para la rotación en los tres ejes
    this.rotation.x += 0.01
    this.rotation.y += 0.01
    this.rotation.z += 0.01
  }
}

export { MiCubo }