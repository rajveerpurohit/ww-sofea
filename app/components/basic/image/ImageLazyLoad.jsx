import React from 'react';
import Image from '../Image';

export default class ImageLazyLoad extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: false
    };
    this.loadImage = this.loadImage.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onImageError = this.onImageError.bind(this);
    this.setRef = this.setRef.bind(this);
  }
  componentDidMount() {
    this.loadImage();
  }
  onImageLoaded() {
    this.setState({ isLoaded: true });
  }
  onImageError() {
    this.setState({ error: true, isLoaded: true });
  }
  setRef(img) {
    this.img = img;
  }
  loadImage() {
    let EXTERNAL_IMAGE_URL = '/';
    let INTERNAL_IMAGE_URL = '/';
    let USE_CDN = false;
    let imgSrc = '';
    const payload = this.props.payload;
    let imagePath = payload.url || '';

    if (typeof window !== 'undefined') {
      EXTERNAL_IMAGE_URL = window.EXTERNAL_IMAGE_URL;
      INTERNAL_IMAGE_URL = window.INTERNAL_IMAGE_URL;
      USE_CDN = window.USE_CDN;
    } else {
      INTERNAL_IMAGE_URL = global.INTERNAL_IMAGE_URL;
    }

    imagePath = (imagePath[0] === '/') ? imagePath.substr(1) : imagePath;
    if (USE_CDN === true) {
      imgSrc = payload.externalUrl ? EXTERNAL_IMAGE_URL + payload.externalUrl : INTERNAL_IMAGE_URL + imagePath;
      const imgUrl = new URL(imgSrc);
      const searchParams = imgUrl.search;
      if (searchParams.length === 0) {
        if (payload.width && payload.height) {
          imgSrc = imgSrc + '?w=' + payload.width + '&h=' + payload.height;
        } else {
          imgSrc = payload.width ? imgSrc + '?w=' + payload.width : imgSrc;
          imgSrc = payload.height ? imgSrc + '?h=' + payload.height : imgSrc;
        }
      } else {
        imgSrc = payload.width ? imgSrc + '&w=' + payload.width : imgSrc;
        imgSrc = payload.height ? imgSrc + '&h=' + payload.height : imgSrc;
      }
    } else {
      imgSrc = INTERNAL_IMAGE_URL + imagePath;
    }

    // imgSrc = this.props.payload.externalUrl ? ATG_URL + this.props.payload.url + this.props.payload.externalUrl : ATG_URL + this.props.payload.url;
    const image = this.img;
    image.src = imgSrc;
    image.onload = () => this.onImageLoaded();
    image.onerror = () => this.onImageError();
  }

  render() {
    // console.log('lazy load', this.props.payload);
    { !this.state.isLoaded && this.props.loader ? this.props.loader : null; }
    { this.state.isError && this.state.isLoaded ? this.props.fallback : null; }
    return (


      <Image setRef={this.setRef} payload={this.props.payload} />

    );
  }
}
