import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please enter Username"],
  },
  items: {
    type: Array,
  },
  total_price: {
    type: Number,
  },
});

export default mongoose.models.CartItem ||
  mongoose.model("CartItem", CartItemSchema);
