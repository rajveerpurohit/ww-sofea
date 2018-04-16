import React from 'react';
import Image from '../../components/basic/Image';
import SocialLinks from '../../components/basic/social-links';
import SideBarComponent from '../../components/basic/SideBarContent';
import BreadCrumb from '../../components/basic/breadcrumbs';
import SideMenu from '../../components/sections/SideMenu';

const FiveWays = ({ location, breadCrumbs, contentData, contentAside, pageCode }) => {
  const imageData = {
    url: contentData.FiveWays ? contentData.FiveWays.image && contentData.FiveWays.image.internalImage : '',
    alt: contentData.FiveWays ? contentData.FiveWays.title : '',
    className: 'img-fill-responsive',
  };
  const renderProductSocialLinksElm = (getContentData) => {
    const displayName = getContentData.FiveWays ? getContentData.FiveWays.title : '';
    let mediaImage = getContentData.FiveWays ? getContentData.FiveWays.image && getContentData.FiveWays.image.internalImage : '';
    if (mediaImage.charAt(mediaImage.length - 1) == ':') {
      mediaImage = mediaImage.substr(0, mediaImage.length - 1);
    }
    if (typeof window !== 'undefined' && window) {
      const localName = 'http://' + window.location.host + mediaImage;
      const config = {
        url: '',
        text: displayName,
        media: [localName]
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
    }
  };
  const createBreadCrumbs = (locPath, breadcrumbs) => {
    const loc = locPath.substr(0, locPath.lastIndexOf('/'));
    return breadCrumbs.map((bread) => {
      bread.navigationURL = loc + '/' + bread.contentId;
      bread.label = bread.label;
      return bread;
    });
  };
  // const sideBar = (pageCode) => {
  //   return (pageCode && pageCode === 'wrewards') ? <SideMenu pageType={pageCode} /> : <SideBarComponent leftData={contentAside} />;
  // };
  return (

    <main className="grid grid--space-y site-main">
      <div className="main-page site-map-content">
        {breadCrumbs ? <BreadCrumb breadCrumbs={createBreadCrumbs(location, breadCrumbs)} /> : null}
        <div className="grid page-layout">
          <div className="page-layout__aside">
            {pageCode === 'wrewards' ? <SideMenu pageType={pageCode} /> : <SideBarComponent leftData={contentAside} />}
          </div>
          <div className="page-layout__content">
            <div className="grid">
              <article className="grid">
                <div className="grid">
                  <div className="grid grid__two-thirds--medium">
                    <h1 className="heading heading--1 text-caps font-graphic">{contentData.FiveWays.title}</h1>
                    <div className="text-small" dangerouslySetInnerHTML={{ __html: contentData.FiveWays.content }} />
                  </div>

                  <div className="grid grid__third--medium--last grid__third--medium float-r--medium">
                    {imageData.url.indexOf('www.youtube.com') >= -1 || imageData.url.indexOf('youtu.be') >= -1 ?
                      <span>
                        <Image payload={imageData} />
                        <div className="text-small" dangerouslySetInnerHTML={{ __html: contentData.FiveWays.caption }} />
                      </span>
                      :
                      <span style={{ color: '#000000' }}>
                        <iframe height={315} src={imageData.url} frameBorder={0} width={560} allowFullScreen className="img-fill-responsive" />
                      </span>
                    }
                  </div>
                  <div className="grid grid__two-thirds--medium grid--space-y">
                    <ol className="counter">
                      {contentData.FiveWays.ways.map(way => (
                        <section className="grid grid__two-thirds--large">
                          <h2>
                            {/* Five ways heading here */}	</h2>

                          <li className="counter__increment counter__increment--large">
                            <h3 className="counter__increment-heading--large text-dampen-slight">{way.title}</h3>
                            <div className="counter__increment-text--large text-small" dangerouslySetInnerHTML={{ __html: way.Content }} />
                          </li>

                          {/* <section className="grid grid__two-thirds--large">
              <h2>{way.caption}</h2>
              <ul className="orderedList">
                <ol className="counter">
                  {
                    way.caption ?
                      <li className="counter__increment counter__increment--large">
                        <p />
                        <h1><span>{way.caption}</span></h1>
                        <p />
                        <h3 className="counter__increment-heading--large">{way.title}</h3>
                        <span dangerouslySetInnerHTML={{ __html: way.Content }} />
                        <p />
                      </li>
                      :
                      <li className="counter__increment counter__increment--large">
                        <h3 className="counter__increment-heading--large text-dampen-slight">{way.title}</h3>
                        <div className="counter__increment-text--large text-small" dangerouslySetInnerHTML={{ __html: way.Content }} />
                      </li>
                  }
                </ol>
              </ul>
                </section> */}
                        </section>
                      ))}
                    </ol>
                  </div>
                </div>
                { renderProductSocialLinksElm(contentData) }
              </article>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default FiveWays;
