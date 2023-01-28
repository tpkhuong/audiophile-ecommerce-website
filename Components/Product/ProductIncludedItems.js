import React from "react";
import ProductIncludedItemsStyles from "../../styles/Product/ProductIncludedItems.module.css";
import { upperCaseFirstChar } from "../../utils/helpers";

function ProductIncludedItems({ children, ...props }) {
  // make array of items string
  const itemsInTheBox = props.includedItems.map(function getItems(element) {
    return element.item;
  });
  // array of string with uppercase first char for each word
  const arrayOfUpperCasedFirstChar = upperCaseFirstChar(itemsInTheBox);
  return (
    <div className={ProductIncludedItemsStyles[`title-items`]}>
      {/* title */}
      <h2 className={ProductIncludedItemsStyles[`title`]}>in the box</h2>
      {/* unorderlist */}
      <ul className={ProductIncludedItemsStyles[`items-list`]}>
        {/* each li will have two children. spans */}
        {/* quantity */}
        {/* item */}
        {props.includedItems.map(function items(element, index) {
          const { quantity } = element;
          return (
            <li
              className={ProductIncludedItemsStyles[`quantity-item`]}
              key={Math.random() * index}
            >
              <span className={ProductIncludedItemsStyles[`quantity`]}>
                {quantity}x
              </span>
              {/* get element at index of  */}
              <span className={ProductIncludedItemsStyles[`item`]}>
                {arrayOfUpperCasedFirstChar[index]}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductIncludedItems;
