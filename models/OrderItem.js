import mongoose from "mongoose";

/**
 * create order item in showordermodal before making call to createplaceorder api
 * **/

const OrderItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    image: {
      type: String,
    },
    purchaser: {
      // object will have properties customer name, customer email and customer id
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.models.OrderItem ||
  mongoose.model("OrderItem", OrderItemSchema);
