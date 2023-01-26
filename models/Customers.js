/**
 * create customer in submitform handler
 * use email to find user id in user collection
 * **/

import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    orders: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    physicalAddress: {
      type: Array,
    },
    billingAddress: {
      type: Array,
    },
    shippingAddress: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);
