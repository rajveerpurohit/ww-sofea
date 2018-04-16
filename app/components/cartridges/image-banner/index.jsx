import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import _ from 'lodash';

import ImageLazyLoad from '../../basic/image/ImageLazyLoad';

const ImageBanner = ({ contentData, secondaryImage }) => {
  const externalUri = _.get(contentData, 'media.itsImageRef', '') !== null ? _.get(contentData, 'media.itsImageRef', '') : '';
  const uri = _.get(contentData, 'media.uri', '') || _.get(contentData, 'link.navigationURL', '');
  const imageData = {
    url: uri,
    alt: uri,
    className: 'landing__image lazyloaded ',
    externalUrl: externalUri,
  };

  const isLinkExternal = (link) => {
    return /^https?:\/\//.test(link);
  };

  const withLink = () => {
    const _link = contentData.link.url ? contentData.link.url : contentData.link.navigationURL;
    const body = (
      <ImageLazyLoad
        payload={imageData}
        loader={
          <div>
            <span className="loading loading--dark loading--large" />
          </div>
        }
      />
    );

    return (isLinkExternal(_link)
      ? (
        <a
          className={cx('landing__link', contentData.imageCSS)}
          href={_link}
          key={contentData.key}
        >{body}</a>
      )
      : (
        <Link
          className={cx('landing__link', contentData.imageCSS)}
          to={_link}
          key={contentData.key}
        >{body}</Link>
      ));
  };

  const withoutLink = () => {
    return (
      <ImageLazyLoad
        payload={imageData}
        loader={
          <div>
            <span className="loading loading--dark loading--large" />
          </div>
        }
      />
    );
  };

  return (
    contentData && contentData.link && contentData.link.path ? withLink() : withoutLink()
  );
};

export default ImageBanner;
