import React from "react";
import Link from "next/link";
import CartModalStyles from "../../styles/Components/shared/CartModal.module.css";
import CartItem from "./CartItem";
import {
  removeAllBtnAlgorithm,
  closeModalBtnAlgorithm,
  keyboardFunctionalityFocusRemoveAllBtn,
  keyboardFunctionalityFocusCheckoutBtn,
  sendCartModalDataToLocalStorage,
} from "../../utils/helpers";

function CartModal({ children, ...props }) {
  const { refToOpenCartModal, stateOfCartFunc } = props;
  // get data from AddCart component
  // look at cartIconBtnAlgorithm func in helpers.js
  const cartModalData = props.addCartDataFromLocalStorage;
  const {
    arrayOfItems,
    itemsInCartLength,
    totalPriceInCartStrType,
    cartInfoDatabase,
  } = cartModalData;
  // use React.useState() to cause a re-render when use click on remove all btn
  // initial values will be the values from obj item in local storage
  const initialCartModalValues = {
    cartQuantity: itemsInCartLength,
    cartTotalPrice: totalPriceInCartStrType,
    checkoutPageData: cartInfoDatabase,
  };
  // React.useState() to cause a render of this component with different data
  const [cartModalObj, useCartModalState] = React.useState(
    initialCartModalValues
  );

  // we will use React.useRef() on remove all btn and checkout btn for keyboard user
  const refToRemoveAllBtn = React.useRef();
  const refToCheckoutBtn = React.useRef();
  // save reference to total price, we want to update it when user click on
  // - or + or hit number key when cursor is on input
  const refToTotalPriceStr = React.useRef();
  return (
    <div
      aria-labelledby="cart-modal"
      data-showcartmodal="false"
      role="dialog"
      aria-modal="true"
      className={CartModalStyles[`cart-modal-wrapper`]}
    >
      <div className={CartModalStyles[`cart-wrapper`]}>
        {/* cart title, remove all and close btn */}
        <div className={CartModalStyles[`title-remove-all-close-btn`]}>
          <h2 className={CartModalStyles[`title-quantity`]}>
            <span id="cart-modal" className={CartModalStyles[`title`]}>
              Cart
            </span>
            <span>
              <span>(</span>
              <span data-cartitems className={CartModalStyles[`cart-quantity`]}>
                {cartModalObj.cartQuantity}
              </span>
              <span>)</span>
            </span>
          </h2>
          {/* remove all */}
          <button
            onKeyDown={keyboardFunctionalityFocusCheckoutBtn.bind({
              refToRemoveAllBtn,
              refToCheckoutBtn,
            })}
            onClick={removeAllBtnAlgorithm.bind({
              useCartModalState,
              refToOpenCartModal,
              stateOfCartFunc,
            })}
            className={CartModalStyles[`remove-all-btn`]}
            ref={refToRemoveAllBtn}
          >
            Remove all
          </button>
          {/* close btn */}
          {/* we set cartState value to false so when user click on cart btn cart modal will not render */}
          <button
            aria-label="close cart modal"
            className={CartModalStyles[`close-btn`]}
            onClick={closeModalBtnAlgorithm.bind({
              refToOpenCartModal,
              stateOfCartFunc,
            })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21">
              <path
                fill="#1B1D23"
                fillRule="evenodd"
                d="M17.425.954l2.12 2.121-7.424 7.425 7.425 7.425-2.121 2.12L10 12.622l-7.425 7.425-2.12-2.121L7.878 10.5.454 3.075 2.575.955 10 8.378 17.425.954z"
              />
            </svg>
          </button>
        </div>
        {/* list of items */}
        <ul className={CartModalStyles[`cart-items-container`]}>
          {cartModalObj.cartQuantity > 0
            ? arrayOfItems.map(function makeCartItem(element, index) {
                // element will be each obj in arrayOfObjs we saved in localStorage
                // obj with these properties: priceStr,priceNum,strImgSrc,title,quantityiForInput,totalPrice
                return (
                  <li
                    className={CartModalStyles[`item-wrapper`]}
                    key={Math.random() * index}
                  >
                    <CartItem
                      totalPriceRef={refToTotalPriceStr}
                      dataFromCartModal={element}
                    />
                  </li>
                );
              })
            : null}
        </ul>
        {/* total text and price */}
        <div className={CartModalStyles[`total-price-wrapper`]}>
          <span className={CartModalStyles[`total`]}>total</span>
          <span className={CartModalStyles[`price`]}>
            <span className={CartModalStyles[`dollar-sign`]}>$</span>
            <span
              ref={refToTotalPriceStr}
              className={CartModalStyles[`price-digit`]}
            >
              {cartModalObj.cartTotalPrice}
            </span>
          </span>
        </div>
        {/* checkout btn */}
        {/* make checkout into a link. passing an obj into href attr for <Link> component */}
        {/* /**
         * in checkout summary component in React.useEffect() we are making
         * localStorage.getItem() call to get data cartDataForCheckout
         * checkout btn just send user to /checkout page
         * **/}
        <Link href="/checkout">
          <a
            onKeyDown={keyboardFunctionalityFocusRemoveAllBtn.bind({
              refToRemoveAllBtn,
              refToCheckoutBtn,
            })}
            ref={refToCheckoutBtn}
            className={CartModalStyles[`checkout-btn`]}
            onClick={sendCartModalDataToLocalStorage.bind({
              cartInfo: cartModalObj.checkoutPageData,
              rerenderCartModal: useCartModalState,
            })}
          >
            checkout
          </a>
        </Link>
      </div>
    </div>
  );
}

export default CartModal;
