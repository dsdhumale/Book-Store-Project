import Books from '../models/book.model';
import Wishlist from '../models/wishlist.model';


// Function to create wishlist and add book to wishlist...
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
        const wishlistdata = await Wishlist.findOne({ userId: body.userId });
        if (wishlistdata == null) {
            const createWishlist = await Wishlist.create({ userId: body.userId, books: [bookDetails] });
            return createWishlist;
        }
        else if (wishlistdata != null) {
            let bookfound = false;
            await wishlistdata.books.forEach(element => {
                if (element.productId == _id) {
                    bookfound = true;
                    throw new Error("Book already exist in wish list")
                }
            });
            if (!bookfound) {
                let myWishlist = await Wishlist.findOneAndUpdate({ userId: body.userId }, { $push: { books: bookDetails } }, { new: true })
                return myWishlist;
            }
        }
    }
    else {
        throw new Error(" Book not found, Enter valid book details");
    }
}

// Function to remove book from wishlist
export const removeFromWishlist = async (body, _id) => {
    const wishListData = await Wishlist.findOne({ userId: body.userId });
    console.log("wishlist", wishListData)
    if (wishListData != null) {
        let bookMatch = false;
        await wishListData.books.forEach(element => {
            if (element.productId == _id) {
                wishListData.books.splice(wishListData.books.indexOf(element), 1);
                bookMatch = true;
            }
        });
        if (bookMatch) {
            const wishlist = await Wishlist.findOneAndUpdate({ userId: body.userId }, wishListData, { new: true });
            return wishlist;
        } else {
            throw new Error("Book not found in wish list")
        }

    } else {
        throw new Error("Wish list is empty")
    }

}