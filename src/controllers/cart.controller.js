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

// To remove book from cart
export const removeBookFromCart = async (req, res, next) => {
  try {
    const data = await cartService.removeBookFromCart(req.body,req.params._id);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: ' Book removed from cart successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
})
}
};



// To remove all books from cart
export const removeAllBooksFromCart = async (req, res, next) => {
  try {
    const data = await cartService.removeAllBooksFromCart(req.body,req.params._id);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: ' All Books removed from cart successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
})
}
};
