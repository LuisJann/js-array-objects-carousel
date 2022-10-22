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


images.forEach((item) =>{
    thisItem = item;
    console.log("item",thisItem.image, thisItem.title, thisItem.text);
    const element = `
             <img class="item-img-large" src="images/${thisItem.image}" alt="">
                <div class="text-container text hidden">
                    <h2>${thisItem.title}</h2>
                    <p>${thisItem.text}</p>
                </div>`
    carousel.innerHTML += element;   
    
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
console.log(smallImgItems);
smallImgItems[0].classList.add("opacity")

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
