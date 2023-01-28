import React from "react";
import CategoryCardStyles from "../../styles/Components/shared/CategoryLinkCard.module.css";
import Link from "next/link";

function CategoryLinkCard({ children, ...props }) {
  return (
    <div role={props.mobileRole} className={CategoryCardStyles[`card-wrapper`]}>
      <div className={CategoryCardStyles[`content-wrapper`]}>
        {/* img and title */}
        <Link href={`/${props.categoryName.toLowerCase()}`}>
          <a className={CategoryCardStyles[`img-title-link`]}>
            <div className={CategoryCardStyles[`img-wrapper`]}>
              <img src={props.imageSrc} alt={props.imgText} />
            </div>
            <h2 className={CategoryCardStyles[`title`]}>
              {props.categoryName}
            </h2>
          </a>
        </Link>
        {/* shop link */}
        <Link href={`/${props.categoryName.toLowerCase()}`}>
          <a id={props.lastItem} className={CategoryCardStyles[`shop-link`]}>
            <span className={CategoryCardStyles[`link-text`]}>SHOP</span>
            <svg
              className={CategoryCardStyles[`link-icon`]}
              width="8"
              height="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.322 1l5 5-5 5"
                stroke="#D87D4A"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default CategoryLinkCard;
