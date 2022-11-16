import cartItemService from '../services/cartItem.js';

class cartItemController {
    
    async saveCartItem(cartItem) {
        console.log('saveCartItem:', cartItem);
        const savedCartItem = await cartItemService.saveCartItem(cartItem);
        return savedCartItem;
    }
}

const cartItemController = new cartItemController();
export default cartItemController;
