import React from "react";
import LoginFormStyles from "../../styles/Login/LoginForm.module.css";
import AssistiveLinks from "./AssistiveLinks";
import { loginHandler } from "../../utils/authHelpers";

export default function LoginForm({ children, ...props }) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  // consume context

  const loginFormContextObj = React.useContext(props.refFromLoginComponent);
  return (
    <React.Fragment>
      <form className={LoginFormStyles[`form`]}>
        {/* assistive message */}
        <AssistiveLinks loginContext={loginFormContextObj} />
        <div
          data-isempty=""
          data-isvalid=""
          data-isaccepted=""
          className={LoginFormStyles[`email-wrapper`]}
        >
          <label htmlFor="">Email:</label>
          <span className={LoginFormStyles[`required`]}>(required)</span>
          <input
            aria-describedby=""
            ref={emailRef}
            id="login-email"
            required
            type="email"
            placeholder="johndoe@email.com"
            onChange={(event) => {
              // if email input is not empty and valid we show accepted
              if (event.target.value !== "") {
                event.target.parentElement.getAttribute("data-isempty") ==
                "true"
                  ? event.target.parentElement.setAttribute(
                      "data-isempty",
                      "false"
                    )
                  : null;
                if (event.target.validity.valid) {
                  event.target.parentElement.getAttribute("data-isaccepted") ==
                    "false" ||
                  event.target.parentElement.getAttribute("data-isaccepted") ===
                    ""
                    ? (event.target.parentElement.setAttribute(
                        "data-isaccepted",
                        "true"
                      ),
                      event.target.parentElement.setAttribute(
                        "data-isvalid",
                        "true"
                      ))
                    : null;
                } else {
                  event.target.parentElement.getAttribute("data-isaccepted") ==
                  "true"
                    ? (event.target.parentElement.setAttribute(
                        "data-isaccepted",
                        "false"
                      ),
                      event.target.parentElement.setAttribute(
                        "data-isvalid",
                        "false"
                      ))
                    : null;
                }
              } else {
                event.target.parentElement.getAttribute("data-isempty") ==
                "false"
                  ? event.target.parentElement.setAttribute(
                      "data-isempty",
                      "true"
                    )
                  : null;

                event.target.parentElement.getAttribute("data-isvalid") ==
                "false"
                  ? event.target.parentElement.setAttribute("data-isvalid", "")
                  : null;
              }
            }}
          />
          <span id="login-empty" className={LoginFormStyles[`error`]}>
            can't be empty
          </span>
          <span id="login-invalid" className={LoginFormStyles[`invalid`]}>
            not valid format
          </span>
          <span id="login-accepted" className={LoginFormStyles[`accepted`]}>
            Accepted
          </span>
        </div>
        <div data-isempty="" className={LoginFormStyles[`password-wrapper`]}>
          <label htmlFor="">Password:</label>
          <span className={LoginFormStyles[`required`]}>(required)</span>
          <input
            aria-describedby=""
            id="login-password"
            ref={passwordRef}
            required
            type="password"
          />
          <span id="login-password-empty" className={LoginFormStyles[`error`]}>
            can't be empty
          </span>
        </div>
        <button
          onClick={loginHandler.bind({
            emailRef,
            passwordRef,
            loginFormContextObj,
          })}
          className={LoginFormStyles[`login-btn`]}
        >
          Log In
        </button>
      </form>
    </React.Fragment>
  );
}
