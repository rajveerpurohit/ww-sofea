import React from 'react';
import ImageBanner from '../image-banner';

const DynamicSingleSlot = ({contentData}) => {
    return (
      <div className="grid landing__row">
        <div className="landing__block lazyload-container">
          {
          contentData.Image.map((img, index) => {
            const imgData = {
              ...img,
              key: index
            };
            return (

              <ImageBanner contentData={imgData} key={index} />

            );
          })
        }
        </div>
      </div>
    );
};
export default DynamicSingleSlot;
