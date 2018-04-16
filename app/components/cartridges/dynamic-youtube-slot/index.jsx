import React from 'react';
import _ from 'lodash';

const DynamicYouTubeSlot = ({ contentData }) => {
  const mediaasset = _.get(contentData, 'mediaasset');

  if (_.isEmpty(mediaasset)) {
    return null;
  }

  const isInternalMedia = _.includes(mediaasset, 'internalmedia');
  const playerProps = {
    className: 'video-banner__frame',
    frameBorder: 0,
    allowFullScreen: true,
    src: `${mediaasset}?wmode=transparent`,
    height: '315',
    width: '560'
  };

  if (isInternalMedia) {
    playerProps.scrolling = 'no';
  }

  return (
    <div className="grid landing__row">
      <div className="landing__block grid--space-y">
        <figure className="video-banner">
          <div className="video-banner__inner">
            <iframe {...playerProps} />
          </div>
        </figure>
      </div>
    </div>
  );
};

export default DynamicYouTubeSlot;
