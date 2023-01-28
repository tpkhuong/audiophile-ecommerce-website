import React from "react";
import Head from "next/head";
import axios from "axios";
import LogoNavContainer from "../../../Components/shared/LogoNavContainer";
import MobileNav from "../../../Components/shared/MobileNav";
import Main from "../../../Components/shared/Main";
import CategoryCardWrapper from "../../../Components/shared/CategoryCardWrapper";
import MissionStatement from "../../../Components/shared/MissionStatement";
import Footer from "../../../Components/shared/Footer";
import ProductPageStyles from "../../../styles/Product/ProductPage.module.css";
import ProductImgWrapper from "../../../Components/Product/ProductImgWrapper";
import ProductTextPriceInfo from "../../../Components/Product/ProductTextPriceInfo";
import ProductFeatures from "../../../Components/Product/ProductFeatures";
import ProductIncludedItems from "../../../Components/Product/ProductIncludedItems";
import ProductImageGrid from "../../../Components/Product/ProductImageGrid";
import ProductRecommendations from "../../../Components/Product/ProductRecommendations";
import GoBackButton from "../../../Components/shared/GoBackButton";
import { server } from "../../../config/index";

function ProductPage({ children, ...props }) {
  const {
    slug,
    name,
    image,
    newProduct,
    price,
    description,
    features,
    includes,
    gallery,
    others,
  } = props.data;
  const titleForPage = slug.split("-").join(" ");
  return (
    <React.Fragment>
      <Head>
        <title>{titleForPage}</title>
        <link
          rel="shortcut icon"
          href="/favicon-32x32.png"
          type="image/x-icon"
        />
      </Head>
      <a href="#main-content" className="skip-link">
        Skip to Main Content
      </a>
      <h1 className="visually-hidden">{titleForPage}</h1>
      <LogoNavContainer />
      <Main>
        {/* product-img-textcontent */}
        {/* go back button component */}
        {/* <BackBtnWrapper baseCategoryUrl={props.categoryUrl} /> */}
        <GoBackButton
          pageMarginBlock="product"
          baseCategoryUrl={props.categoryUrl}
        />
        <article className={ProductPageStyles[`product-img-textcontent`]}>
          {/* pass in image obj to ProductImgWraper as prop imageSrcObj*/}
          <ProductImgWrapper imageSrcObj={image} />
          {/* pass in name(title as props), newProduct, price, description as props to ProductTextPriceInfo */}
          <ProductTextPriceInfo
            imgSrcName={slug}
            title={name}
            newProduct={newProduct}
            price={price}
            description={description}
            altText={image.text}
          />
        </article>
        {/* product-features-includes */}

        <article className={ProductPageStyles[`product-features-includes`]}>
          {/* pass in features string to ProductFeatures as productText prop */}
          <ProductFeatures productText={features} />
          {/* pass in includes array to ProductIncludedItems as includedItems prop */}
          <ProductIncludedItems includedItems={includes} />
        </article>
        {/* product img grid */}
        {/* apply margin-block here */}
        <article className={ProductPageStyles[`product-img-grid`]}>
          {/* pass in gallery obj as galleryImgData prop into ProdcutImgGrid */}
          <ProductImageGrid galleryImgData={gallery} />
        </article>
        {/* recommendations */}
        {/* pass in others array as recommendations prop to ProductRecommendations  */}
        <ProductRecommendations recommendations={others} />
        {/* Category Cards */}
        <CategoryCardWrapper pageStyle="product" />
        {/* Mission Statement */}
        <MissionStatement pageMargin="product" />
      </Main>
      <Footer />
      <MobileNav />
    </React.Fragment>
  );
}

export default ProductPage;

// set up paths

export async function getStaticPaths() {
  // array of product paths
  const productPaths = [
    ["headphones", "xx99mark1"],
    ["headphones", "xx99mark2"],
    ["headphones", "xx59"],
    ["speakers", "zx9"],
    ["speakers", "zx7"],
    ["earphones", "yx1wireless"],
  ];
  const paths = productPaths.map(function makeProductPaths(element) {
    const [category, product] = element;
    return {
      params: { category, product },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

// set up props

export async function getStaticProps(context) {
  /**
   * using axios
   * **/
  const response = await axios(
    `${server}/api/${context.params.category}/${context.params.product}`
  );

  const categoryUrl = context.params.category;

  const data = response.data;
  return {
    props: { data, categoryUrl },
  };
}
