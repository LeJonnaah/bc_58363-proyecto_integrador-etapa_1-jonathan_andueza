class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text()).catch(e => console.error(e)); ////////////
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
            const { default: module } = await import(moduleUrl);
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
const background = document.querySelector(".background");
const cartDropdown = document.querySelector(".cart__dropdown");
const cartXMark = document.querySelector(".cart__xmark");
const mainFooter = document.querySelector(".main-footer");
const currentYearFooter = document.querySelector("#current-year");
currentYearFooter.innerHTML = new Date().getFullYear();

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
    cartDropdown.classList.add("cart__dropdown--transform-out--bottom");
    setTimeout(() => {
        cartDropdown.classList.add("cart__dropdown--transform-out");
    }, 200);
    setTimeout(() => {
        cartDropdown.classList.remove("cart__dropdown--transform-out--bottom");
        background.classList.remove("background--visible");
        cartDropdown.classList.remove("cart__dropdown--visible");
        cartDropdown.classList.remove("cart__dropdown--transform-out");
    }, 300);
}

const sendData = e => {
    const searchSection = document.querySelector(".main-header__search-section");
    // let match = (e.target.value).match(/^[a-zA-Z0-9\s]*/);
    // let match2 = (e.target.value).match(/\S*/);
    // if (match2[0] === e.target.value) {
    //     searchSection.innerHTML = '';
    //     return
    // }
    // if (match[0] === e.target.value) {

    fetch("getProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: e.value })
    }).then(r => r.json()).then(data => {
        let payload = data.payload;
        console.log(payload);
        if (payload.length === 0) {
            searchSection.innerHTML = `<p class="main-header__search-section__no-results">No se encontraron resultados.</p>`;
            return;
        }
        searchSection.innerHTML = '';
        payload.forEach(product => {
            searchSection.innerHTML += `
                <a href="/product/${product.id}" class="main-header__search-section__product">
                    <img src="${product.image}" alt="${product.title}" class="main-header__search-section__product__image">
                    <p class="main-header__search-section__product__name">${product.name}</p>
                    <p class="main-header__search-section__product__price">$${product.price}</p>
                </a>
                `;
        });
    }).catch(e => console.error(e));

    return;
}
// }



// 3. Event Listeners //


scrollToTopButton.addEventListener("click", topFunction);

document.addEventListener("click", e => {
    if (e.target === cartButton) {
        background.classList.toggle("background--visible");
        cartDropdown.classList.toggle("cart__dropdown--visible");
    } else if (e.target === background || e.target === cartXMark) {
        const detailedProduct = document.querySelector(".detailed-product");
        if (detailedProduct) {
            detailedProduct.remove();
        }
        closeCartDropdown();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCartDropdown();
    }
});

document.addEventListener("click", e => {
    if (e.target.classList.contains("main-nav__link")) {
        const mainNavToggle = document.querySelector(".main-nav-toggle");
        mainNavToggle.checked = false;
    }
});

document.addEventListener("keydown", e => {
    if (e.target.classList.contains("main-header__search-form-input")) {
        if (e.key === "Enter") {
            sendData(e.target);
        }
    }
});