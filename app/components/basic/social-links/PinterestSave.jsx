import React, { Component } from 'react';

export default class PinterestSave extends Component {
  constructor(props) {
    super(props);

    this.state = { initalized: false };

    this.initScript = this.initScript.bind(this);
  }

  componentDidMount() {
    this.initScript();
  }

  componentWillUnmount() {
    const elem = document.getElementById('pinit-script');

    if (elem && elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  }

  initScript() {
    if (this.state.initalized) return;

    const pinscript = document.createElement('script');
    pinscript.src = '//assets.pinterest.com/js/pinit.js';
    pinscript.id = 'pinit-script';
    pinscript.onload = () => {};

    if (this.pinNode && this.pinNode.parentNode) this.pinNode.parentNode.appendChild(pinscript);

   this.setState({ initalized: true });
  }

  render() {
    const { description, media } = this.props;
    return (
      <a
        id="pinbutton"
        ref={n => (this.pinNode = n)}
        data-pin-do={media ? 'buttonPin' : 'buttonBookmark'}
        data-pin-media={media || ''}
        data-pin-save={true}
        data-pin-description={description || ''}
        href="//www.pinterest.com/pin/create/button/"
      >
        <img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" />
      </a>
     
    );
  }
}
