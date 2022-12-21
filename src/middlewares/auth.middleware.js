import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

// Middleware to authenticate for reset password has a valid Authorization token
//  Authorization: Bearer <token>
export const userPasswordAuth = async (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken)
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      bearerToken = bearerToken.split(' ')[1];
  
      const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
      req.body.emailID = user.emailID;
      next();
    } catch (error) {
      next(error);
    }
  };

  
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken)
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      bearerToken = bearerToken.split(' ')[1];
      const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
      req.body.userID=user.emailID
      console.log("user",req.body.userID);
      next();
    } catch (error) {
      next(error);
    }
  };


