import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo PageAlta cargado.');

class PageAlta {
    static productsTableContainer;
    static productForm;
    static fields;
    static btnCreate;
    static btnUpdate;
    static btnCancel;
    static validators = {
        'header': /^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\¡\ \!\"\-\_\/]){3,20}$/,
        'title': /^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\ \"\-\_\/]){3,30}$/,
        'brand': /^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\ \"\-\_\/]){3,40}$/,
        'category': /^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\ \"\-\_\/]){3,50}$/,
        'price': /^[0-9]+$/,
        'stock': /^[0-9]+$/,
        'shortDescription': /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\"\-\_\/]{0,79}/,
        'longDescription': /^^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\:\'\"\-\_\/]{0,1999}$/,
        'minAge': /[0-9]+$/,
        'maxAge': /[0-9]+$/,
        'image': /^.*\.(jpg|jpeg|png|gif)$/,
        'ship': 'false',
    };

    static async confirmWindow() {
        const confirmWindowBackground = document.querySelector('.background');
        const confirmWindow = document.createElement('div');
        confirmWindow.classList.add('confirm-window');
        confirmWindow.innerHTML =`
            <div class="confirm-window__container">
                <h2 class="confirm-window__title">¿Está seguro que desea eliminar el producto?</h2>
                <div class="confirm-window__buttons">
                    <button class="confirm-window__button confirm-window__button--yes">Sí</button>
                    <button class="confirm-window__button confirm-window__button--no">No</button>
                </div>
            </div>
            `;
        document.body.appendChild(confirmWindow);
        confirmWindowBackground.classList.add('background--visible');
        const confirmWindowContainer = confirmWindow.querySelector('.confirm-window__container');
        confirmWindowContainer.classList.add('confirm-window__container--show');
        const btnYes = confirmWindow.querySelector('.confirm-window__button--yes');
        const btnNo = confirmWindow.querySelector('.confirm-window__button--no');
        const promise = new Promise((resolve, reject) => {
            btnYes.addEventListener('click', () => {
                confirmWindowContainer.classList.remove('confirm-window__container--show');
                confirmWindowContainer.classList.add('confirm-window__container--hide');
                setTimeout(() => {
                    confirmWindowBackground.classList.remove('background--visible');
                    confirmWindow.remove();
                    resolve(true);
                }, 200);
            });
            btnNo.addEventListener('click', () => {
                confirmWindowContainer.classList.remove('confirm-window__container--show');
                confirmWindowContainer.classList.add('confirm-window__container--hide');
                setTimeout(() => {
                    confirmWindowBackground.classList.remove('background--visible');
                    confirmWindow.remove();
                    resolve(false);
                }, 200);
            });
        });
        return promise;
    }

    static async deleteProduct(e) {
        if (!await PageAlta.confirmWindow()) {
            return;
        }

        const row = e.target.closest('tr');
        const id = row.querySelector('td[data-product-property="id"]').innerHTML;
        const deletedProduct = await productController.deleteProduct(id);
        PageAlta.loadTable();
        return deletedProduct;
    }

    static getProductFromRow(row) {
        const rowCells = row.children;
        const product = {};
        for (const cell of rowCells) {
            if (cell.dataset.productProperty) {
                product[cell.dataset.productProperty] = cell.innerHTML;
            }
        }
        return product;
    }


    static emptyForm() {
        PageAlta.fields.forEach(field => field.value = '');
    }

    static async completeForm(e) {
        const row = e.target.closest('tr');
        const productToEdit = PageAlta.getProductFromRow(row);
        console.log('productToEdit:', productToEdit);

        PageAlta.fields.forEach(field => {
            field.value = productToEdit[field.name];
        });
    }

    static async addTableEvents() {
        PageAlta.productsTableContainer.addEventListener('click', async e => {
            if (e.target.classList.contains('button--delete-table')) {
                
                const deletedProduct = await PageAlta.deleteProduct(e);
                console.log('deletedProduct:', deletedProduct);
                if (PageAlta.objectIsEmpty(deletedProduct)) {
                    console.error('No se pudo eliminar el producto');
                }

                return;
            }
            if (e.target.classList.contains('button--modify-table')) {
                PageAlta.prepareFormForEditing();
                PageAlta.completeForm(e);
                return;
            }
        });
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        PageAlta.productsTableContainer.innerHTML = html;
    }

    static async loadTable() {
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos.`);
        PageAlta.renderTemplateTable(products);
    }

    static async prepareTable() {
        PageAlta.productsTableContainer = document.querySelector('.products-table-container');
        await PageAlta.loadTable();
        PageAlta.addTableEvents();
    }

    static prepareFormForEditing() {
        PageAlta.productForm.querySelector('[name]:not([name="id"])').focus();
        PageAlta.btnCreate.disabled = true;
        PageAlta.btnUpdate.disabled = false;
        PageAlta.btnCancel.disabled = false;
    }

    static prepareFormForCreating() {
        PageAlta.btnCreate.disabled = false;
        PageAlta.btnUpdate.disabled = true;
        PageAlta.btnCancel.disabled = true;
    }

    static validate(value, validator) {
        return validator.test(value);
    }

    static validateForm(validators) {
        let allValidated = true;
        const productToSave = {};
        console.log('\n\n');

        for (const field of PageAlta.fields) {
            if (!validators[field.name]) {
                continue;
            }
            if (field.type === 'checkbox') {
                productToSave[field.name] = field.checked;
                continue;
            }
            const validated = PageAlta.validate(field.value, validators[field.name]);
            console.warn(field.name);
            console.log(`value: ${field.value}\nvalidator: ${validators[field.name]}\nvalidated: ${validated}`);
            if (!validated) {
                field.focus();
                allValidated = false;
                break;
            } else {
                productToSave[field.name] = field.value;
            }
        }
        console.log('allValidated:', allValidated);
        if (!allValidated) {
            return false;
        }
        console.log('productToSave:', productToSave);
        return productToSave;
    }

    static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        return savedProduct;
    }

    static async updateProduct(product) {
        product.id = PageAlta.productForm.querySelector('[name="id"]').value;
        const updatedProduct = await productController.updateProduct(product.id, product);
        return updatedProduct;
    }

    static async messageBox(message, type) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', type);
        messageContainer.innerHTML = message;
        document.body.appendChild(messageContainer);
        setTimeout(() => {
            messageContainer.remove();
        }, 3000);
    }

    static async addFormEvents() {
        PageAlta.btnCreate.addEventListener('click', async e => {
            console.error('btn-create');
            const validators = {...PageAlta.validators};
            delete validators.id;
            const productToSave = PageAlta.validateForm(validators);
            if (productToSave) {
                const savedProduct = await PageAlta.saveProduct(productToSave);
                console.log('savedProduct:', savedProduct);
                PageAlta.messageBox('Producto creado con éxito', 'message-container--success');
                if (PageAlta.objectIsEmpty(savedProduct)) {
                    console.error('No se pudo crear el producto');
                    return;
                }
                const products = await productController.getProducts();
                console.log(`Ahora hay ${products.length} productos`);    
                PageAlta.renderTemplateTable(products);
        
                PageAlta.emptyForm();
            }
        });

        PageAlta.btnUpdate.addEventListener('click', async e => {
            console.error('btn-update');
            const productToSave = PageAlta.validateForm(PageAlta.validators);
            if (productToSave) {
                const updatedProduct = await PageAlta.updateProduct(productToSave);
                console.log('updatedProduct:', updatedProduct);
                if (PageAlta.objectIsEmpty(updatedProduct)) {
                    console.error('No se pudo guardar el producto');
                    return;
                }
                const products = await productController.getProducts();
                console.log(`Ahora hay ${products.length} productos`);    
                PageAlta.renderTemplateTable(products);        
                PageAlta.emptyForm();
                PageAlta.prepareFormForCreating();
            }
        });
        
        PageAlta.btnCancel.addEventListener('click', e => {
            console.error('btn-cancel');
            PageAlta.messageBox('Se canceló la operación', 'message-container--warning');

            PageAlta.emptyForm();
            PageAlta.prepareFormForCreating();
        });
    };

    static objectIsEmpty(object) {
        return Object.entries(object).length === 0;
    };

    static prepareForm() {
        PageAlta.productForm = document.querySelector('.form-container__form');
        PageAlta.fields = PageAlta.productForm.querySelectorAll('[name]');
        PageAlta.btnCreate = PageAlta.productForm.querySelector('.button--float-right');
        PageAlta.btnUpdate = PageAlta.productForm.querySelector('.button--modify');
        PageAlta.btnCancel = PageAlta.productForm.querySelector('.button--delete');
        PageAlta.addFormEvents();
    }

    static async init () {
        console.log('PageAlta.init()');
        
        await PageAlta.prepareTable();
        PageAlta.prepareForm();
    };
};

export default PageAlta;

const regExpProductHeader = new RegExp("^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\ \!\¡\"\-\_\/]){3,30}$");
const regExpProductTitle = new RegExp("^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\ \"\-\_\/]){3,30}$");
const regExpProductPrice = new RegExp("^[0-9]+$");
const regExpProductBrand = new RegExp("^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\ \"\-\_\/]){3,40}$");
const regExpProductCategory = new RegExp("^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\ \"\-\_\/]){3,50}$");
const regExpShortDescription = new RegExp("^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\"\-\_\/]{0,79}$");
const regExpLongDescription = new RegExp("^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\,\.\'\"\-\_\/]{0,1999}$");
const regExpAge = new RegExp("^[0-9]+$");

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

document.addEventListener('change', () => {
    if (document.querySelector('.form-container__form')) {
        document.querySelector('.form-container__form').addEventListener('change', e => {
            switch (e.target.name) {
                case 'title':
                    validateInputAndShowMessageBox(e, regExpProductTitle, 'El nombre debe tener entre 3 y 30 caracteres');
                    break;
                case 'header':
                    validateInputAndShowMessageBox(e, regExpProductHeader, 'El nombre debe tener entre 3 y 30 caracteres');
                    break;
                case 'price':
                    validateInputAndShowMessageBox(e, regExpProductPrice, 'El precio debe tener un máximo de 2 decimales');
                    break;
                case 'stock':
                    validateInputAndShowMessageBox(e, regExpProductPrice, 'El precio debe tener un máximo de 2 decimales');
                    break;
                case 'brand':
                    validateInputAndShowMessageBox(e, regExpProductBrand, 'La marca debe tener entre 3 y 40 caracteres');
                    break;
                case 'category':
                    validateInputAndShowMessageBox(e, regExpProductCategory, 'La categoría debe tener entre 3 y 50 caracteres');
                    break;
                case 'shortDescription':
                    validateInputAndShowMessageBox(e, regExpShortDescription, 'La descripción corta debe tener entre 0 y 79 caracteres');
                    break;
                case 'longDescription':
                    validateInputAndShowMessageBox(e, regExpLongDescription, 'La descripción larga debe tener entre 0 y 1999 caracteres');
                    break;
                case 'minAge':
                    validateInputAndShowMessageBox(e, regExpAge, 'La edad debe ser un número');
                    break;
                case 'maxAge':
                    validateInputAndShowMessageBox(e, regExpAge, 'La edad debe ser un número');
                    break;
                default:
                    break;
            }
        });
    }
});