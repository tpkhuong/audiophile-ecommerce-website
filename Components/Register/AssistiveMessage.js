import React from "react";
import AssisitiveMessageStyles from "../../styles/Register/AssistiveMessage.module.css";

export default function AssistiveMessage({ children, ...props }) {
  const registerRefValues = props.errorContent;

  const memoInitialValues = React.useMemo(() => {
    return {
      errors: {
        email: 0,
        password: 0,
      },
      elementRef: {
        email: null,
        password: null,
        confirmPassword: null,
      },
    };
  });

  const [{ errors, elementRef }, setErrorMessage] =
    React.useState(memoInitialValues);
  registerRefValues.refRegisterErrorMessage = setErrorMessage;
  return (
    <React.Fragment>
      <div className={AssisitiveMessageStyles[`text-content-wrapper`]}>
        {/* email */}
        <p className={AssisitiveMessageStyles[`margin-block-end`]}>
          {!elementRef.email ? null : errors.email > 0 ? (
            elementRef.email.current.value === "" ? (
              <a href="#email">{`The email field is requied. Please enter a valid email.`}</a>
            ) : (
              <a href="#email">{`Please check the format of the email field. Please use (@) at sign`}</a>
            )
          ) : null}
        </p>
        <p className={AssisitiveMessageStyles[`margin-block-end`]}>
          {!elementRef.password ? null : errors.password > 0 ? (
            elementRef.password.current.value === "" ? (
              <a href="#password">{`The password field is empty. Please enter your unique password.`}</a>
            ) : null
          ) : null}
        </p>
        <p>
          {!elementRef.password &&
          !elementRef.confirmPassword ? null : errors.password === 0 &&
            elementRef.password.current.value !==
              elementRef.confirmPassword.current.value ? (
            <a href="#confirm-password">{`Pleae make sure password and confirm password are the same.`}</a>
          ) : null}
        </p>
        {/* password and confirm password are a match */}
      </div>
    </React.Fragment>
  );
}
