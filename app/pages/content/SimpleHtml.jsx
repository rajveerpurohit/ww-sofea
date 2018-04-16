import React from 'react';
import { Link } from 'react-router';

import Image from '../../components/basic/Image';
import SideBarComponent from '../../components/basic/SideBarContent';
import BreadCrumb from '../../components/basic/breadcrumbs';
import SideMenu from '../../components/sections/SideMenu';


const SimpleHtml = ({ location, breadCrumbs, contentData, contentAside, pageCode }) => {
  const content = (data) => {
    return (<article>
      <h1 className="heading heading--1 text-caps font-graphic">{data.contents.displayName}</h1>
      <div className="text-small" dangerouslySetInnerHTML={{ __html: data.contents.SimpleHTML.content }} />
    </article>);
  };
  const pageContent = (corporateData) => {
    return (
      <div className="grid">
        <div className="page-layout__content">
          {content(corporateData)}
        </div>
      </div>
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
    <main className="grid grid--space-y site-main">
      <div className="main-page site-map-content">
        {breadCrumbs && <BreadCrumb breadCrumbs={createBreadCrumbs(location, breadCrumbs)} />}
        <div className="grid page-layout">
          <div className="page-layout__aside">
            {pageCode === 'wrewards' ? <SideMenu pageType={pageCode} /> : <SideBarComponent leftData={contentAside} />}
          </div>
          {contentData && pageContent(contentData)}
        </div>
      </div>
    </main>
  );
};

export default SimpleHtml;
