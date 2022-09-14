// 1. Variables

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slider__slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const scrollToTopButton = document.querySelector(".back-to-top-button");

// 2. Event Listeners

nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
});

scrollToTopButton.addEventListener("click", topFunction);

// 3. Timers

const nextSlideTimeout = setInterval(() => {
    nextButton.click();
}, 5000);

// const contactUsTimeout = setTimeout(() => {
//     document.getElementById("contact-us-button").click();
// }, 10000);

// 4. Functions

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
}

window.onscroll = function () { scrollFunction() };

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
