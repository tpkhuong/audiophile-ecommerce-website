import React from "react";
import ProductImgWrapperStyles from "../../styles/Product/ProductImgWrapper.module.css";

function ProductImgWrapper({ children, ...props }) {
  // image property from data.json call prop imageSrcObj
  // pass in image obj of data.json then destructure in this component
  // which means we pass in one props instead of four
  const { mobile, tablet, desktop, text } = props.imageSrcObj;
  return (
    <div className={ProductImgWrapperStyles[`img-wrapper`]}>
      <picture>
        <source media="(min-width: 1440px)" srcSet={desktop} />
        <source media="(min-width: 768px)" srcSet={tablet} />
        <img src={mobile} alt={text} />
      </picture>
    </div>
  );
}

export default ProductImgWrapper;
