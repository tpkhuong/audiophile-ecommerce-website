import React from "react";
import BillShipWrapperStyles from "../../styles/Checkout/BillingShippingWrapper.module.css";
import { ErrorMessageContext } from "../../pages/checkout/index";
import Billing from "./Billing";
import Shipping from "./Shipping";
import ToggleSameAddress from "./ToggleSameAddress";

function BillingShippingWrapper({ children, ...props }) {
  // get context ref obj
  const { billing, shipping, sameAddressInputRef, toggleObj } =
    React.useContext(ErrorMessageContext);
  return (
    <article className={BillShipWrapperStyles[`style-wrapper`]}>
      <Billing
        refObjForBilling={{ billing, shipping, sameAddressInputRef, toggleObj }}
      />
      {/* different approach for a11y */}
      <ToggleSameAddress
        refObjForToggleBtn={{
          billing,
          shipping,
          sameAddressInputRef,
          toggleObj,
        }}
      />
      <Shipping
        refObjForShipping={{
          billing,
          shipping,
          sameAddressInputRef,
          toggleObj,
        }}
      />
      {/* different approach for a11y */}
    </article>
  );
}

export default BillingShippingWrapper;
