import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.services';


//To add book into the cart
 export const addBookToCart = async (req, res, next) => {
    try {
      const data = await cartService.addBookToCart(req.body,req.params._id);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: ' Book added in cart successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
    })
  }
};


