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
        case "ir a nosotros":
        decir("abriendo nosotros");
        window.open("../nosotros/index.html");
        break;
        case "leer por que piden dinero":
        decir(document.querySelector("#dinero").textContent);
        break;
        case "leer el dinero de verdad llega a la gente que necesita":
        decir(document.querySelector("#dineroLlega").textContent);
        break;
        case "leer por qué deben los donantes confiar en su organización":
        decir(document.querySelector("#confianza").textContent);
        break;
        case "leer qué puede ofrecer su organización a cambio de una donación":
        decir(document.querySelector("#ofrecer").textContent);
        break;
        case "leer qué ha logrado su organización hasta la fecha":
        decir(document.querySelector("#logros").textContent);
        break;
        case "leer por qué son importantes sus objetivos":
        decir(document.querySelector("#importantes").textContent);
        break;
        case "leer cuánto dinero necesitan de los donantes para lograr sus objetivos":
        decir(document.querySelector("#donaciones").textContent);
        break;
        case "leer cómo pueden los donantes ayudar aparte de hacer contribuciones financieras":
        decir(document.querySelector("#ayudas").textContent);
        break;
        case "leer quién está detrás de Fundación":
        decir(document.querySelector("#detras").textContent);
        break;
        case "leer si alguien tiene una queja, hay alguna persona de tu organización designada para atenderla":
        decir(document.querySelector("#quejas").textContent);
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
    let introduccion = decir("este es el apartado de preguntas frecuentes, aca tenes los siguientes texos. ¿Por que piden dinero?, ¿el dinero de verdad llega a la gente que necesita?, ¿Por qué deben los donantes confiar en su organización?, ¿Qué puede ofrecer su organización a cambio de una donación?, ¿Qué ha logrado su organización hasta la fecha?, ¿Por qué son importantes sus objetivos?, ¿Cuánto dinero necesitan de los donantes para lograr sus objetivos?, ¿Cómo pueden los donantes ayudar aparte de hacer contribuciones financieras?, ¿Quién está detrás de Fundación?, ¿Si alguien tiene una queja, hay alguna persona de tu organización designada para atenderla?"); 
}


function instrucciones(){
    let instruccion = decir("Para leer un texto, tenes que decir leer, mas el titulo del texto, para ir hasta un apartado, tenes que decir ir, mas el nombre del apartado"); 
}