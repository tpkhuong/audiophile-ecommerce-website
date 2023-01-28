import React from "react";
import OrderModalStyles from "../../styles/Checkout/ConfirmedOrderModalWrapper.module.css";
import OrderModal from "./OrderModal";
import { showOrderModal } from "../../utils/orderHelpers";
import { ErrorMessageContext } from "../../pages/checkout";

export default function OrderModalWrapper({ children, ...props }) {
  const [isOrderPlaced, setOrderPlaced] = React.useState(false);
  // when isOrderPlaced is changed react will re-render this component
  // it is fine because this component is only the button and the order modal
  const refValues = React.useContext(ErrorMessageContext);
  return (
    <React.Fragment>
      {/* continue and pay btn */}
      {/* check all inputs validity */}
      <button
        // aria-label="confirm order"
        className={OrderModalStyles[`place-order-btn`]}
        onClick={showOrderModal.bind({
          setOrderPlaced,
          refValues,
          objForOrderDetails: props.valuesForOrderDetails,
          itemsArray: props.itemsInfo,
        })}
      >
        continue & pay
      </button>
      {/* User order modal when user click on continue and pay */}
      {/* order modal needs items and grand total from summary component */}
      {/* only render modal if isOrderPlaced is truthy and length of props.itemsInfo */}
      {/* greater than 0 */}
      {isOrderPlaced && props.itemsInfo.length > 0 ? (
        <OrderModal
          arrayOfItems={props.itemsInfo}
          funcForHideModal={setOrderPlaced}
          grandPrice={props.grandTotalValue}
        />
      ) : null}
    </React.Fragment>
  );
}
