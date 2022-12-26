import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to cart
router.post('/add/:_id', userAuth, cartController.addBookToCart);

//route to remove single book from cart
router.post('/remove/:_id', userAuth, cartController.removeBookFromCart);

export default router;