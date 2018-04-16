import React from 'react';
import { Link } from 'react-router';

const DynamicPromotions = ({ contentData }) => {
  let headerClass = '';
  if (contentData.headerType && contentData.headerType == 'Online Only') {
    headerClass = 'online';
  } else {
    headerClass = 'wrewards';
  }
  return (
    <div className="landing__block grid__half--medium block-seo">
      <article className={`block-seo__article block-seo__article--${headerClass} theme-${contentData.themeType}`}>
        <h3 className="block-seo__heading">{contentData.headerType}</h3>
        <h2 className="block-seo__offer">{contentData.offerValue}</h2>
        <Link to={contentData.link.path} className="block-seo__link">{contentData.linkText}</Link>
      </article>
    </div>
  );
};
export default DynamicPromotions;
