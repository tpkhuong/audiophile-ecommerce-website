import React from "react";
import AssistiveLinksStyles from "../../styles/Login/AssistiveLinks.module.css";

export default function AssistiveLinks({ children, ...props }) {
  const loginRefValues = props.loginContext;
  const memoInitialValuesObj = React.useMemo(() => {
    return {
      errors: {
        email: 0,
        password: 0,
      },
      elementRef: {
        email: null,
        password: null,
      },
    };
  }, []);

  const [{ errors, elementRef }, setAssistiveMessage] =
    React.useState(memoInitialValuesObj);

  loginRefValues.refToSetFuncForAssistiveText = setAssistiveMessage;

  return (
    <React.Fragment>
      <div className={AssistiveLinksStyles[`assist-message-wrapper`]}>
        {/* email */}
        <p className={AssistiveLinksStyles[`margin-block-end`]}>
          {!elementRef.email ? null : errors.email > 0 ? (
            elementRef.email.current.value === "" ? (
              <a href="#login-email">{`The email field can't be empty. Please enter a valid email with the @ (at sign).`}</a>
            ) : (
              <a href="#login-email">{`The email format is invalid. Please check email format.`}</a>
            )
          ) : null}
        </p>
        <p>
          {!elementRef.password ? null : errors.password > 0 ? (
            <a href="#login-password">{`The password field is required. Please enter your password to log in.`}</a>
          ) : null}
        </p>
      </div>
    </React.Fragment>
  );
}
