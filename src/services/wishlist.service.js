import Books from '../models/book.model';
import Wishlist from '../models/wishlist.model';


// Function to create cart and add book to cart...
export const addBookToWishlist = async (body, _id) => {
    let bookData = await Books.findOne({ _id });
    let bookDetails = {
        'productId': bookData._id,
        'description': bookData.description,
        'bookName': bookData.bookName,
        'bookImage': bookData.bookImage,
        'author': bookData.author,
        'price': bookData.price,
        'quantity': bookData.quantity
    }

    if (bookData != null) {
        const wishlistdata= await Wishlist.findOne({ userId: body.userId });
        if (wishlistdata == null) {
            const createWishlist = await Wishlist.create({ userId: body.userId, books: [bookDetails],});
            return createWishlist;
        } 
        else if(wishlistdata != null){
            let bookfound= false;
           await wishlistdata.books.forEach(element => {
                if(element.productId == _id){
                    bookfound = true;
                    throw new Error ("Book already exist in wish list")
                }
            });
            if(!bookfound){
                let myWishlist = await Wishlist.findOneAndUpdate({ userId: body.userId }, { $push: {books: bookDetails }}, { new: true })
                return myWishlist;
            }
        }      
    }
    else {
        throw new Error(" Book not found, Enter valid book details");
    }

}
