import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
    {
        userId: {
            type: String
        },
        books: [{
            productId: {
                type: String
            },
            description: {
                type: String
            },
            bookName: {
                type: String
            },
            bookImage: {
                type: String
            },
            author: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            },
            quantityInStock:{
                type: Number
            },
            price: {
                type: Number
            }
        }],
        customer: [{
            name: {
                type: String
            },
            phoneNumber: {
                type: String
            },
            addressType: {
                type: String,

            },
            fullAddress: {
                type: String,

            },
            city: {
                type: String,
            },
            landmark: {
                type: String
            },
            state: {
                type: String,
            },
            pinCode: {
                type: String
            },
            locality: {
                type: String
            }
        }],

        isPurchased: {
            type: Boolean,
            default: false
        }
    }
)

export default model('YourOrders', orderSchema);