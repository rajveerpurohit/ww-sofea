import React, { Component } from 'react';

class Curalate extends Component {

  componentDidMount() {
    const content = this.props.payload || {};
    content.plugin = content.plugin || 'Carousel';
    content.scriptSource = content.scriptSource || '//d116tqlcqfmz3v.cloudfront.net/woolworth-1233/carousel.js';
    content.scriptSource = 'http:' + content.scriptSource;
    content.fanReelConfiguration = { code: 'woolworth' }; //content.fanReelConfiguration || { code: 'woolworth' };
    if (window !== undefined) {
      window.jQuery.getScript(content.scriptSource, () => {
        window.Curalate.FanReels[content.plugin].init(content.fanReelConfiguration);
      });
    }
  }

  render() {
    return (
        <div id="curalate-fan-reel-wrapper" />
    );
  }
}

export default Curalate;
