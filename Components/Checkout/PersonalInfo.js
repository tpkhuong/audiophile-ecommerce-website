import React from "react";
import PersonalInfoStyles from "../../styles/Checkout/PersonalInfo.module.css";
import { personalInputListener } from "../../utils/checkoutHelpers";
import { ErrorMessageContext } from "../../pages/checkout/index";

function PersonalInfo({ children, ...props }) {
  // changing email text color to red
  // const emailErrorColor = React.useRef();
  // declare ref variables
  const personalNameRef = React.useRef();
  const personalEmailRef = React.useRef();
  const personalPhoneNumRef = React.useRef();

  // get context obj created in checkout page
  const { personal } = React.useContext(ErrorMessageContext);
  // assign ref to context obj created using React.createContext in checkout page
  personal.name = personalNameRef;
  personal.email = personalEmailRef;
  personal.phoneNum = personalPhoneNumRef;
  /** 
 * localStorage.getItem("personalData") == null
        ? { name: "", email: "", phoneNumber: "" }
        : JSON.parse(localStorage.getItem("personalData"));
 * **/

  React.useEffect(() => {
    // check if cached data obj is in local storage
    // we want to call local storage getitem once in navlisthelper
    const localStorageData =
      localStorage.getItem("cachedUserInputs") == null
        ? null
        : JSON.parse(localStorage.getItem("cachedUserInputs"));
    const personalValuesFromLocalStorage =
      localStorageData == null ? null : localStorageData.personalInfo;
    // dont need to call use state since we have a ref to the inputs
    // due to useRef we can set the value on inputs using ref.current.value
    // in useEffect
    personalNameRef.current.value = !personalValuesFromLocalStorage
      ? ""
      : personalValuesFromLocalStorage.name;
    personalEmailRef.current.value = !personalValuesFromLocalStorage
      ? ""
      : personalValuesFromLocalStorage.email;
    personalPhoneNumRef.current.value = !personalValuesFromLocalStorage
      ? ""
      : personalValuesFromLocalStorage.phoneNumber;
    // check if inputs are valid
    // name
    personalNameRef.current.value === ""
      ? (personalNameRef.current.parentElement.setAttribute(
          "data-needuserattention",
          "true"
        ),
        personalNameRef.current.setAttribute(
          "aria-describedby",
          "name-notaccepted"
        ))
      : (personalNameRef.current.parentElement.setAttribute(
          "data-needuserattention",
          "false"
        ),
        personalNameRef.current.setAttribute(
          "aria-describedby",
          "name-accepted"
        ));
    // email
    personalEmailRef.current.value === ""
      ? (personalEmailRef.current.parentElement.setAttribute(
          "data-isempty",
          "true"
        ),
        personalEmailRef.current.setAttribute(
          "aria-describedby",
          "email-isempty"
        ))
      : (!personalEmailRef.current.validity.valid,
        personalEmailRef.current.parentElement.setAttribute("data-isempty", ""))
      ? (personalEmailRef.current.parentElement.setAttribute(
          "data-needuserattention",
          "true"
        ),
        personalEmailRef.current.setAttribute(
          "aria-describedby",
          "email-notaccepted"
        ))
      : (personalEmailRef.current.parentElement.setAttribute(
          "data-needuserattention",
          "false"
        ),
        personalEmailRef.current.setAttribute(
          "aria-describedby",
          "email-accepted"
        ));
    // phone number
    personalPhoneNumRef.current.value === ""
      ? (personalPhoneNumRef.current.parentElement.setAttribute(
          "data-isempty",
          "true"
        ),
        personalPhoneNumRef.current.setAttribute(
          "aria-describedby",
          "phone-number-isempty"
        ))
      : (!personalPhoneNumRef.current.validity.valid,
        personalPhoneNumRef.current.parentElement.setAttribute(
          "data-isempty",
          ""
        ))
      ? (personalPhoneNumRef.current.parentElement.setAttribute(
          "data-needuserattention",
          "true"
        ),
        personalPhoneNumRef.current.setAttribute(
          "aria-describedby",
          "phone-notaccepted"
        ))
      : (personalPhoneNumRef.current.parentElement.setAttribute(
          "data-needuserattention",
          "false"
        ),
        personalPhoneNumRef.current.setAttribute(
          "aria-describedby",
          "phone-accepted"
        ));
  }, []);

  return (
    // declare max-width 730px and padding-inline 48px on parent elemnt of
    // personalinfo, billing/shipping and payment component
    <React.Fragment>
      {/* use fieldset and legend */}
      <fieldset className={PersonalInfoStyles[`personal-fieldset`]}>
        <legend className={PersonalInfoStyles[`title`]}>
          Personal Contact
        </legend>
        <article
          onChange={personalInputListener}
          className={PersonalInfoStyles[`personal-wrapper`]}
        >
          <div
            data-needuserattention="true"
            className={PersonalInfoStyles[`name`]}
          >
            <label htmlFor="personal-name">Name</label>
            <input
              ref={personalNameRef}
              type="text"
              id="personal-name"
              placeholder="John Doe"
              required
              aria-describedby="name-notaccepted"
            />
            <span
              id="name-notaccepted"
              className={PersonalInfoStyles[`error-text`]}
            >
              CAN'T BE EMPTY
            </span>
            <span
              id="name-accepted"
              className={PersonalInfoStyles[`correct-text`]}
            >
              NOT EMPTY
            </span>
          </div>
          <div
            data-isempty="true"
            data-needuserattention=""
            className={PersonalInfoStyles[`email`]}
          >
            <label htmlFor="personal-email">Email Address</label>
            <input
              ref={personalEmailRef}
              type="email"
              id="personal-email"
              placeholder="johndoe@yahoo.com"
              required
              className={PersonalInfoStyles[`email-input`]}
              aria-describedby="email-isempty"
            />
            <span
              id="email-isempty"
              className={PersonalInfoStyles[`empty-error`]}
            >
              CAN'T BE EMPTY
            </span>
            <span
              id="email-notaccepted"
              className={PersonalInfoStyles[`error-text`]}
            >
              WRONG FORMAT
            </span>
            <span
              id="email-accepted"
              className={PersonalInfoStyles[`correct-text`]}
            >
              ACCEPTED
            </span>
          </div>
          <div
            data-isempty="true"
            data-needuserattention=""
            className={PersonalInfoStyles[`phone-number`]}
          >
            <label htmlFor="personal-phone-number">Phone Number</label>
            <input
              ref={personalPhoneNumRef}
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              id="personal-phone-number"
              required
              placeholder="888-888-8888"
              aria-describedby="phone-number-isempty"
            />
            <span
              id="phone-number-isempty"
              className={PersonalInfoStyles[`empty-error`]}
            >
              CAN'T BE EMPTY
            </span>
            <span
              id="phone-notaccepted"
              className={PersonalInfoStyles[`error-text`]}
            >
              WRONG FORMAT
            </span>
            <span
              id="phone-accepted"
              className={PersonalInfoStyles[`correct-text`]}
            >
              ACCEPTED
            </span>
          </div>
        </article>
      </fieldset>
    </React.Fragment>
  );
}

export default PersonalInfo;
