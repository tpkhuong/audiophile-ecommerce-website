import React from "react";
import SummaryItemStyles from "../../styles/Checkout/SummaryItem.module.css";

function SummaryItem({ children, ...props }) {
  const { name, price, quantity, imageSrc, imageAlt } = props;
  return (
    <div className={SummaryItemStyles[`item-wrapper`]}>
      {/* img wrapper */}
      <div className={SummaryItemStyles[`img-wrapper`]}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
      {/* title and price */}
      <div className={SummaryItemStyles[`title-price-wrapper`]}>
        <span className={SummaryItemStyles[`title`]}>{name}</span>
        <span className={SummaryItemStyles[`dollar-sign-price-wrapper`]}>
          <span className={SummaryItemStyles[`dollar-sign`]}>$</span>
          <span className={SummaryItemStyles[`price`]}>{price}</span>
        </span>
      </div>
      {/* quantity */}
      <div className={SummaryItemStyles[`quantity`]}>
        <span>x</span>
        <span className={SummaryItemStyles[`quantity-digit`]}>{quantity}</span>
      </div>
    </div>
  );
}

export default SummaryItem;
