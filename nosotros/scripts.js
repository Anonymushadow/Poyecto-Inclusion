"use strict"
let btnMenu = document.querySelector(".btn__menu");
let menuResponsive = document.querySelector(".menu__responsive");
let link = document.querySelectorAll(".link");
let texto = document.getElementById("texto");
let resultado;
var audio;
let btnSwitch = document.querySelectorAll('.switch');
let color = document.querySelector(":root");
let aside = document.querySelector(".aside");
let header = document.querySelector(".header");
let voice = false;
let asistente = document.querySelectorAll(".asistente");
let btnMenuAjuste = document.querySelector(".aj");
let menuAjustes = document.querySelector(".menu__ajustes");
let cerrarMenu = document.querySelector(".cerrar");
let pregunta = document.querySelectorAll(".pregunta");
let respuesta = document.querySelectorAll(".respuesta");
let introd = false;

btnMenuAjuste.addEventListener("click", ()=>{
        menuAjustes.classList.add("show");
})

cerrarMenu.addEventListener("click", ()=>{
        menuAjustes.classList.remove("show");
})

btnMenu.addEventListener("click", ()=>{
    menuResponsive.classList.toggle("show");
})




 for (let i = 0; i < link.length; i++) {
     link[i].addEventListener("click", ()=> {
        menuResponsive.classList.toggle("show");
     })
 }


 for (let i = 0; i < pregunta.length; i++) {
     pregunta[i].addEventListener("click", ()=> {
        respuesta[i].classList.toggle("show");
     })
 }









if(localStorage.getItem('active') === 'true'){
    dark();
    for (let i = 0; i < btnSwitch.length; i++) {
        btnSwitch[i].classList.add('active');
    }
} else {
    light();
}

function light() {
    color.style.setProperty('--celeste', '#a4e1f3');
    color.style.setProperty('--blanco', '#fff');
    color.style.setProperty('--negro', '#000');
    color.style.setProperty('--hover', '#fff');
    header.style.setProperty('background', ' url("ojo.png") no-repeat top center');

}

function dark() {
    color.style.setProperty('--celeste', '#222');
    color.style.setProperty('--blanco', '#000');
    color.style.setProperty('--negro', '#a4e1f3');
    color.style.setProperty('--hover', '#fff');
    header.style.setProperty('background', ' url("ojoDark.png") no-repeat top center black');
} 

for (let i = 0; i < btnSwitch.length; i++) {
btnSwitch[i].addEventListener('click', () => {
    if(btnSwitch[i].classList.contains('active')) {
        light();
        btnSwitch[i].classList.remove('active');
    }else{
        dark();
        btnSwitch[i].classList.add('active');
    }

    if(btnSwitch[i].classList.contains('active')){
        localStorage.setItem('active', 'true');
    } else {
        localStorage.setItem('active', 'false');
    }
})}




for (let i = 0; i < asistente.length; i++) {
 asistente[i].addEventListener("click", ()=> {

    voice = true;
    intro();


        var rec;
        if (!("webkitSpeechRecognition" in window)) {
            alert("disculpas, no puedes usar la API");
        } else {
            rec = new webkitSpeechRecognition();
            rec.lang = "es-AR";
            rec.continuous = false;
            rec.interim = true;
            rec.addEventListener("result", iniciar);
            rec.start();  
            rec.onend = function() {
               rec.start();
             };
        }
    })}

function iniciar(event){
    for (let i = event.resultIndex; i < event.results.length; i++){
         texto.textContent = event.results[i][0].transcript;
    }
    audio = texto.textContent;
    charla();
}


function charla(){
    audio = audio.toLowerCase();
    console.log(audio)
    switch(audio){
        case "instrucciones":
        instrucciones();
        break;
        case "abrir youtube":
        decir("abriendo youtube");
        window.open("https://www.youtube.com/?gl=AR&hl=es-419");
        break;
        case "ir a inicio":
        decir("abriendo inicio");
        window.open("../index.html");
        break;
        case "ir a informacion":
        decir("abriendo informacion");
        window.open("../informacion/index.html");
        break;
        case "ir a videos":
        decir("abriendo videos");
        window.open("../videos/index.html");
        break;
        case "ir a preguntas frecuentes":
        decir("abriendo preguntas frecuentes");
        window.open("../preguntasFrecuentes/index.html");
        break;
        case "leer quienes somos":
        decir(document.querySelector("#quienesSomos").textContent);
        break;
        case "leer cuales son nuestros objetivos":
        decir(document.querySelector("#objetivos").textContent);
        break;
        case "leer ventajas de trabajar con nosotros":
        decir(document.querySelector("#ventajas").textContent);
        break;
        case "leer por que nosotros":
        decir(document.querySelector("#porqueNosotros").textContent);
        break;
        case "leer contactanos":
        decir(document.querySelector("#contactanos").textContent);
        break;
        default:
        decir("no te escuché");
    }
    }



function decir(texto){
    if (voice) {
        speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
    }else{
        alert("no tengo permiso de hablar");
    }
}

function intro(){
    let introduccion = decir("este es el apartado de nosotros, los textos disponibles son los siguientes, quienes somos, cuales son nuestros objetivos, ventajas de trabajar con nosotros, por que nosotros, contactanos"); 
}


function instrucciones(){
    let instruccion = decir("Para leer un texto, tenes que decir leer, mas el titulo del texto, para ir hasta un apartado, tenes que decir ir, mas el nombre del apartado"); 
}