import React from 'react';
import Image from '../../components/basic/Image';
import SocialLinks from '../../components/basic/social-links';
import BreadCrumb from '../../components/basic/breadcrumbs';
import SideBarComponent from '../../components/basic/SideBarContent';
import SideMenu from '../../components/sections/SideMenu';

const Article = ({ location, breadCrumbs, contentData, contentAside, pageCode }) => {
  const renderProductSocialLinksElm = () => {
    const displayName = contentData.Article.title;
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
  const renderLandscape = () => {
    const imageData = {
      url: contentData.Article ? contentData.Article.image && contentData.Article.image.internalImage : '',
      alt: contentData.Article ? contentData.Article.title : '',
      className: 'img-fill-responsive',
    };
    return (
      <article className="grid">
        <section className="grid grid--space-y">
          <h1 className="heading heading--1 font-graphic text-caps">{contentData.Article.title}</h1>
          <p className="text-intro">{contentData.Article.date}</p>
        </section>
        <div className="grid grid--space-y">
          <div>
            <div className="video-container--full">
              <iframe height={315} src={`${contentData.Article.image && contentData.Article.image.internalImage}?wmode=transparent`} frameBorder={0} width={560} allowFullScreen className="img-fill-responsive" />
            </div>
            {imageData && imageData.url && imageData.url.indexOf('internalmedia') >= -1 ? [
              <div className="image">
                <iframe width={560} height={315} src={`${imageData.url}?wmode=transparent`} frameBorder={0} allowFullScreen scrolling="no" className="img-fill-responsive" />
                <div className="image">
                  <Image payload={imageData} />
                  <div className="text-small">{contentData.Article.caption}</div>
                </div>

              </div>,
              <div className="grid text-align-right">
                { renderProductSocialLinksElm() }
              </div>,
              <section className="grid">
                <div className="text-intro" dangerouslySetInnerHTML={{ __html: contentData.Article.content }} />

                {
                                    contentData.Article.paragraphs.map(para => [
                                      <h2 className="heading heading--2 text-caps font-graphic">{para.title}</h2>,
                                      <div className="grid--space-y text-small" dangerouslySetInnerHTML={{ __html: para.content }} />
                                    ])
                                }

              </section>
            ]
                            : null
                        }
          </div>
        </div>
      </article>
    );
  };
  const renderPortrait = () => {
    const renderData = (data) => {
      const paraGraphData = data.Article.paragraphs;
      if (paraGraphData.length > 0) {
        return (
          <div className="grid grid__two-thirds--medium">
            <div className="grid grid--space-y">
              {
                    contentData.Article.paragraphs.map(para => [
                      <h2 className="heading heading--3 text-caps font-graphic">{para.title}</h2>,
                      <div className="text-small" dangerouslySetInnerHTML={{ __html: para.content }} />
                    ])
                }
            </div>
          </div>
        );
      } else {
        return null;
      }
    };
    const imageData = {
      url: contentData.Article ? (contentData.Article.image && contentData.Article.image.internalImage) : '',
      alt: contentData.Article ? contentData.Article.title : '',
      className: 'img-fill-responsive',
    };
    return (
      <article className="grid">
        <div className="grid">
          <div className="grid grid__two-thirds--medium">
            <h1 className="heading heading--1 text-caps font-graphic">{contentData.Article.title}</h1>
            <div className="text-intro" dangerouslySetInnerHTML={{ __html: contentData.Article.content }} />
          </div>
          <div className="grid grid__third--medium--last grid__third--medium float-r--medium">
            {
                            imageData && imageData.url && imageData.url.indexOf('www.youtube.com') >= -1 || imageData && imageData.url && imageData.url.indexOf('youtu.be') >= -1 ?
                              <Image payload={imageData} />
                                :
                              <div className="grid"> {imageData && imageData.url && imageData.url.indexOf('internalmedia') >= -1 ?
                                <iframe width={560} height={315} src={`${imageData.url}?wmode=transparent`} frameBorder={0} allowFullScreen scrolling="no" className="img-fill-responsive" />
                                    :
                                <span style={{ color: '#000000' }}>
                                  <iframe height={315} src={`${imageData.url}?wmode=transparent`} frameBorder={0} width={560} allowFullScreen className="img-fill-responsive" />
                                </span>
                                }
                              </div>
                        }
            <div className="text-small">{contentData.Article.caption}</div>
          </div>
          {renderData(contentData)}
        </div>
        {renderProductSocialLinksElm()}
      </article>
    );
  };
  const createBreadCrumbs = (locPath, breadcrumbs) => {
    const loc = locPath.substr(0, locPath.lastIndexOf('/'));
    return breadCrumbs.map((bread) => {
      bread.navigationURL = loc + '/' + bread.contentId;
      bread.label = bread.label;
      return bread;
    });
  };
  return (
    <div className="grid page-layout">
      <div className="page-layout__aside">
        {pageCode === 'wrewards' ? <SideMenu pageType={pageCode} /> : <SideBarComponent leftData={contentAside} />}
      </div>
      <div className="page-layout__content">
        <div className="grid">
          {breadCrumbs ? <BreadCrumb breadCrumbs={createBreadCrumbs(location, breadCrumbs)} /> : null}
          {
            contentData.Article && contentData.Article.layout === 'Landscape' ?
            renderLandscape()
            : renderPortrait()
          }
        </div>
      </div>
    </div>
  );
};
export default Article;
