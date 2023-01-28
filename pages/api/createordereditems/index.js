import dbConnect from "../../../config/database";
import OrderItem from "../../../models/OrderItem";

export default async function createOrderedItemHandler(req, res) {
  // pass in customerResult to this func call
  const { method, body } = req;

  if (method != "POST") return;
  const { purchaser, items } = body;
  const {
    customer: { name, email, _id },
  } = purchaser;

  // purchaser is the return data from /api/customer which is a json with message and customer properties

  await dbConnect();

  const itemsResult = await Promise.all(
    items.map(async function makeItems(item) {
      // algorithm in here is asynchronous
      // algorithm outside is synchronous
      // purchaser.name or email or _id will be undefined
      const {
        item_quantity,
        image_src,
        price,
        name: { order_record },
      } = item;
      const quantityNumType = Number(item_quantity);
      const createdOrderedItems = await OrderItem.create({
        name: order_record,
        price: price.order_record,
        quantity: quantityNumType,
        image: image_src,
        purchaser: {
          name,
          email,
          id: _id,
        },
      });
      return createdOrderedItems;
    })
  );

  if (itemsResult) {
    res.status(200).json({ message: "Items created!", items: itemsResult });
  } else {
    res.status(400).json({ message: "What we doing here?" });
  }
}
