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
    // close cart dropdown and remove background with adnimation
    cartBackground.classList.remove("main-header__cart-background--visible");
    cartDropdown.classList.remove("main-header__cart-dropdown--visible");
    cartBackground.classList.add("main-header__cart-background--inactive");
    cartDropdown.classList.add("main-header__cart-dropdown--inactive");
    // remove animation classes after animation is done
    setTimeout(() => {
        cartBackground.classList.remove("main-header__cart-background--inactive");
        cartDropdown.classList.remove("main-header__cart-dropdown--inactive");
    }
    , 500);
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

document.addEventListener("click", e => {
    if (e.target === cartButton) {
        cartDropdown.classList.toggle("main-header__cart-dropdown--visible");
        cartBackground.classList.toggle("main-header__cart-background--visible");
    } else if (e.target === cartBackground || e.target === cartXMark) {
        closeCartDropdown();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCartDropdown();
    }  
});

document.addEventListener("click", e => {
    if (e.target.classList.contains("cart-item__xmark")) {
        e.target.closest('.cart-item__container').remove();
        // itemRemovedFromCart();
        // calculateCartTotalPrice();
    }
});