import mongoose from 'mongoose';
import DBMongoDB from './DB/MongoDB.js';

const productSchema = mongoose.Schema({
    header: String,
    title: String,
    brand: String,
    price: Number,
    image: String,
    stock: Number,
    category: String,
    minAge: Number,
    maxAge: Number,
    ship: {
        type: Boolean,
    },
    shortDescription: String,
    longDescription: String,
});

const ProductsModel = mongoose.model('products', productSchema);

class ProductModelMongoDB {

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async createProduct(product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const newProduct = new ProductsModel(product);
            await newProduct.save();
            return DBMongoDB.getObjectWithId(newProduct.toObject());
        } catch (error) {
            console.error('Error al intentar dar de alta el producto:', error.message);
            return {};
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////

    async readProducts() {
        if (! await DBMongoDB.connectDB()) {
            return [];
        }
        try {
            const products = await ProductsModel.find({}).lean();
            return DBMongoDB.getObjectWithId(products);
        } catch (error) {
            console.error('Error al intentar leer los productos:', error.message);
            return [];
        }

    }

    async readProduct(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const product = await ProductsModel.findById(id).lean() || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error) {
            console.error(`Error al intentar leer el producto #:${id}`, error.message);
        }
        return {};
    }


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async updateProduct(id, product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const updatedProduct = await ProductsModel.findByIdAndUpdate(id, { $set: product }, {
                returnDocument: 'after'
            }).lean() || {};
            return DBMongoDB.getObjectWithId(updatedProduct);
        } catch (error) {
            console.error(`Error al intentar actualizar el producto #:${id}`, error.message);
            return {};
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////

    async deleteProduct(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const deletedProduct = await ProductsModel.findByIdAndDelete(id).lean() || {};
            return DBMongoDB.getObjectWithId(deletedProduct);
        } catch (error) {
            console.error(`Error al intentar eliminar el producto #:${id}`, error.message);
            return {};
        }
    }
}

export default ProductModelMongoDB;