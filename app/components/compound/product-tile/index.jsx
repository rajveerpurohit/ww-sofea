import React from 'react';
import { Link } from 'react-router';

import Image from '../../basic/Image';
import Ribbon from '../../basic/Ribbon';
import Dropdown from '../../basic/Dropdown';
import DropdownFlyOutList from '../../basic/dropdown-fly-out-list';


const ProductTile = ({ productData, productType, pageTamlateType }) => {
  return (
    <div className="product-list__item">
      <article className="product-card">
        <div className="product-card__visual">
          <ImagePanel imagePanelData={productData} productType={productType} />

          <HoverDetails productData={{ productId: productData.attributes.p_productid, productPageType: productData.attributes.p_productPageType }} />
        </div>
        {productType !== 'FOOD' && pageTamlateType !== 'longerLanding' ? <ColorSwatchs swatchs={productData.records} productType={productType} /> : null}
        <DescriptionPanel pageTamlateType={pageTamlateType} productDescription={productData} productType={productType} />
        {productType === 'FOOD' ? <Order /> : null}
      </article>
    </div>
  );
};
export default ProductTile;
const ImagePanel = ({ imagePanelData, productType }) => {
  const imageData = {
    url: imagePanelData && imagePanelData.attributes.p_imageReference && imagePanelData.attributes.p_imageReference[0] ? imagePanelData.attributes.p_imageReference[0] : '',
    alt: imagePanelData.attributes.p_displayName,
    className: 'product-card__img lazyloaded',
    title: imagePanelData.attributes.p_displayName
  };
  return (
    <Link to="">
      <div className="product-card__image-wrap">
        <Image payload={imageData} />
        <span className="product-card__loading-icon loading loading--dark loading--large" />
      </div>
      <Ribbon attributes={imagePanelData.attributes} />
      {productType !== 'FOOD' ? <Brand brandData={{ displayName: imagePanelData.attributes.p_displayName, brandsImageURL: imagePanelData.attributes.p_BrandsImage, productId: imagePanelData.attributes.p_productid }} /> : null}
    </Link>
  );
};
const ColorSwatchs = ({ swatchs, productType }) => {
  return (
    <nav className="product-card__swatches">
      <ul className="nav-list-x">
        {
          swatchs.reduce((x, y) => x.findIndex(e => e.attributes.p_swatchColour[0] === y.attributes.p_swatchColour[0]) < 0 ? [...x, y] : x, []).map((swatch, index) => {
            const imageData = {
              url: swatch.attributes.p_swatch ? swatch.attributes.p_swatch[0] : '',
              title: swatch.attributes.p_swatchColour ? swatch.attributes.p_swatchColour[0] : '',
              className: 'colour-swatch colour-swatch--large'
            };
            return (
              <li className="nav-list-x__item" key={index}>
                <Link to="" className="nav-list-x__link">
                  <Image payload={imageData} />
                </Link>
              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};
const Price = ({ productData }) => {
  const records = productData.records;
  const maxPrices = Math.max(...records.map(record => record.attributes.p_pl30[0]));
  const minPrices = Math.min(...records.map(record => record.attributes.p_pl30[0]));

  const wasPrice = records.filter(s => s.attributes.p_pl30_wp[0] != 0);
  const maxWasPrices = wasPrice.length ? Math.max(...wasPrice.map(record => record.attributes.p_pl30[0])) : 0;
  const minWasPrices = wasPrice.length ? Math.min(...wasPrice.map(record => record.attributes.p_pl30[0])) : 0;


  return (
    <div className="product-card__info-line" itemProp="offers" itemScope itemType="#">

      <ReturnPrice priceDetails={{ minPrices, maxPrices, maxWasPrices, minWasPrices }} />

      {productData.attributes.PROMOTION ?
        <div id={`promotion_${productData.attributes.p_productid}`} className="font-graphic product__special product-card__info-line no-wrap--ellipsis">
          {productData.attributes.PROMOTION}
        </div>
        : null}

    </div>
  );
};

const DescriptionPanel = ({ productDescription, productType, pageTamlateType }) => {
  return (
    <div id={`prod_details_${productDescription.attributes.p_productid}`} className="productDetails">
      <Link to="" className="product-card__details">
        <h2 className="product-card__name product-card__info-line no-wrap--ellipsis" itemProp="name">
          {productDescription.attributes.p_displayName ? productDescription.attributes.p_displayName[0] : ''}
        </h2>
        {pageTamlateType !== 'longerLanding' ? <Price productData={productDescription} /> : null}
      </Link>
      {productType !== 'FOOD' ?
        <Link to="" className="btn btn--secondary btn--right btn--block btn--align-left">
          More details
         </Link>
        : null}

    </div>
  );
};
const Brand = ({ brandData }) => {
  const imageData = {
    url: brandData.brandsImageURL,
    alt: brandData.displayName,
    id: 'img_' + brandData.productId
  };
  return (
    <div className="product-card__brand">
      <Image payload={imageData} />
    </div>
  );
};
const HoverDetails = ({ productData }) => {
  return (
    <div className="hoverDetails">
      <span id={`product_favorites_${productData.productId}`} className={`product_favorites_${productData.productId}`}>
        <Link to="" className="icon icon--heart-grey product-card__wish">Add to favourites</Link>
      </span>
      <p>
        <Link to="" className="btn btn--secondary btn--right product-card__quick">Quick view</Link>
      </p>
    </div>
  );
};

const Order = () => {
  return (
    <div>
      <div className="grid grid--space-y pdp__atc">
        <div className="product-qty">
          <Dropdown id={'product-1-qty'} name={'product-1-qty'} options={['1', '2', '3', '4', '5', '6']} />
        </div>
        <div className="product-atc">
          <a className="btn btn--primary btn--right btn--align-left btn--atc no-wrap btn--block">Add to Cart</a>
        </div>
      </div>
      <div className="shoppingList_20068882 product-atl">
        <DropdownFlyOutList listLabel={'Add to list'} rootClassName={'product-atl'} listItems={[{ title: '', displayName: 'Groceries', url: '' }]} />
      </div>
    </div>

  );
};

const ReturnPrice = ({ priceDetails }) => {
  const { minPrices, maxPrices, maxWasPrices, minWasPrices } = priceDetails;
  if ((maxWasPrices === minWasPrices) && (minWasPrices == 0)) {
    if (maxPrices !== minPrices) {
      return (
        <span className="font-graphic">
          From: <span className="price">R {minPrices.toFixed(2)}</span>
        </span>
      );
    }
    return (
      <span className="font-graphic">
        <span className="price">R {minPrices.toFixed(2)}</span>
      </span>
    );
  }
  return (
    <span className="font-graphic">
      <span className="price price--original">
        <span className="currency">R</span>{minPrices.toFixed(2)}
      </span>
      <span className="price price--discounted text-space">
        <span className="currency" content="ZAR">R</span>
        <span className="price">{minWasPrices.toFixed(2)}</span>
      </span>
    </span>
  );
};

