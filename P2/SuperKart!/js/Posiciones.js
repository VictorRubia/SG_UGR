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

    calcularPosicion(scene);
}



function calcularPosicion(scene){

    // for();

    // let arrayCopy = Array.from(scene.enemigos);

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
    //     if(array[i].index == 1){
    //         scene.enemigos[1].posicionCuadro = i+1;
    //     }
    //     if(array[i].index == 2){
    //         scene.enemigos[2].posicionCuadro = i+1;
    //     }
    //     if(array[i].index == 3){
    //         scene.enemigos[3].posicionCuadro = i+1;
    //     }
    // }
    }

    // console.log(arrayCopy);

    scene.posiciones = array[0].index.toString() + array[1].index.toString() + array[2].index.toString() + array[3].index.toString();

}
