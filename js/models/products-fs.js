import fs from 'fs';


const productsFile = 'products.dat';
const charset = 'utf-8';

const getNextProductId = products => {
    const nextId = products.length ? products[products.length - 1].id + 1 : 1;
    return nextId;
};

const readFileProducts = async () => {
    let products = [];
    try {
        const fileContent = await fs.promises.readFile(productsFile, charset);
        products = JSON.parse(fileContent);
    } catch (error) {
        console.error(error.message);
    }
    return products;
};

const saveFileProducts = async products => {
    await fs.promises.writeFile(productsFile, JSON.stringify(products, null, '\t'));
};


////////////////////////////////////////////////////////////////////////////////
//                              CRUD - C: Create                              //
////////////////////////////////////////////////////////////////////////////////`

const createProduct = async product => {
    const products = await readFileProducts();

    product.id = getNextProductId(products);
    products.push(product);
    await saveFileProducts(products);
    return product;
};


////////////////////////////////////////////////////////////////////////////////
//                               CRUD - R: Read                               //
////////////////////////////////////////////////////////////////////////////////

const readProducts = async () => {
    const products = await readFileProducts();
    return products;
};

const readProduct = async id => {
    const products = await readFileProducts();
    const product = products.find( product => product.id === id ) || {};
    return product;
};


////////////////////////////////////////////////////////////////////////////////
//                              CRUD - U: Update                              //
////////////////////////////////////////////////////////////////////////////////`

const updateProduct = async (id, product) => {

    const products = await readFileProducts();
    
    const index = products.findIndex( product => product.id === id );
    // Si no se encontró
    if (index === -1) {
        return {};
    }
    product.id = id;
    products[index] = product;

    await saveFileProducts(products);
    return product;
};

////////////////////////////////////////////////////////////////////////////////
//                              CRUD - D: Delete                              //
////////////////////////////////////////////////////////////////////////////////

const deleteProduct = async id => {
    const products = await readFileProducts();

    const index = products.findIndex( product => product.id === id);
    // Si no se encontró
    if (index === -1) {
        return {};
    }
    const removedProduct = products.splice(index, 1)[0];

    await saveFileProducts(products);
    return removedProduct;
};


export default {
    createProduct,
    readProducts,
    readProduct,
    updateProduct,
    deleteProduct
};
