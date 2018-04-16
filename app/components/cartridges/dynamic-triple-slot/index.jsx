import React from 'react';
import ImageBanner from '../image-banner';

const DynamicTripleSlot = ({ contentData }) => {
  return (
    <div className="grid landing__row">
      {
                contentData.Images.map((img, index) => {
                  const imgData = {
                    ...img,
                    key: index
                  };
                  return (
                    <div className="grid__third--small landing__block lazyload-container" key={imgData.key} >
                      <ImageBanner contentData={imgData} />
                    </div>
                  );
                })
            }
    </div>
  );
};
export default DynamicTripleSlot;
