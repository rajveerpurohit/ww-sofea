import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import SlickCarousel from 'react-slick';

import Image from '../Image';
import ProductPrice from '../product-price';
import { recentViewSliderSettings } from '../../../Constants';

const ProductRecentlyViewed = (props) => {
  const { recentlyViewedProducts, productPrices, currentUser, onProductClick } = props;
  const priceListId = _.get(currentUser, 'priceListId', '');

  const children = _.map(recentlyViewedProducts, (product) => {
    const { productId, skuId, displayName, internalImage, externalImage, productURL } = product;
    const priceList = productPrices[productId];

    if (priceList && priceListId && priceList[priceListId]) {
      const { skuPrices } = priceList[priceListId];

      if (skuId && skuPrices && skuPrices[skuId]) {
        const price = _.get(skuPrices, `${skuId}.SalePrice`, 0);
        const payload = {
          id: `recent_prod_img_${productId}`,
          className: 'product-recent__img',
          alt: displayName,
          title: displayName,
          url: internalImage,
          externalUrl: externalImage
        };

        return (
          <Link
            to={productURL} id={`recent_prod_img_link_${productId}`}
            onClick={e => onProductClick(productId, e)}
            className="link--silent product-recent__thumb slick-slide slick-current slick-active" style={{ width: '388px' }}
          >
            <div className="product-recent__img-wrap">
              <Image payload={payload} />
            </div>
            <span className="product-recent__details">
              <span className="product-recent__name">{displayName}</span>
              <ProductPrice classes="price" ids={`price_${productId}_${skuId}`} price={price} />
              <span className="product-recent__more">
                <span className="icon-text">More</span>
                <span className="icon icon--right-circ-dark" />
              </span>
            </span>
          </Link>
        );
      }

      return null;
    }

    return null;
  });

  if (_.compact(children).length) {
    return (
      <div>
        <h2 className="font-graphic text-caps">RECENTLY VIEWED</h2>
        <div className="product-recent is-carousel slick-initialized slick-slider" data-js="recent-carousel">
          <SlickCarousel {...recentViewSliderSettings}>{children}</SlickCarousel>
        </div>
      </div>
    );
  }

  return null;
};

export default ProductRecentlyViewed;
