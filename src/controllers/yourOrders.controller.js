import HttpStatus from 'http-status-codes';
import * as orderService from '../services/yourOrders.services';


//To add book into the cart
 export const yourOrder = async (req, res, next) => {
    try {
      const data = await orderService.yourOrder(req.body,req.params._id);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: ' your orders fetched successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
})
}
};