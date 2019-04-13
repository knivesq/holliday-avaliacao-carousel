import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app/app";


let containerPrincipal = document.querySelector(".conteiner-principal");
let placeBefore = document.getElementById("barraNewsletter");
let carouselContainer = document.createElement('div');
carouselContainer.id = "avaliacao-carousel"

containerPrincipal.insertBefore(carouselContainer, placeBefore);

let locationCarousel = window.location
let supposedLocation = "https://atacado.hollidaystore.com.br"

if (locationCarousel.href == "http://localhost:8080/") {
    ReactDOM.render(<App />, document.getElementById('avaliacao-carousel'));
} else {
    if (carouselContainer) {
        ReactDOM.render(<App />, document.getElementById('avaliacao-carousel'));
    }
}


