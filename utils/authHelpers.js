// import modules
import { hash, compare } from "bcryptjs";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";

/**
 * hashing password and verify helpers
 * **/

export async function hashPassword(password) {
  // bcryptjs.hash(password, salt)
  const hashed = await hash(password, 12);
  return hashed;
}

export async function verifyPassword(loginPassword, hashedPassword) {
  // bcryptjs.compare(password, hashedPassword)
  const isValid = await compare(loginPassword, hashedPassword);

  return isValid;
}

/**
 * create new user
 * **/

// using axios

export async function createUser(email, password) {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/register`,
    {
      email,
      password,
    }
  );

  if (!data) {
    throw new Error(data.message || "Oops! Fun just getting Started!");
  }
  return data;
}

/**
 * submit button handler
 * **/

export async function submitNewUserHandler(event) {
  event.preventDefault();
  const {
    emailInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
    setUser,
    contextRefObj,
  } = this;
  /** 
   * when we call contextRefObj.refRegisterErrorMessage
   * return this obj
   * errors: {
        email: 0,
        password: 0,
      },
      elementRef: {
        email: null,
        password: null,
        confirmPassword: null,
      },
   * **/
  // email error count
  const emailErrorCount =
    emailInputRef.current.value === ""
      ? 1
      : !emailInputRef.current.validity.valid
      ? 1
      : 0;

  // password error count
  const passwordErrorCount = passwordInputRef.current.value === "" ? 1 : 0;
  /**
   * we want to render the assistive message component with inputRef assigned to variables in assistive message component
   * we will call set func from useState before assign values to input parent to show error message.
   * **/
  // we want to call algorithm below to remove assistive text after use correct their errors
  contextRefObj.refRegisterErrorMessage((prevValues) => {
    return {
      ...prevValues,
      errors: {
        email: emailErrorCount,
        password: passwordErrorCount,
      },
      elementRef: {
        email: emailInputRef,
        password: passwordInputRef,
        confirmPassword: confirmPasswordInputRef,
      },
    };
  });
  /**
   * call func from useState here. it is a ref in context
   * **/
  // email input checker
  if (emailErrorCount == 0) {
    emailInputRef.current.parentElement.setAttribute("data-isempty", "");
    emailInputRef.current.parentElement.setAttribute("data-isvalid", "");
    // assign empty string to input aria-describedby
    emailInputRef.current.setAttribute("aria-describedby", "");
  } else {
    // assign correct id of span to aria-describedby
    emailInputRef.current.value === ""
      ? (emailInputRef.current.parentElement.setAttribute(
          "data-isempty",
          "true"
        ),
        emailInputRef.current.setAttribute("aria-describedby", "email-empty"))
      : (emailInputRef.current.parentElement.setAttribute("data-isempty", ""),
        // when we get here email is not empty, checking if email is valid format
        !emailInputRef.current.validity.valid
          ? (emailInputRef.current.parentElement.setAttribute(
              "data-isvalid",
              "false"
            ),
            emailInputRef.current.setAttribute(
              "aria-describedby",
              "email-invalid"
            ))
          : (emailInputRef.current.parentElement.setAttribute(
              "data-isvalid",
              ""
            ),
            emailInputRef.current.setAttribute(
              "aria-describedby",
              "email-empty"
            )));
  }
  // password input checker

  // when passwordErrorCount == 0 we want to check password and confirm password are a match

  if (passwordErrorCount == 0) {
    passwordInputRef.current.parentElement.setAttribute("data-isempty", "");
    // assign empty string to input aria-describedby
    passwordInputRef.current.setAttribute("aria-describedby", "");
    if (
      passwordInputRef.current.value !== confirmPasswordInputRef.current.value
    ) {
      passwordInputRef.current.parentElement.setAttribute(
        "data-ismatchedpassword",
        "false"
      );
      confirmPasswordInputRef.current.parentElement.setAttribute(
        "data-ismatchedpassword",
        "false"
      );
      // assign correct id of span to aria-describedby
      passwordInputRef.current.setAttribute(
        "aria-describedby",
        "password-notmatched"
      );

      confirmPasswordInputRef.current.setAttribute(
        "aria-describedby",
        "confirm-notmatched"
      );
      return;
    } else {
      // run algorithm to create new user and remove "not match" text
      passwordInputRef.current.parentElement.setAttribute(
        "data-ismatchedpassword",
        ""
      );
      confirmPasswordInputRef.current.parentElement.setAttribute(
        "data-ismatchedpassword",
        ""
      );
      // assign empty string to input aria-describedby
      passwordInputRef.current.setAttribute("aria-describedby", "");
      confirmPasswordInputRef.current.setAttribute("aria-describedby", "");
      // run algorithm below when errors is 0
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      // create new user
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        // result will be new user
        const { user } = result;
        if (user) {
          // we want to re-render register page to run code in React.useEffect()
          // then run router.push("login")
          // if we are successful at creating new user
          // redirect to log in page
          setUser(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (passwordErrorCount >= 1) {
    passwordInputRef.current.parentElement.setAttribute("data-isempty", "true");
    // assign correct id of span to aria-describedby
    passwordInputRef.current.setAttribute("aria-describedby", "password-empty");
  }
}

/**
 * login handler
 * **/

export async function loginHandler(event) {
  event.preventDefault();
  const { emailRef, passwordRef, loginFormContextObj } = this;
  const userEnteredEmail = emailRef.current.value;
  const userEnteredPassword = passwordRef.current.value;
  // email error
  const emailErrors =
    userEnteredEmail === "" ? 1 : !emailRef.current.validity.valid ? 1 : 0;
  // password error
  const passwordErrors = userEnteredPassword === "" ? 1 : 0;

  /**
   * call func assign to refToSetFuncForAssistiveText here
   * **/
  // we want to call algorithm below to remove assistive text after use correct their errors
  loginFormContextObj.refToSetFuncForAssistiveText((prevValues) => {
    return {
      ...prevValues,
      errors: {
        email: emailErrors,
        password: passwordErrors,
      },
      elementRef: {
        email: emailRef,
        password: passwordRef,
      },
    };
  });

  // check email
  if (emailErrors == 0) {
    // assign empty string to parent attr data-isempty
    // assign empty string to parent attr data-isvalid
    emailRef.current.parentElement.setAttribute("data-isempty", "");
    emailRef.current.parentElement.setAttribute("data-isvalid", "");
    // assign empty string to input element attr aria-describedby
    emailRef.current.setAttribute("aria-describedby", "");
  }
  if (emailErrors > 0) {
    // // assign empty string to input element attr aria-describedby
    emailRef.current.value === ""
      ? (emailRef.current.parentElement.setAttribute("data-isempty", "true"),
        emailRef.current.setAttribute("aria-describedby", "login-empty"))
      : (emailRef.current.parentElement.setAttribute("data-isempty", ""),
        !emailRef.current.validity.valid)
      ? // we get here email is not empty string and its invalid
        (emailRef.current.parentElement.setAttribute("data-isvalid", "false"),
        emailRef.current.setAttribute("aria-describedby", "login-invalid"))
      : emailRef.current.parentElement.setAttribute("data-isvalid", "");
  }

  // check password
  if (passwordErrors == 0) {
    // assign empty string to parent attr data-isempty
    // assign empty string to input element attr aria-describedby
    passwordRef.current.parentElement.setAttribute("data-isempty", "");
    passwordRef.current.setAttribute("aria-describedby", "");
  }

  if (passwordErrors > 0) {
    // assign empty string to parent attr data-isempty
    // assign empty string to input element attr aria-describedby
    passwordRef.current.parentElement.setAttribute("data-isempty", "true");
    passwordRef.current.setAttribute(
      "aria-describedby",
      "login-password-empty"
    );
  }
  // run algorithm below after validation. when email and password error count is 0
  if (emailErrors == 0 && passwordErrors == 0) {
    const loginResult = await signIn("credentials", {
      callbackUrl: "/",
      email: userEnteredEmail,
      password: userEnteredPassword,
    });
  }
}

/**
 * logout handler
 * **/

export function logoutHandler(event) {
  signOut();
}
