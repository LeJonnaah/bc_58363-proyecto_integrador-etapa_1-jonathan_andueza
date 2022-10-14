console.warn('🆗: Módulo PageInicio cargado.');

class PageInicio {

    static async init() {
        console.log('PageInicio.init()');
        console.log('*');
        console.log('**');
        console.log('***');
    }
}

export default PageInicio;

"use strict";

// 1. Variables //

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slider__slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const card = document.querySelectorAll(".card");
const cardButton = document.querySelectorAll(".card__button");
const cardPrice = document.querySelectorAll(".card__price");
const cardTitle = document.querySelectorAll(".card__title");
const cartTotalPrice = document.querySelector(".main-header__cart-price");
const cartItemXMark = document.querySelectorAll(".main-header__cart-item-delete");

const products = [
    {index: 1, subtitle:'Oferta', title:'Peluche Legosi', subtitle:'Beastars', price: 22000, img: 'https://images.unsplash.com/photo-1581085851119-8b8b8b2b2c1a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FmZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80', description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'}
];


const cartTotal = document.getElementById(".main-header__cart-text");

// 2. Functions //

function createCartItem (product) {
    
    const cartItem = document.createElement("div");
    cartItem.classList.add("main-header__cart-item");
    cartItem.innerHTML = `
        <div class="main-header__cart-item-img">

        </div>
        <div class="main-header__cart-item-text">
            <p class="main-header__cart-item-title">${product.title}</p>
            <p class="main-header__cart-item-price">${product.price}</p>
        </div>
        <div class="main-header__cart-item-delete">
            <i class="fas fa-times"></i>
        </div>
        <div class="form-container__separator"></div>
    `;
    cartDropdown.appendChild(cartItem);
}


// 3. Event Listeners //

slidesContainer.addEventListener("scroll", () => {
    const slideWidth = slide.clientWidth;
    const slideCount = slidesContainer.childElementCount;
    const scrollPosition = slidesContainer.scrollLeft;
    const maxScrollPosition = slideWidth * (slideCount - 1);

    if (scrollPosition === maxScrollPosition) {
        setTimeout(() => {
            slidesContainer.scrollLeft = 0;
        }, 10000);
    }
});

nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;

    if (slidesContainer.scrollLeft === slideWidth * (slidesContainer.childElementCount - 1)) {
        slidesContainer.scrollLeft = 0;
    }
});


prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;

    if (slidesContainer.scrollLeft === 0) {
        slidesContainer.scrollLeft = slideWidth * (slidesContainer.childElementCount - 1);
    }
});


card.forEach((card) => {
    card.addEventListener("click", (e) => {
        const cardButton = e.target.closest(".card__button");
        if (!cardButton) return;
            const card = cardButton.closest(".card");
            const cardTitle = card.querySelector(".card__title").textContent;
            const cardPrice = card.querySelector(".card__price").textContent;

            const product = {
                title: cardTitle,
                price: cardPrice,
            };
            
            console.log(product);
            createCartItem(product);
    });
});


// 4. Timers //

const nextSlideTimeout = setInterval(() => {
    nextButton.click();
}, 10000);
