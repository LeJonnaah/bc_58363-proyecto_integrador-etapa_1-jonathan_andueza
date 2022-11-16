import mongoose from 'mongoose';
import DBMongoDB from './DB/MongoDB.js';

const cartItemsSchema = mongoose.Schema({
    id: String,
    quantity: String,
    price: String
});

const CartItemModel = mongoose.model('cartItems', cartItemsSchema);

class CartItemModelMongoDB {
    
    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async createCartItem (product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const newProduct = new CartItemModel(product);
            await newProduct.save();
            return DBMongoDB.getObjectWithId(newProduct.toObject());
        } catch (error) {
            console.error('Error al intentar dar de alta el producto:', error.message);
            return {};
        }
    }
}

export default CartItemModelMongoDB;