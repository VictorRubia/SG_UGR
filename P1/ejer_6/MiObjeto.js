import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'

class MiObjeto extends THREE.Object3D {
    
    constructor() {
        super();
      
        // Necesitamos las bibliotecas MTLLoader() y OBJLoader()
        var that = this;
        var materialLoader = new MTLLOADER.MTLLoader();
        var objectLoader = new OBJLOADER.OBJLoader();

        // Cada funcion load('archivo', function(materials/object))
        materialLoader.load('../models/porsche911/911.mtl',
            function (materials) {
                objectLoader.setMaterials (materials);
                objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
                    function(object){
                        var modelo = object;
                        that.add(modelo);
                    },null,null);
            }
        );

        this.position.y = 0.6;
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.rotation.y += 0.01;
    }
  }

export {MiObjeto}