
console.warn('🆗: Módulo PageContacto cargado.');

class PageContacto {

    static async init () {
        console.log('PageContacto.init()');

        "use strict";

// 1. Variables

const mainForm = document.querySelector(".form-container__form");
const inputName = document.getElementById("name");
const inputMail = document.querySelector("#mail");

// 2.regExp

const regExpProductName = new RegExp("^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\"\-\_\/]){3,30}$");
const regExpEmail = new RegExp(
    "^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
);

// 3. Functions

const validateInputAndShowMessageBox = (e, regExp, message) => {
    const errorMessageBox = `
    <div class="form-container__obligatory-field">
        <p class="form-container__field-text">Este campo es obligatorio.</p>
        <p class="form-container__field-text">${message}</p>
    </div>
    `;
    if (!regExp.test(e.target.value)) {
        e.target.style.backgroundColor = "#e56972";
        if (!e.target.nextElementSibling) {
            e.target.insertAdjacentHTML("afterend", errorMessageBox);
            setTimeout(() => {
                e.target.nextElementSibling.remove();
            }, 3000);
        }
    } else {
        e.target.style.backgroundColor = "#a8c695";
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.remove();
        }
    }
};

// 4. Event Listeners

mainForm.addEventListener("change", (e) => {
    if (e.target.id === inputName) {
        console.log("inputName");
        validateInputAndShowMessageBox(e, regExpProductName, "Mínimo 3 caracteres.");
    }
});

inputMail.addEventListener("change", (e) => {
    if (e.target.id === inputMail) {
        validateInputAndShowMessageBox(e, regExpEmail, "El formato del correo electrónico no es correcto.");
    }
});

document.addEventListener("click", e => {
    console.log(e.target.id);
});
    }
}

export default PageContacto;

