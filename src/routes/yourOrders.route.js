import express from 'express';
import * as orderController from '../controllers/yourOrders.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to cart
router.post('/:_id', userAuth, orderController.yourOrder);

export default router;