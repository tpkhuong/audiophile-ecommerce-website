import React from "react";
import ProductButtonStyles from "../../styles/Components/shared/ProductButton.module.css";
import Link from "next/link";
import { getCurrentUrl } from "../../utils/helpers";

function ProductButton({ children, ...props }) {
  return (
    <Link href={props.productPage}>
      <a
        onClick={getCurrentUrl}
        className={`${ProductButtonStyles[`${props.fgBgColor}`]} ${
          ProductButtonStyles[`general`]
        }`}
      >
        SEE PRODUCT
      </a>
    </Link>
  );
}

export default ProductButton;
