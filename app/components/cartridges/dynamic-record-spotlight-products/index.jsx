import React from 'react';
import Slider from 'react-slick';

import ProductTile from '../../compound/product-tile';
import { TEMPLATE_TYPE } from '../../../Constants';

const DynamicRecordSpotlightProducts = ({ contentData }) => {
 
  const recordsData = contentData.records;
  const productType = contentData.productType;
  const spotLightProduct = true;
  const silckSettings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    accessibility: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      }
    ]

  };
  return (
    <div className="grid landing__row landing__row--featured landing__row--featured-articles" key={contentData.key}>
      {recordsData.map((record, i) => {
        return (
          <ProductTile pageTamlateType={TEMPLATE_TYPE[0]} productData={record} productType={productType} key={i} productPrice spotLightProduct={spotLightProduct} />
        );
      })}
      {/*
        recordsData.length < 4 ?
          recordsData.map((record, i) => {
            return (
              <ProductTile pageTamlateType={TEMPLATE_TYPE[0]} productData={record} productType={productType} key={i} />
            );
          }) : <Slider {...silckSettings}>
            {recordsData.map((record, i) => {
              return (
                <ProductTile pageTamlateType={TEMPLATE_TYPE[0]} productData={record} productType={productType} key={i} />
              );
            })}
          </Slider>
          */}
    </div>);
};
export default DynamicRecordSpotlightProducts;
