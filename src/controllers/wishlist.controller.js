import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';


//To add book into the cart
 export const addBookToWishlist = async (req, res, next) => {
    try {
      const data = await wishlistService.addBookToWishlist(req.body,req.params._id);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: ' Book added in wish list successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
    })
  }
};