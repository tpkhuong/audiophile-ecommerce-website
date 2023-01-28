/**
 * mongoose and mongodb
 * **/

import dbConnect from "../../../config/database";
import CartItem from "../../../models/CartItems";

export default async function CartItemHandler(req, res) {
  const { method } = req;
  // connect to db
  await dbConnect();

  if (method == "POST") {
    const { username, items, total_price } = req.body;
    const userInDatabse = await CartItem.findOne({ username: "Deadpool" });
    if (userInDatabse) {
      res
        .status(200)
        .json({ message: "Item already in database", userInDatabse });
      return;
    } else {
      //   if username is not found, make create cart item data
      const cartData = await CartItem.create({
        username,
        items,
        total_price,
      });
      // when we make a POST request to this api
      // return from axios of fetch call will be json below
      res.status(200).json({ message: "Item added", cartData });
    }
  }
}
