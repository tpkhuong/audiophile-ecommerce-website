import React from "react";
import ShippingStyles from "../../styles/Checkout/Shipping.module.css";
import { arrayOfStates } from "../../src/storage";
import {
  valuesForBillingShippingComponent,
  billingShippingInputListener,
} from "../../utils/checkoutHelpers";

function Shipping({ children, ...props }) {
  // declare ref variables
  const shippingAddressRef = React.useRef();
  const shippingCityRef = React.useRef();
  const shippingStateRef = React.useRef();
  const shippingZipCodeRef = React.useRef();
  const shippingCountryRef = React.useRef();

  // get context obj created in checkout page
  const { billing, shipping, sameAddressInputRef, toggleObj } =
    props.refObjForShipping;
  // check if data obj is set in local storage
  // assign ref to context obj created using React.createContext in checkout page
  shipping.address = shippingAddressRef;
  shipping.city = shippingCityRef;
  shipping.state = shippingStateRef;
  shipping.zipCode = shippingZipCodeRef;
  shipping.country = shippingCountryRef;

  React.useEffect(() => {
    // get data from local storage
    const shippingDataFromLocal =
      localStorage.getItem("cachedUserInputs") == null
        ? null
        : JSON.parse(localStorage.getItem("cachedUserInputs"));
    const shippingInfoDataFromStorage =
      shippingDataFromLocal == null ? null : shippingDataFromLocal.shippingInfo;
    const shippingRefObj = {
      address: shippingAddressRef,
      city: shippingCityRef,
      state: shippingStateRef,
      zipCode: shippingZipCodeRef,
      country: shippingCountryRef,
    };

    valuesForBillingShippingComponent(
      shippingRefObj,
      shippingInfoDataFromStorage,
      "data-shippinguserattention",
      "shipping"
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
        className={ShippingStyles[`shipping-fieldset`]}
      >
        <legend className={ShippingStyles[`title`]}>Shipping Address</legend>
        <article
          onChange={billingShippingInputListener.bind({
            billing,
            shipping,
            sameAddressInputRef,
            toggleObj,
          })}
          className={ShippingStyles[`shipping-wrapper`]}
        >
          {/* address */}
          <div
            data-shippinguserattention="true"
            className={ShippingStyles[`address`]}
          >
            <label htmlFor="shipping-address">Your Address</label>
            <input
              ref={shippingAddressRef}
              id="shipping-address"
              required
              type="text"
              placeholder="888 Eighth St"
              aria-describedby="shipping-address-notaccepted"
            />
            <span
              id="shipping-address-notaccepted"
              className={ShippingStyles[`error-text`]}
            >
              CAN'T BE EMPTY
            </span>
            <span
              id="shipping-address-accepted"
              className={ShippingStyles[`correct-text`]}
            >
              NOT EMPTY
            </span>
          </div>
          {/* city, state, zip, country */}
          <div className={ShippingStyles[`city-state-zip-country-wrapper`]}>
            {/* city */}
            <div
              data-shippinguserattention="true"
              className={ShippingStyles[`city`]}
            >
              <label htmlFor="shipping-city">City</label>
              <input
                ref={shippingCityRef}
                id="shipping-city"
                required
                type="text"
                placeholder="Los Angeles"
                aria-describedby="shipping-city-notaccepted"
              />
              <span
                id="shipping-city-notaccepted"
                className={ShippingStyles[`error-text`]}
              >
                CAN'T BE EMPTY
              </span>
              <span
                id="shipping-city-accepted"
                className={ShippingStyles[`correct-text`]}
              >
                NOT EMPTY
              </span>
            </div>
            {/* state */}
            <div
              data-shippinguserattention="true"
              className={ShippingStyles[`state`]}
            >
              <label htmlFor="shipping-state">State</label>
              <input
                ref={shippingStateRef}
                id="shipping-state"
                required
                type="text"
                placeholder="California"
                list="shipping-list-of-states"
                aria-describedby="shipping-state-notaccepted"
              />
              <span
                id="shipping-state-notaccepted"
                className={ShippingStyles[`error-text`]}
              >
                CAN'T BE EMPTY
              </span>
              <span
                id="shipping-state-accepted"
                className={ShippingStyles[`correct-text`]}
              >
                NOT EMPTY
              </span>
              <datalist id="shipping-list-of-states">
                {/* loop through arrayOfStates make option element */}
                {arrayOfStates.map(function makeStates(element, index) {
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
              data-shippinguserattention=""
              className={ShippingStyles[`zip`]}
            >
              <label htmlFor="shipping-zip">ZIP Code</label>
              <input
                ref={shippingZipCodeRef}
                id="shipping-zip"
                required
                type="text"
                maxLength="5"
                pattern="[0-9]{5}"
                placeholder="88888"
                aria-describedby="shipping-zip-isempty"
              />
              <span
                id="shipping-zip-isempty"
                className={ShippingStyles[`empty-text`]}
              >
                CAN'T BE EMPTY
              </span>
              <span
                id="shipping-zip-notaccepted"
                className={ShippingStyles[`error-text`]}
              >
                WRONG FORMAT
              </span>
              <span
                id="shipping-zip-accepted"
                className={ShippingStyles[`correct-text`]}
              >
                ACCEPTED
              </span>
            </div>
            {/* country */}
            <div
              data-shippinguserattention="true"
              className={ShippingStyles[`country`]}
            >
              <label htmlFor="shipping-country">Country</label>
              <input
                ref={shippingCountryRef}
                id="shipping-country"
                required
                type="text"
                placeholder="United States"
                aria-describedby="shipping-country-notaccepted"
              />
              <span
                id="shipping-country-notaccepted"
                className={ShippingStyles[`error-text`]}
              >
                CAN'T BE EMPTY
              </span>
              <span
                id="shipping-country-accepted"
                className={ShippingStyles[`correct-text`]}
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

export default Shipping;
