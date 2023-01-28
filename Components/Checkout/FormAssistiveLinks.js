import React from "react";
import FormAssistiveStyles from "../../styles/Checkout/FormAssistiveLinks.module.css";
import { ErrorMessageContext } from "../../pages/checkout/index";

export default function FormAssistiveLinks({ children, ...props }) {
  const checkoutRefObj = React.useContext(ErrorMessageContext);

  const memoizedInitialValues = React.useMemo(() => {
    return {
      errors: {
        total: 0,
        personal: 0,
        billing: 0,
        shipping: 0,
        emoney: 0,
      },
      personalInputArray: null,
      billingInputArray: null,
      shippingInputArray: null,
      emoneyInputArray: null,
    };
  }, []);

  const [
    {
      errors: { total, personal, billing, shipping, emoney },
      personalInputArray,
      billingInputArray,
      shippingInputArray,
      emoneyInputArray,
    },
    setErrorInputValues,
  ] = React.useState(memoizedInitialValues);
  checkoutRefObj.renderFormAssistiveData = setErrorInputValues;
  return (
    <React.Fragment>
      {total > 0 ? (
        <div role="alert" className={FormAssistiveStyles[`wrapper`]}>
          <h3 className={FormAssistiveStyles[`total-of-errors`]}>
            {`There are ${total} ${
              total > 1 ? `errors` : `error`
            } in this form.`}
          </h3>
          {/* personal */}
          {personal > 0 ? (
            <div className={FormAssistiveStyles[`title-list-errors`]}>
              <h4 className={FormAssistiveStyles[`title`]}>
                Personal Section Errors
              </h4>
              <ul className={FormAssistiveStyles[`personal-errors-list`]}>
                <ErrorLinks inputArray={personalInputArray} />
              </ul>
            </div>
          ) : null}
          {/* billing */}
          {billing > 0 ? (
            <div className={FormAssistiveStyles[`title-list-errors`]}>
              <h4 className={FormAssistiveStyles[`title`]}>
                Billing Section Errors
              </h4>
              <ul className={FormAssistiveStyles[`billing-errors-list`]}>
                <ErrorLinks inputArray={billingInputArray} />
              </ul>
            </div>
          ) : null}
          {/* shipping */}
          {shipping > 0 ? (
            <div className={FormAssistiveStyles[`title-list-errors`]}>
              <h4 className={FormAssistiveStyles[`title`]}>
                Shipping Section Errors
              </h4>
              <ul className={FormAssistiveStyles[`shipping-errors-list`]}>
                <ErrorLinks inputArray={shippingInputArray} />
              </ul>
            </div>
          ) : null}

          {/* emoney */}
          {emoney > 0 ? (
            <div className={FormAssistiveStyles[`title-list-errors`]}>
              <h4 className={FormAssistiveStyles[`title`]}>
                Emoney Section Errors
              </h4>
              <ul className={FormAssistiveStyles[`emoney-errors-list`]}>
                <ErrorLinks inputArray={emoneyInputArray} />
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </React.Fragment>
  );
}

function ErrorLinks({ children, ...props }) {
  return (
    <React.Fragment>
      {props.inputArray.map(function makeLinks(element, index) {
        const id = element.getAttribute("id");
        const replaceDashWithSpace = id.replace("-", " ");
        // if the input is empty let user know input field can't be empty
        // else the format is incorrect
        return (
          <li
            className={FormAssistiveStyles[`error-links`]}
            key={Math.random() * index}
          >
            {element.value === "" ? (
              <a
                href={`#${id}`}
              >{`The ${replaceDashWithSpace} field is empty, it is a required field. Please fill in the ${replaceDashWithSpace} field.`}</a>
            ) : (
              <a
                href={`#${id}`}
              >{`Please check that the format for the ${replaceDashWithSpace} is correct.`}</a>
            )}
          </li>
        );
      })}
    </React.Fragment>
  );
}
