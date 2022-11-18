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

    async postCartItemsToDB() {
        const cartItems = await this.ajax('http://localhost:8080/api/cartItems', 'post');
        console.log(cartItems);
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
const searchButton = document.querySelector(".main-header__search-form");
const searchIcon = document.querySelector(".main-header__search-icon");
const searchInput = document.querySelector(".main-header__search-form-input");
const searchFormIcon = document.querySelector(".main-header__search-form-icon");
const renderSearchSection = document.querySelector(".main-header__render-search");
const searchSection = document.querySelector(".main-header__search-section");
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

const closeSearchContainer = () => {
    searchSection.classList.add("main-header__search-section--transform-out--bottom");
    setTimeout(() => {
        searchSection.classList.add("main-header__search-section--transform-out");
    }, 200);
    setTimeout(() => {
        searchSection.classList.remove("main-header__search-section--transform-out--bottom");
        background.classList.remove("background--visible");
        searchSection.classList.remove("main-header__search-section--visible");
        searchSection.classList.remove("main-header__search-section--transform-out");
    }, 300);
}

const sendData = e => {
    fetch("getProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: e.value })
    }).then(r => r.json()).then(data => {
        let payload = data.payload;
        console.log(payload);
        if (payload.length === 0) {
            renderSearchSection.innerHTML = `<p class="main-header__search-no-results">No se encontraron resultados.</p>`;
            return;
        }
        renderSearchSection.innerHTML = '';
        payload.forEach(product => {
            renderSearchSection.innerHTML += `
            <div class="card">
            <div class="card__id">${product.id}</div>
            <div class="card__category">${product.category}</div>
            <div class="card__header">
                <div class="card__separator"></div>
                <h4 class="card__header-text">${product.header}</h4>
            </div>
            <div class="card__body">
                <div class="card__half card__half--fb">
                    <div class="card__featured-text">
                        <h3 class="card__title">${product.title}</h3>
                        <p class="card__brand">${product.brand}</p>
                        <p class="card__price">&#36; ${product.price}</p>
                    </div>
                    <div class="card__image-container">
                        <img class="card__image"
                            src="${product.image}"
                            alt="Imagen del producto" />
                    </div>
                </div>
                <div class="card__half">
                    <div class="card__description">
                        <p>${product.shortDescription}</p>
                        <p class="card__long-description">${product.longDescription}</p>
                    </div>
                    <i class="card__age-fa fa fa-pen"></i>
                    <span class="card__age">¡De ${product.minAge} a ${product.maxAge} años!</span>
                </div>
            </div>
            <div class="card__footer">
                <div class="card__action">
                    <button class="button button--card">Agregar al carrito</button>
                </div>
            </div>
        </div>`;
        });
    }).catch(e => console.error(e));
    return;
}

// 3. Event Listeners //

scrollToTopButton.addEventListener("click", topFunction);

document.addEventListener("click", e => {
    if (e.target === cartButton) {
        if (document.querySelector(".background--visible")) {
            return
        }
        background.classList.toggle("background--visible");
        cartDropdown.classList.toggle("cart__dropdown--visible");
    } else if (e.target === background || e.target === cartXMark) {
        if (searchSection.classList.contains("main-header__search-section--visible")) {
            closeSearchContainer();
            return
        }
        const detailedProduct = document.querySelector(".detailed-product");
        if (detailedProduct) {
            detailedProduct.remove();
        }
        closeCartDropdown();
    }
});

document.addEventListener("click", e => {
    if (e.target === document.querySelector(".main-header__search-xmark")) {
        closeSearchContainer();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCartDropdown();
        if (searchSection.classList.contains("main-header__search-section--visible")) {
            searchSection.classList.remove("main-header__search-section--visible");
        }
    }
});

document.addEventListener("click", e => {
    if (e.target.classList.contains("main-nav__link")) {
        const mainNavToggle = document.querySelector(".main-nav-toggle");
        mainNavToggle.checked = false;
    }
});

document.addEventListener("click", e => {
    if (e.target === searchIcon) {
        background.classList.toggle("background--visible");
        searchSection.classList.toggle("main-header__search-section--visible");
        searchInput.focus();
    }
});

document.addEventListener("keydown", e => {
    if (e.target.classList.contains("main-header__search-form-input")) {
        if (e.key === "Enter") {
            if (e.target.value === "") {
                return;
            }
            sendData(e.target);
        }
    }
});

document.addEventListener("click", e => {
    if (e.target.classList.contains("main-header__search-form-faicon")) {
        if (e.target.value === "") {
            return;
        }
        sendData(e.target.parentElement.parentElement.querySelector(".main-header__search-form-input"));
    }
});

document.addEventListener("click", e => {
    if (e.target === searchButton) {
        if (searchSection.classList.contains("main-header__search-section--visible")) {
            background.classList.remove("background--visible");
            searchSection.classList.remove("main-header__search-section--visible");
        } else {
            searchSection.classList.add("main-header__search-section--visible");
            background.classList.add("background--visible");
            searchInput.focus();
        }
    }
});

document.addEventListener("click", e => {
    if (e.target === document.querySelector(".button--float-right")) {
        const cartItems = document.querySelectorAll(".cart-item");
        const cartItemsArray = Array.from(cartItems);
        cartItemsArray.forEach(item => {
            const id = item.querySelector(".cart-item__id").textContent;
            const quantity = item.querySelector(".cart-item__quantity-input").value;
            const price = item.querySelector(".cart-item__price").textContent;
            const data = {
                id,
                quantity,
                price
            };
            fetch("http://localhost:8080/api/cartItems", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(json => console.log(json));
            cartItemsArray.forEach(item => item.remove());
            document.querySelector(".cart__price").textContent = "$ 0";
            closeCartDropdown();
        });
    }
});