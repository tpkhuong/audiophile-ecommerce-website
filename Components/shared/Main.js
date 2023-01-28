import React from "react";
import MainStyles from "../../styles/Components/shared/Main.module.css";

function Main({ children, ...props }) {
  return (
    <main
      data-checkoutpage={props.isDarkerBgTrue}
      id={props.isLoginOrRegister}
      role="main"
      className={MainStyles[`main`]}
    >
      {children}
    </main>
  );
}

export default Main;
