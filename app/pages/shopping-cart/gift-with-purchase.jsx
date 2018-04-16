import React, { Component } from 'react';
import { Link } from 'react-router';
import Image from '../../components/basic/Image';


const GiftWithPurchase = ({ gwpData, selectGiftWithPurchase }) => {
  const handleGiftSelect = (evt, product) => {
    const { productId, skuId } = product;
    evt.preventDefault();
    const data = {
      productId,
      skuId,
      quantity: gwpData.quantity,
      giftWithPurchaseIdentifier: gwpData.giftHashCode,
      replaceRemovedQuantity: true
    };
    selectGiftWithPurchase(data);
  };
  return (
    <div className="accordionContent" id="gwpSelection">
      <br />
      <span className="text-small"> Choose {gwpData.quantityAvailableForSelection} products:</span>
      <br />
      <br />
      {gwpData.choices.map((choice) => {
        return choice.items.map(product => (
          <div className="gwp-card">
            <article className="product-card text-align-center">
              <div className="product-card__visual">
                <Link onClick={evt => handleGiftSelect(evt, product)}>
                  <div className="product-card__image-wrap">
                    <Image
                      payload={{
                        externalUrl: product.externalImage,
                        alt: product.displayName,
                        title: product.displayName,
                        className: 'product-card__img lazyloaded'
                      }}
                    />
                  </div>
                </Link>
              </div>
              <Link onClick={evt => handleGiftSelect(evt, product)}>
                <div className="strong text-small" itemProp="name">{product.displayName}</div>
              </Link>
              <Link onClick={evt => handleGiftSelect(evt, product)} className="grid--space-y btn btn--secondary btn--flat">Select</Link>
            </article>
          </div>
        ));
      })}

    </div>
  );
};

export default GiftWithPurchase;
