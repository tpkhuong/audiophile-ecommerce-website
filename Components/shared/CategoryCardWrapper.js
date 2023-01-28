import React from "react";
import CategoryLinkCard from "./CategoryLinkCard";
import CategoryStyles from "../../styles/Components/shared/CategoryCardWrapper.module.css";

function CategoryCardWrapper({ children, ...props }) {
  return (
    <article
      className={`${CategoryStyles[`${props.pageStyle}`]} ${
        CategoryStyles[`general`]
      }`}
    >
      <CategoryLinkCard
        imageSrc="/shared/desktop/image-category-thumbnail-headphones.png"
        imageText="Black overhead headphones"
        categoryName="HEADPHONES"
      />
      <CategoryLinkCard
        imageSrc="/shared/desktop/image-category-thumbnail-speakers.png"
        imageText="Black overhead headphones"
        categoryName="SPEAKERS"
      />
      <CategoryLinkCard
        imageSrc="/shared/desktop/image-category-thumbnail-earphones.png"
        imageText="Black overhead headphones"
        categoryName="EARPHONES"
      />
    </article>
  );
}

export default CategoryCardWrapper;
