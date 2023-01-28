import React from "react";
import Head from "next/head";
import HomeStyles from "../styles/Home/Home.module.css";
import CategoryCardWrapper from "../Components/shared/CategoryCardWrapper";
import LogoNavContainer from "../Components/shared/LogoNavContainer";
import MobileNav from "../Components/shared/MobileNav";
import Footer from "../Components/shared/Footer";
import MissionStatement from "../Components/shared/MissionStatement";
import HeroContent from "../Components/Home/HeroContent";
import FeatureProducts from "../Components/Home/FeatureProducts";
import Main from "../Components/shared/Main";

function Home({ children, ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Audiophile</title>
        <link
          rel="shortcut icon"
          href="/favicon-32x32.png"
          type="image/x-icon"
        />
      </Head>
      <a href="#main-content" className="skip-link">
        Skip to Main Content
      </a>
      <h1 className="visually-hidden">Audiophile</h1>
      <header className={HomeStyles[`header`]} role="banner">
        {/* logo nav */}
        <LogoNavContainer />
        {/* hero content */}
        <HeroContent />
      </header>
      <Main>
        {/* category link container */}
        <CategoryCardWrapper pageStyle="home" />
        {/* featured products */}
        <FeatureProducts />
        {/* mission statement */}
        <MissionStatement pageMargin="home" />
      </Main>
      <Footer />
      {/* Mobile menu modal */}
      <MobileNav />
    </React.Fragment>
  );
}

export default Home;
