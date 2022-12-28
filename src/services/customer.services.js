import Customer from '../models/customer.model';

//add customer details
export const addCustomerDetails = async (body) => {
    let customerDetails = {
        name: body.name,
        phoneNumber: body.phoneNumber,
        addressType: body.addressType,
        fullAddress: body.fullAddress,
        city: body.city,
        landmark: body.landmark,
        state: body.state,
        pinCode: body.pinCode,
        locality: body.locality
    };
    const customerData = await Customer.findOne({ userId: body.userId });
    if (customerData != null) {
        const addDetails = await Customer.findOneAndUpdate({userId: body.userId},{ $push: { customer: customerDetails } },{new: true});
        return addDetails;
    }
    else {
        const createCustomer = await Customer.create({ userId: body.userId, customer: [customerDetails] });
        return createCustomer;
    }
};