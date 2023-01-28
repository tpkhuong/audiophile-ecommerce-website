import React from "react";
import ProductTextPriceInfoStyles from "../../styles/Product/ProductTextPriceInfo.module.css";
import AddCart from "./AddCartContainer";
import { addCommasToPrice } from "../../utils/helpers";

function ProductTextPriceInfo({ children, ...props }) {
  // use variable/identifier to build string for cart img
  const nameForImgSrc = props.imgSrcName;
  // using useRef to save reference to price and quantity of product for cart component
  // newProduct, price, description from data.json
  // convert price to string form here
  const priceInStrForm = addCommasToPrice(props.price);
  const propsForAddToCartBtn = {
    nameForImgSrc,
    priceInStrForm,
    price: props.price,
    name: props.title,
    imgAltText: props.altText,
  };
  return (
    <div
      data-isnew={props.newProduct}
      className={ProductTextPriceInfoStyles[`info-content-wrapper`]}
    >
      <span className={ProductTextPriceInfoStyles[`new-product`]}>
        new product
      </span>
      {/* use min-content */}
      <h2 className={ProductTextPriceInfoStyles[`title`]}>
        {props.title}
        {/* <span className={ProductTextPriceInfoStyles[`product-title`]}>
          {props.product}
        </span>
        <span className={ProductTextPriceInfoStyles[`category-title`]}>
          {props.category}
        </span> */}
      </h2>
      <p className={ProductTextPriceInfoStyles[`description`]}>
        {props.description}
      </p>
      <div className={ProductTextPriceInfoStyles[`price-container`]}>
        <span className={ProductTextPriceInfoStyles[`dollar-sign`]}>$</span>
        <span data-productprice className={ProductTextPriceInfoStyles[`price`]}>
          {priceInStrForm}
        </span>
      </div>
      {/* add cart component */}
      {/* we will still pass props to AddCart component */}
      {/* because we plan to use it again for summary component in checkout page */}
      <AddCart objOfValues={propsForAddToCartBtn} />
    </div>
  );
}

export default ProductTextPriceInfo;
