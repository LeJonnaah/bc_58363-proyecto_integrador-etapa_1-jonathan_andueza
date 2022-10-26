
class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || 'inicio';
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
    }

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            if (link.getAttribute('href') === `#/${id}`) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
        });
    }

    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`No se pudo importar el módulo ${moduleUrl}.`);
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();
        
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('main').innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    async start() {
        await this.loadTemplates();
    }
}

const main = new Main();
main.start();

'use strict';

// 1. Variables //

const scrollToTopButton = document.querySelector(".back-to-top-button");
const cartButton = document.querySelector(".main-header__cart");
const cartBackground = document.querySelector(".cart__background");
const cartDropdown = document.querySelector(".cart__dropdown");
const cartXMark = document.querySelector(".cart__xmark");

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
    cartBackground.classList.remove("cart__background--visible");
    cartDropdown.classList.remove("cart__dropdown--visible");
    cartBackground.classList.add("cart__background--inactive");
    cartDropdown.classList.add("cart__dropdown--inactive");
    // remove animation classes after animation is done
    setTimeout(() => {
        cartBackground.classList.remove("cart__background--inactive");
        cartDropdown.classList.remove("cart__dropdown--inactive");
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
        cartDropdown.classList.toggle("cart__dropdown--visible");
        cartBackground.classList.toggle("cart__background--visible");
    } else if (e.target === cartBackground || e.target === cartXMark) {
        closeCartDropdown();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCartDropdown();
    }  
});
