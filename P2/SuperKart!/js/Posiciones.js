function calcularDistancia(scene){
    
    var posicionMiCoche = scene.coche.coche.mesh.position;
    // console.log(posicionMiCoche);
    var distancia;
    
    for(var i = 0; i < scene.enemigos.length; i++){
        var posicionEnemigo = scene.enemigos[i].box_container.position;
        if(scene.enemigos[i].seccion == 0){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.z - scene.mapa.muro1.physiMesh.position.z), 2));
            scene.enemigos[i].distancia = distancia2;
        }
        if(scene.enemigos[i].seccion == 1){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.z - scene.mapa.muro2.physiMesh.position.z), 2));
            scene.enemigos[i].distancia = distancia2;
        }
        if(scene.enemigos[i].seccion == 2){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.x - scene.mapa.muro4.physiMesh.position.x), 2));
            scene.enemigos[i].distancia = distancia2;
        }

        if(scene.enemigos[i].seccion == 3){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.z - scene.mapa.muro5.physiMesh.position.z), 2));
            scene.enemigos[i].distancia = distancia2;
        }
        
        if(scene.enemigos[i].seccion == 4){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.x - scene.mapa.muro6.physiMesh.position.x), 2));
            scene.enemigos[i].distancia = distancia2;
        }
        if(scene.enemigos[i].seccion == 5){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.z - scene.mapa.muro1.physiMesh.position.z), 2));
            scene.enemigos[i].distancia = distancia2;
            scene.enemigos[i].seccion = 0;
        }

        if(scene.coche.seccion == 0){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.z - scene.mapa.muro1.physiMesh.position.z), 2));
            scene.coche.distancia = distancia;
        }
        
        if(scene.coche.seccion == 1){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.z - scene.mapa.muro2.physiMesh.position.z), 2));
            scene.coche.distancia = distancia;
        }
        
        if(scene.coche.seccion == 2){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.x - scene.mapa.muro4.physiMesh.position.x), 2));
            scene.coche.distancia = distancia;
        }
        
        if(scene.coche.seccion == 3){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.z - scene.mapa.muro5.physiMesh.position.z), 2));
            scene.coche.distancia = distancia;
        }
        
        if(scene.coche.seccion == 4){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.x - scene.mapa.muro6.physiMesh.position.x), 2));
            scene.coche.distancia = distancia;
        }
        if(scene.coche.seccion == 5){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.z - scene.mapa.muro1.physiMesh.position.z), 2));
            scene.coche.distancia = distancia;
            scene.coche.seccion = 0;
        }

    }



    calcularPosicion(scene);
}



function calcularPosicion(scene){

    var array = [];

    for(var i= 0; i < scene.enemigos.length; i++){
        array.push(scene.enemigos[i]);
    }

    
    // scene.enemigos

    array.push(scene.coche);

    array.sort(function(a,b){
            return (b.numsecciones - a.numsecciones);
        }
    );

    array.sort(function(a,b){
        if(a.numsecciones == b.numsecciones)
                return (a.distancia - b.distancia);
        }
    );

    for(var i = 0; i < array.length; i++){
        if(array[i].index == -1){
            scene.coche.posicionCuadro = i+1;
        }
        if(array[i].index == 1){
            // console.log(scene.enemigos[1]);
            scene.enemigos[0].posicionCuadro = i+1;
        }
        if(array[i].index == 2){
            scene.enemigos[1].posicionCuadro = i+1;
        }
        if(array[i].index == 3){
            scene.enemigos[2].posicionCuadro = i+1;
        }
    }

    // console.log(arrayCopy);

    var str = '1. Jugador '+ array[0].index.toString() + '\n2. Jugador '  + array[1].index.toString() + '\n2. Jugador '  +  array[2].index.toString() + '\n2. Jugador '  + array[3].index.toString();
    var res1 = str.replace('Jugador -1', 'Tú');
    var res2 = res1.replace('Jugador 1', 'Jugador verde');
    var res3 = res2.replace('Jugador 2', 'Jugador azul');
    var res4 = res3.replace('Jugador 3', 'Jugador amarillo');


    // <div class="leaderboard" >
    //     <div class="head">
    //         <i class="fas fa-crown"></i>
    //         <h1>RANKING</h1>
    //     </div>
    //     <div class="body">
    //         <ol>
    //             <li>
    //                 <mark>Jerry Wood</mark>
    //                 <small></small>
    //             </li>
    //             <li>
    //                 <mark>Brandon Barnes</mark>
    //                 <small>750</small>
    //             </li>
    //             <li>
    //                 <mark>Raymond Knight</mark>
    //                 <small>684</small>
    //             </li>
    //             <li>
    //                 <mark>Trevor McCormick</mark>
    //                 <small>335</small>
    //             </li>
    //         </ol>
    //     </div>
    // </div>

    var primero = array[0].index.toString();
    var segundo = array[1].index.toString();
    var tercero = array[2].index.toString();
    var cuarto = array[3].index.toString();

    if(primero.includes("-1")){
        console.log('TUU');
        primero = primero.replace('-1', 'Tú');
    }
    else if(primero.includes("1")){
        primero = primero.replace("1", "Jugador verde");
    }
    else if(primero.includes("2")){
        primero = primero.replace("2", "Jugador azul");
    }
    else if(primero.includes("3")){
        primero = primero.replace("3", "Jugador amarillo");
    }

    if(segundo.includes("-1")){
        segundo = segundo.replace("-1", "Tú");
    }
    else if(segundo.includes("1")){
        segundo = segundo.replace("1", "Jugador verde");
    }
    else if(segundo.includes("2")){
        segundo = segundo.replace("2", "Jugador azul");
    }
    else if(segundo.includes("3")){
        segundo = segundo.replace("3", "Jugador amarillo");
    }

    if(tercero.includes("-1")){
        tercero = tercero.replace("-1", "Tú");
    }
    else if(tercero.includes("1")){
        tercero = tercero.replace("1", "Jugador verde");
    }
    else if(tercero.includes("2")){
        tercero = tercero.replace("2", "Jugador azul");
    }
    else if(tercero.includes("3")){
        tercero = tercero.replace("3", "Jugador amarillo");
    }

    if(cuarto.includes("-1")){
        cuarto = cuarto.replace("-1", "Tú");
    }
    else if(cuarto.includes("1")){
        cuarto = cuarto.replace("1", "Jugador verde");
    }
    else if(cuarto.includes("2")){
        cuarto = cuarto.replace("2", "Jugador azul");
    }
    else if(cuarto.includes("3")){
        cuarto = cuarto.replace("3", "Jugador amarillo");
    }

    var html = [];
    html.push('<div class="leaderboard" >');
    html.push('<div class="head">');
    html.push('<i class="fas fa-crown"></i>');
    html.push('<h1>RANKING</h1>');
    html.push('</div>');
    html.push('<div class="body">');
    html.push('<ol>');
    html.push('<li>');
    html.push('<mark>'+ primero +'</mark>');
    html.push('<small></small>');
    html.push('</li>');
    html.push('<li>');
    html.push('<mark>'+ segundo +'</mark>');
    html.push('<small></small>');
    html.push('</li>');
    html.push('<li>');
    html.push('<mark>' + tercero +'</mark>');
    html.push('<small></small>');
    html.push('</li>');
    html.push('<li>');
    html.push('<mark>'+ cuarto +'</mark>');
    html.push('<small></small>');
    html.push('</li>');
    html.push('</ol>');
    html.push('</div>');
    html.push('<h3 style="text-align: center;padding-left: 10%"><a href=".">Volver a jugar</a></h3>');
    html.push('</div>');
    var target = document.getElementById('tabla');
    target.innerHTML = html.join('');

    scene.posiciones = primero;
}
