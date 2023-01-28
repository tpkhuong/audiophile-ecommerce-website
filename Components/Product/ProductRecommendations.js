import React from "react";
import ProductRecommendationsStyles from "../../styles/Product/ProductRecommendations.module.css";
import ProductRecommendCard from "./ProductRecommendCard";

function ProductRecommendations({ children, ...props }) {
  // passing on array assign to "others"
  // destructure array using [first, second, third]
  const [first, second, third] = props.recommendations;
  return (
    <article
      className={ProductRecommendationsStyles[`recommendation-container`]}
    >
      {/* section-title */}
      <h2 className={ProductRecommendationsStyles[`section-title`]}>
        you may also like
      </h2>
      {/* cards-container */}
      <div className={ProductRecommendationsStyles[`cards-container`]}>
        {/* first card*/}
        <ProductRecommendCard
          desktop={first.image.desktop}
          tablet={first.image.tablet}
          mobile={first.image.mobile}
          text={first.text}
          name={first.name}
          itemParams={first.url}
        />
        {/* second card*/}
        <ProductRecommendCard
          desktop={second.image.desktop}
          tablet={second.image.tablet}
          mobile={second.image.mobile}
          text={second.text}
          name={second.name}
          itemParams={second.url}
        />
        {/* third card*/}
        <ProductRecommendCard
          desktop={third.image.desktop}
          tablet={third.image.tablet}
          mobile={third.image.mobile}
          text={third.text}
          name={third.name}
          itemParams={third.url}
        />
      </div>
    </article>
  );
}

export default ProductRecommendations;
