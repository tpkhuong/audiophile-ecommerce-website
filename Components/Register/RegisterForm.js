import React from "react";
import RegisterFormStyles from "../../styles/Register/RegisterForm.module.css";
import AssistiveMessage from "./AssistiveMessage";
import { submitNewUserHandler } from "../../utils/authHelpers";

export default function RegisterForm({ children, ...props }) {
  const emailInputRef = React.useRef();
  const passwordInputRef = React.useRef();
  const confirmPasswordInputRef = React.useRef();

  const { setUser, RegisterErrorMessageContext } = props.refFromRegisterComp;

  const contextRefObj = React.useContext(RegisterErrorMessageContext);
  return (
    <React.Fragment>
      <form noValidate className={RegisterFormStyles[`form`]}>
        {/* assistive text error component */}
        <AssistiveMessage errorContent={contextRefObj} />
        <div
          data-isempty=""
          data-isvalid=""
          data-isaccepted=""
          className={RegisterFormStyles[`email-wrapper`]}
        >
          {/* email */}
          <label htmlFor="email">Email:</label>
          <span className={RegisterFormStyles[`required-text`]}>
            (required)
          </span>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="johndoe@email.com"
            aria-describedby=""
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
          {/* error message */}
          <span id="email-empty" className={RegisterFormStyles[`error`]}>
            can't be empty
          </span>
          <span id="email-invalid" className={RegisterFormStyles[`invalid`]}>
            not valid
          </span>
          <span id="email-accepted" className={RegisterFormStyles[`accepted`]}>
            Accepted
          </span>
        </div>
        <div
          data-isempty=""
          data-ismatchedpassword=""
          className={RegisterFormStyles[`password-wrapper`]}
        >
          {/* password */}
          <label htmlFor="password">Password:</label>
          <span className={RegisterFormStyles[`required-text`]}>
            (required)
          </span>
          <input
            aria-describedby=""
            ref={passwordInputRef}
            type="password"
            id="password"
            onChange={(event) => {
              // check if event.target.value === confirmPasswordInputRef
              if (event.target.value !== "") {
                if (confirmPasswordInputRef.current.value !== "") {
                  if (
                    event.target.value == confirmPasswordInputRef.current.value
                  ) {
                    // user get here, both password and confirm password input are a match
                    event.target.parentElement.setAttribute(
                      "data-ismatchedpassword",
                      "true"
                    );
                    event.target.setAttribute(
                      "aria-describedby",
                      "password-matched"
                    );
                    // show matched text for confirm password input
                    confirmPasswordInputRef.current.parentElement.setAttribute(
                      "data-ismatchedpassword",
                      "true"
                    );
                    confirmPasswordInputRef.current.setAttribute(
                      "aria-describedby",
                      "confirm-matched"
                    );
                  } else {
                    // user get here, both password and confirm password input are not matching
                    event.target.parentElement.setAttribute(
                      "data-ismatchedpassword",
                      "false"
                    );
                    event.target.setAttribute(
                      "aria-describedby",
                      "password-notmatched"
                    );
                    // confirm password
                    confirmPasswordInputRef.current.parentElement.setAttribute(
                      "data-ismatchedpassword",
                      "false"
                    );
                    confirmPasswordInputRef.current.setAttribute(
                      "aria-describedby",
                      "confirm-notmatched"
                    );
                  }
                } else {
                  // user get her password is not empty but confirm password is empty
                  // not a match
                  event.target.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    "false"
                  );
                  event.target.setAttribute(
                    "aria-describedby",
                    "password-notmatched"
                  );
                  event.target.parentElement.setAttribute("data-isempty", "");
                  // confirm password
                  confirmPasswordInputRef.current.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    "false"
                  );
                  confirmPasswordInputRef.current.setAttribute(
                    "aria-describedby",
                    "confirm-notmatched"
                  );
                }
              } else {
                // password input is empty
                if (confirmPasswordInputRef.current.value === "") {
                  event.target.parentElement.setAttribute(
                    "data-isempty",
                    "true"
                  );
                  event.target.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    ""
                  );
                  event.target.setAttribute(
                    "aria-describedby",
                    "password-empty"
                  );
                  // confirm password
                  confirmPasswordInputRef.current.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    ""
                  );
                  confirmPasswordInputRef.current.setAttribute(
                    "aria-describedby",
                    ""
                  );
                } else {
                  // user get her password is not empty but confirm password is empty
                  // not a match
                  event.target.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    "false"
                  );
                  event.target.setAttribute(
                    "aria-describedby",
                    "password-notmatched"
                  );
                  // confirm password
                  confirmPasswordInputRef.current.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    "false"
                  );
                  confirmPasswordInputRef.current.setAttribute(
                    "aria-describedby",
                    "confirm-notmatched"
                  );
                }
              }
            }}
          />
          {/* error message */}
          <span id="password-empty" className={RegisterFormStyles[`error`]}>
            can't be empty
          </span>
          <span
            id="password-notmatched"
            className={RegisterFormStyles[`not-matched-pw`]}
          >
            not a match
          </span>
          <span
            id="password-matched"
            className={RegisterFormStyles[`matched-pw`]}
          >
            matched
          </span>
        </div>
        <div
          data-ismatchedpassword=""
          className={RegisterFormStyles[`confirm-password-wrapper`]}
        >
          {/* confirm password */}
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            aria-describedby=""
            ref={confirmPasswordInputRef}
            type="password"
            id="confirm-password"
            onChange={(event) => {
              // check if event.target.value === passwordInputRef
              if (event.target.value !== "") {
                if (passwordInputRef.current.value !== "") {
                  // user get here, both password and confirm password input are not empty
                  if (event.target.value == passwordInputRef.current.value) {
                    // user get here, both password and confirm password input are a match
                    event.target.parentElement.setAttribute(
                      "data-ismatchedpassword",
                      "true"
                    );
                    event.target.setAttribute(
                      "aria-describedby",
                      "confirm-matched"
                    );
                    // show matched text for password input
                    passwordInputRef.current.parentElement.setAttribute(
                      "data-ismatchedpassword",
                      "true"
                    );
                    passwordInputRef.current.setAttribute(
                      "aria-describedby",
                      "password-matched"
                    );
                  } else {
                    // user get here, both password and confirm password input are not matching
                    event.target.parentElement.setAttribute(
                      "data-ismatchedpassword",
                      "false"
                    );
                    event.target.setAttribute(
                      "aria-describedby",
                      "confirm-notmatched"
                    );
                    // password ref input
                    passwordInputRef.current.parentElement.setAttribute(
                      "data-ismatchedpassword",
                      "false"
                    );
                    passwordInputRef.current.setAttribute(
                      "aria-describedby",
                      "password-notmatched"
                    );
                  }
                } else {
                  // user get here, both password and confirm password input are not matching
                  event.target.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    "false"
                  );
                  event.target.setAttribute(
                    "aria-describedby",
                    "confirm-notmatched"
                  );
                  // password ref input
                  passwordInputRef.current.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    "false"
                  );
                  passwordInputRef.current.parentElement.setAttribute(
                    "data-isempty",
                    ""
                  );

                  passwordInputRef.current.setAttribute(
                    "aria-describedby",
                    "password-notmatched"
                  );
                }
              } else {
                // confirm password input is empty
                if (passwordInputRef.current.value !== "") {
                  // user get here, both password and confirm password input are not matching
                  event.target.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    "false"
                  );
                  event.target.setAttribute(
                    "aria-describedby",
                    "confirm-notmatched"
                  );
                  // password ref input
                  passwordInputRef.current.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    "false"
                  );
                  passwordInputRef.current.setAttribute(
                    "aria-describedby",
                    "password-notmatched"
                  );
                } else {
                  // both confirm password and password are both empty
                  event.target.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    ""
                  );
                  event.target.setAttribute("aria-describedby", "");
                  // password ref input
                  passwordInputRef.current.parentElement.setAttribute(
                    "data-isempty",
                    "true"
                  );
                  passwordInputRef.current.parentElement.setAttribute(
                    "data-ismatchedpassword",
                    ""
                  );
                  passwordInputRef.current.setAttribute(
                    "aria-describedby",
                    "password-empty"
                  );
                }
              }
            }}
          />
          {/* error message */}
          <span
            id="confirm-notmatched"
            className={RegisterFormStyles[`not-matched-pw`]}
          >
            not a match
          </span>
          <span
            id="confirm-matched"
            className={RegisterFormStyles[`matched-pw`]}
          >
            matched
          </span>
        </div>

        {/* register button */}
        <button
          onClick={submitNewUserHandler.bind({
            emailInputRef,
            passwordInputRef,
            confirmPasswordInputRef,
            setUser,
            contextRefObj,
          })}
          className={RegisterFormStyles[`create-account-btn`]}
        >
          Create Account
        </button>
      </form>
    </React.Fragment>
  );
}
