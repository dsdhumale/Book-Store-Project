import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';

/**
   * Controller to get all books
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
export const getAllBooks = async (req, res, next) => {
  try {
    const data = await BookService.getAllBooks();
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'All Books fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};