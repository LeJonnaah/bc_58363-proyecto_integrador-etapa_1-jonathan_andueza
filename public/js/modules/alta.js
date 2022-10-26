console.warn('🆗: Módulo PageAlta cargado.');

class PageAlta {
    static async init() {
        console.log('PageAlta.init()');

        "use strict";

        /// 1. Variables  ///

        const mainForm = document.querySelector(".form-container__form");
        const inputName = document.querySelector("#name");
        const inputType = document.querySelector("#type");
        const inputPrice = document.querySelector("#price");
        const inputBrand = document.querySelector("#brand");
        const inputShortDescription = document.querySelector("#short-description");
        const inputLongDescription = document.querySelector("#long-description");
        const inputMinAge = document.querySelector("#min-age");
        const inputStock = document.querySelector("#stock");
        const inputMaxAge = document.querySelector("#max-age");
        const inputCategory = document.querySelector("#category");

        /// 2.regExp  ///

        const regExpProductName = new RegExp("^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\"\-\_\/]){3,30}$");
        const regExpProductPrice = new RegExp("^[0-9]{1,9}$");
        const regExpProductBrand = new RegExp("^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\"\-\_\/]){3,40}$");
        const regExpProductCategory = new RegExp("^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\"\-\_\/]){3,50}$");
        const regExpShortDescription = new RegExp("^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\"\-\_\/]{0,79}$");
        const regExpLongDescription = new RegExp("^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\"\-\_\/]{0,1999}$");
        const regExpAge = new RegExp("\d+");

        // /// 3. Functions  ///

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
            }
        };

        /// 4. Event Listeners  ///

        mainForm.addEventListener("submit", e => {
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

        mainForm.addEventListener("change", e => {
            if (e.target === inputType) {
                validateInputAndShowMessageBox(e, regExpProductCategory, "La categoría debe tener entre 3 y 50 caracteres.");
            }
        });

        mainForm.addEventListener("change", e => {
            if (e.target === inputName) {
                validateInputAndShowMessageBox(e, regExpProductName, "El nombre debe tener entre 3 y 30 caracteres.");
            }
        });

        mainForm.addEventListener("change", e => {
            if (e.target === inputPrice) {
                validateInputAndShowMessageBox(e, regExpProductPrice, "El precio debe tener entre 1 y 9 caracteres. Campo numérico positivo.");
            }
        });

        mainForm.addEventListener("change", e => {
            if (e.target === inputBrand) {
                validateInputAndShowMessageBox(e, regExpProductBrand, "La marca debe tener entre 3 y 40 caracteres.");
            }
        });

        mainForm.addEventListener("change", e => {
            if (e.target === inputShortDescription) {
                validateInputAndShowMessageBox(e, regExpAge, "La descripción corta debe tener entre 0 y 79 caracteres.");
            }
        });

        mainForm.addEventListener("change", e => {
            if (e.target === inputLongDescription) {
                validateInputAndShowMessageBox(e, regExpAge, "La descripción larga debe tener entre 0 y 1999 caracteres.");
            }
        });

        mainForm.addEventListener("change", e => {
            if (e.target === inputMinAge) {
                validateInputAndShowMessageBox(e, regExpShortDescription, "La edad mínima debe tener entre 0 y 2 caracteres.");
            }
        });

        mainForm.addEventListener("change", e => {
            if (e.target === inputMaxAge) {
                validateInputAndShowMessageBox(e, regExpLongDescription, "La edad máxima debe tener entre 0 y 2 caracteres.");
            }
        });

        mainForm.addEventListener("change", e => {
            if (e.target === inputCategory) {
                validateInputAndShowMessageBox(e, regExpProductCategory, "La categoría debe tener entre 3 y 50 caracteres.");
            }
        });

        mainForm.addEventListener("change", e => {
            if (e.target === inputStock) {
                validateInputAndShowMessageBox(e, regExpProductCategory, "La categoría debe tener entre 3 y 50 caracteres.");
            }
        });
    }
}

export default PageAlta;


