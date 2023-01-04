import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to wishlist
router.post('/add/:_id', userAuth, wishlistController.addBookToWishlist);

//route to remove book to wishlist
router.post('/remove/:_id', userAuth, wishlistController.removeFromWishlist);

export default router;