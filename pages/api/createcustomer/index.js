/**
 * make a call to this api in showordermodal func in helpers.js
 * **/

import dbConnect from "../../../config/database";
import User from "../../../models/Users";
import Customer from "../../../models/Customers";

export default async function customerHandler(req, res) {
  /**
   * we want to use email and look in user collection if there is a user record with the
   * same email. if there is, get user id and add to customer record/collection
   * **/
  const { method, body } = req;
  if (method != "POST") return;
  const { customerInfo, customerBilling, customerShipping } = body;
  const { name, phoneNumber, email } = customerInfo;
  await dbConnect();
  // check if customer exist
  // check if user exist
  const [customerExist, userExist] = await Promise.all([
    Customer.findOne({ email: email }),
    User.findOne({ email: email }),
  ]);
  //if both customer and user exist
  if (customerExist) {
    /******** dont have to check if userExist is truthy ******
     * one email can be used to create new user and customer.
     * customer can use same email to make orders but doesnt register user account
     * customer.user will be undefined
     * then user decide to register account.
     * in our register.js in api/auth our algorithm will handle updating
     * user schema customer property to be the customer._id because customer used
     * same email to register account and place purchased orders.
     ******** dont have to check if userExist is truthy ******/

    // check if customer exist if it does return customer entry in collection
    res.status(200).json({ customer: customerExist });
    return;
  }

  // if customer doesn't exist and newCustomer is truthy
  // inside if statement check if user exist
  /**
   * user register an account without making a purchase
   * later use visit site and make a purchase.
   * which we will create a new customer.
   * in our if statement when Customer.create({}) return an obj
   * we will check if userExist(using same email) when user exist is truthy we want to update customer schema user property with user._id
   * update user schema customer property with customer._id
   * **/
  const newCustomer = await Customer.create({
    name,
    phoneNumber,
    email,
    physicalAddress: customerBilling,
    billingAddress: customerBilling,
    shippingAddress: customerShipping,
  });
  if (newCustomer) {
    // check if user exist truthy
    if (userExist) {
      // when user exist is truthy we want to update customer schema user property with user._id
      // update user schema customer property with customer._id
      newCustomer.user = userExist._id;
      userExist.customer = newCustomer._id;
      await Promise.all([newCustomer.save(), userExist.save()]);
    }
    // returning customer instead of createdCustomer to match when customerExist is truthy
    // if we returned createdCustomer when newCustomer is truthy then same customer submit another order
    // the data obj returned from this api func will not match our algorithm in createordereditems
    res
      .status(200)
      .json({ message: "Customer Created!", customer: newCustomer });
  } else {
    res.status(422).json({ message: "The Fun begins!!!" });
  }
}
