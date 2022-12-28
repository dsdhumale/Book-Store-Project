import HttpStatus from 'http-status-codes';
import * as customerService from '../services/customer.services';


//To add book into the cart
 export const addCustomerDetails = async (req, res, next) => {
    try {
      const data = await customerService.addCustomerDetails(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: ' Customer details added successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
    })
  }
};