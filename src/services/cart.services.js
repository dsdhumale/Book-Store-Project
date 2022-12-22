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
        'quantityInStock':bookData.quantity
    }

    if (bookData != null) {
        const cartData = await Cart.findOne({ userId: body.userId });
       console.log("price ",bookData.price)
       console.log('type of', typeof(bookDetails.price))

        if (cartData == null) {
            --bookDetails.quantityInStock; 
        console.log("bookDeatails reducing quantity.", bookDetails);
            const createCart = await Cart.create({ userId: body.userId, books: [bookDetails] ,cart_total: bookDetails.price});
            return createCart;
        }
        else {
            let flag = false;
            console.log("cartdata",cartData.cart_total);
            console.log("cartdatatype",typeof(cartData.cart_total));

            let totalCartPrice = cartData.cart_total ;
            console.log("whole data", cartData);
            console.log("Array", cartData.books);
            await cartData.books.forEach(element => {
                if (element.productId == _id) {
                    element.quantity = element.quantity + 1;
                    --element.quantityInStock;
                    totalCartPrice += element.price ;
                    console.log("cart reducing quantity..", bookDetails);
                    flag = true;
                }
            });
            if(flag == false){
               await cartData.books.push(bookDetails)
                console.log(" New book is added ");
                --bookDetails.quantityInStock;
                console.log("bookDeatails reducing quantity...", bookDetails);
                totalCartPrice += bookDetails.price ;
            }
            let mycart = await Cart.findOneAndUpdate({ userId: body.userId }, { books: cartData.books , cart_total: totalCartPrice}, { new: true })
            return mycart;
        }
    }
    else {
        throw new Error(" Book not found, Enter valid book details");
    }

}