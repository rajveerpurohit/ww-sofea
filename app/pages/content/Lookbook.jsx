import React from 'react';
import { Link } from 'react-router';

import Image from '../../components/basic/Image';
import SocialLinks from '../../components/basic/social-links';

const Lookbook = ({ contentData }) => {
  const generateLookbook = () => {
    if (contentData.LookBook.interactive) {
      // To DO: Interactive Pages... Because External CSS/JSS is being loaded
      return null;
    }
    const renderProductSocialLinksElm = () => {
      const displayName = 'Edition: ' + contentData.LookBook.title;
      if (typeof window !== 'undefined' && window) {
        // const displayTitle = contentData.displayName;
        const mediaName = 'http://' + window.location.host + contentData.LookBook.looks[0].firstLookImage && contentData.LookBook.looks[0].firstLookImage.internalImage;
        const config = {
          url: '',
          text: displayName,
          media: [mediaName]
        };


        config.url = window.location.href;


        return (
          <SocialLinks
            twitter={config}
            pinterest={config}
            facebook={config}
          />
        );
      }
    };

    const imageGrid = (lookImageData, caption = '') => {
      return (
        lookImageData.url.indexOf('www.youtube.com') >= -1 || lookImageData.url.indexOf('youtu.be') >= -1 ?
          (<div>
            <Image payload={lookImageData} />
            <div className="text-small" dangerouslySetInnerHTML={{ __html: caption }} />
          </div>)
          :
          (<div className="grid">{lookImageData.url.indexOf('internalmedia') >= -1 ?
            <iframe className="img-fill-responsive" height={315} src={`${lookImageData}?wmode=transparent`} frameBorder={0} width={560} allowFullScreen /> :
            <iframe className="img-fill-responsive" height={315} src={`${lookImageData.url}?wmode=transparent`} frameBorder={0} width={560} allowFullScreen />
          }
          </div>)

      );
    };

    const oneImageGrid = (lookImage) => {
      const lookImageData = {
        url: (lookImage.image && lookImage.image.internalImage) || '',
        alt: lookImage.displayName,
        className: 'img-fill-responsive',
      };

      return (
        <div className="grid__full">
          {imageGrid(lookImageData, lookImage.caption)}
        </div>
      );
    };

    const twoImageGrid = (look) => {
      return (
        <div>
          {look.lookImages.map((lookImage) => {
            const lookImageData = {
              url: (lookImage.image && lookImage.image.internalImage) || '',
              alt: lookImage.displayName,
              className: 'img-fill-responsive',
            };

            return (
              <div className="grid__half--medium">
                {imageGrid(lookImageData, lookImage.caption)}
              </div>
            );
          })}
        </div>
      );
    };
    return (
      <div className="lookbook grid grid--space-y">
        <h1 style={{ textAlign: 'center' }}><strong>{contentData.LookBook.title}</strong></h1>
        <div style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: contentData.LookBook.content }} />
        <div className="grid grid--space-y">
          {renderProductSocialLinksElm()}
        </div>
        {
          contentData.LookBook.looks.map((look) => {
            const lookImg = [];
            lookImg.push(
              <section className="lookbookImages grid pos--rel">
                {look.lookImages && look.lookImages.length === 1 ? oneImageGrid(look) : twoImageGrid(look)}
              </section>
            );
            lookImg.push(<div className="grid" dangerouslySetInnerHTML={{ __html: look.content ? look.content : '' }} />);
            return lookImg;
          })
        }
      </div>
    );
  };
  return (
    <div className="grid grid--space-y site-map-content">
      {generateLookbook()}
    </div>
  );
};
export default Lookbook;
