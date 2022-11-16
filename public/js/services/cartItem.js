import http from '/js/clients/http.js';

class CartItemsService {
    URL_CART_ITEM = '/api/cartItems/';

    async saveCartItem(cartItem) {
        let savedCartItem = await http.post(this.URL_CART_ITEM, cartItem);
        return savedCartItem;
    }
}

const CartItemsService = new CartItemsService();

export default CartItemsService;
