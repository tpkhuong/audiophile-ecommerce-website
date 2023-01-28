import React from "react";
import ProductImgGridStyles from "../../styles/Product/ProductImageGrid.module.css";

function ProductImageGrid({ children, ...props }) {
  // destructure the "gallery" obj of data.json file
  const { first, second, third } = props.galleryImgData;
  // parent container of these three divs will control the grid
  return (
    <React.Fragment>
      {/* top left */}

      <div className={ProductImgGridStyles[`two-row-left`]}>
        <div className={ProductImgGridStyles[`top-left`]}>
          <picture>
            <source media="(min-width: 1440px)" srcSet={first.desktop} />
            <source media="(min-width: 768px)" srcSet={first.tablet} />
            <img src={first.mobile} alt={first.text} />
          </picture>
        </div>
        {/* bottom left */}
        <div className={ProductImgGridStyles[`bottom-left`]}>
          <picture>
            <source media="(min-width: 1440px)" srcSet={second.desktop} />
            <source media="(min-width: 768px)" srcSet={second.tablet} />
            <img src={second.mobile} alt={second.text} />
          </picture>
        </div>
      </div>
      {/* large right */}
      <div className={ProductImgGridStyles[`large-right`]}>
        <picture>
          <source media="(min-width: 1440px)" srcSet={third.desktop} />
          <source media="(min-width: 768px)" srcSet={third.tablet} />
          <img src={third.mobile} alt={third.text} />
        </picture>
      </div>
    </React.Fragment>
  );
}

export default ProductImageGrid;
