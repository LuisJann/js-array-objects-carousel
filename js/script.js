/*Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata. Attenzione! Le immagini nello screenshot sono differenti da quelli  che vi invio, ma il layout non cambia.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo
 l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, 
la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
 */

const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];


const carousel = document.querySelector(".img-container");
const smallCarousel = document.querySelector(".img-small-container");

//estraiamo e stampiamo gli elemnti dell'array 
images.forEach((item) =>{
    thisItem = item;
    console.log("item",thisItem.image, thisItem.title, thisItem.text);
//stampiamo le immagini principali
    const element = `
             <img class="item-img-large" src="images/${thisItem.image}" alt="">
                <div class="text-container text hidden">
                    <h2>${thisItem.title}</h2>
                    <p>${thisItem.text}</p>
                </div>`
    carousel.innerHTML += element;   
//stampiamo le miniature
    const smallElement = `
                <div class="item">
                    <img class="item-img-small" src="images/${thisItem.image}" alt="">
                </div> `
    smallCarousel.innerHTML += smallElement;
}); 

const imgItems = document.getElementsByClassName("item-img-large");
let imgPosition = 0;
imgItems[0].classList.add("active");

const textItem = document.getElementsByClassName("text-container");
textItem[0].classList.remove("hidden");

const smallImgItems = document.getElementsByClassName("item-img-small");
console.log(smallImgItems, "itemimg");
smallImgItems[0].classList.add("opacity")

//avanziamo di una immagine premendo la freccia "arrow-right" aggiornando anche miniatura e testo immagine
const arrowRight = document.querySelector(".arrow-right");
console.log(arrowRight);
arrowRight.addEventListener("click", function() {
    if(imgPosition < images.length-1){
        imgItems[imgPosition].classList.remove("active");
        console.log(imgItems[imgPosition],"prima", imgPosition);
        textItem[imgPosition].classList.add("hidden");
        console.log(textItem[imgPosition], "prima");
        smallImgItems[imgPosition].classList.remove("opacity");

        imgPosition++;


        imgItems[imgPosition].classList.add("active");
        console.log(imgItems[imgPosition],"dopo", imgPosition);
        textItem[imgPosition].classList.remove("hidden");
        console.log(textItem[imgPosition], "dopo",imgPosition);
        smallImgItems[imgPosition].classList.add("opacity");
    } else if (imgPosition = images.length-1){
        imgItems[imgPosition].classList.remove("active");
        textItem[imgPosition].classList.add("hidden");
        smallImgItems[imgPosition].classList.remove("opacity");

        imgPosition = 0;

        imgItems[imgPosition].classList.add("active");
        textItem[imgPosition].classList.remove("hidden");
        smallImgItems[imgPosition].classList.add("opacity");
    }
})

//arretriamo di una immagine premendo la freccia "arrow-left" aggiornando anche miniatura e testo immagine
const leftArrow = document.querySelector(".arrow-left");
leftArrow.addEventListener("click", function(){
    if(imgPosition > 0){
        imgItems[imgPosition].classList.remove("active");
        textItem[imgPosition].classList.add("hidden");
        smallImgItems[imgPosition].classList.remove("opacity");

        imgPosition --;

        imgItems[imgPosition].classList.add("active");
        textItem[imgPosition].classList.remove("hidden");
        smallImgItems[imgPosition].classList.add("opacity");
    } else if (imgPosition <= 0){
        imgItems[imgPosition].classList.remove("active");
        textItem[imgPosition].classList.add("hidden");
        smallImgItems[imgPosition].classList.remove("opacity");

        imgPosition = images.length-1;

        imgItems[imgPosition].classList.add("active");
        textItem[imgPosition].classList.remove("hidden");
        smallImgItems[imgPosition].classList.add("opacity");
    }
})

//aggiungamo la possibilità di saltare da una immagine all'altra cliccando direttamente nella miniatura 
const clickImage = document.querySelector(".item-img-small");
console.log(clickImage);
for (let i = 0; i < images.length; i++) {
    const thisThumb = smallImgItems[i];
    thisThumb.addEventListener("click", function() {
        // Cancellare active da slider item e dal thumb
        imgItems[imgPosition].classList.remove("active");
        smallImgItems[imgPosition].classList.remove("opacity");
        textItem[imgPosition].classList.add("hidden");

        // Aggiornare la posizione attuale
        imgPosition = i;

        // Aggiungere active alla nuova posizione dell'immagine e del thumb
        imgItems[imgPosition].classList.add("active");
        smallImgItems[imgPosition].classList.add("opacity");
        textItem[imgPosition].classList.remove("hidden");
    });
}


// aggiungiamo un bottone che scorre ogmi 2 secondi in automatico dalla prima all'ultima immagine in loop 
const timerBtnStart = document.querySelector(".btn-timer-start");
timerBtnStart.addEventListener("click", function(){
    const myTimer = setInterval(() => {
        if(imgPosition < images.length-1){
            imgItems[imgPosition].classList.remove("active");
            console.log(imgItems[imgPosition],"prima", imgPosition);
            textItem[imgPosition].classList.add("hidden");
            console.log(textItem[imgPosition], "prima");
            smallImgItems[imgPosition].classList.remove("opacity");
    
            imgPosition++;
    
    
            imgItems[imgPosition].classList.add("active");
            console.log(imgItems[imgPosition],"dopo", imgPosition);
            textItem[imgPosition].classList.remove("hidden");
            console.log(textItem[imgPosition], "dopo",imgPosition);
            smallImgItems[imgPosition].classList.add("opacity");
        } else if (imgPosition = images.length-1){
            imgItems[imgPosition].classList.remove("active");
            textItem[imgPosition].classList.add("hidden");
            smallImgItems[imgPosition].classList.remove("opacity");
    
            imgPosition = 0;
    
            imgItems[imgPosition].classList.add("active");
            textItem[imgPosition].classList.remove("hidden");
            smallImgItems[imgPosition].classList.add("opacity");
        }
    }, 2000);
    const timerBtnStop = document.querySelector(".btn-timer-stop");
    console.log(timerBtnStop);
    timerBtnStop.addEventListener("click", function(){
        clearInterval(myTimer);
    });
});

// aggiungiamo un bottone che scorre ogmi 2 secondi in automatico dall'ultima alla prima immagine in loop 
const timerBtnReverse = document.querySelector(".btn-timer-reverse");
console.log(timerBtnReverse);
timerBtnReverse.addEventListener("click", function(){
    const myTimerReverse = setInterval(() => {
        if(imgPosition > 0){
            imgItems[imgPosition].classList.remove("active");
            textItem[imgPosition].classList.add("hidden");
            smallImgItems[imgPosition].classList.remove("opacity");
    
            imgPosition --;
    
            imgItems[imgPosition].classList.add("active");
            textItem[imgPosition].classList.remove("hidden");
            smallImgItems[imgPosition].classList.add("opacity");
        } else if (imgPosition <= 0){
            imgItems[imgPosition].classList.remove("active");
            textItem[imgPosition].classList.add("hidden");
            smallImgItems[imgPosition].classList.remove("opacity");
    
            imgPosition = images.length-1;
    
            imgItems[imgPosition].classList.add("active");
            textItem[imgPosition].classList.remove("hidden");
            smallImgItems[imgPosition].classList.add("opacity");
        }
    }, 2000);
    const timerBtnStopReverse = document.querySelector(".btn-timer-stop");
    console.log(timerBtnStopReverse);
    timerBtnStopReverse.addEventListener("click", function(){
        clearInterval(myTimerReverse);
    });
});