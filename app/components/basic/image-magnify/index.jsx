import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import nUrl from 'url';
import qs from 'qs';

class ImageMagnify extends Component {
  constructor(props) {
    super(props);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  onMouseLeave() {
    this.imageNode.style.display = 'block';
    this.figureNode.style.backgroundImage = 'none';
  }

  onMouseEnter(e, imageUrl) {
    this.imageNode.style.display = 'none';
    this.figureNode.style.backgroundImage = `url(${imageUrl})`;
  }

  onMouseMove(e) {
    const zoomer = e.currentTarget;
    const { position } = this.props;

    const x = (position.x / zoomer.offsetWidth) * 100;
    const y = (position.y / zoomer.offsetHeight) * 100;

    zoomer.style.backgroundPosition = `${x}% ${y}%`;
  }

  render() {
    const { alt, url, externalUrl, className, width, height } = this.props;

    let imageUrl = '';

    let EXTERNAL_IMAGE_URL = '/';
    let INTERNAL_IMAGE_URL = '/';
    let USE_CDN = false;

    if (typeof window !== 'undefined') {
      EXTERNAL_IMAGE_URL = window.EXTERNAL_IMAGE_URL;
      INTERNAL_IMAGE_URL = window.INTERNAL_IMAGE_URL;
      USE_CDN = window.USE_CDN;
    }

    if (USE_CDN === true) {
      imageUrl = externalUrl
        ? EXTERNAL_IMAGE_URL + externalUrl
        : INTERNAL_IMAGE_URL + url;

      const parsedSmallImageSrc = nUrl.parse(imageUrl);
      const searchParamsSmall = qs.parse(parsedSmallImageSrc.query);

      if (width && height) {
        searchParamsSmall.w = width;
        searchParamsSmall.h = height;
      } else if (width) {
        searchParamsSmall.w = width;
      } else if (height) {
        searchParamsSmall.h = height;
      }

      parsedSmallImageSrc.search = qs.stringify(searchParamsSmall);

      imageUrl = parsedSmallImageSrc.format();
    } else {
      imageUrl = INTERNAL_IMAGE_URL + url;
    }

    return (
      <div className="image-magnify">
        <div className="image-magnify__image-container">
          <figure
            className="zoom"
            ref={n => (this.figureNode = n)}
            onMouseMove={this.onMouseMove}
            onMouseLeave={this.onMouseLeave}
            onMouseEnter={e => this.onMouseEnter(e, imageUrl)}
          >
            <img ref={n => (this.imageNode = n)} src={imageUrl} />
          </figure>
        </div>
      </div>
    );
  }
}

export default (props) => {
  return (
    <ReactCursorPosition>
      <ImageMagnify {...props} />
    </ReactCursorPosition>
  );
};
