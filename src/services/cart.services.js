import Cart from '../models/cart.model';
import Books from '../models/book.model';


// Function to create cart and add book to cart...
export const addBookToCart = async (body, _id) => {
    let bookData = await Books.findOne({ _id });
    console.log("book detail", bookData);
    let bookDetails = {
        'productId': bookData._id,
        'description': bookData.description,
        'bookName': bookData.bookName,
        'bookImage': bookData.bookImage,
        'author': bookData.author,
        'price': Math.floor(bookData.price),
        'quantityInStock': bookData.quantity
    }

    if (bookData != null) {
        if (bookData.quantity >= 1) {
            const cartData = await Cart.findOne({ userId: body.userId });
            if (cartData == null) {
                --bookDetails.quantityInStock;
                --bookData.quantity;
                console.log('--', bookData.quantity);
                console.log('-----', bookData);
                console.log("bookDeatails reducing quantity.", bookDetails);
                const createCart = await Cart.create({ userId: body.userId, books: [bookDetails], cart_total: bookDetails.price });
                await Books.findOneAndUpdate({ _id }, bookData, { new: true });
                return createCart;
            }
            else {
                --bookData.quantity;
                await Books.findOneAndUpdate({ _id }, bookData, { new: true });
                let flag = false;
                let totalCartPrice = cartData.cart_total;
                await cartData.books.forEach(element => {
                    if (element.productId == _id) {
                        element.quantity = element.quantity + 1;
                        --element.quantityInStock;
                        totalCartPrice += element.price;
                        console.log("cart reducing quantity..", bookDetails);
                        flag = true;
                    }
                });
                if (flag == false) {
                    await cartData.books.push(bookDetails)
                    console.log(" New book is added ");
                    --bookDetails.quantityInStock;
                    console.log("bookDeatails reducing quantity...", bookDetails);
                    totalCartPrice += bookDetails.price;
                }
                let mycart = await Cart.findOneAndUpdate({ userId: body.userId }, { books: cartData.books, cart_total: totalCartPrice }, { new: true })
                return mycart;
            }
        }
        else {
            throw new Error(" Quantity is out of stock ");
        }
    }
    else {
        throw new Error(" Book not found, Enter valid book details");
    }

}

