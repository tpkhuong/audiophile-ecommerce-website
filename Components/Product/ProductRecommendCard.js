import React from "react";
import ProductCardStyles from "../../styles/Product/ProductRecommendCard.module.css";
import ProductButton from "../shared/ProductButton";

function ProductRecommendCard({ children, ...props }) {
  return (
    <div className={ProductCardStyles[`card-wrapper`]}>
      {/* img-wrapper */}
      <div className={ProductCardStyles[`img-wrapper`]}>
        <picture>
          <source media="(min-width: 1440px)" srcSet={props.desktop} />
          <source media="(min-width: 768px)" srcSet={props.tablet} />
          <img src={props.mobile} alt={props.text} />
        </picture>
      </div>
      {/* title */}
      <h3 className={ProductCardStyles[`card-title`]}>{props.name}</h3>
      {/* see product component */}
      <ProductButton
        productPage={`/${props.itemParams.category}/${props.itemParams.product}`}
        fgBgColor="orange-white"
      />
    </div>
  );
}

export default ProductRecommendCard;
