import Books from '../models/book.model';

//get all books
export const getAllBooks = async () => {
  const data = await Books.find();
  if (data.length != 0) {
    return data; 
    }
  else {
    throw new Error("Books are not avilable for this user");
  }
};

