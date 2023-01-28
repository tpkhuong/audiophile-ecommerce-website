import React from "react";
import FeatureProductStyles from "../../styles/Home/FeatureProducts.module.css";
import ProductButton from "../shared/ProductButton";

function FeatureProducts({ children, ...props }) {
  return (
    <article className={FeatureProductStyles[`featured-product-container`]}>
      {/* large top */}
      <div className={FeatureProductStyles[`large-single-column`]}>
        {/* speaker img */}
        <div className={FeatureProductStyles[`speaker-img-wrapper`]}>
          <picture>
            <source
              media="(min-width: 1440px)"
              srcSet="/home/desktop/image-speaker-zx9.png"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/home/tablet/image-speaker-zx9.png"
            />
            <img
              src="/home/mobile/image-speaker-zx9.png"
              alt="Single Black speaker with large white sub woofer"
            />
          </picture>
        </div>
        {/* text-content */}
        <div className={FeatureProductStyles[`large-text-content`]}>
          <h2 className={FeatureProductStyles[`large-title`]}>ZX9 SPEAKER</h2>
          <p className={FeatureProductStyles[`description`]}>
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          {/* see product */}
          <ProductButton productPage="/speakers/zx9" fgBgColor="black-white" />
        </div>
      </div>
      {/* middle: use background img */}
      <div className={FeatureProductStyles[`small-single-column`]}>
        <div className={FeatureProductStyles[`single-title-button-wrapper`]}>
          <h2 className={FeatureProductStyles[`single-title`]}>ZX7 SPEAKER</h2>
          {/* see product */}
          <ProductButton productPage="/speakers/zx7" fgBgColor="basic-btn" />
        </div>
      </div>
      {/* two column */}
      <div className={FeatureProductStyles[`two-column`]}>
        <div className={FeatureProductStyles[`two-column-img-wrapper`]}>
          <picture>
            <source
              media="(min-width: 1440px)"
              srcSet="/home/desktop/image-earphones-yx1.jpg"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/home/tablet/image-earphones-yx1.jpg"
            />
            <img
              src="/home/mobile/image-earphones-yx1.jpg"
              alt="Two black wireless earphones in round charing case."
            />
          </picture>
        </div>
        <div
          className={FeatureProductStyles[`two-column-title-button-wrapper`]}
        >
          <h2 className={FeatureProductStyles[`two-column-title`]}>
            YX1 EARPHONES
          </h2>
          {/* see product */}
          <ProductButton
            productPage="/earphones/yx1wireless"
            fgBgColor="basic-btn"
          />
        </div>
      </div>
    </article>
  );
}

export default FeatureProducts;
