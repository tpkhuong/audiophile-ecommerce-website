import React from "react";
import MissionStatementStyles from "../../styles/Components/shared/MissionStatement.module.css";

function MissionStatement({ children, ...props }) {
  return (
    <article
      className={`${MissionStatementStyles[`${props.pageMargin}`]} ${
        MissionStatementStyles[`img-text-container`]
      }`}
    >
      {/* img */}
      <div className={MissionStatementStyles[`img-wrapper`]}>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet="/shared/desktop/image-best-gear.jpg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/shared/tablet/image-best-gear.jpg"
          />
          <img
            src="/shared/mobile/image-best-gear.jpg"
            alt="Male with black over the ear head phones wearing white t shirt."
          />
        </picture>
      </div>
      {/* text content */}
      <div className={MissionStatementStyles[`text-content-wrapper`]}>
        <h2 className={MissionStatementStyles[`title`]}>
          BRINGING YOU THE{" "}
          <span className={MissionStatementStyles[`orange-text`]}>BEST</span>{" "}
          AUDIO GEAR
        </h2>
        <p className={MissionStatementStyles[`description`]}>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </article>
  );
}

export default MissionStatement;
