import React from 'react';
import ImageBanner from '../image-banner';
import DynamicRichText from '../dynamic-rich-text';
import RotateBanner from '../../basic/rotate-banner';

const DynamicSingleSlot = ({ contentData }) => {

  const generateDynamicRichText = () => {
    return contentData.Image.map((img, index) => {
      return (<DynamicRichText contentData={img} key={index} />);
    });
  };

  const generateSingleBanner = () => {
    return contentData.Image.map((img, index) => {
      const imgData = {
        ...img,
        key: index
      };
      return (<ImageBanner contentData={imgData} key={imgData.key} />);
    });
  };

  const generateAutoScrollBanner = () => {
    const bannerSlides = [];
    contentData.Image.map((img, index) => {
      const imgData = {
        ...img,
        key: index
      };
      bannerSlides.push(<input type="radio" key={`${index}_input`} id={`banner-${index + 1}`} defaultValue="banner-1" name="rotate-banner-group" className="rotate-banner__trigger" />);
      bannerSlides.push(<div className="rotate-banner__banner" key={`${index}_div`} ><ImageBanner contentData={imgData} /></div>);
    });
    return (
      <RotateBanner>
        {bannerSlides}
      </RotateBanner>
    );
  };

  return (
    <div className="grid landing__row">
      <div className="landing__block lazyload-container">
        { contentData.Image.length <= 1 ? contentData.Image && contentData.Image[0] && contentData.Image[0]['@type'] === 'DynamicRichText' ? generateDynamicRichText() : generateSingleBanner() : generateAutoScrollBanner()}
      </div>
    </div>
  );
};

export default DynamicSingleSlot;
