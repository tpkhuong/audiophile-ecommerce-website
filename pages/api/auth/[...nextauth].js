/**
 * mongodb with mongoose
 * **/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../utils/authHelpers";
import dbConnect from "../../../config/database";
import User from "../../../models/Users";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // connect to database
        await dbConnect();
        // get users collection
        // find user
        const foundUser = await User.findOne({
          email: credentials.email,
        });

        // if user doesnt exist throw error
        if (!foundUser) {
          throw new Error("User not found!");
        }
        // verify password

        const isPasswordValid = await verifyPassword(
          credentials.password,
          foundUser.password
        );
        // if password not valid throw error
        if (!isPasswordValid) {
          throw new Error(
            `Could not log user with email: ${credentials.email} in.`
          );
        }
        // return user
        return { email: foundUser.email };
      },
    }),
  ],
});
