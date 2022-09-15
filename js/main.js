'use strict';

// 1. Variables

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slider__slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const scrollToTopButton = document.querySelector(".back-to-top-button");

// 2. Functions

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

const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
};

window.onscroll = () => scrollFunction();

const topFunction = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.documentElement.scrollTop = 0;
}


// 3. Event Listeners

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

scrollToTopButton.addEventListener("click", topFunction);

// 4. Timers

const nextSlideTimeout = setInterval(() => {
    nextButton.click();
}, 10000);
