import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to cart
router.post('/add/:_id', userAuth, wishlistController.addBookToWishlist);

export default router;