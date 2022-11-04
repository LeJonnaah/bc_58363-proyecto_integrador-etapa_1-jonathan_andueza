import productController from '/js/controllers/product.js';
console.warn('🆗: Módulo PageInicio cargado.');

class PageInicio {

    "use strict";

    static async renderTemplateCards(products) {
        const textoToRender = await fetch('/templates/inicio.hbs').then(r => r.text());
        const template = Handlebars.compile(textoToRender);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
    }
    static async init() {
        console.log('PageInicio.init()');

        // 1. Variables //

        const slidesContainer = document.getElementById("slides-container");
        const slide = document.querySelector(".slider__slide");
        const prevButton = document.getElementById("slide-arrow-prev");
        const nextButton = document.getElementById("slide-arrow-next");
        const cartTotalPrice = document.querySelector(".cart__price");
        const cartDropdown = document.querySelector(".cart__dropdown");

        // 2. Functions //

        const calculateCartTotalPrice = () => {
            const cartItems = document.querySelectorAll(".cart-item__container");
            let totalPrice = 0;
            cartItems.forEach(item => {
                const itemPrice = item.querySelector(".cart-item__price").innerText;
                const itemQuantity = item.querySelector(".cart-item__quantity-input").value;
                const itemPriceNumber = Number(itemPrice.replace("$", ""));
                totalPrice += itemPriceNumber * itemQuantity;
            });
            cartTotalPrice.innerText = `$${totalPrice}`;
        };

        const calculateItemSubtotalPrice = () => {
            const cartItem = document.querySelectorAll(".cart-item__container");
            cartItem.forEach(item => {
                const cartItemPrice = item.querySelector(".cart-item__price");
                const cartItemQuantityInput = item.querySelector(".cart-item__quantity-input");
                const cartItemSubtotalPrice = item.querySelector(".cart-item__subtotal-price");
                const priceNumber = Number(cartItemPrice.textContent.replace("$", ""));
                const quantityNumber = Number(cartItemQuantityInput.value);
                cartItemSubtotalPrice.textContent = `$${priceNumber * quantityNumber}`;
            });
        };

        const updatePriceTotals = () => {
            calculateCartTotalPrice();
            calculateItemSubtotalPrice();
        };

        const quantityInputUpdateTotals = () => {
            const cartItemQuantityInput = document.querySelectorAll(".cart-item__quantity-input");
            cartItemQuantityInput.forEach(input => {
                input.addEventListener("change", () => {
                    if (input.value < 1) {
                        input.value = 1;
                    }
                    updatePriceTotals();
                });
            });
        };

        const itemRemovedFromCart = () => {
            const itemRemovedFromCartWindow = document.createElement("div");
            itemRemovedFromCartWindow.classList.add("message-container--error");
            itemRemovedFromCartWindow.innerHTML = `
                            <div class="message-container message-container--error">
                                <p class="message-container__text">Producto eliminado del carrito :(</p>
                            </div>`;
            document.body.insertAdjacentElement("afterbegin", itemRemovedFromCartWindow);
            setTimeout(() => {
                itemRemovedFromCartWindow.remove();
            }, 1000);
            updatePriceTotals();
        };

        const createAndDeleteCartItem = product => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item__container">
                    <p class="cart-item__id">${product.id}</p>
                    <div class="cart-item__img-container">
                        <img class="cart-item__img" src="${product.image}" alt="Imagen del producto">
                    </div>
                    <div class="cart-item__text-container">
                        <p class="cart-item__title">${product.title}</p>
                        <p class="cart-item__price">${product.price}</p>
                    </div>
                    <div class="cart-item__quantity-container">
                        <button class="cart-item__btn cart-item__btn--minus">-</button>
                        <input type="number" value="1" class="cart-item__quantity-input"/>
                        <button class="cart-item__btn cart-item__btn--plus">+</button>
                    </div>
                    <div class='cart-item__subtotal-container'>
                        <p class="cart-item__subtotal-quote">Subtotal</p>
                        <p class="cart-item__subtotal-price"></p>	
                    </div>
                    <div class="cart-item__xmark-container">
                        <i class="fas fa-times cart-item__xmark"></i>
                    </div>
                    <div class="cart-item__separator"></div>
                </div>
                    `;

            cartDropdown.insertAdjacentElement("afterbegin", cartItem);
            document.addEventListener("click", e => {
                if (e.target.classList.contains("cart-item__xmark")) {
                    e.target.closest(".cart-item__container").classList.add("cart-item__removed-animation");
                    setTimeout(() => {
                        e.target.closest('.cart-item__container').remove();
                        itemRemovedFromCart();
                        updatePriceTotals();
                    }, 150);
                }
            });
        };

        const itemAddedToCart = () => {
            const itemAddedToCartWindow = document.createElement("div");
            itemAddedToCartWindow.classList.add("message-container--success");
            itemAddedToCartWindow.innerHTML = `
                <div class="message-container message-container--success">
                    <p class="message-container__text">¡Producto agregado al carrito exitosamente!</p>
                </div>`;
            document.body.insertAdjacentElement("afterbegin", itemAddedToCartWindow);
            setTimeout(() => {
                itemAddedToCartWindow.remove();
            }, 1000);
        }

        const checkIfItemIsInCart = product => {
            const cartItemID = document.querySelectorAll(".cart-item__id");
            let itemIsInCart = false;
            cartItemID.forEach(id => {
                if (id.textContent == product.id) {
                    itemIsInCart = true;
                    itemAddedToCart();
                }
            });
            return itemIsInCart;
        };

        const addToCart = product => {
            const cartItemQuantityInput = document.querySelectorAll(".cart-item__quantity-input");
            if (checkIfItemIsInCart(product)) {
                cartItemQuantityInput.forEach(quantity => {
                    if (quantity.closest(".cart-item__container").querySelector(".cart-item__id").textContent == product.id) {
                        quantity.value++;
                        updatePriceTotals();
                    }
                });
            } else {
                createAndDeleteCartItem(product);
                quantityInputUpdateTotals();
                itemAddedToCart();
                updatePriceTotals();
            }
        };

        // 3. Event listeners //

        document.addEventListener("click", async e => {
            if (e.target.classList.contains("button")) {
                const product = {
                    image: e.target.closest(".card").querySelector(".card__image").src,
                    title: e.target.closest(".card").querySelector(".card__title").textContent,
                    price: e.target.closest(".card").querySelector(".card__price").textContent,
                    id: e.target.closest(".card").querySelector(".card__id").textContent
                };
                addToCart(product);
            }
        });

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

        nextButton.addEventListener("click", e => {
            const slideWidth = slide.clientWidth;
            slidesContainer.scrollLeft += slideWidth;
            if (slidesContainer.scrollLeft === slideWidth * (slidesContainer.childElementCount - 1)) {
                slidesContainer.scrollLeft = 0;
            }
        });

        prevButton.addEventListener("click", e => {
            const slideWidth = slide.clientWidth;
            slidesContainer.scrollLeft -= slideWidth;
            if (slidesContainer.scrollLeft === 0) {
                slidesContainer.scrollLeft = slideWidth * (slidesContainer.childElementCount - 1);
            }
        });

        document.addEventListener("click", e => {
            if (e.target.closest(".cart-item__btn--plus")) {
                const input = e.target.previousElementSibling;
                input.value = Number(input.value) + 1;
                updatePriceTotals();
            }
        });

        document.addEventListener("click", e => {
            if (e.target.closest(".cart-item__btn--minus")) {
                const input = e.target.nextElementSibling;
                if (input.value > 1) {
                    input.value = Number(input.value) - 1;
                    updatePriceTotals();
                } else {
                    e.target.closest(".cart-item__container").remove();
                    itemRemovedFromCart();
                }
            }
        });

        // 4. Timers //

        setInterval(() => {
            nextButton.click();
        }, 10000);

        // 5. RenderCards //

        const products = await productController.getProducts();
        PageInicio.renderTemplateCards(products);
        console.log(`Se encontraron ${products.length} productos.`);
    }
};

export default PageInicio;