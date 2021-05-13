import { Circuito } from './Circuito.js'

class MyPhysiScene extends Physijs.Scene {
    constructor(myCanvas) {
      // El gestor de hebras
      Physijs.scripts.worker = './physijs/physijs_worker.js'
      // El motor de física de bajo nivel, en el cual se apoya Physijs
      Physijs.scripts.ammo = './ammo.js'
      super();
      
      // Creamos la camara
      this.createCamera();

      // Se crean y añaden luces a la escena
      this.createLights();
  
      // El personaje principal
      this.circuito = new Circuito(this);
      
      // Se establece el valor de la gravedad, negativo, los objetos caen hacia abajo
      this.setGravity(new THREE.Vector3(0, -30, 0));
      
      
      // Raycaster que se usará
      this.raycaster = new THREE.Raycaster();
      
      // Crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
      this.renderer = this.createRenderer(myCanvas);
    }
  
    createRenderer(myCanvas) {
      // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
  
      // Se instancia un Renderer   WebGL
      var renderer = new THREE.WebGLRenderer();
  
      // Se establece un color de fondo en las imágenes que genera el render
    //   renderer.setClearColor(new THREE.Color(0x000000), 1.0);
      requestAnimationFrame(() => this.update());  
      renderer.render( this, this.camera );
  
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
  
    onKeyDown(event) {
      var key = event.which || event.keyCode;
      switch (key) {
        case 72: // La tecla de la  H
          window.alert("Movimiento controlado por WASD.\nApunta con el raton y dispara con el click izquierdo");
          break;
        case 65: // Cursor a la izquierda
          this.prota.left = true;
          break;
        case 87: // Cursor arriba
          this.prota.forward = true;
          break;
        case 68: // Cursor a la derecha
          this.prota.right = true;
          break;
        case 83: // Cursor abajo
          this.prota.backward = true;
          break;
      }
    }
  
    onKeyUp(event) {
      var key = event.which || event.keyCode;
      switch (key) {
        case 65: // Cursor a la izquierda
          this.prota.left = false;
          break;
        case 87: // Cursor arriba
          this.prota.forward = false;
          break;
        case 68: // Cursor a la derecha
          this.prota.right = false;
          break;
        case 83: // Cursor abajo
          this.prota.backward = false;
          break;
      }
    }
  
  
    createCamera() {
		this.camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		this.camera.position.set( 60, 50, 60 );
		this.camera.lookAt( this.position );
		this.add( this.camera );
    }
  
    createLights() {
		this.light = new THREE.DirectionalLight( 0xFFFFFF );
		this.light.position.set( 20, 40, -15 );
		this.light.target.position.copy( this.position );
		this.light.castShadow = true;
		this.light.shadowCameraLeft = -60;
		this.light.shadowCameraTop = -60;
		this.light.shadowCameraRight = 60;
		this.light.shadowCameraBottom = 60;
		this.light.shadowCameraNear = 20;
		this.light.shadowCameraFar = 200;
		this.light.shadowBias = -.0001
		this.light.shadowMapWidth = this.light.shadowMapHeight = 2048;
		this.light.shadowDarkness = .7;
		this.add( this.light );
    }
  
    getCamera() {
      // En principio se devuelve la única cámara que tenemos
      // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
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
      requestAnimationFrame(() => this.update());  
  
    //   // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
    //   this.renderer.render(this, this.getCamera());
  
      //Se actualizan las animaciones con tween
    //   TWEEN.update();

        this.simulate( undefined, 2 );
  
      // Se le pide al motor de física que actualice las figuras según sus leyes
    //   this.simulate();
    }
  }
  
  
  /// La función principal
  $(function () {
  
    // Se crea la escena
    var scene = new MyPhysiScene("#WebGL-output");
  
    // listeners
    // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
    window.addEventListener("resize", () => scene.onWindowResize());
  
    // Se añaden listeners para el teclado y el ratón
    window.addEventListener("keydown", () => scene.onKeyDown(event));
    window.addEventListener("keyup", () => scene.onKeyUp(event));
    window.addEventListener("mousedown", () => scene.disparar(event));
  
    // Finalmente, realizamos el primer renderizado.
    scene.update();
  });