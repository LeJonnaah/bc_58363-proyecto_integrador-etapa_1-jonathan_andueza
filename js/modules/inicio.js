class PageInicio { static async init() { console.log('PageInicio.init()') } };

export default PageInicio;

"use strict";

class Product {
    constructor(brand, title, subtitle, price, image, description, minAge, maxAge) {
        this.brand = brand;
        this.title = title;
        this.subtitle = subtitle;
        this.price = price;
        this.image = image;
        this.description = description;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }
}

const products = [
    new Product('¡Producto Nuevo!', 'Lorem Avion', 'Lorem', 12000, '../img/products/legosi-toy.png', 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', 0, 3,),
    new Product('¡Recomendado', 'Lorem Topo', 'Lorem', 12000, '../img/products/mega-cyborg-hand-toy.jpg', 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', 0, 12,),
    new Product('¡Nuevo!', 'Lorem Auto', 'Lorem', 30000, 'https://images.unsplash.com/photo-1581084517869-8b8b5b0b5f1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FmZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80', 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', 1, 5,),
    new Product('¡Producto Nuevo!', 'Lorem Peluche', 'Lorem', 10000, 'https://images.unsplash.com/photo-1581084517869-8b8b5b0b5f1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FmZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80', 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', 3, 6),
    new Product('¡Producto Nuevo!', 'Lorem Lego', 'Lorem', 3232, 'https://images.unsplash.com/photo-1581084517869-8b8b5b0b5f1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FmZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80', 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', 0, 3,),
    new Product('¡Producto Nuevo!', 'Lorem Casa', 'Lorem', 1200, 'https://images.unsplash.com/photo-1581084517869-8b8b5b0b5f1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FmZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80', 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', 0, 3,),
];

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', e => {
    if (xhr.status === 200) {
        const textToCompile = e.target.responseText;
        const template = Handlebars.compile(textToCompile);
        const resultText = template({ products });
        document.querySelector('.cards-container').innerHTML = resultText;
    }
});
xhr.open('get', 'views/templates/products.hbs');
xhr.send();


// 1. Variables //

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slider__slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const cartTotalPrice = document.querySelector(".main-header__cart-price");
const cartDropdown = document.querySelector(".main-header__cart-dropdown");
const cartItemQuantityInput = document.querySelectorAll(".cart-item__quantity-input");


// 2. Functions //

const calculateItemSubtotal = (price, quantity) => {
    return price * quantity;
};

const calculateCartTotalPrice = () => {
    const cartItemPrice = document.querySelectorAll(".cart-item__price");
    const cartItemQuantityInput = document.querySelectorAll(".cart-item__quantity-input");
    let totalPrice = 0;
    cartItemPrice.forEach(price => {
        const priceNumber = Number(price.textContent.replace("$", ""));
        cartItemQuantityInput.forEach(quantity => {
            const quantityNumber = Number(quantity.value);
            totalPrice += priceNumber * quantityNumber;
            quantity.addEventListener("change", () => {
                calculateCartTotalPrice();
                calculateItemSubtotal(priceNumber, quantityNumber);
            });
        });
    });
    cartTotalPrice.textContent = `$${totalPrice}`;
};

const checkIfItemIsInCart = product => {
    const cartItemTitle = document.querySelectorAll(".cart-item__title");
    let itemIsInCart = false;
    cartItemTitle.forEach(title => {
        if (title.textContent === product.title) {
            
            console.log("Item is already in cart");
            itemIsInCart = true;
        }
    });
    return itemIsInCart;
};

const createAndDeleteCartItem = product => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("main-header__cart-item");
    cartItem.innerHTML = `
        <div class="cart-item__container">
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
                <p class="cart-item__subtotal-price">${product.subtotal}</p>	
            </div>
            <div class"cart-item__xmark-container">
                <i class="fas fa-times cart-item__xmark"></i>
            </div>
            <div class="cart-item__separator"></div>
        </div>
            `;

    cartDropdown.insertAdjacentElement("afterbegin", cartItem);
    document.addEventListener("click", e => {
        if (e.target.classList.contains("cart-item__xmark")) {
            e.target.closest('.cart-item__container').remove();
            itemRemovedFromCart();
            calculateCartTotalPrice();
        }
    });
};

const cartItemMinusButton = () => {
    document.addEventListener("click", e => {
        if (e.target.classList.contains("cart-item__btn--minus")) {
            if (e.target.nextElementSibling.value > 1) {
                e.target.nextElementSibling.value--;
                itemRemovedFromCart();
                calculateCartTotalPrice();
            } else if (e.target.nextElementSibling.value == 1) {
                e.target.closest('.cart-item__container').remove();
                itemRemovedFromCart();
                calculateCartTotalPrice();
            }
        }
    });
};

const cartItemPlusButton = () => {
    document.addEventListener("click", e => {
        if (e.target.classList.contains("cart-item__btn--plus")) {
            e.target.previousElementSibling.value++;
            calculateCartTotalPrice();
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
    }, 2000);
}

const itemRemovedFromCart = () => {
    const itemRemovedFromCartWindow = document.createElement("div");
    itemRemovedFromCartWindow.classList.add("message-container--error");
    itemRemovedFromCartWindow.innerHTML = `
        <div class="message-container message-container--error">
            <p class="message-container__text">Producto eliminado del carrito exitosamente :(</p>
        </div>`;
    document.body.insertAdjacentElement("afterbegin", itemRemovedFromCartWindow);
    setTimeout(() => {
        itemRemovedFromCartWindow.remove();
    }, 2000);
};


const cartItemFunctionality = () => {
    cartItemMinusButton();
    cartItemPlusButton();
    calculateCartTotalPrice();
};

const addProductToCart = product => {
    if (!checkIfItemIsInCart(product)) {
        createAndDeleteCartItem(product);
        itemAddedToCart();
        calculateCartTotalPrice();
        cartItemFunctionality();
    } else {
        const cartItemQuantityInput = document.querySelectorAll(".cart-item__quantity-input");
        cartItemQuantityInput.forEach(quantity => {
            quantity.value++;
        });
    }
};

// 3. Event Listeners //

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

document.addEventListener("click", e => {
    if (e.target.classList.contains("button")) {
        const product = {
            image: e.target.closest(".card").querySelector(".card__image").src,
            title: e.target.closest(".card").querySelector(".card__title").textContent,
            price: e.target.closest(".card").querySelector(".card__price").textContent,
            // subtotal: 
        };
        addProductToCart(product);
    }
});

// 4. Timers //

setInterval(() => {
    nextButton.click();
}, 10000);


export {cartItemFunctionality};