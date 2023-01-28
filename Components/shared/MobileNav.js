import React from "react";
import MobileStyles from "../../styles/Components/shared/MobileNav.module.css";
import CategoryLinkCard from "./CategoryLinkCard";
import { focusFirstModalElement } from "../../utils/helpers";

function MobileNav({ children, ...props }) {
  return (
    //   bg background
    <div
      className={MobileStyles[`mobile-bg`]}
      data-showmenu="false"
      aria-modal="true"
      role="dialog"
    >
      {/* bg white on nav */}
      <nav
        className={MobileStyles[`mobile-nav`]}
        role="navigation"
        aria-label="secondary"
      >
        <ul role="menubar" className={MobileStyles[`navlist`]}>
          <li role="none" className={MobileStyles[`navitem`]}>
            <CategoryLinkCard
              mobileRole="menuitem"
              imageSrc="/shared/desktop/image-category-thumbnail-headphones.png"
              imgText="Black overhead headphones"
              categoryName="HEADPHONES"
            />
          </li>
          <li role="none" className={MobileStyles[`navitem`]}>
            <CategoryLinkCard
              mobileRole="menuitem"
              imageSrc="/shared/desktop/image-category-thumbnail-speakers.png"
              imgText="Black speaker with white sub woofer"
              categoryName="SPEAKERS"
            />
          </li>
          <li
            onKeyDown={focusFirstModalElement}
            role="none"
            className={MobileStyles[`navitem`]}
          >
            <CategoryLinkCard
              mobileRole="menuitem"
              imageSrc="/shared/desktop/image-category-thumbnail-earphones.png"
              imgText="Round black single wire less earphones"
              categoryName="EARPHONES"
              lastItem="last-element"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileNav;
