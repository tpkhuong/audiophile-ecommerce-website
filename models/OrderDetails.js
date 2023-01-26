import mongoose from "mongoose";

const OrderDetailsSchema = new mongoose.Schema(
  {
    customer: {
      // object will have properties customer email and customer id
      type: Object,
    },
    billingAddress: {
      type: Object,
    },
    shippingAddress: {
      type: Object,
    },
    summaryPrices: {
      type: Object,
    },
    orderNumber: {
      type: String,
    },
    orderedItems: {
      type: Array,
    },
    payment: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.OrderDetail ||
  mongoose.model("OrderDetail", OrderDetailsSchema);
