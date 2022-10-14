"use strict";

/// 1. Variables  ///

const mainForm = document.querySelector(".form-container__form");
const inputName = document.querySelector("#name");
const inputPrice = document.querySelector("#price");
const inputBrand = document.querySelector("#brand");
const inputShortDescription = document.querySelector("#short-description");
const inputLongDescription = document.querySelector("#long-description");
const inputMinAge = document.querySelector("#min-age");
const inputMaxAge = document.querySelector("#max-age");
const inputCategory = document.querySelector("#category");

/// 2.regExp  ///

const regExpProductName = new RegExp("^[a-zA-Z0-9 ]{3,30}$");
const regExpProductPrice = new RegExp("^[0-9]{1,9}$");
const regExpProductBrand = new RegExp("^[a-zA-Z0-9 ]{3,30}$");
const regExpProductDescription = new RegExp("^[a-zA-Z0-9 ]{3,30}$");
const regExpShortDescription = new RegExp("^[a-zA-Z0-9 ]{3,30}$");
const regExpLongDescription = new RegExp("^[a-zA-Z0-9 ]{20,100}$");
const regExpAge = new RegExp("^[0-9]{1,2}$");

/// 3. Functions  ///

function displayCheckOnInput(e) {
    e.target.style.backgroundColor = "#a8c695";
}

function displayErrorOnInput(e) {
    e.target.style.backgroundColor = "#e56972";
}

const validateInput = (regExp, e) => {
    if (regExp.test(e.target.value)) {
        displayCheckOnInput(e);
        mainForm.reportValidity()
    } else {
        displayErrorOnInput(e);
    }
    if (e.target.value === "") {
        e.target.style.backgroundColor = "#fff";
    }
};

/// 4. Event Listeners  ///

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
        regExpProductName.test(inputName.value) &&
        regExpProductPrice.test(inputPrice.value) && 
        regExpProductBrand.test(inputBrand.value) && 
        regExpShortDescription.test(inputShortDescription.value) && 
        regExpLongDescription.test(inputLongDescription.value) && 
        regExpAge.test(inputMinAge.value) && 
        regExpAge.test(inputMaxAge.value)
    ) {
        console.log("Form submitted");
    } else {
        console.log("Form not submitted");
    }
});

inputName.addEventListener("change", (e) => {
    validateInput(regExpProductName, e);
});

try {
    inputPrice.addEventListener("change", (e) => {
        validateInput(regExpProductPrice, e);
    });

    inputBrand.addEventListener("change", (e) => {
        validateInput(regExpProductBrand, e);
    });

    inputMinAge.addEventListener("change", (e) => {
        validateInput(regExpAge, e);
    });

    inputMaxAge.addEventListener("change", (e) => {
        validateInput(regExpAge, e);
    });

    inputShortDescription.addEventListener("change", (e) => {
        validateInput(regExpShortDescription, e);
    });

    inputShortDescription.addEventListener("change", (e) => {
        validateInput(regExpLongDescription, e);
    });

    inputCategory.addEventListener("change", (e) => {
        validateInput(regExpProductName, e);
    });

    inputMail.addEventListener("change", (e) => {
        validateInput(regExpEmail, e);
    });

} catch (error) {
    console.error(error);
};

