// 1. Variables

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slider__slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

// 2. Event Listeners

nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
});

// 3. Timers

const nextSlideTimeout = setInterval(() => {
    nextButton.click();
}, 5000);

// const contactUsTimeout = setTimeout(() => {
//     document.getElementById("contact-us-button").click();
// }, 10000);
