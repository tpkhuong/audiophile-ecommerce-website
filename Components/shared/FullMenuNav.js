import React from "react";
import FullNavStyles from "../../styles/Components/shared/FullMenuNav.module.css";
import { arrayOfLinkText } from "../../src/storage";
import { cachedCheckoutInputs } from "../../utils/navlistHelper";
import { ErrorMessageContext } from "../../pages/checkout/index";
import Link from "next/link";

function FullMenuNav({ children, ...props }) {
  const refObj = React.useContext(ErrorMessageContext);

  return (
    <nav
      className={FullNavStyles[`desktop-nav`]}
      role="navigation"
      aria-label={props.navLabel}
      data-isfooternav={props.footerNav}
      data-isheadernav={props.headerNav}
    >
      <ul
        role="menubar"
        className={FullNavStyles[`navlist`]}
        onClick={cachedCheckoutInputs.bind({ refObj })}
      >
        {arrayOfLinkText.map(function listitems(element, index) {
          return (
            <li
              key={Math.random() * index}
              role="none"
              className={FullNavStyles[`navitem`]}
            >
              <Link href={index == 0 ? "/" : `/${element}`}>
                {props.current == element ? (
                  <a
                    data-currentpage="true"
                    className={FullNavStyles[`navlink`]}
                    role="menuitem"
                  >
                    {element}
                  </a>
                ) : (
                  <a className={FullNavStyles[`navlink`]} role="menuitem">
                    {element}
                  </a>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default FullMenuNav;
