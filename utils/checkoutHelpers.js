export function checkoutSubmitHandler(event) {}

export function toggleBillingAndShippingAddress(event) {
  // get data from local storage
  const localData =
    localStorage.getItem("cachedUserInputs") == null
      ? initialCheckoutInputObjForLocalStorage
      : JSON.parse(localStorage.getItem("cachedUserInputs"));

  const {
    // setBillingShipping,
    setShippingSame,
    arrayOfText,
    yesInputRef,
    noInputRef,
    billingRef,
    shippingRef,
  } = this;
  //   user clicked on yes radio input shipping address same as billing
  if (event.target == yesInputRef.current) {
    /* different approach for a11y */
    // setBillingShipping(false);
    /**
     * when both yes and no input btn are false in local storage
     * and user type values into shipping inputs.
     * shippingInputsHasValue will be true
     * **/
    const shippingInputsHasValue = Object.values(shippingRef).some(
      ({ current }) => {
        return current.value !== "";
      }
    );
    const billingInputsAreEmpty = Object.values(billingRef).every(
      ({ current }) => {
        return current === "";
      }
    );
    if (
      !localData.toggleSameAddressInfo.yesInputBtn &&
      !localData.toggleSameAddressInfo.noInputBtn &&
      shippingInputsHasValue &&
      billingInputsAreEmpty
    ) {
      // we want to run this func when user did not enter any value to billing inputs
      // if user did enter values to billing input, it means
      // user want shipping input values to match billing input values
      // we enter here when user is visiting site for first time
      // and haven't type any data into checkout form inputs
      // or user purchased form us before
      copyShippingInputsValueToBilling(billingRef, shippingRef, localData);
      localData.toggleSameAddressInfo.yesInputBtn = yesInputRef.current.checked;
      localData.toggleSameAddressInfo.noInputBtn = noInputRef.current.checked;
      localStorage.setItem("cachedUserInputs", JSON.stringify(localData));
      return;
    }
    localData.toggleSameAddressInfo.yesInputBtn = yesInputRef.current.checked;
    localData.toggleSameAddressInfo.noInputBtn = noInputRef.current.checked;
    /**
     * we want to check billing inputs validity when user click on yes input btns
     * which means user billing and shipping address are the same.
     * only copy billing input value to shipping input value when billing inputs
     * are valid.
     * **/
    const copiedArray = [].concat(arrayOfText);

    /**
     * since we only copy input from billing to shipping inputs when the billing inputs
     * are valid. we will see shipping input parent data-shippinguserattention to "false"
     * **/
    // address
    billingRef.address.current.value === ""
      ? (copiedArray.push("address"),
        shippingRef.address.current.setAttribute(
          "aria-describedby",
          "shipping-address-notaccepted"
        ))
      : ((shippingRef.address.current.value = billingRef.address.current.value),
        shippingRef.address.current.parentElement.setAttribute(
          "data-shippinguserattention",
          "false"
        )),
      shippingRef.address.current.setAttribute(
        "aria-describedby",
        "shipping-address-accepted"
      );
    // city
    billingRef.city.current.value === ""
      ? (copiedArray.push("city"),
        shippingRef.city.current.setAttribute(
          "aria-describedby",
          "shipping-city-notaccepted"
        ))
      : ((shippingRef.city.current.value = billingRef.city.current.value),
        shippingRef.city.current.parentElement.setAttribute(
          "data-shippinguserattention",
          "false"
        ),
        shippingRef.city.current.setAttribute(
          "aria-describedby",
          "shipping-city-accepted"
        ));
    // state
    billingRef.state.current.value === ""
      ? (copiedArray.push("state"),
        shippingRef.state.current.setAttribute(
          "aria-describedby",
          "shipping-state-notaccepted"
        ))
      : ((shippingRef.state.current.value = billingRef.state.current.value),
        shippingRef.state.current.parentElement.setAttribute(
          "data-shippinguserattention",
          "false"
        ),
        shippingRef.state.current.setAttribute(
          "aria-describedby",
          "shipping-state-accepted"
        ));
    // zip code check for empty and valid format
    /**
     * will use if statement instead of ternary operator
     * **/
    if (billingRef.zipCode.current.value === "") {
      copiedArray.push("zip code");
      shippingRef.zipCode.current.setAttribute(
        "aria-describedby",
        "shipping-zip-isempty"
      );
    } else {
      if (!billingRef.zipCode.current.validity.valid) {
        copiedArray.push("zip code");
        shippingRef.zipCode.current.parentElement.setAttribute(
          "data-shippinguserattention",
          "true"
        );
        shippingRef.zipCode.current.parentElement.setAttribute(
          "data-isempty",
          ""
        );
        shippingRef.zipCode.current.setAttribute(
          "aria-describedby",
          "shipping-zip-notaccepted"
        );
      } else {
        shippingRef.zipCode.current.value = billingRef.zipCode.current.value;
        shippingRef.zipCode.current.parentElement.setAttribute(
          "data-shippinguserattention",
          "false"
        );
        shippingRef.zipCode.current.parentElement.setAttribute(
          "data-isempty",
          ""
        );
        shippingRef.zipCode.current.setAttribute(
          "aria-describedby",
          "shipping-zip-accepted"
        );
      }
    }
    // country
    billingRef.country.current.value === ""
      ? (copiedArray.push("country"),
        shippingRef.country.current.setAttribute(
          "aria-describedby",
          "shipping-country-notaccepted"
        ))
      : ((shippingRef.country.current.value = billingRef.country.current.value),
        shippingRef.country.current.parentElement.setAttribute(
          "data-shippinguserattention",
          "false"
        ),
        shippingRef.country.current.setAttribute(
          "aria-describedby",
          "shipping-country-accepted"
        ));
    // loop through entries of billingRef obj we have access to both keys and values
    // billingInfo and shippingInfo obj
    Object.entries(billingRef).forEach(function saveValuesToStorage(element) {
      // key will be either:address, city,state,zipCode, country
      // value will be ref obj with current property of input
      // could destructure value to {current}
      const [key, { current }] = element;
      // access localData property billingInfo and shippingInfo obj using key
      // billing
      localData.billingInfo[key] = current.value;
      // shipping
      localData.shippingInfo[key] = current.value;
    });

    setShippingSame((prevValues) => {
      return {
        ...prevValues,
        isShippingSame: true,
        arrayOfText: copiedArray,
      };
    });
  }
  //   user clicked on no radio input shipping address is different than billing
  if (event.target == noInputRef.current) {
    // setShippingSame(false);
    arrayOfText.length > 0
      ? setShippingSame((prevValues) => {
          return {
            ...prevValues,
            isShippingSame: false,
            arrayOfText: [],
          };
        })
      : null;
    /**
     * having algorithm that push inputs values to local storage before removing
     * data entered to shipping section inputs.
     * the entered data to shipping section will be in local storage until user click
     * on yes radio btn
     * **/

    // set shipping inputs to default when yesInput value in local storage is true
    localData.toggleSameAddressInfo.yesInputBtn
      ? Object.entries(shippingRef).forEach(([key, { current }]) => {
          // destrucutre array in function declaration
          // key is the property string: address,city etc
          // value is the obj ref which we destructure to get current property
          // input value to empty string
          current.value = "";
          // parent element "data-shippinguserattention", "true"
          current.parentElement.setAttribute(
            "data-shippinguserattention",
            "true"
          );
          // assign empty "" to properties of shippingInfo obj in storage
          localData.shippingInfo[key] = current.value;
        })
      : null;
    // will save shipping inputs values to local storage
    // since billing input values will not change when user click on no radio btn
    // we can assign empty string to properties of shippingInfo obj in local storage
    // since the value of each shipping inputs will be empty ""
    // dont have to loop through shippingRef obj
    localData.toggleSameAddressInfo.yesInputBtn = yesInputRef.current.checked;
    localData.toggleSameAddressInfo.noInputBtn = noInputRef.current.checked;
  }
  // save yesbtn and nobtn checked values to local storage
  localStorage.setItem("cachedUserInputs", JSON.stringify(localData));
}

/**
 * copy shipping input values to billing input
 * **/

function copyShippingInputsValueToBilling(
  billing,
  shipping,
  dataFromLocalStorage
) {
  // address
  shipping.address.current.value !== ""
    ? ((billing.address.current.value = shipping.address.current.value),
      billing.address.current.parentElement.setAttribute(
        "data-billinguserattention",
        "false"
      ),
      billing.address.current.setAttribute(
        "aria-describedby",
        "billing-address-accepted"
      ))
    : null;
  // city
  shipping.city.current.value !== ""
    ? ((billing.city.current.value = shipping.city.current.value),
      billing.city.current.parentElement.setAttribute(
        "data-billinguserattention",
        "false"
      ),
      billing.city.current.setAttribute(
        "aria-describedby",
        "billing-city-accepted"
      ))
    : null;
  // state
  shipping.state.current.value !== ""
    ? ((billing.state.current.value = shipping.state.current.value),
      billing.state.current.parentElement.setAttribute(
        "data-billinguserattention",
        "false"
      ),
      billing.state.current.setAttribute(
        "aria-describedby",
        "billing-state-accepted"
      ))
    : null;
  // zip code check for empty and valid format
  /**
   * will use if statement instead of ternary operator
   * **/
  if (shipping.zipCode.current.value !== "") {
    if (!shipping.zipCode.current.validity.valid) {
      billing.zipCode.current.value = shipping.zipCode.current.value;
      billing.zipCode.current.parentElement.setAttribute(
        "data-billinguserattention",
        "true"
      );
      billing.zipCode.current.parentElement.setAttribute("data-isempty", "");
      billing.zipCode.current.setAttribute(
        "aria-describedby",
        "billing-state-notaccepted"
      );
    } else {
      billing.zipCode.current.value = shipping.zipCode.current.value;
      billing.zipCode.current.parentElement.setAttribute(
        "data-billinguserattention",
        "false"
      );
      billing.zipCode.current.parentElement.setAttribute("data-isempty", "");
      billing.zipCode.current.setAttribute(
        "aria-describedby",
        "billing-state-accepted"
      );
    }
  }
  // country
  shipping.country.current.value !== ""
    ? ((billing.country.current.value = shipping.country.current.value),
      billing.country.current.parentElement.setAttribute(
        "data-billinguserattention",
        "false"
      ),
      billing.country.current.setAttribute(
        "aria-describedby",
        "billing-country-accepted"
      ))
    : null;
  // loop through entries of shippingRef obj we have access to both keys and values
  // billingInfo and shippingInfo obj
  Object.entries(shipping).forEach(function saveValuesToStorage(element) {
    // key will be either:address, city,state,zipCode, country
    // value will be ref obj with current property of input
    // could destructure value to {current}
    const [key, { current }] = element;
    // access dataFromLocalStorage property billingInfo and shippingInfo obj using key
    // billing
    dataFromLocalStorage.billingInfo[key] = current.value;
    // shipping
    dataFromLocalStorage.shippingInfo[key] = current.value;
  });
}

export function personalInputListener(event) {
  if (event.target.closest("input")) {
    /**
     * get data from local storage
     * **/
    const dataFromLocalStorage =
      localStorage.getItem("cachedUserInputs") == null
        ? initialCheckoutInputObjForLocalStorage
        : JSON.parse(localStorage.getItem("cachedUserInputs"));
    // input id

    const inputElementId = event.target.getAttribute("id");
    // check if input is email or phone number check entered value is correct
    // due to pattern attr
    if (
      event.target.getAttribute("id") == "personal-email" ||
      event.target.getAttribute("id") == "personal-phone-number"
    ) {
      // remove letters and only keep numbers and '-' when user is entering
      // values in phone number input

      if (event.target.getAttribute("id") == "personal-phone-number") {
        const regex = /[0-9\-]/gi;
        const onlyCharMatchPhoneNum = event.target.value.match(regex);
        event.target.value = !onlyCharMatchPhoneNum
          ? ""
          : onlyCharMatchPhoneNum.join("");
        // dont want user input for phone number to go pass length of 12
        if (!event.target.validity.valid && event.target.value.length > 12) {
          const copiedZipInput = event.target.value.slice(0, 12);
          event.target.value = copiedZipInput;
        }
        // save user personal info inputs: phone number
        dataFromLocalStorage.personalInfo.phoneNumber = event.target.value;
      } else {
        // save user personal info inputs: email
        dataFromLocalStorage.personalInfo.email = event.target.value;
      }

      if (event.target.value === "") {
        event.target.parentElement.setAttribute("data-isempty", "true");
        event.target.parentElement.setAttribute("data-needuserattention", "");
        // assign correct id to aria-describedby
        inputElementId == "personal-email"
          ? event.target.setAttribute("aria-describedby", "email-isempty")
          : event.target.setAttribute(
              "aria-describedby",
              "phone-number-isempty"
            );
      } else {
        // input is not empty we want to check for validity
        event.target.parentElement.setAttribute("data-isempty", "");
        if (!event.target.validity.valid) {
          // input not valid
          event.target.parentElement.setAttribute(
            "data-needuserattention",
            "true"
          );
          // assign correct id to aria-describedby
          inputElementId == "personal-email"
            ? event.target.setAttribute("aria-describedby", "email-notaccepted")
            : event.target.setAttribute(
                "aria-describedby",
                "phone-notaccepted"
              );
        } else {
          // input is valid
          event.target.parentElement.setAttribute(
            "data-needuserattention",
            "false"
          );
          // assign correct id to aria-describedby
          inputElementId == "personal-email"
            ? event.target.setAttribute("aria-describedby", "email-accepted")
            : event.target.setAttribute("aria-describedby", "phone-accepted");
        }
      }
      // if phone number input is valid and value length is greater than 12
      // copy value inputs and assign that value to phone number input
    } else {
      /**
       * only allow letters and space for name
       * **/
      const regexForName = /[a-zA-Z\s]/g;
      const onlyLettersAndSpace = event.target.value.match(regexForName);
      event.target.value = !onlyLettersAndSpace
        ? ""
        : onlyLettersAndSpace.join("");
      if (event.target.value === "") {
        event.target.parentElement.setAttribute(
          "data-needuserattention",
          "true"
        );
        // assign correct span id to aria-describedby
        event.target.setAttribute("aria-describedby", "name-notaccepted");
      } else {
        event.target.parentElement.setAttribute(
          "data-needuserattention",
          "false"
        );
        // assign correct span id to aria-describedby
        event.target.setAttribute("aria-describedby", "name-accepted");
      }
      // save user personal info inputs: name
      dataFromLocalStorage.personalInfo.name = event.target.value;
    }
    // save obj to local storage
    localStorage.setItem(
      "cachedUserInputs",
      JSON.stringify(dataFromLocalStorage)
    );
  }
}

export function billingShippingInputListener(event) {
  const { billing, shipping, sameAddressInputRef, toggleObj } = this;

  if (event.target.closest("input")) {
    // get data from local storage
    const dataFromLocalStorage =
      localStorage.getItem("cachedUserInputs") == null
        ? initialCheckoutInputObjForLocalStorage
        : JSON.parse(localStorage.getItem("cachedUserInputs"));
    // get element id
    const inputIdAttr = event.target.getAttribute("id");
    const billingOrShippingStr = inputIdAttr.includes("billing")
      ? "billing"
      : "shipping";
    /**
     * this event listener callback is for both billing and shipping
     * **/
    const eitherBillingOrShipping =
      billingOrShippingStr == "billing"
        ? "data-billinguserattention"
        : "data-shippinguserattention";
    // reverse selecting input parent if yesBtn is checked == true
    const selectingParentForLinkedInputs = sameAddressInputRef.yesBtn.current
      .checked
      ? billingOrShippingStr == "billing"
        ? "data-shippinguserattention"
        : "data-billinguserattention"
      : null;

    // check if input is zip code check entered value is correct
    // due to pattern attr
    if (inputIdAttr.includes("zip")) {
      // remove letters or symbols
      // then assign that string to event.target.value
      const regex = /\d+/;
      const onlyNumbers = event.target.value.match(regex);
      // we will check when user press down on letter key
      // as first values in zip code
      event.target.value = !onlyNumbers ? "" : onlyNumbers.join("");
      // check for empty
      if (event.target.value === "") {
        event.target.parentElement.setAttribute("data-isempty", "true");
        event.target.parentElement.setAttribute(eitherBillingOrShipping, "");
        // assign span id to aria-describedby
        event.target.setAttribute(
          "aria-describedby",
          `${billingOrShippingStr}-zip-isempty`
        );
      } else {
        event.target.parentElement.setAttribute("data-isempty", "");
        // check for validity
        if (!event.target.validity.valid) {
          event.target.parentElement.setAttribute(
            eitherBillingOrShipping,
            "true"
          );
          // assign span id to aria-describedby
          event.target.setAttribute(
            "aria-describedby",
            `${billingOrShippingStr}-zip-notaccepted`
          );
        } else {
          event.target.parentElement.setAttribute(
            eitherBillingOrShipping,
            "false"
          );
          // assign span id to aria-describedby
          event.target.setAttribute(
            "aria-describedby",
            `${billingOrShippingStr}-zip-accepted`
          );
        }
      }
      // dont want user input for zip to go pass length of 5
      if (!event.target.validity.valid && event.target.value.length > 5) {
        const copiedZipInput = event.target.value.slice(0, 5);
        event.target.value = copiedZipInput;
      }
      // get billing or shipping element based on event.target id
      // if its billing use shipping obj and vice versa
      if (sameAddressInputRef.yesBtn.current.checked) {
        // run code if sameAddressInputRef.yesBtn.current.checked is truthy
        linkedInputHelper(
          event,
          inputIdAttr,
          "zipCode",
          eitherBillingOrShipping,
          selectingParentForLinkedInputs,
          shipping,
          billing
        );
        // cached input values to both billing and shipping
        dataFromLocalStorage.billingInfo.zipCode = event.target.value;
        dataFromLocalStorage.shippingInfo.zipCode = event.target.value;
      } else {
        // we want to find out which input the user currently has focused on
        // billing or shipping and cached input values according to the billing/shipping
        // input the user is currently on
        billingOrShippingStr == "billing"
          ? (dataFromLocalStorage.billingInfo.zipCode = event.target.value)
          : (dataFromLocalStorage.shippingInfo.zipCode = event.target.value);
      }
    }
    /**
     * only allow letters and space for city, state, country
     * **/
    if (
      inputIdAttr.includes("city") ||
      inputIdAttr.includes("state") ||
      inputIdAttr.includes("country")
    ) {
      // get city,state,country string from input ID field for aria-describedby algorithm
      const [, cityStateCountryStr] = inputIdAttr.split("-");
      const letterSpaceRegex = /[a-zA-Z\s]/g;
      const onlyLettersAndSpace = event.target.value.match(letterSpaceRegex);
      // find out if id is either city,state,country
      const [, eitherCityStateOrCountryStr] = inputIdAttr.split("-");
      event.target.value = !onlyLettersAndSpace
        ? ""
        : onlyLettersAndSpace.join("");
      if (event.target.value === "" || !event.target.validity.valid) {
        event.target.parentElement.setAttribute(
          eitherBillingOrShipping,
          "true"
        );
        // assign span id to aria-describedby
        event.target.setAttribute(
          "aria-describedby",
          `${billingOrShippingStr}-${cityStateCountryStr}-notaccepted`
        );
      } else {
        event.target.parentElement.setAttribute(
          eitherBillingOrShipping,
          "false"
        );
        // assign span id to aria-describedby
        event.target.setAttribute(
          "aria-describedby",
          `${billingOrShippingStr}-${cityStateCountryStr}-accepted`
        );
      }
      /**
       * we can cached input data when we check if yesBtn to question
       * shipping is same as billing address
       * **/
      if (sameAddressInputRef.yesBtn.current.checked) {
        linkedInputHelper(
          event,
          inputIdAttr,
          eitherCityStateOrCountryStr,
          eitherBillingOrShipping,
          selectingParentForLinkedInputs,
          shipping,
          billing
        );
        // cached input values to both billing and shipping
        dataFromLocalStorage.billingInfo[eitherCityStateOrCountryStr] =
          event.target.value;
        dataFromLocalStorage.shippingInfo[eitherCityStateOrCountryStr] =
          event.target.value;
      } else {
        // we want to find out which input the user currently has focused on
        // billing or shipping and cached input values according to the billing/shipping
        // input the user is currently on
        billingOrShippingStr == "billing"
          ? (dataFromLocalStorage.billingInfo[eitherCityStateOrCountryStr] =
              event.target.value)
          : (dataFromLocalStorage.shippingInfo[eitherCityStateOrCountryStr] =
              event.target.value);
      }
    }

    if (inputIdAttr.includes("address")) {
      // if user is entering values in other inputs
      if (event.target.value === "") {
        event.target.parentElement.setAttribute(
          eitherBillingOrShipping,
          "true"
        );
        // assign span id to aria-describedby
        event.target.setAttribute(
          "aria-describedby",
          `${billingOrShippingStr}-address-notaccepted`
        );
      } else {
        event.target.parentElement.setAttribute(
          eitherBillingOrShipping,
          "false"
        );
        // assign span id to aria-describedby
        event.target.setAttribute(
          "aria-describedby",
          `${billingOrShippingStr}-address-accepted`
        );
      }

      if (sameAddressInputRef.yesBtn.current.checked) {
        // find out if id is either city,state,country

        linkedInputHelper(
          event,
          inputIdAttr,
          "address",
          eitherBillingOrShipping,
          selectingParentForLinkedInputs,
          shipping,
          billing
        );
        // cached input values to both billing and shipping
        dataFromLocalStorage.billingInfo.address = event.target.value;
        dataFromLocalStorage.shippingInfo.address = event.target.value;
      } else {
        // we want to find out which input the user currently has focused on
        // billing or shipping and cached input values according to the billing/shipping
        // input the user is currently on
        billingOrShippingStr == "billing"
          ? (dataFromLocalStorage.billingInfo.address = event.target.value)
          : (dataFromLocalStorage.shippingInfo.address = event.target.value);
      }
    }
    // save input data to local storage
    localStorage.setItem(
      "cachedUserInputs",
      JSON.stringify(dataFromLocalStorage)
    );
  }
}

function linkedInputHelper(
  eventRef,
  idAttr,
  idInputStr,
  billingOrShipping,
  parentLinkedInput,
  shippingRef,
  billingRef
) {
  const linkedInputElement = idAttr.includes("billing")
    ? shippingRef[idInputStr]
    : billingRef[idInputStr];
  linkedInputElement.current.value = eventRef.target.value;
  // we want to update the linked input error messages and aria-describedby
  if (idInputStr == "zipCode") {
    // we are typing in zipCode input
    // get event target value for data-isempty and data-shippinguserattention/data-billinguserattention of parent element
    const currentInputIsEmptyAttr =
      eventRef.target.parentElement.getAttribute("data-isempty");

    const currentInputAttentionAttr =
      eventRef.target.parentElement.getAttribute(billingOrShipping);

    // assign that value to linkedInputELement parent element
    linkedInputElement.current.parentElement.setAttribute(
      "data-isempty",
      currentInputIsEmptyAttr
    );
    linkedInputElement.current.parentElement.setAttribute(
      parentLinkedInput,
      currentInputAttentionAttr
    );
  } else {
    // we get here we are typing in address,city,state, or country input
    eventRef.target.parentElement.getAttribute(billingOrShipping) == "false"
      ? linkedInputElement.current.parentElement.setAttribute(
          parentLinkedInput,
          "false"
        )
      : linkedInputElement.current.parentElement.setAttribute(
          parentLinkedInput,
          "true"
        );
  }
  // get value of event.target aria-describedby
  const [firstPartOfAttr, ...restOfAttr] = eventRef.target
    .getAttribute("aria-describedby")
    .split("-");
  const linkedElementFirstPartOfStr =
    firstPartOfAttr == "billing" ? "shipping" : "billing";
  const strForAriaDescribedby = [
    linkedElementFirstPartOfStr,
    ...restOfAttr,
  ].join("-");
  linkedInputElement.current.setAttribute(
    "aria-describedby",
    strForAriaDescribedby
  );
}

export const initialCheckoutInputObjForLocalStorage = {
  personalInfo: {
    name: "",
    phoneNumber: "",
    email: "",
  },
  billingInfo: {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  toggleSameAddressInfo: {
    yesInputBtn: false,
    noInputBtn: false,
  },
  paymentInfo: {
    eMoneyMethod: "true",
    cashDeliveryMethod: "false",
  },
};

export function valuesForBillingShippingComponent(
  objInputRef,
  localDataObj,
  parentAttr,
  ariaText
) {
  // assign value
  // address
  objInputRef.address.current.value = !localDataObj ? "" : localDataObj.address;
  // city
  objInputRef.city.current.value = !localDataObj ? "" : localDataObj.city;
  // state
  objInputRef.state.current.value = !localDataObj ? "" : localDataObj.state;
  // zip code
  objInputRef.zipCode.current.value = !localDataObj ? "" : localDataObj.zipCode;
  // country
  objInputRef.country.current.value = !localDataObj ? "" : localDataObj.country;
  // check for validation
  // address
  objInputRef.address.current.value === ""
    ? (objInputRef.address.current.parentElement.setAttribute(
        parentAttr,
        "true"
      ),
      objInputRef.address.current.setAttribute(
        "aria-describedby",
        `${ariaText}-address-notaccepted`
      ))
    : (objInputRef.address.current.parentElement.setAttribute(
        parentAttr,
        "false"
      ),
      objInputRef.address.current.setAttribute(
        "aria-describedby",
        `${ariaText}-address-accepted`
      ));
  // city
  objInputRef.city.current.value === ""
    ? (objInputRef.city.current.parentElement.setAttribute(parentAttr, "true"),
      objInputRef.city.current.setAttribute(
        "aria-describedby",
        `${ariaText}-city-notaccepted`
      ))
    : (objInputRef.city.current.parentElement.setAttribute(parentAttr, "false"),
      objInputRef.city.current.setAttribute(
        "aria-describedby",
        `${ariaText}-city-accepted`
      ));
  // state
  objInputRef.state.current.value === ""
    ? (objInputRef.state.current.parentElement.setAttribute(parentAttr, "true"),
      objInputRef.state.current.setAttribute(
        "aria-describedby",
        `${ariaText}-state-notaccepted`
      ))
    : (objInputRef.state.current.parentElement.setAttribute(
        parentAttr,
        "false"
      ),
      objInputRef.state.current.setAttribute(
        "aria-describedby",
        `${ariaText}-state-accepted`
      ));
  // zip code
  if (objInputRef.zipCode.current.value === "") {
    objInputRef.zipCode.current.parentElement.setAttribute(
      "data-isempty",
      "true"
    );
    objInputRef.zipCode.current.setAttribute(
      "aria-describedby",
      `${ariaText}-zip-isempty`
    );
  } else {
    objInputRef.zipCode.current.parentElement.setAttribute("data-isempty", "");
    if (!objInputRef.zipCode.current.validity.valid) {
      objInputRef.zipCode.current.parentElement.setAttribute(
        parentAttr,
        "true"
      );
      objInputRef.zipCode.current.setAttribute(
        "aria-describedby",
        `${ariaText}-zip-notaccepted`
      );
    } else {
      objInputRef.zipCode.current.parentElement.setAttribute(
        parentAttr,
        "false"
      );
      objInputRef.zipCode.current.setAttribute(
        "aria-describedby",
        `${ariaText}-zip-accepted`
      );
    }
  }
  // country
  objInputRef.country.current.value === ""
    ? (objInputRef.country.current.parentElement.setAttribute(
        parentAttr,
        "true"
      ),
      objInputRef.country.current.setAttribute(
        "aria-describedby",
        `${ariaText}-country-notaccepted`
      ))
    : (objInputRef.country.current.parentElement.setAttribute(
        parentAttr,
        "false"
      ),
      objInputRef.country.current.setAttribute(
        "aria-describedby",
        `${ariaText}-country-accepted`
      ));
}
