class MyPhysiScene extends Physijs.Scene {

  static clock = new THREE.Clock();
  static delta = 0;
  static interval = 1 / 60;

  constructor(myCanvas) {
    // El gestor de hebras
    Physijs.scripts.worker = './physijs/physijs_worker.js'
    // El motor de física de bajo nivel, en el cual se apoya Physijs
    Physijs.scripts.ammo = './ammo.js'
    super();

    this.posiciones;

    this.finalizado = true;

    // Crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Se establece el valor de la gravedad, negativo, los objetos caen hacia abajo
    this.setGravity(new THREE.Vector3(0, -33, 0));

    // El personaje principal
    this.coche = new Coche(this,159,30,0xA52523, false, 0);

    getRandomArbitrary(0.91, 1.04)
    this.enemigo = new Enemigos(this,171.65,39.19,0x00FF00, true,getRandomArbitrary(0.91, 1.07), 1);
    this.enemigo2 = new Enemigos(this,159.37,48.83,0x0000FF, true,getRandomArbitrary(0.91, 1.07), 2);
    this.enemigo3 = new Enemigos(this,171.97,58.19,0xFFFF00, true,getRandomArbitrary(0.91, 1.07), 3);
    
    this.enemigos = [this.enemigo, this.enemigo2, this.enemigo3]; 

    // this.moneda = new Moneda(this, 123,123,1);

    // Raycaster que se usará
    this.raycaster = new THREE.Raycaster();

    // Se crean y añaden luces a la escena
    this.createLights();

    // Creamos la camara
    this.createCamera();

    // Creamos el mapa 
    this.mapa = new Mapa(this);

    //Los elementos del html que vamos a ir modificando
    this.primero = document.getElementById('1');
    this.segundo = document.getElementById('2');
    this.tercero = document.getElementById('3');
    this.cuarto = document.getElementById('4');
    this.quinto = document.getElementById('5');
    this.sexto = document.getElementById('6');
    this.septimo = document.getElementById('7');
    this.octavo = document.getElementById('8');
    this.noveno = document.getElementById('9');

    var clock = new THREE.Clock();
    var delta = 0;
    var interval = 1 / 30;

    this.clock = clock;
    this.delta = delta;
    this.interval = interval;
    

  }

  createRenderer(myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  /// Método que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
  onWindowResize() {
    this.setCameraAspect(window.innerWidth / window.innerHeight);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  createCamera() {

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.set (30, 10, 10);

    this.camera.lookAt(this.coche.coche.mesh.position);

    this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
  }


  createLights() {

    this.light = new THREE.AmbientLight( 0xFFFFFF );
		this.light.position.set( 20, 60, -15 );
		this.coche.coche.mesh.add( this.light );

  }

  getCamera() {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    // this.camera.lookAt(this.coche.coche.mesh.position);
    // this.camera.position.copy( this.coche.coche.mesh.position ).add( new THREE.Vector3( 40, 25, 40 ) );


    var relativeCameraOffset = new THREE.Vector3(0,25,-25);
    this.coche.coche.mesh.updateMatrixWorld();  // Para que la cámara no tiemble
    var cameraOffset = relativeCameraOffset.applyMatrix4(this.coche.coche.mesh.matrixWorld);
    this.camera.position.z = cameraOffset.z;
    this.camera.position.x = cameraOffset.x;
    
    // this.camera.position.y = cameraOffset.y;
    this.camera.lookAt(this.coche.coche.mesh.position);
    
    return this.camera;
  }

  //Se define el aspecto de la cámara
  setCameraAspect(ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  

  update() {
    // Se solicita que La próxima vez que haya que refrescar la ventana se ejecute una determinada función, en este caso la funcion render.
    // La propia función render es la que indica que quiere ejecutarse la proxima vez
    // Por tanto, esta instrucción es la que hace posible que la función  render  se ejecute continuamente y por tanto podamos crear imágenes que tengan en cuenta los cambios que se la hayan hecho a la escena después de un render.
    
    if(this.finalizado) // Finalizamos el juego
      requestAnimationFrame(() => this.update());
    this.delta += this.clock.getDelta();
  
    this.coche.update();
    this.enemigo.update();
    this.enemigo2.update();
    this.enemigo3.update();
    
    this.cameraControl.update();  

    
    //Actualizar los valores de puntuación y de vida
    var velZ = this.coche.coche.mesh.getLinearVelocity().z.toFixed(2);
    var velX = this.coche.coche.mesh.getLinearVelocity().x.toFixed(2);
    
    var velocidad = Math.sqrt(Math.pow(velZ,2) + Math.pow(velX,2));
    if(this.coche.vueltas == -1)
      this.primero.innerHTML = 0;
    else
      this.primero.innerHTML = this.coche.vueltas;

      calcularDistancia(this);
    // this.primero.innerHTML = this.coche.coche.mesh.position.x.toFixed(2);
    // console.log(this.coche.coche.mesh.getLinearVelocity().x);
    this.segundo.innerHTML = this.coche.coche.mesh.position.x;
    this.tercero.innerHTML = this.coche.coche.mesh.position.z;
    this.cuarto.innerHTML = this.coche.numsecciones;
    this.quinto.innerHTML = this.enemigos[0].numsecciones;
    this.sexto.innerHTML = this.enemigos[1].numsecciones;
    this.septimo.innerHTML = this.enemigos[2].numsecciones;
    this.octavo.innerHTML = this.posiciones;
    this.noveno.innerHTML = this.coche.posicionCuadro;  
    
    let tacho = 0;
    let gas = 0;
    
    let turnSignalsStates = {
    }
    
    let iconsStates = {
      // main circl
    }
    
    function redraw() {
      draw((velocidad*0.005), tacho, gas, (velocidad).toFixed(2), turnSignalsStates, iconsStates);
    }
    redraw();
    TWEEN.update();
    
    this.simulate();
    this.renderer.render(this, this.getCamera());
  }  

}

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/// La función principal
$(function () {

  // Se crea la escena
  var scene = new MyPhysiScene("#WebGL-output");

  // listeners
  // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
  window.addEventListener("resize", () => scene.onWindowResize());

  document.getElementById("ayuda").addEventListener("click", function() {
    scene.coche.coche.mesh.__dirtyRotation = true;
    scene.coche.coche.mesh.__dirtyPosition = true;
    scene.coche.coche.mesh.rotation['x'] = 0;
    scene.coche.coche.mesh.rotation['y'] = Math.PI/2;
    // scene.coche.coche.mesh.position['x'] = 0;
    scene.coche.coche.mesh.rotation['z'] = 0;
    // scene.coche.coche.mesh.position['z'] = 0;
    // scene.coche.coche.mesh.rotation['y'] = 0;
  });
  
  function detectar(){
    window.addEventListener('keydown', function( ev ) {
      switch ( ev.keyCode ) {
        case 65: // left
          scene.coche.input.direction = 1;
          break;
  
        case 87: // forward
          scene.coche.input.power = true;
          break;
          
          case 68: // right
          scene.coche.input.direction = -1;
          break;
          
          case 32: // brake
          scene.coche.input.power = false;
          break;
          
          case 83: // back
          scene.coche.input.power = true;
          scene.coche.input.rear = true;
          break;
        }          
      });

      window.addEventListener('keyup', function( ev ) {
        switch ( ev.keyCode ) {
          case 65: // left
          scene.coche.input.direction = null;
          break;
          
          case 87: // forward
          scene.coche.input.power = null;
          scene.coche.coche.setBrake( 0.5, 2 );
          scene.coche.coche.setBrake( 0.5, 3 );
          break;
          
          case 68: // right
          scene.coche.input.direction = null;
          break;
          
          case 32: // brake
          scene.coche.input.power = null;
          break;
          
          case 83: // back
          scene.coche.input.power = null;
          scene.coche.input.rear = null;
          break;
      }
    });
  }
  setTimeout(detectar, 4000);

  
  // Finalmente, realizamos el primer renderizado.
  scene.update();
}
);
