import React from "react";
import CategoryTextContentStyles from "../../styles/Category/CategoryTextContent.module.css";
import ProductButton from "../shared/ProductButton";

function CategoryTextContent({ children, ...props }) {
  return (
    <div
      data-isright={props.rightSide}
      data-isnew={props.isNew}
      className={CategoryTextContentStyles[`text-container`]}
    >
      {/* is new product */}
      <span
        data-isnew={props.isNew}
        className={CategoryTextContentStyles[`new-product`]}
      >
        new product
      </span>
      {/* title */}
      <h2 className={CategoryTextContentStyles[`title`]}>{props.title}</h2>
      {/* description */}
      <p className={CategoryTextContentStyles[`description`]}>
        {props.content}
      </p>
      {/* product button */}
      <ProductButton productPage={props.productUrl} fgBgColor="orange-white" />
    </div>
  );
}

export default CategoryTextContent;
