import React from 'react';
import { Link } from 'react-router';

const DynamicHeader = ({ contentData }) => {
if (contentData.headerType === 'leftAlign') {
return (
  <div className="grid grid--space-y landing__row">
    <h2 className="landing__header">
      {contentData.headerText}
      <Link to="" className="landing__view-all">{contentData.linkText}</Link>
    </h2>
  </div>
);
} else {
if (contentData.buttonType !== '') {
return (
  <div className="grid landing__row lazyload-container" >
    <h2 className={`landing__header ${contentData.buttonType} landing__header--centered`}>
      <Link to="" className="landing__view-all">{contentData.headerText}</Link>
    </h2>
  </div>
  );
} else {
return (
  <div className="">
    <h2 className="landing__header landing__header--centered">
      {contentData.headerText}
    </h2>
  </div>
 );
}
}

};
export default DynamicHeader;
