import React from "react";
import Head from "next/head";
import GoBackButton from "../../Components/shared/GoBackButton";
import CheckoutStyles from "../../styles/Checkout/CheckoutPage.module.css";
import CheckoutForm from "../../Components/Checkout/CheckoutForm";
import CheckoutSummary from "../../Components/Checkout/CheckoutSummary";
import MobileNav from "../../Components/shared/MobileNav";
import LogoNavContainer from "../../Components/shared/LogoNavContainer";
import Main from "../../Components/shared/Main";
import Footer from "../../Components/shared/Footer";
import { useMediaQuery } from "../../utils/helpers";

export const ErrorMessageContext = React.createContext({});

function Checkout(props) {
  const memoizedInputRefs = React.useMemo(() => {
    return {
      personal: {
        name: null,
        phoneNum: null,
        email: null,
      },
      billing: {
        address: null,
        city: null,
        state: null,
        zipCode: null,
        country: null,
      },
      shipping: {
        address: null,
        city: null,
        state: null,
        zipCode: null,
        country: null,
      },
      paymentMethodSelection: {
        eMoney: null,
        cashDelivery: null,
        inputMoney: {
          number: null,
          pin: null,
        },
      },
      sameAddressInputRef: {
        yesBtn: null,
        noBtn: null,
      },
      toggleObj: {
        toggleLinkBetweenBillingAndShipping: null,
        billingAndShippingSame: null,
      },
      renderFormAssistiveData: null,
    };
  }, []);

  const isTablet = useMediaQuery("max", 768);

  return (
    <React.Fragment>
      <Head>
        <title>Checkout</title>
        <link
          rel="shortcut icon"
          href="/favicon-32x32.png"
          type="image/x-icon"
        />
      </Head>{" "}
      <a href="#main-content" className="skip-link">
        Skip to Main Content
      </a>
      <h1 className="visually-hidden">Checkout</h1>
      <ErrorMessageContext.Provider value={memoizedInputRefs}>
        <header role="banner">
          {/* logonav container */}
          <LogoNavContainer />
        </header>
        <Main isDarkerBgTrue="true">
          {/* go back button */}
          <GoBackButton pageMarginBlock="checkout" baseCategoryUrl="/" />
          <div className={CheckoutStyles[`form-summary-wrapper`]}>
            <CheckoutForm />
            {/* code below: we're making api call in getStaticProps func to get data */}
            {/* from data. The data is push to database when user click on checkout btn */}
            {/* in cart modal component */}
            {/* <CheckoutSummary dataPassedToSummary={props.cartModalData} /> */}
            {/* if we dont want to make a fetch call to mongodb database we can */}
            {/* fetch data in CheckoutSummary component using React.useEffect */}
            <CheckoutSummary />
          </div>
        </Main>
        {/* for each input of checkout form we want to save each key input to localstorage */}
        {/* in our summary component we can access that data when user click on checkout/pay */}
        {/* footer */}
        <Footer />
        {/* mobile nav */}
        {isTablet ? <MobileNav /> : null}
      </ErrorMessageContext.Provider>
    </React.Fragment>
  );
}

export default Checkout;

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
