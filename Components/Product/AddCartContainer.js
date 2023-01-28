import React from "react";
import AddCartStyles from "../../styles/Product/AddCartContainer.module.css";
import { updateQuantity, addToCartAlgorithm } from "../../utils/helpers";

function AddCart({ children, ...props }) {
  const propsForCart = props.objOfValues;
  const quantityInputRef = React.useRef();

  React.useEffect(() => {
    quantityInputRef.current.value = "1";
  });

  return (
    <div className={AddCartStyles[`addcart-wrapper`]}>
      {/* quantity control */}
      <div
        onClick={updateQuantity.bind({ quantityInputRef })}
        className={AddCartStyles[`quantity-wrapper`]}
      >
        {/* decrement */}
        <button
          data-typeofupdate="decrement"
          className={AddCartStyles[`decrement`]}
        >
          -
        </button>
        {/* number input */}
        <input type="number" ref={quantityInputRef} />
        {/* increment */}
        <button
          data-typeofupdate="increment"
          className={AddCartStyles[`increment`]}
        >
          +
        </button>
      </div>
      {/* add cart btn */}
      {/* make add cart btn into a component with cart modal when we call useCartState in */}
      <button
        onClick={addToCartAlgorithm.bind({
          quantityInputRef,
          propsForCart,
        })}
        className={AddCartStyles[`add-cart-btn`]}
      >
        add to cart
      </button>
    </div>
  );
}

export default AddCart;
