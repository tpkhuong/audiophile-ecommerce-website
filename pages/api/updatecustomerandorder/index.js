import dbConnect from "../../../config/database";
import Customer from "../../../models/Customers";
import OrderDetails from "../../../models/OrderDetails";

export default async function updateCustomerAndOrderHandler(req, res) {
  const { method, body } = req;
  if (method != "PUT") return;
  const { customer, placedOrder, orderedItems } = body;
  await dbConnect();
  const [foundCustomer, foundPlacedOrder] = await Promise.all([
    Customer.findById(customer._id),
    OrderDetails.findById(placedOrder._id),
  ]);

  // update customer with obj that has orderId and orderNumber properties add obj to orders property of customer schema
  // which is an array
  // since we are adding order obj to array and createcustomer api func will return existing customer or new customer
  // we are confident we dont have to check if customer passed in to this func is returncustomer or newcustomer
  foundCustomer.orders.push({
    orderedId: placedOrder._id,
    orderNumber: placedOrder.orderNumber,
  });
  // update placed orders customer and orderedItems properties
  //   customer properties will be obj with customer email and customer id
  foundPlacedOrder.customer = {
    email: customer.email,
    id: customer._id,
  };
  foundPlacedOrder.orderedItems = orderedItems;
  const [customerUpdateResult, placedOrderUpdateResult] = await Promise.all([
    foundCustomer.save(),
    foundPlacedOrder.save(),
  ]);
  if (customerUpdateResult && placedOrderUpdateResult) {
    res.status(200).json({
      message: "Update was successful",
      update: { customerUpdateResult, placedOrderUpdateResult },
    });
  } else {
    res.status(400).json({ message: "How did we get here?!" });
  }
}
