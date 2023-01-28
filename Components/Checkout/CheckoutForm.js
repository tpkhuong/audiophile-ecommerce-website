import React from "react";
import CheckoutFormStyles from "../../styles/Checkout/CheckoutForm.module.css";
import BillingShippingWrapper from "./BillingShippingWrapper";
import PersonalInfo from "./PersonalInfo";
import Payment from "./Payment";
import FormAssistiveLinks from "./FormAssistiveLinks";

// Context here

function CheckoutForm({ children, ...props }) {
  return (
    <article className={CheckoutFormStyles[`form-wrapper`]}>
      {/* input assistive component here */}
      <h2 className={CheckoutFormStyles[`title`]}>Checkout</h2>
      {/* hamburger svg with custm lines element */}
      {/* assistive input links */}
      <FormAssistiveLinks />
      {/* each component will work with same obj in localstorage */}
      {/* Personal Info */}
      <PersonalInfo />
      {/* billing details */}
      {/* shipping details */}
      <BillingShippingWrapper />
      {/* payment details */}
      <Payment />
    </article>
  );
}

export default CheckoutForm;
