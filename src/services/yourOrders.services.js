import Customer from '../models/customer.model';
import Cart from '../models/cart.model';
import YourOrders from '../models/yourOrders.model';


// Function to create cart and add book to cart...
export const yourOrder = async (body, _id) => {
    let cartData = await Cart.findOne({ userId: body.userId });
    let totalCartPrice = cartData.cart_total;
    if (cartData != null) {
        let bookFound = false;
        let book;
        let customer;

        console.log("cartData", cartData);
        await cartData.books.forEach(element => {
            if (element.productId == _id && element.quantity > 1) {
                totalCartPrice -= element.price;
                book = element;
                --element.quantity;
                bookFound = true;
            }
            else if (element.productId == _id && element.quantity == 1) {
                totalCartPrice -= element.price;
                book = element;
                cartData.books.splice(cartData.books.indexOf(element), 1);
                bookFound = true;
            }
           
        });

        let customerData = await Customer.findOne({ userId: body.userId });

        await customerData.customer.forEach(element => {
            if (element.name == "Devendra") {
                customer = element;
            }
        });

        let orderData = await YourOrders.findOne({ userId: body.userId });
        console.log("orderData", orderData);
        if (orderData == null) {
            if (bookFound) {
                await Cart.findOneAndUpdate({ userId: body.userId }, { books: cartData.books, cart_total: totalCartPrice }, { new: true });
                console.log("book", book);
                console.log("customer", customer);
                let createOrder = await YourOrders.create({ userId: body.userId, books: [book], customer: [customer], isPurchased: true });
                return createOrder;
            }
            else {
                throw new Error("book not added in cart")
            }
        }
        else if (orderData != null) {
            if (bookFound) {
                await Cart.findOneAndUpdate({ userId: body.userId }, { books: cartData.books, cart_total: totalCartPrice }, { new: true });
                console.log("book", book);
                console.log("customer", customer);
                let myOrder = await YourOrders.findOneAndUpdate({ userId: body.userId }, { $push: { books: book, customer: customer } }, { new: true });
                return myOrder;
            }
            else {
                throw new Error("book not added in cart")
            }
        }
       
    } else {
        throw new Error("Cart is empty")
    }

}
