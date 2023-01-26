import { initialCheckoutInputObjForLocalStorage } from "./checkoutHelpers";

// emoney
export function eMoneyClickHandler(event) {
  // get data from local storage
  const dataFromStorageMoney =
    localStorage.getItem("cachedUserInputs") == null
      ? initialCheckoutInputObjForLocalStorage
      : JSON.parse(localStorage.getItem("cachedUserInputs"));
  // destructure this obj
  const { setPaymentMethod, activeDescendantRef, emoneyRef, cashDeliveryRef } =
    this;
  if (event.target.closest("[data-isemoney='true']")) {
    // pass value boolean true to setPaymentMethod
    setPaymentMethod(true);
    // we focus on the radio btn clicked
    emoneyRef.current.focus();
    // assign value of "0" to tabindex of radio btn click
    emoneyRef.current.setAttribute("tabindex", "0");
    // get value of id attr of the radio btn clicked
    const idOfEmoneyBtn = emoneyRef.current.getAttribute("id");
    // assign that value to aria-activedescendant
    activeDescendantRef.current.setAttribute(
      "aria-activedescendant",
      `${idOfEmoneyBtn}`
    );
    // assign "true" to aria-checked
    emoneyRef.current.setAttribute("aria-checked", "true");
    // assign "false" to aria-checked to other radio btn
    cashDeliveryRef.current.setAttribute("aria-checked", "false");
    // assign value of "-1" to other radio btns tabindex
    cashDeliveryRef.current.setAttribute("tabindex", "-1");
    // assign value "true" to emoney aria-checked
    dataFromStorageMoney.paymentInfo.eMoneyMethod = "true";
    // assign value "false" to cashdelivery aria-checked
    dataFromStorageMoney.paymentInfo.cashDeliveryMethod = "false";
    // save data to local storage
    localStorage.setItem(
      "cachedUserInputs",
      JSON.stringify(dataFromStorageMoney)
    );
  }
}

// cash on delivery
export function cashOnDeliveryClickHandler(event) {
  // get data from local storage
  const dataFromStorageCash =
    localStorage.getItem("cachedUserInputs") == null
      ? initialCheckoutInputObjForLocalStorage
      : JSON.parse(localStorage.getItem("cachedUserInputs"));
  // destructure this obj
  const { setPaymentMethod, activeDescendantRef, emoneyRef, cashDeliveryRef } =
    this;
  if (event.target.closest("[data-iscashdelivery='true']")) {
    // pass value boolean false to setPaymentMethod
    setPaymentMethod(false);
    // we focus on the radio btn clicked
    cashDeliveryRef.current.focus();
    // assign value of "0" to tabindex of radio btn click
    cashDeliveryRef.current.setAttribute("tabindex", "0");
    // get value of id attr of the radio btn clicked
    const idOfCashBtn = cashDeliveryRef.current.getAttribute("id");
    // assign that value to aria-activedescendant
    activeDescendantRef.current.setAttribute(
      "aria-activedescendant",
      `${idOfCashBtn}`
    );
    // assign "true" to aria-checked
    cashDeliveryRef.current.setAttribute("aria-checked", "true");
    // assign "false" to aria-checked to other radio btn
    emoneyRef.current.setAttribute("aria-checked", "false");
    // assign value of "-1" to other radio btns tabindex
    emoneyRef.current.setAttribute("tabindex", "-1");
    // assign value "true" to cashdelivery aria-checked
    dataFromStorageCash.paymentInfo.eMoneyMethod = "false";
    // assign value "false" to emoney aria-checked
    dataFromStorageCash.paymentInfo.cashDeliveryMethod = "true";
    // save data to local storage
    localStorage.setItem(
      "cachedUserInputs",
      JSON.stringify(dataFromStorageCash)
    );
  }
}

// check for validity emoney

export function checkValidityEmoney(event) {
  // remove letters or symbols
  // then assign that string to event.target.value
  const regex = /\d+/;
  const onlyNumberInput = event.target.value.match(regex);
  // we will check when user press down on letter key
  // as first values in emoney number and emoney pin
  event.target.value = !onlyNumberInput ? "" : onlyNumberInput.join("");
  if (event.target.value === "" || !event.target.validity.valid) {
    event.target.parentElement.setAttribute("data-emoneyattention", "true");
  } else {
    event.target.parentElement.setAttribute("data-emoneyattention", "false");
  }
  // emoney number
  if (
    event.target.getAttribute("id") == "emoney-number" &&
    !event.target.validity.valid &&
    event.target.value.length > 8
  ) {
    // inside this if statement we will make the input valid
    // copy input up to index 7
    const copiedNumberInput = event.target.value.slice(0, 8);
    event.target.value = copiedNumberInput;
    event.target.parentElement.setAttribute("data-emoneyattention", "false");
    event.target.parentElement.setAttribute("data-emoneyattention", "false");
  }

  // emoney pin
  if (
    event.target.getAttribute("id") == "emoney-pin" &&
    !event.target.validity.valid &&
    event.target.value.length > 5
  ) {
    // inside this if statement we will make the input valid
    // copy input up to index 5
    const copiedPinInput = event.target.value.slice(0, 5);
    event.target.value = copiedPinInput;
    event.target.parentElement.setAttribute("data-emoneyattention", "false");
  }
}
