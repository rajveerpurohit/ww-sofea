import React from 'react';

/**
 *
 * @param {object} props
 * @param {string} props.url
 * @param {[string]} props.alt
 * @param {[string]} props.width
 * @param {[string]} props.height
 * @param {[string]} props.className
 */
const Image = (props) => {
  let EXTERNAL_IMAGE_URL = '/';
  let INTERNAL_IMAGE_URL = '/';
  let USE_CDN = false;
  const payload = props.payload || {};

  if (typeof window !== 'undefined') {
    EXTERNAL_IMAGE_URL = window.EXTERNAL_IMAGE_URL;
    INTERNAL_IMAGE_URL = window.INTERNAL_IMAGE_URL;
    USE_CDN = window.USE_CDN;
  } else {
    INTERNAL_IMAGE_URL = global.INTERNAL_IMAGE_URL;
  }

  if (Object.keys(payload).length === 0) return <img alt="" />;

  let imgSrc = '';
  let imagePath = payload.url || '';
  imagePath = imagePath[0] === '/' ? imagePath.substr(1) : imagePath;

  if (USE_CDN === true) {
    imgSrc = payload.externalUrl ? EXTERNAL_IMAGE_URL + payload.externalUrl : INTERNAL_IMAGE_URL + imagePath;

    const imgUrl = new URL(imgSrc);
    const searchParams = imgUrl.search;

    if (searchParams.length === 0) {
      if (payload.width && payload.height) {
        imgSrc = `${imgSrc}?w=${payload.width}&h=${payload.height}`;
      } else {
        imgSrc = payload.width ? `${imgSrc}?w=${payload.width}` : imgSrc;
        imgSrc = payload.height ? `${imgSrc}?h=${payload.height}` : imgSrc;
      }
    } else {
      imgSrc = payload.width ? `${imgSrc}&w=${payload.width}` : imgSrc;
      imgSrc = payload.height ? `${imgSrc}&h=${payload.height}` : imgSrc;
    }
  } else {
    // console.log('cdn false imgSrc', imgSrc);
    imgSrc = INTERNAL_IMAGE_URL + imagePath;
  }

  const properties = Object.assign({}, props);
  delete properties.payload;
  delete properties.setRef;
  if (props.setRef) properties.ref = props.setRef;
  return (
    <img
      {...properties}
      id={payload.id}
      width={payload.width ? payload.width : undefined}
      height={payload.height ? payload.height : undefined}
      className={payload.className}
      alt={payload.alt}
      data-src={imgSrc}
      src={imgSrc}
      title={payload.title}
    />
  );
};

export default Image;
