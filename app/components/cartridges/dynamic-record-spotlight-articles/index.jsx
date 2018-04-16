import React from 'react';

import ProductTile from '../../compound/product-tile';
import { TEMPLATE_TYPE } from '../../../Constants';

const DynamicRecordSpotlightArticles = ({ contentData }) => {
  
  const recordsData = contentData.records;
  const productType = contentData.productType;
  const spotlightArticle = true;
  return (
    <div className="grid landing__row landing__row--featured landing__row--featured-articles" key={contentData.key}>
    {
      recordsData.map((record, i) => {
        return (
          <ProductTile pageTamlateType={TEMPLATE_TYPE[0]} productData={record} productType={productType} key={i} spotlightArticle={spotlightArticle} />
        );
      })
    }
  </div>);
};
export default DynamicRecordSpotlightArticles;
