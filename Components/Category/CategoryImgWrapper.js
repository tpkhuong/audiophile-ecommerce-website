import React from "react";
import CategoryImgComponentStyles from "../../styles/Category/CategoryImgWrapper.module.css";

function CategoryImg({ children, ...props }) {
  return (
    <div className={CategoryImgComponentStyles[`img-wrapper`]}>
      <picture>
        <source media="(min-width: 1440px)" srcSet={`${props.desktopSize}`} />
        <source media="(min-width: 768px)" srcSet={`${props.tabletSize}`} />
        <img src={`${props.mobileSize}`} alt={`${props.text}`} />
      </picture>
    </div>
  );
}

export default CategoryImg;
