import React from "react";
import ToggleAddressStyles from "../../styles/Checkout/ToggleSameAddress.module.css";
import { toggleBillingAndShippingAddress } from "../../utils/checkoutHelpers";

export default function ToggleSameAddress({ children, ...props }) {
  const memoizedInitialValues = React.useMemo(() => {
    return {
      isShippingSame: false,
      arrayOfText: [],
    };
  }, []);

  const [{ isShippingSame, arrayOfText }, setShippingSame] = React.useState(
    memoizedInitialValues
  );

  const yesInputRef = React.useRef();
  const noInputRef = React.useRef();

  const {
    billing: billingRef,
    shipping: shippingRef,
    sameAddressInputRef,
    toggleObj,
  } = props.refObjForToggleBtn;

  sameAddressInputRef.yesBtn = yesInputRef;
  sameAddressInputRef.noBtn = noInputRef;

  React.useEffect(() => {
    // get data from localStorage
    const localDataFromStorage =
      localStorage.getItem("cachedUserInputs") == null
        ? null
        : JSON.parse(localStorage.getItem("cachedUserInputs"));
    const yesNoBtnSameAddressValues =
      localDataFromStorage == null
        ? null
        : localDataFromStorage.toggleSameAddressInfo;
    if (!yesNoBtnSameAddressValues) {
      yesInputRef.current.checked = false;
      noInputRef.current.checked = false;
    } else {
      yesInputRef.current.checked = yesNoBtnSameAddressValues.yesInputBtn;
      noInputRef.current.checked = yesNoBtnSameAddressValues.noInputBtn;
    }
  }, []);

  toggleObj.toggleLinkBetweenBillingAndShipping = setShippingSame;
  toggleObj.billingAndShippingSame = isShippingSame;
  return (
    <React.Fragment>
      <div
        onChange={toggleBillingAndShippingAddress.bind({
          yesInputRef,
          noInputRef,
          billingRef,
          shippingRef,
          setShippingSame,
          arrayOfText,
        })}
        className={ToggleAddressStyles[`billing-shipping-radio-btns`]}
      >
        <span className={ToggleAddressStyles[`question`]}>
          Is Shipping Address same as Billing Address?
        </span>
        <p className={ToggleAddressStyles[`reminder`]}>Friendly Reminder:</p>
        <p
          className={`${ToggleAddressStyles[`reminder`]} ${
            ToggleAddressStyles[`margin-block-end`]
          }`}
        >
          Selecting <span className={ToggleAddressStyles[`bold`]}>"YES"</span>{" "}
          button, will copy current inputs of billing section to inputs of
          shipping section.{" "}
        </p>
        <p
          className={`${ToggleAddressStyles[`reminder`]} ${
            ToggleAddressStyles[`margin-block-end`]
          }`}
        >
          Selecting <span className={ToggleAddressStyles[`bold`]}>"NO"</span>{" "}
          button after{" "}
          <span className={ToggleAddressStyles[`bold`]}>"YES"</span> button was
          selected will{" "}
          <span className={ToggleAddressStyles[`bold`]}>REMOVE ALL</span>{" "}
          information entered in shipping section.
        </p>
        <div className={[ToggleAddressStyles[`radio-input`]]}>
          <input
            ref={yesInputRef}
            id="shipping-same"
            type="radio"
            name="billing-shipping"
          />
          <label htmlFor="shipping-same">Yes</label>
        </div>
        <div className={[ToggleAddressStyles[`radio-input`]]}>
          <input
            ref={noInputRef}
            id="shipping-different"
            type="radio"
            name="billing-shipping"
          />
          <label htmlFor="shipping-different">No</label>
        </div>
      </div>
      {/* check billing inputs is either not empty or correct format */}
      <div className={ToggleAddressStyles[`checking-same-address-validation`]}>
        {arrayOfText.length == 0 ? null : (
          <React.Fragment>
            <span>Please make sure the billing</span>
            {arrayOfText.map((element, index) => {
              return (
                <a
                  href={
                    element.includes("zip")
                      ? `#billing-zip`
                      : `#billing-${element}`
                  }
                  key={Math.random() * index}
                >
                  {index == arrayOfText.length - 1
                    ? ` ${element} `
                    : ` ${element}, `}
                </a>
              );
            })}
            <span>input is not empty and check format is correct.</span>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
