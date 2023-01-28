import React from "react";
import ProductFeaturesStyles from "../../styles/Product/ProductFeatures.module.css";

function ProductFeatures({ children, ...props }) {
  {
    /* pass in feature data from data.json. use split method to make an array with two paragraphs */
  }
  const [top, bottom] = props.productText.split("\n\n");
  return (
    <div className={ProductFeaturesStyles[`features-textcontent`]}>
      <h2 className={ProductFeaturesStyles[`title`]}>Features</h2>
      {/* use destructuring on array of paragraphs: [top,bottom] */}
      <p className={ProductFeaturesStyles[`top`]}>{top}</p>
      <p className={ProductFeaturesStyles[`bottom`]}>{bottom}</p>
    </div>
  );
}

export default ProductFeatures;
