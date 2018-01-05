import React from 'react';

import ProductTile from '../../compound/product-tile';
import {TEMPLATE_TYPE} from '../../../Constants';

const DynamicRecordSpotlightProducts = ({contentData}) => {
const recordsData = contentData.records;
const productType = contentData.productType;
return (
  <div className="grid landing__row landing__row--featured landing__row--featured-articles">
    {
      recordsData.map((record) => {
        return (
          <ProductTile pageTamlateType={TEMPLATE_TYPE[0]} productData={record} productType={productType} key={record.attributes.p_productid} />
        );
      })
    }
  </div>);
};
export default DynamicRecordSpotlightProducts;

