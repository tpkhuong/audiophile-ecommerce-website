import React from "react";
import GoBackButtonStyles from "../../styles/Components/shared/GoBackButton.module.css";
import Link from "next/link";
import { goToPreviousPage } from "../../utils/helpers";

function GoBackButton({ children, ...props }) {
  /**
   * we want to render go back btn with href of previous page url when the product renders to
   * not when user click on go back back.
   * doesnt seem right to change href of go back btn when user click on go back btn because
   * the href for go back btn will be the default href when it renders and not the url
   * of previous page.
   * **/
  const [urlData, urlState] = React.useState(false);
  // access the last item in the array previousUrls
  // in our goToPreviousPage function in helpers.js
  // update the previousUrls array in localStorage
  // we can access the last item in previouSurls array; array[array.length - 1]
  // it will be the last item in array because we will mutate the array in localStorage
  // using .pop() method
  /**
   * when we pass an array as the second argument to useEffect, the useEffect will run just once
   * the initial render/mounting of that component. Based on testing using console.log
   * **/
  /**
   * we will take the performance hit because this component will render twice since
   * we are using function returned from calling useState(). But this component is only the
   * go back btn.
   * **/
  React.useEffect(() => {
    const arrayOfLinks = JSON.parse(localStorage.getItem("previousLinks"));
    const lastUrl = arrayOfLinks[arrayOfLinks.length - 1];
    urlState(lastUrl);
  });

  return (
    <React.Fragment>
      {!urlData ? (
        <Link href={props.baseCategoryUrl}>
          <a
            onClick={goToPreviousPage}
            className={`${GoBackButtonStyles[`go-back-btn`]} ${
              GoBackButtonStyles[`${props.pageMarginBlock}`]
            }`}
          >
            Go Back
          </a>
        </Link>
      ) : (
        <Link href={urlData}>
          <a
            onClick={goToPreviousPage}
            className={`${GoBackButtonStyles[`go-back-btn`]} ${
              GoBackButtonStyles[`${props.pageMarginBlock}`]
            }`}
          >
            Go Back
          </a>
        </Link>
      )}
    </React.Fragment>
  );
}

export default GoBackButton;
