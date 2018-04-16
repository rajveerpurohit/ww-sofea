import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import SlickCarousel from 'react-slick';

import Image from '../Image';
import { pdpSliderSettings } from '../../../Constants';

const ProductAuxiliaryMedia = ({ auxiliaryMedia, onClick, selectedProductSKU, width, height }) => {
  const { id, colour, externalLargeImage, internalLargeImage, externalImageUrlReference } = selectedProductSKU;

  if (auxiliaryMedia) {
    return (
      <div className="grid--space-y">
        <div
          style={{ maxHeight: '103px' }}
          className="is-carousel slick-initialized slick-slider"
        >
          <SlickCarousel {...pdpSliderSettings} >
            <Link
              key={`${id}_${colour}`}
              onClick={e => onClick(e, { externalLargeImage, internalLargeImage })}
              className="pdp__thumb slick-slide slick-current slick-active"
              style={{ width: '159px' }}
              aria-hidden="false"
            >
              <Image
                style={{ width: '80px' }}
                payload={{
                  id: `${id}_${colour}`,
                  url: internalLargeImage,
                  externalUrl: externalLargeImage && `${externalImageUrlReference}o=${externalLargeImage}`,
                  alt: `${id}_${colour}`,
                  title: `${id}_${colour}`,
                  width,
                  height
                }}
              />
            </Link>
            {_.map(auxiliaryMedia, (media, type) => {
              const { internalAuxiliaryImage, externalAuxiliaryImage } = media;

              return (
                <Link
                  key={media.id}
                  onClick={e => onClick(e, { externalLargeImage: externalAuxiliaryImage, internalLargeImage: internalAuxiliaryImage })}
                  className="pdp__thumb slick-slide slick-current slick-active"
                  style={{ width: '159px' }}
                  aria-hidden="false"
                >
                  <Image
                    style={{ width: '80px' }}
                    payload={{
                      id: media.id,
                      url: internalAuxiliaryImage,
                      externalUrl: externalAuxiliaryImage && `${externalImageUrlReference}o=${externalAuxiliaryImage}`,
                      alt: type,
                      title: type,
                      width,
                      height
                    }}
                  />
                </Link>
              );
            })}
          </SlickCarousel>
        </div>
      </div>
    );
  }

  return null;
};

export default ProductAuxiliaryMedia;
