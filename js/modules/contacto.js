class PageContacto {static async init() {console.log('PageContacto.init()')}};

export default PageContacto;

"use strict";

// 1. Variables

const inputMail = document.querySelector("#mail");

// 2.regExp

const regExpEmail = new RegExp(
    "^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
);

// 3. Functions

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


// 4. Event Listeners

inputMail.addEventListener("change", (e) => {
    validateInput(regExpEmail, e);
});
