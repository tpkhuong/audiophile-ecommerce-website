import React from "react";
import LogoNavBarLineStyles from "../../styles/Components/shared/LogoNavBarLine.module.css";

function LogoNavBarLine({ children, ...props }) {
  return (
    <React.Fragment>
      <span className={LogoNavBarLineStyles[`line`]}></span>
    </React.Fragment>
  );
}

export default LogoNavBarLine;
