import React from 'react';
import ImageBanner from '../image-banner';

const ContentBlock = ({contentData}) => {
    const genrateBlocks = (images, withParagraph) => {
        if (withParagraph) {
            return images.map((img, index) => {
                const imgData = {...img, key: index};
                return (
                  <p key={index}>
                    <ImageBanner contentData={imgData} key={index} />
                  </p>
                );
            });
        }
            return images.map((img, index) => {
                const imgData = {...img, key: index};
                return (
                  <ImageBanner contentData={imgData} key={index} />
                );
            });
    };
    const renderStepShop = () => {
        return (
          <div className="stepsShop">
            {genrateBlocks(contentData.contentBlockImages)}
          </div>
        );
    };
    const renderContentBlockWithParagraph = () => {
        return (
          <div className="contentBlock">
            {genrateBlocks(contentData.contentBlockImages, true)}
          </div>
        );
    };
    const renderBottomChild = () => {
        return (
          <div className="bottom-child">
            {genrateBlocks(contentData.contentBlockImages)}
          </div>
        );
    };
    const renderDefault = () => {
        return (
          <div className="contentBlock">
            {genrateBlocks(contentData.contentBlockImages)}
          </div>
        );
    };
    switch (contentData.contentBlockType) {
        case 'stepsShop' : return renderStepShop();

        case 'contentBlockWithParagraph' : return renderContentBlockWithParagraph();

        case 'bottom-child' : return renderBottomChild();

        default : return renderDefault();
    }
};
export default ContentBlock;
