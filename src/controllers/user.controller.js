import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUserRegistration = async (req, res, next) => {
  try {
    const data = await UserService.newUserRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Registration done, User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to login a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'log in done successfully'
    });
  } catch (error) {
    next(error);
  }
};

//Controller to forgot password
export const forgotPassword= async (req,res,next) => {
  try {
    const data = await UserService.forgotPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'forget password successfully done,check email for token'
    });
  } catch (error) {
    next(error);
  }
};

//Controller to Reset password
export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
};



