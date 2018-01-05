import React from 'react';
import { Link } from 'react-router';

import Image from '../../basic/Image';

const ImageBanner = ({contentData}) => {
    const imageData = {
                            url: contentData.media.uri,
                            alt: contentData.media.uri,
                            className: 'landing__image lazyloaded '
                        };

    const withLink = () => {
            return (
              <Link className={`landing__link ${contentData.imageCSS}`} to={contentData.link.path} key={contentData.key}>
                <Image payload={imageData} />
              </Link>
            );
    };
    const withoutLink = () => {
            return <Image payload={imageData} key={contentData.key} />;
    };

    return (
        contentData.link.path ? withLink() : withoutLink()
    );
};
export default ImageBanner;
