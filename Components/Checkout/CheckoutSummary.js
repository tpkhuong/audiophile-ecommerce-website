import React from "react";
import CheckoutSummaryStyles from "../../styles/Checkout/CheckoutSummary.module.css";
import SummaryItem from "./SummaryItem";
import OrderModalWrapper from "./ConfirmedOrderModalWrapper";
import { addCommasToPrice, taxCalculation } from "../../utils/helpers";

function CheckoutSummary({ children, ...props }) {
  /**
   * when we want to rerender checkout summary removing ordered items and prices
   * rerenderCheckoutSummary in checkout page
   * renderCheckoutSummary in cart modal
   * **/
  React.useEffect(() => {
    // parse json from local storage
    const dataForSummary = JSON.parse(
      localStorage.getItem("cartDataForCheckout")
    );
    const { total_price, items } = dataForSummary;
    //   calculate tax and grand total before we assign them to values in our
    const valueAddedTax = taxCalculation(total_price);
    const shippingCost = items.length == 0 ? 0 : 50;
    // array of values to calculate grand total
    const arrayOfValuesForGrandTotal = [
      total_price,
      valueAddedTax,
      shippingCost,
    ];
    const grandTotal = arrayOfValuesForGrandTotal.reduce(function getSum(
      buildingUp,
      currentValue
    ) {
      return buildingUp + currentValue;
    },
    0);
    //   build array of obj
    const arrayOfTaxShippingTotalObj = [
      // total
      {
        textContent: "total",
        classText: "total-price-wrapper",
        totalPriceStrType: addCommasToPrice(total_price),
      },
      // shipping
      {
        textContent: "shipping",
        classText: "shipping-price-wrapper",
        totalPriceStrType: addCommasToPrice(shippingCost),
      },
      // value added tax
      {
        textContent: "vat (included)",
        classText: "vat-price-wrapper",
        totalPriceStrType: addCommasToPrice(valueAddedTax),
      },
      // grand total
      {
        textContent: "grand total",
        classText: "grand-total-price-wrapper",
        totalPriceStrType: addCommasToPrice(grandTotal),
      },
    ];
    /**
     * values of total,shipping VAT and grand total price for order details schema
     * **/
    const objOfValuesForOrderDetailsSchema = {
      totalPrice: total_price,
      shippingCost,
      tax: valueAddedTax,
      grandTotal,
    };
    // pass arrayOfTaxShippingTotalObj and items into
    // setSummaryValues
    setSummaryValues((previousValues) => {
      return {
        ...previousValues,
        itemsArray: items,
        taxShippingTotalArray: arrayOfTaxShippingTotalObj,
        grandTotalNum: grandTotal,
        orderDetailsValues: objOfValuesForOrderDetailsSchema,
      };
    });
  }, []);
  const memoizedSummaryInfo = React.useMemo(() => {
    return {
      itemsArray: [],
      taxShippingTotalArray: [],
      grandTotalNum: 0,
      orderDetailsValues: {},
    };
  }, []);
  const [initialSummaryObj, setSummaryValues] =
    React.useState(memoizedSummaryInfo);
  return (
    <article className={CheckoutSummaryStyles[`summary-wrapper`]}>
      {/* title */}
      <h2 className={CheckoutSummaryStyles[`title`]}>summary</h2>
      <ul className={CheckoutSummaryStyles[`summary-item-list`]}>
        {/* we will pass in name.display, price.display, item_quantity, image_src, alt_text  into SummaryItem */}
        {initialSummaryObj["itemsArray"].length < 1 ? (
          <p className={CheckoutSummaryStyles[`empty-cart-message`]}>
            Please add items to cart before clicking "Checkout" button.
          </p>
        ) : (
          initialSummaryObj["itemsArray"].map(function createItems(
            element,
            index
          ) {
            const { name, price, item_quantity, image_src, alt_text } = element;
            return (
              <SummaryItem
                key={Math.random() * index}
                name={name.display}
                price={price.display}
                quantity={item_quantity}
                imageSrc={image_src}
                imageAlt={alt_text}
              />
            );
          })
        )}
      </ul>
      <div className={CheckoutSummaryStyles[`total-tax-shipping-wrapper`]}>
        {/* total price */}
        {/* shipping price */}
        {/* VAT (tax) */}
        {/* grand total */}
        {initialSummaryObj["taxShippingTotalArray"].length < 1 ? (
          <p>Loading...</p>
        ) : (
          initialSummaryObj["taxShippingTotalArray"].map(
            function buildPriceRowSummary(element, index) {
              const { textContent, totalPriceStrType, classText } = element;
              return (
                <div
                  key={Math.random() * index}
                  className={CheckoutSummaryStyles[`${classText}`]}
                >
                  <span className={CheckoutSummaryStyles[`text`]}>
                    {textContent}
                  </span>
                  <span className={CheckoutSummaryStyles[`price`]}>
                    <span className={CheckoutSummaryStyles[`dollar-sign`]}>
                      $
                    </span>
                    <span className={CheckoutSummaryStyles[`price-digit`]}>
                      {totalPriceStrType}
                    </span>
                  </span>
                </div>
              );
            }
          )
        )}
      </div>
      {/* continue and pay btn */}
      <OrderModalWrapper
        valuesForOrderDetails={initialSummaryObj.orderDetailsValues}
        itemsInfo={initialSummaryObj.itemsArray}
        grandTotalValue={initialSummaryObj.grandTotalNum}
      />
      {/* User order modal when user click on continue and pay */}
      {/* order modal needs items and grand total from summary component */}
    </article>
  );
}

export default CheckoutSummary;
