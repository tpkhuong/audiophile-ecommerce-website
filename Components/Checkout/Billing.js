import React from "react";
import BillingStyles from "../../styles/Checkout/Billing.module.css";
import { arrayOfStates } from "../../src/storage";
import {
  valuesForBillingShippingComponent,
  billingShippingInputListener,
} from "../../utils/checkoutHelpers";

function Billing({ children, ...props }) {
  // const { linkInputToShipping } = props;
  // declare ref variables
  const billingAddressRef = React.useRef();
  const billingCityRef = React.useRef();
  const billingStateRef = React.useRef();
  const billingZipCodeRef = React.useRef();
  const billingCountryRef = React.useRef();

  // get context obj created in checkout page
  const { billing, shipping, sameAddressInputRef, toggleObj } =
    props.refObjForBilling;
  // check if data obj is set in local storage
  // assign ref to context obj created using React.createContext in checkout page
  billing.address = billingAddressRef;
  billing.city = billingCityRef;
  billing.state = billingStateRef;
  billing.zipCode = billingZipCodeRef;
  billing.country = billingCountryRef;

  React.useEffect(() => {
    const billingDataFromLocal =
      localStorage.getItem("cachedUserInputs") == null
        ? null
        : JSON.parse(localStorage.getItem("cachedUserInputs"));
    const billingInfoDataFromStorage =
      billingDataFromLocal == null ? null : billingDataFromLocal.billingInfo;
    const billingRefObj = {
      address: billingAddressRef,
      city: billingCityRef,
      state: billingStateRef,
      zipCode: billingZipCodeRef,
      country: billingCountryRef,
    };
    valuesForBillingShippingComponent(
      billingRefObj,
      billingInfoDataFromStorage,
      "data-billinguserattention",
      "billing"
    );
  }, []);
  return (
    // check if cached data obj is in local storage
    // we want to call local storage getitem once in navlisthelper
    /**
     * when user click on yes input btn
     * we want billing inputs and shipping inputs to sync.
     * **/
    <React.Fragment>
      <fieldset
        /* different approach for a11y */
        className={BillingStyles[`billing-fieldset`]}
      >
        <legend className={BillingStyles[`title`]}>Billing Address</legend>
        <article
          onChange={billingShippingInputListener.bind({
            billing,
            shipping,
            sameAddressInputRef,
            toggleObj,
          })}
          className={BillingStyles[`billing-wrapper`]}
        >
          {/* address */}
          {/* add attr data-needsuserattention true */}
          <div
            data-billinguserattention="true"
            className={BillingStyles[`address`]}
          >
            <label htmlFor="billing-address">Your Address</label>
            <input
              ref={billingAddressRef}
              id="billing-address"
              required
              type="text"
              placeholder="888 Eighth St"
              aria-describedby="billing-address-notaccepted"
            />
            {/* add error text */}
            {/* add correct text */}
            <span
              id="billing-address-notaccepted"
              className={BillingStyles[`error-text`]}
            >
              CAN'T BE EMPTY
            </span>
            <span
              id="billing-address-accepted"
              className={BillingStyles[`correct-text`]}
            >
              NOT EMPTY
            </span>
          </div>
          {/* city, state, zip, country */}
          <div className={BillingStyles[`city-state-zip-country-wrapper`]}>
            {/* city */}
            <div
              data-billinguserattention="true"
              className={BillingStyles[`city`]}
            >
              <label htmlFor="billing-city">City</label>
              <input
                ref={billingCityRef}
                id="billing-city"
                required
                type="text"
                placeholder="Los Angeles"
                aria-describedby="billing-city-notaccepted"
              />
              <span
                id="billing-city-notaccepted"
                className={BillingStyles[`error-text`]}
              >
                CAN'T BE EMPTY
              </span>
              <span
                id="billing-city-accepted"
                className={BillingStyles[`correct-text`]}
              >
                NOT EMPTY
              </span>
            </div>
            {/* state */}
            <div
              data-billinguserattention="true"
              className={BillingStyles[`state`]}
            >
              <label htmlFor="billing-state">State</label>
              <input
                ref={billingStateRef}
                id="billing-state"
                required
                type="text"
                placeholder="California"
                list="billing-list-of-states"
                aria-describedby="billing-state-notaccepted"
              />
              <span
                id="billing-state-notaccepted"
                className={BillingStyles[`error-text`]}
              >
                CAN'T BE EMPTY
              </span>
              <span
                id="billing-state-accepted"
                className={BillingStyles[`correct-text`]}
              >
                NOT EMPTY
              </span>
              <datalist id="billing-list-of-states">
                {/* loop through arrayOfStates make option element */}
                {arrayOfStates.map(function makeOptionElements(element, index) {
                  return (
                    <option
                      key={Math.random() * index}
                      value={element}
                    ></option>
                  );
                })}
              </datalist>
            </div>
            {/* zip */}
            <div
              data-isempty="true"
              data-billinguserattention=""
              className={BillingStyles[`zip`]}
            >
              <label htmlFor="billing-zip">ZIP Code</label>
              <input
                ref={billingZipCodeRef}
                id="billing-zip"
                required
                type="text"
                maxLength="5"
                pattern="[0-9]{5}"
                placeholder="88888"
                aria-describedby="billing-zip-isempty"
              />
              <span
                id="billing-zip-isempty"
                className={BillingStyles[`empty-text`]}
              >
                CAN'T BE EMPTY
              </span>
              <span
                id="billing-zip-notaccepted"
                className={BillingStyles[`error-text`]}
              >
                WRONG FORMAT
              </span>
              <span
                id="billing-zip-accepted"
                className={BillingStyles[`correct-text`]}
              >
                ACCEPTED
              </span>
            </div>
            {/* country */}
            <div
              data-billinguserattention="true"
              className={BillingStyles[`country`]}
            >
              <label htmlFor="billing-country">Country</label>
              <input
                ref={billingCountryRef}
                id="billing-country"
                required
                type="text"
                placeholder="United States"
                aria-describedby="billing-country-notaccepted"
              />
              <span
                id="billing-country-notaccepted"
                className={BillingStyles[`error-text`]}
              >
                CAN'T BE EMPTY
              </span>
              <span
                id="billing-country-accepted"
                className={BillingStyles[`correct-text`]}
              >
                NOT EMPTY
              </span>
            </div>
          </div>
        </article>
      </fieldset>
    </React.Fragment>
  );
}

export default Billing;
