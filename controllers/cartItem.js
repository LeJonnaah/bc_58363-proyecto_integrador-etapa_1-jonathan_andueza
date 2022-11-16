import api from '../api/cartItems.js';

///////////////////////////////////////////////////////////////////////////////
//                                POST Controller                            //
///////////////////////////////////////////////////////////////////////////////

const postCartItem = async (req, res) => {
    const cartItem = req.body;
    const newCartItem = await api.createCartItems(cartItem);
    res.json(newCartItem);
};

export default {
    postCartItem
};
