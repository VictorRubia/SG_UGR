class MurosPosicion {
    //Necesitamos la escena
    constructor(scene, posx, posz, rotacion, index) {
      this.posx = posx;
      this.posz = posz;
      this.rotacion = rotacion;
      this.index = index;
      this.scene = scene;

      this.crearMuro(this.index);

      scene.add(this.physiMesh);
    }

    crearMuro(){
        var material_muro = new THREE.MeshBasicMaterial({ color: 0xFF0000})

        //MUROS INVISIBLES CHECK POSICIONw
        //4
        var geometry = new THREE.BoxGeometry(100, 4, 6);
        // geometry.translate(posx, 1.5, posz);
        // geometry.applyMatrix(new THREE.Matrix4().makeTranslation(this.posx, 1.5, this.posz));
        // geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/2));
        this.physiMesh = new Physijs.BoxMesh(geometry, material_muro, 0);
        //-1.82
        this.physiMesh.position.set(this.posx, -1.88, this.posz);
        this.physiMesh.rotation.set(0, this.rotacion, 0);
        this.physiMesh.__dirtyPosition = true;
        this.physiMesh.__dirtyRotation = true;
    }
  
  }