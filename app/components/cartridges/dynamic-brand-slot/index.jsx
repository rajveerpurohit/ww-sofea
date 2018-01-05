import React from 'react';
import ImageBanner from '../image-banner';

const DynamicBrandSlot = ({contentData}) => {
    return (
      <div className="grid landing__row lazyload-container">
        {
          contentData.BrandImages.map((img, index) => {
            const imgData = {
              ...img,
              key: index
            };
            return (
              <article className="landing__block landing__block--half-fourth block-brand" key={imgData.key}>
                <ImageBanner contentData={imgData} />
              </article>
            );
          })
        }
      </div>
	);
};
export default DynamicBrandSlot;
