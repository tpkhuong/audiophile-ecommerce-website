/**
 * create user in register form
 * use email to find customer id in customer collection
 * **/
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
