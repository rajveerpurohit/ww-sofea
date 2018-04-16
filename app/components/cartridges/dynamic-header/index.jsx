import React from 'react';
import { Link } from 'react-router';

const DynamicHeader = ({ contentData }) => {
  // Creating Link value
  let url = '';
  // let locationPath = typeof window !== 'undefined' && window ? window.location.pathname : '';
  // if (contentData.linkText !== null && contentData.link.path !== null) {
  //   if (contentData.link.queryString === null) {
  //     url = contentData.link.path;
  //   } else if (contentData.link.queryString.indexOf('+') !== -1) {
  //     locationPath = locationPath.replace('/dept', '/cat');
  //     locationPath = locationPath.substring(0, (locationPath.indexOf('_')));
  //     const N = +(contentData.link.queryString.substring(contentData.link.queryString.indexOf('=') + 1, contentData.link.queryString.lastIndexOf('+')));
  //     const Z = +(contentData.link.queryString.substring(contentData.link.queryString.indexOf('+') + 1));
  //     url = locationPath + '_/N-' + N.toString(36) + 'Z' + Z.toString(36);
  //   } else {
  //     locationPath = locationPath.replace('/dept', '/cat');
  //     locationPath = locationPath.substring(0, (locationPath.indexOf('_')));
  //     const N = +(contentData.link.queryString.substring(contentData.link.queryString.indexOf('=') + 1));
  //     url = locationPath + '_/N-' + N.toString(36);
  //   }
  // }
  if (contentData.link.navigationURL !== null) {
    url = contentData.link.navigationURL;
  }
  if (contentData.headerType === 'leftAlign') {
    return (
      <div className="grid grid--space-y landing__row">
        <h2 className="landing__header">
          {contentData.headerText}
          <Link to={url} className="landing__view-all">{contentData.linkText}</Link>
        </h2>
      </div>
    );
  } else if (contentData.buttonType !== '') {
    return (
      <div className="grid landing__row lazyload-container" >
        <h2 className={`landing__header ${contentData.buttonType} landing__header--centered`}>
          <Link to={url} className="landing__view-all">{contentData.headerText}</Link>
        </h2>
      </div>
    );
  }
  return (
    <div className="">
      <h2 className="landing__header landing__header--centered">
        {contentData.headerText}
      </h2>
    </div>
  );
};
export default DynamicHeader;
