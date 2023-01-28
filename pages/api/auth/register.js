import { hashPassword } from "../../../utils/authHelpers";
import dbConnect from "../../../config/database";
import Customer from "../../../models/Customers";
import User from "../../../models/Users";

export default async function registerUserHandler(req, res) {
  const { method, body } = req;
  if (method != "POST") return;
  // server console/cli in vs code
  const { email, password } = body;
  // server console/cli in vs code

  // connect to db
  await dbConnect();
  /**
   * use email to find customer in collection if record exist get customer id
   * **/
  // user User models
  const userExist = await User.findOne({ email: email });
  const customerExist = await Customer.findOne({ email: email });
  if (userExist) {
    res.status(422).json({ message: "User already exists!" });
    return;
  }
  // create new user
  // hash password
  const hashedPassword = await hashPassword(password);

  // user User models: get customer id
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });
  /**
   * check if there is a data entry in customer collection with the email the user entered
   * in the register form/page
   * **/
  if (newUser) {
    if (customerExist) {
      // update customer with user id
      customerExist.user = newUser._id;
      // update user with customer id
      newUser.customer = customerExist._id;
      await Promise.all([customerExist.save(), newUser.save()]);
    }
    // if we are successful at creating new user
    // redirect to log in page
    // server console/cli in vs code
    res.status(200).json({ message: "User Created!", user: newUser });
  } else {
    res.status(422).json({ message: "How did we get here?" });
  }
}
