import React from 'react';

import ProductTile from '../../compound/product-tile';
import {TEMPLATE_TYPE} from '../../../Constants';

const DynamicRecordSpotlightArticles = ({contentData}) => {
const recordsData = contentData.records;
const productType = contentData.productType;
return (
  <div className="grid landing__row landing__row--featured landing__row--featured-articles">
    {
      recordsData.map((record, i) => {
        return (
          <ProductTile key={i} pageTamlateType={TEMPLATE_TYPE[0]} productData={record} productType={productType} key={record.attributes.p_productid} />
        );
      })
    }
  </div>);
};
export default DynamicRecordSpotlightArticles;
