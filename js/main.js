'use strict';

// 1. Variables //

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slider__slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const scrollToTopButton = document.querySelector(".back-to-top-button");
const cartButton = document.querySelector(".main-header__cart");

// 2. Functions //

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

// 3. Event Listeners //

window.addEventListener("scroll", () => {
    const navBar = document.querySelector(".main-header");
    if (window.scrollY > 0) {
        navBar.style.position = "fixed";
    } else {
        navBar.style.position = "relative";
    }
});

scrollToTopButton.addEventListener("click", topFunction);

cartButton.addEventListener("click", () => {
    console.log("cart button clicked");
    const cartDropdown = document.querySelector(".main-header__cart-dropdown");
    cartDropdown.classList.toggle("main-header__cart-dropdown--visible");
});

try {
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
} catch (error) {
    console.error(error);
}

// 4. Timers //

try {
    const nextSlideTimeout = setInterval(() => {
    nextButton.click();
}, 10000);
} catch (error) {
    console.error(error);
}
