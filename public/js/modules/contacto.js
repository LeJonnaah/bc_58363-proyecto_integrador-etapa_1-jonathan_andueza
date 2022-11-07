
console.warn('🆗: Módulo PageContacto cargado.');

class PageContacto {

    static async init() {
        console.log('PageContacto.init()');

        "use strict";

    }
}

export default PageContacto;


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

document.addEventListener('change', () => {
    if (document.querySelector('.form-container__form')) {
        document.querySelector('.form-container__form').addEventListener('change', e => {
            switch (e.target.name) {
                case 'name':
                    validateInputAndShowMessageBox(e, regExpProductName, 'El nombre debe tener entre 3 y 30 caracteres.');
                    break;
                case 'mail':
                    validateInputAndShowMessageBox(e, regExpEmail, 'El email debe tener un formato válido.');
                    break;
                default:
                    break;
            }
        });
    }
});