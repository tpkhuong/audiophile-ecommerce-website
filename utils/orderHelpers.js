import axios from "axios";

/**
 * objfororderdetails will have these properties:
 * totalPrice: total_price,
 * shippingCost,
 * tax: valueAddedTax,
 * grandTotal,
 * itemsarray will be cart items
 * **/

export async function showOrderModal(event) {
  const { setOrderPlaced, refValues, objForOrderDetails, itemsArray } = this;
  const {
    personal,
    billing,
    shipping,
    paymentMethodSelection,
    renderFormAssistiveData,
  } = refValues;
  const { eMoney, inputMoney } = paymentMethodSelection;
  /* check all inputs validity */
  // only call setorderplace(true)
  // when all inputs are valid and a payment method is selected
  // personal email, phone num, billing and shipping zip code
  // check format and empty string
  // personal
  const { personalArray, personalErrors } = personalInfoChecker(personal);

  // billing
  const { billingArray, billingErrors } = billingInforChecker(billing);

  // shipping
  const { shippingArray, shippingErrors } = shippingInfoChecker(shipping);

  // emoney
  /**
   * check for empty string first
   * **/
  // check if emoney payment is selected
  // check number and pin is valid
  const { emoneyArray, emoneyErrors } =
    eMoney.current.getAttribute("aria-checked") == "true"
      ? emoneyChecker({ eMoney, inputMoney })
      : { emoneyArray: [], emoneyErrors: 0 };

  const totalErrors = [
    personalErrors,
    billingErrors,
    shippingErrors,
    emoneyErrors,
  ].reduce(function getTotalErrors(buildingUp, currentValue) {
    // each currentvalue is the sum
    return buildingUp + currentValue;
  }, 0);

  // pass in func to renderFormAssistiveData
  if (totalErrors > 0) {
    renderFormAssistiveData((prevValues) => {
      return {
        ...prevValues,
        errors: {
          total: totalErrors,
          personal: personalErrors,
          billing: billingErrors,
          shipping: shippingErrors,
          emoney: emoneyErrors,
        },
        personalInputArray: personalArray,
        billingInputArray: billingArray,
        shippingInputArray: shippingArray,
        emoneyInputArray: emoneyArray,
      };
    });
  }
  // when total errors == 0 run code below
  if (totalErrors == 0) {
    renderFormAssistiveData((prevValues) => {
      return {
        ...prevValues,
        errors: {
          total: 0,
        },
      };
    });
    /**
     * when user placed an order we want to empty the user shopping cart.
     * we could remove these items "arrayOfObjs" "cartDataForCheckout" in localstorage
     * **/
    // const cartMsgContainer = document.getElementById("cart-msg-container");
    const cartMsgQuantity = document.getElementById("cart-item-quantity");
    const cartMsgItemText = document.getElementById("cart-item-text");
    // cartMsgContainer.setAttribute("data-iscartempty", "true");
    cartMsgQuantity.innerText = "0";
    cartMsgItemText.innerText = "items";
    // remove arrayOfObjs and cartDataForCheckout when user placed an order
    // because we dont want our algorithm to render cart modal if user click on cart btn
    localStorage.removeItem("arrayOfObjs");
    localStorage.removeItem("cartDataForCheckout");
    const {
      apiDataForPersonal,
      apiDataForBilling,
      apiDataForShipping,
      apitDataForPayment,
    } = cachedFormInputsToStorage(refValues);
    // call func that will work with database here
    // or make api calls here, passing data to the correct api
    try {
      // create customer
      const customerResult = await createCustomer(
        apiDataForPersonal,
        apiDataForBilling,
        apiDataForShipping
      );
      // create ordered items
      const orderedItemsResult = await createOrderItems(
        customerResult,
        itemsArray
      );
      // // create placed orders
      const placedOrderResult = await createOrders(
        customerResult.customer.name,
        apiDataForBilling,
        apiDataForShipping,
        apitDataForPayment,
        objForOrderDetails
      );
      // pass customerResult, ordereditemsResult, placedOrderResult to updateOrdersAndCustomer func
      // in createorders we will make api call to create placeorders and orderitems
      /**
       * make axios put api call to updatecustomerandorder passing in customerResult and orderResult
       * **/
      const updateCustomerAndPlacedOrderResult = await updateOrdersAndCustomer(
        customerResult.customer,
        orderedItemsResult.items,
        placedOrderResult.orderData
      );
      // since we will always create a new order when customer places an order and createCustomer
      // will return a customer collection obj either customer exist or new customer
      // we want to check orderResult is truthy
      // we want to update order schema with customer email and id. also want to update customer schema with order number and order id
      // inside our if statement when we check if orderResult && customterResult are truthy
      // we want to add new order to existing customer or new customer
      // we want to add exist customer or new customer to new order
      /** uncomment to see thank you message modal of order **/
      setOrderPlaced(true);
      /** uncomment to see thank you message modal of order **/
    } catch (error) {}
  }
}

/**
 * form error helper
 * **/

function emoneyChecker(refObj) {
  const { inputMoney } = refObj;
  const { array, sum } = getTotalErrors(inputMoney);
  return {
    emoneyArray: array,
    emoneyErrors: sum,
  };
}

function personalInfoChecker(refObj) {
  // each func will return total number of errors
  // empty string and invalid format
  const { array, sum } = getTotalErrors(refObj);
  return {
    personalArray: array,
    personalErrors: sum,
  };
}

function billingInforChecker(refObj) {
  // each func will return total number of errors
  // empty string and invalid format
  const { array, sum } = getTotalErrors(refObj);
  return {
    billingArray: array,
    billingErrors: sum,
  };
}

function shippingInfoChecker(refObj) {
  // each func will return total number of errors
  // empty string and invalid format
  const { array, sum } = getTotalErrors(refObj);
  return {
    shippingArray: array,
    shippingErrors: sum,
  };
}

function getTotalErrors(objOfRef) {
  // use Object.values() loop through array
  const arrayOfValues = Object.values(objOfRef);
  // first check if input is empty
  // if empty add 1
  // not empty check for input.validity.valid, add 1 total if invalid
  return arrayOfValues.reduce(
    function makeObjAndTotal(buildingUp, currentValue) {
      // each currentValue is a ref
      const { current } = currentValue;
      // only push ref of input into array if current error is 1
      const currentSectionError =
        current.value === "" ? 1 : !current.validity.valid ? 1 : 0;
      // assign correct id to aria-describedby here
      // the input without patterns we dont have to check for validity
      buildingUp.array =
        currentSectionError > 0
          ? [...buildingUp.array, current]
          : buildingUp.array;
      buildingUp.sum = buildingUp.sum + currentSectionError;
      return buildingUp;
    },
    { array: [], sum: 0 }
  );
}

export function hideOrderModal(event) {}

// show hide ordered items

export function showHideItems(event) {
  // start here
  const { showMore, setShowMore } = this;
  if (!showMore) {
    // when showMore is falsey and user click on "and other items" btn
    // pass boolean value true to setShowMore which will render all items
    // in array
    setShowMore(true);
  } else {
    // when showMore is truthy we enter here
    // user click on "view less", pass boolean value false to setShowMore
    // which will render first item in array
    setShowMore(false);
  }
}

export function generateOrderNumer(name) {
  const arrOfNameStr = name.split(" ");
  const [first, second] = arrOfNameStr;
  const arrayOfStrings = new Date().toDateString().split(" ");
  const [day, month] = arrayOfStrings;
  const beginning = Math.random() * new Date().getSeconds() + 1;
  const middle = Math.random() * 1000 + 1;
  const end = Math.random() * new Date().getMilliseconds() + 1;
  return `${day[0].toLowerCase()}${beginning.toFixed()}${first[0].toLowerCase()}-${middle.toFixed()}-${month[0].toLowerCase()}${end.toFixed()}${second[0].toLowerCase()}`;
}

function cachedFormInputsToStorage(inputRefObj) {
  // get obj from local storage
  const dataFromStorage = JSON.parse(localStorage.getItem("cachedUserInputs"));

  const { personalInfo, billingInfo, shippingInfo, paymentInfo } =
    dataFromStorage;

  // destructure ref objs
  const { personal, billing, shipping, paymentMethodSelection } = inputRefObj;
  // personal data
  personalInfo.name = personal.name.current.value;
  personalInfo.phoneNumber = personal.phoneNum.current.value;
  personalInfo.email = personal.email.current.value;
  // billing data
  billingInfo.address = billing.address.current.value;
  billingInfo.city = billing.city.current.value;
  billingInfo.state = billing.state.current.value;
  billingInfo.zipCode = billing.zipCode.current.value;
  billingInfo.country = billing.country.current.value;
  // shipping data
  shippingInfo.address = shipping.address.current.value;
  shippingInfo.city = shipping.city.current.value;
  shippingInfo.state = shipping.state.current.value;
  shippingInfo.zipCode = shipping.zipCode.current.value;
  shippingInfo.country = shipping.country.current.value;
  // payment data
  paymentInfo.eMoneyMethod =
    paymentMethodSelection.eMoney.current.getAttribute("aria-checked");
  paymentInfo.cashDeliveryMethod =
    paymentMethodSelection.cashDelivery.current.getAttribute("aria-checked");
  // save input value to local storage
  localStorage.setItem("cachedUserInputs", JSON.stringify(dataFromStorage));

  const dataForApi = {
    apiDataForPersonal: dataFromStorage.personalInfo,
    apiDataForBilling: dataFromStorage.billingInfo,
    apiDataForShipping: dataFromStorage.shippingInfo,
    apitDataForPayment: dataFromStorage.paymentInfo,
  };

  // destructure the obj when we call this func
  return dataForApi;
}

async function createCustomer(customerInfo, customerBilling, customerShipping) {
  const { data } = await axios.post("/api/createcustomer", {
    customerInfo,
    customerBilling,
    customerShipping,
  });
  return data;
}

async function createOrders(customerName, billing, shipping, payment, summary) {
  const { data } = await axios.post("/api/createplacedorder", {
    customerName,
    billing,
    shipping,
    payment,
    summary,
  });
  return data;
}

async function createOrderItems(purchaser, items) {
  // pass in customerResult as a value to this func call
  const { data } = await axios.post("/api/createordereditems", {
    purchaser,
    items,
  });
  return data;
}

async function updateOrdersAndCustomer(customer, orderedItems, placedOrder) {
  // updating we will send a "PUT" request
  const { data } = await axios.put("/api/updatecustomerandorder", {
    customer,
    placedOrder,
    orderedItems,
  });
  return data;
}

export function orderFinalized() {}
