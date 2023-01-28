import React, { useState } from "react";
import OrderedItemStyles from "../../styles/Checkout/OrderedItems.module.css";
import SummaryItem from "./SummaryItem";
import { showHideItems } from "../../utils/orderHelpers";
import { addCommasToPrice } from "../../utils/helpers";

export default function OrderedItems({ children, ...props }) {
  const [showMore, setShowMore] = React.useState(false);
  /**
   * calculate length here
   * **/
  // if user get to this modal, the items array should have items in it
  // firstItem will always be an obj
  const lengthForDisplay = props.cartInfoArr.length;
  const showItemsLength = lengthForDisplay - 1;
  const firstItem = props.cartInfoArr[0];
  const grandTotalWithComma = addCommasToPrice(props.priceValue);
  return (
    <React.Fragment>
      {/* items-total-wrapper */}
      <div className={OrderedItemStyles[`items-total-wrapper`]}>
        {/* items-wrapper */}
        <div className={OrderedItemStyles[`items-wrapper`]}>
          {/* ul>summary items component */}
          <ul className={OrderedItemStyles[`ordered-items-list`]}>
            {/* if items array length is 1 render the first element */}
            {/* if items array length is greater than 1 render all elements */}
            {/* line element */}
            {/* initial value for showMore will be false */}
            {/* we will set showMore value to true in callback attached to onClick */}
            {/* of "view-less-more-btn" */}
            {/* "view-less-more-btn" will show when items array length is greater than 1 */}
            {/* when items array length is 1 we will render one item */}
            {/* when items array length is greater than 1 we will render "view-less-more-btn" */}
            {/* when user click on "view-less" btn changing showMore to true */}
            {/* render all items in array */}
            {!showMore ? (
              <SummaryItem
                name={firstItem.name.display}
                price={firstItem.price.display}
                quantity={firstItem.item_quantity}
                imageSrc={firstItem.image_src}
                imageAlt={firstItem.alt_text}
              />
            ) : (
              props.cartInfoArr.map(function makeOrderedItems(element, index) {
                const { name, price, item_quantity, image_src, alt_text } =
                  element;
                return (
                  <SummaryItem
                    key={Math.random() * index}
                    name={name.display}
                    price={price.display}
                    quantity={item_quantity}
                    imageSrc={image_src}
                    imageAlt={alt_text}
                  />
                );
              })
            )}
          </ul>
          {/* button text based on state and length of items array*/}
          {/* horizontal line */}
          {/* if length of items array is less than equal to 1 dont render this button */}
          {lengthForDisplay <= 1 ? null : (
            <React.Fragment>
              <div className={OrderedItemStyles[`horizontal-line`]}></div>
              <button
                onClick={showHideItems.bind({ showMore, setShowMore })}
                className={OrderedItemStyles[`view-less-more-btn`]}
              >
                {/* showMore will control "view less" or "other items" text */}
                {/* when showMore is false display text will be "other items" */}
                {/* showMore is true text will be view less */}
                {!showMore
                  ? showItemsLength > 1
                    ? `and ${showItemsLength} other items(s)`
                    : "and 1 other item"
                  : "View less"}
              </button>
            </React.Fragment>
          )}
        </div>
        {/* grand-total-wrapper */}
        {/* when items array length is <= 1 padding-block-end: 0px */}
        <div
          data-oneitem={lengthForDisplay == 1 ? "true" : "false"}
          className={OrderedItemStyles[`style-wrapper`]}
        >
          {/* when items array length is <= 1 margin-block: auto */}

          <div className={OrderedItemStyles[`grand-total-wrapper`]}>
            {/* span title */}
            <span className={OrderedItemStyles[`grand-title`]}>
              grand total
            </span>
            {/* grand-total-price */}
            {/* break */}
            <div className={OrderedItemStyles[`spacer`]}></div>
            <span className={OrderedItemStyles[`price-wrapper`]}>
              <span className={OrderedItemStyles[`dollar-sign`]}>$</span>
              <span className={OrderedItemStyles[`price-digit`]}>
                {grandTotalWithComma}
              </span>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
