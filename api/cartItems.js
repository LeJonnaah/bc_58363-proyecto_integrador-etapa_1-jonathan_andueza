import config from '../config.js';
import Model from '../models/cartItems.js';

const model = Model.get(config.PERSISTENCE_TYPE);

////////////////////////////////////////////////////////////////////////////////
//                                 API Create                                 //
////////////////////////////////////////////////////////////////////////////////

const createCartItems = async CartItems => {
    const createdCartItems = await model.createCartItem(CartItems);
    return createdCartItems;
};

export default {
    createCartItems
};
