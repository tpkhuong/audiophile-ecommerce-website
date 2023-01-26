export function cachedCheckoutInputs(event) {
  const { refObj } = this;
  if (
    event.target.closest("a[role='menuitem']") &&
    document.URL.includes("checkout")
  ) {
    const userInputs = createObjForStorage(refObj);

    localStorage.setItem("cachedUserInputs", JSON.stringify(userInputs));
  }
}

function createObjForStorage(obj) {
  const {
    personal,
    billing,
    shipping,
    sameAddressInputRef,
    paymentMethodSelection,
  } = obj;
  const inputValuesObj = {
    personalInfo: {
      name: personal.name.current.value,
      phoneNumber: personal.phoneNum.current.value,
      email: personal.email.current.value,
    },
    billingInfo: {
      address: billing.address.current.value,
      city: billing.city.current.value,
      state: billing.state.current.value,
      zipCode: billing.zipCode.current.value,
      country: billing.country.current.value,
    },
    shippingInfo: {
      address: shipping.address.current.value,
      city: shipping.city.current.value,
      state: shipping.state.current.value,
      zipCode: shipping.zipCode.current.value,
      country: shipping.country.current.value,
    },
    toggleSameAddressInfo: {
      yesInputBtn: sameAddressInputRef.yesBtn.current.checked,
      noInputBtn: sameAddressInputRef.noBtn.current.checked,
    },
    paymentInfo: {
      eMoneyMethod:
        paymentMethodSelection.eMoney.current.getAttribute("aria-checked"),
      cashDeliveryMethod:
        paymentMethodSelection.cashDelivery.current.getAttribute(
          "aria-checked"
        ),
    },
  };

  return inputValuesObj;
}
