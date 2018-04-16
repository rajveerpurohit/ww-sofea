import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import ImageBanner from '../image-banner';
import ImageLazyLoad from '../../basic/image/ImageLazyLoad';

const DynamicBrandSlot = ({ contentData }) => {

  const BrandImages = _.get(contentData, 'BrandImages', '');
  return (
    <div className="grid landing__row lazyload-container">
      {
        BrandImages.map((data, index) => {
          const imgDataMedia = {
            url: data.media.uri,
            alt: data.media.uri,
            className: 'block-brand__logo',
            key: index
          };
          const imageDataSecMedia = {
            url: data.secondaryMedia.uri,
            alt: data.secondaryMedia.uri,
            className: 'block-brand__logo block-brand__logo--hover',
          };
          return (
            <article className="landing__block landing__block--half-fourth block-brand" >
              <Link className="block-brand__link" to={data.link.url ? data.link.url : data.link.navigationURL}>
                <ImageLazyLoad
                  payload={imgDataMedia}

                />
                <ImageLazyLoad
                  payload={imageDataSecMedia}

                />
              </Link>

            </article>
          );
        })
      }
    </div>
  );
};
export default DynamicBrandSlot;
