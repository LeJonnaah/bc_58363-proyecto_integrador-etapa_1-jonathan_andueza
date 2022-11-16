import express from 'express';
import controller from '../controllers/cartItem.js';

const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
//                                POST Routes                                //
///////////////////////////////////////////////////////////////////////////////

router.post('/', controller.postCartItem);

export default router;
