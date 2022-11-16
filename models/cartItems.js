import config, { PERSISTENCE_TYPE,  } from "../config.js";
import CartItemModelMongoDB from "./cartItems-mongodb.js";


class CartItemModel {
    static get(type) {
        console.log(`##### Persistencia -> ${config.PERSISTENCE_TYPE || 'por defecto'} #####`);
        switch (type) {
            case PERSISTENCE_TYPE.TYPE_MONGODB:
                return new CartItemModelMongoDB();
            default:
                return new CartItemModelMongoDB();
        }
    }
}

export default CartItemModel;
