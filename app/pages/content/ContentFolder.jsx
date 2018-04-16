import React from 'react';
import { Link } from 'react-router';

import Image from '../../components/basic/Image';
import SideBarComponent from '../../components/basic/SideBarContent';
import Panels from '../../components/basic/panels';
import BreadCrumb from '../../components/basic/breadcrumbs';
import SideMenu from '../../components/sections/SideMenu';

const ContentFolder = ({ location, breadCrumbs, contentData, contentAside, isActive, pageCode }) => {
  const heading = (data) => {

    if (data.contents.ContentFolder.image) {
      const imageData = {
        url: data.contents.ContentFolder.image ? data.contents.ContentFolder.image.internalImage : '',
        alt: data.contents.ContentFolder.image ? data.contents.name : '',
        className: 'img-fill-responsive',
      };
      return (
        <div>
          <header />
          <div className="grid">
            <Image payload={imageData} />
            <p className="text-intro" />
          </div>
        </div>
      );
    } else {
      return (
        <header>
          <h1 className="text-caps font-graphic">{data.contents.displayName}</h1>
        </header>
      );
    }
    return null;
  };
  const content = (data) => {
    let panels = [];
    panels = data.contents.ContentFolder.childItems;
    panels.map((panel, i) => {
      panel.panelHeading = panel.displayName;
      panel.url = '/corporate/' + panel.contentId;
    });
    return data ? <article className="grid grid--space-y"><Panels panelData={panels} /></article> : null;
  };
  const pageContent = (corporateData) => {
    return (
      <div className="grid">
        <div className="page-layout__content">
          {heading(corporateData)}
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
        <BreadCrumb breadCrumbs={createBreadCrumbs(location, breadCrumbs)} />
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
export default ContentFolder;
