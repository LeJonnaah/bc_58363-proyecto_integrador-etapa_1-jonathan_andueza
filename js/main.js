'use strict';

// 1. Variables //

const scrollToTopButton = document.querySelector(".back-to-top-button");
const cartButton = document.querySelector(".main-header__cart");
const cartBackground = document.querySelector(".main-header__cart-background");
const cartDropdown = document.querySelector(".main-header__cart-dropdown");
const cartXMark = document.querySelector(".main-header__cart-xmark");
const cartItemXMark = document.querySelectorAll(".main-header__cart-item-delete");

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

const closeCartDropdown = () => {
    cartDropdown.classList.remove("main-header__cart-dropdown--visible");
    cartBackground.classList.remove("main-header__cart-background--visible");
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
    cartDropdown.classList.toggle("main-header__cart-dropdown--visible");
    cartBackground.classList.toggle("main-header__cart-background--visible");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCartDropdown();
    }  
});

document.addEventListener("click", (e) => {
    if (e.target === cartBackground) {
        closeCartDropdown();
    } else if (e.target === cartXMark) {
        closeCartDropdown();
    }
});

cartItemXMark.forEach((xMark) => {
    xMark.addEventListener("click", () => {
        xMark.parentElement.remove();
    });
});