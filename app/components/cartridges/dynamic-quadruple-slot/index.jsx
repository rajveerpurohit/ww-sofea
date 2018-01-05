import React from 'react';
import ImageBanner from '../image-banner';

const DynamicQuadrupleSlot = ({contentData}) => {
    return (
      <div className="grid landing__row">
        {
          contentData.Images.map((img, index) => {
            const imgData = {
              ...img,
              key: index
            };
            return (
              <div className="landing__block landing__block--half-fourth lazyload-container" key={imgData.key} >
                <ImageBanner contentData={imgData} />
              </div>
            );
          })
        }
      </div>
    );
};
export default DynamicQuadrupleSlot;
