import React from 'react';
import { Link } from 'react-router';

import Image from '../../components/basic/Image';
import SocialLinks from '../../components/basic/social-links';

const Howto = ({ contentData }) => {
  const imageData = {
    url: contentData.HowTos ? contentData.HowTos.image && contentData.HowTos.image.internalImage : '',
    alt: contentData.HowTos ? contentData.HowTos.title : '',
    className: 'img-fill-responsive',
    externalUrl: contentData.HowTos ? contentData.HowTos.externalImage && contentData.HowTos.image.externalImage : '',
  };
  const renderProductSocialLinksElm = () => {
    const displayName = contentData.HowTos ? contentData.HowTos.title : '';
    const config = {
      url: '',
      text: displayName
    };

    if (typeof window !== 'undefined' && window) {
      config.url = window.location.href;
    }

    return (
      <SocialLinks
            twitter={config}
            pinterest={config}
            facebook={config}
      />
    );
  };
  return (
    <div className="grid grid--space-y site-map-content">
      <article className="grid">
        <div className="grid">
          <div className="grid grid__two-thirds--medium">
            <h1 className=" heading heading--1 text-caps font-graphic">{contentData.HowTos.title}</h1>
            <div className="text-intro" dangerouslySetInnerHTML={{ __html: contentData.HowTos.Content }} />
          </div>
          <div className="grid grid__third--medium grid__third--medium--last float-r--medium pos--rel">
            <Image payload={imageData} />
            <div className="fly-out fly-out--annotation pos--abs pos--right-sml pos--top-sml" data-js="fly-out" data-fly-out-type="click-sticky" data-fly-out-pos="right">
              <Link data-js="fly-out-toggle"><span className="theme--light icon icon--info-serif-dark circle" /></Link>
              <ul data-js="fly-out-content" className="fly-out__content fly-out__content--annotation theme--light-transparent text-xsmall list--silent" />
            </div>

          </div>
          <div className="grid grid__two-thirds--medium grid--space-y">
            {
                            contentData.HowTos.howtos.map((howto) => {
                              const howtoImageData = {
                                url: howto.image && howto.image.internalImage,
                                alt: howto.title,
                                className: 'how-to-img',
                              };
                              return (
                                <ul className="list--silent">
                                  <li className="grid grid--space-y">
                                    <div className="how-to-figure float-r--small">
                                      <Link to="">
                                        <Image payload={howtoImageData} />
                                        <div className="text-small">{howto.caption}</div>
                                      </Link>
                                    </div>
                                    <h2 className="heading heading--4 text-caps font-graphic">{howto.title}</h2>
                                    <div className="text-small" dangerouslySetInnerHTML={{ __html: howto.content }} />
                                    {
                                                howto.products.map(product => (
                                                  <p>
                                                    <span className="strong">Try</span>:
                                        <br />
                                                    <Link to="">{product.displayName}</Link>
                                                    <br />
                                                  </p>
                                                ))
                                            }

                                  </li>
                                  <hr className="hr--light" />
                                </ul>
                              );
                            })
                        }
          </div>
        </div>
        <div className="grid grid__two-thirds--small">
          {renderProductSocialLinksElm()}
        </div>
      </article>
    </div>
  );
};
export default Howto;
