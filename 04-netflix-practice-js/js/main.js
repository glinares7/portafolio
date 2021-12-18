//? ---------------------------- Elementos donde haremos los cambios  -----------------------

const fila=document.querySelector('.main__contenidocarousel');
const pelicula=document.querySelectorAll('.main__peliculas');

const botonDerecho=document.getElementById('flecha-derecha');
const botonisquierdo=document.getElementById('flecha-isquierda');



//? ---------------------------- EVENTOS   -----------------------



//? ---------------------------- INTERACION DE LAS FLECHAS  -----------------------


botonDerecho.addEventListener('click',  ()=>{
    fila.scrollLeft += fila.offsetWidth;

    const nuevo=document.querySelector('.main__buttonind--activo');
    if(nuevo.nextSibling){
        nuevo.nextSibling.classList.add('main__buttonind--activo');
        nuevo.classList.remove('main__buttonind--activo')
    }

    
})


botonisquierdo.addEventListener('click',  ()=>{
    fila.scrollLeft -= fila.offsetWidth;

    const nuevo=document.querySelector('.main__buttonind--activo');
    if(nuevo.previousSibling){
        nuevo.previousSibling.classList.add('main__buttonind--activo');
        nuevo.classList.remove('main__buttonind--activo')
    }
})


//? ---------------------------- CREACION DE LOS BOTONES INDICADORES  -----------------------
const cantidad= Math.ceil(pelicula.length/5);

for (let i = 0; i <cantidad; i++) {
    const boton=document.createElement('BUTTON');
    if(i===0){
        boton.classList.add('main__buttonind--activo')
    } 
    document.querySelector('.main__indicadores').appendChild(boton).classList.add('main__buttonind')
    
    boton.addEventListener('click',(e)=>{
            fila.scrollLeft = i * fila.offsetWidth
      document.querySelector('.main__buttonind--activo').classList.remove('main__buttonind--activo')
      e.target.classList.add('main__buttonind--activo')
    })
    
}


//? ---------------------------- EXPANSION DE CASA IMAGEN - PELUCLA   -----------------------

pelicula.forEach(element => {
   element.addEventListener('mouseenter',(e)=>{
    //    console.log(e.target.firstElementChild.firstElementChild.attributes[1].ownerElement.nextSibling.data);
    setTimeout(() => {
        element.classList.add('main__peliculahover')
        
    }, 200);
    element.addEventListener('mouseleave',(e)=>{
        // const imag=e.currentTarget;
      element.classList.remove('main__peliculahover')
        })  
        
    })   

});

//? ---------------------------- MOVER SCROLL SIDEBAR  -----------------------

const cantPeliculas=Math.ceil(pelicula.length/5);


//? ---------------------------- mod  -----------------------


let maxScrollLeft=fila.scrollWidth -fila.clientWidth;
let intervalo=null;

let step=10;

    const start= () =>{
        
        intervalo=setInterval(() => {

        fila.scrollLeft =  fila.scrollLeft + step;
        

            // 4774
        // 3637
    

        if(fila.scrollLeft=== maxScrollLeft){
            step = -15;

     //? ---------------------------- QUITAR EL ELEMENTO ACTIVO AL FINAL DE LA FILA  -----------------------  
            document.querySelector('.main__buttonind--activo').classList.remove('main__buttonind--activo')


        }else if(fila.scrollLeft===0){
            step = 10;


        }


    }, 100);

};



const stop= ()=>{
    clearInterval(intervalo);
}


//? ---------------------------- MOV-SCROLL -BARRA -----------------------

const nextE=()=>{

    const nuevo2=document.querySelector('.main__buttonind--activo');
    if(nuevo2.nextSibling){
        nuevo2.nextSibling.classList.add('main__buttonind--activo');
        nuevo2.classList.remove('main__buttonind--activo')
    }
}
const previousE=()=>{

    const nuevo1=document.querySelector('.main__buttonind--activo');
    if(nuevo1.previousSibling){
        nuevo1.previousSibling.classList.add('main__buttonind--activo');
        nuevo1.classList.remove('main__buttonind--activo')
    }
}


fila.addEventListener('scroll',()=>{

    
    
/*     for (let i = 0; i < cantPeliculas; i++) {
        
        if(i==0){
            if(fila.scrollLeft == (0*fila.offsetWidth)){
                console.log("primernivel");

                //? ---------------------------- ELEMENTO QUE SE PINTA  AL INICIO DE LA FILA DE RETORNO  -----------------------

            document.querySelector('.main__buttonind').classList.add('main__buttonind--activo')
               continue;

            }
        }
        if(fila.scrollLeft == (i*fila.offsetWidth)){
            
            nextE();
            
         
            }

        
    } */

    if(fila.scrollLeft == (0*fila.offsetWidth)){
        console.log("primernivel");
    }
    if(fila.scrollLeft == (1*fila.offsetWidth)){
            
        nextE();
        
     
        }
    if(fila.scrollLeft == (2*fila.offsetWidth)){
            
        nextE();
        
     
        }
    if(fila.scrollLeft == (3*fila.offsetWidth)){
            
        nextE();
        
     
        }
})



//? ---------------------------- INICIALIZA LAS IMAGENES AL CARGAR -----------------------

start();



fila.addEventListener('mouseout',()=>{
    start();
})

fila.addEventListener('mouseover',()=>{
    stop();
})


//? ---------------------------- INDICADORES EN LA SECCION DE BARRITAS -----------------------

document.querySelector('.main__indicadores').addEventListener('mouseover',()=>{
    stop();
})
document.querySelector('.main__indicadores').addEventListener('mouseout',()=>{
    start();
})


//? ---------------------------- FLECHAS ISQUIERDA Y DERECHA  -----------------------

botonDerecho.addEventListener('mouseover',()=>{
    stop();
})
botonDerecho.addEventListener('mouseout',()=>{
    start();
})
botonisquierdo.addEventListener('mouseover',()=>{
    stop();
})
botonisquierdo.addEventListener('mouseout',()=>{
    start();
})



