import React from 'react';

const currencyFormat = (cur) => {
  const _cur = typeof cur === 'number' ? cur : Number(cur);

  return _cur.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const ProductPrice = (props) => {
  const { classes, ids, price, currency, salePrice, listPrice, split } = props;
  const discountedPriceStyle = { // Need to work on it
    fontWeight: 'bold',
    marginLeft: 4 + 'px',
    fontFamily: 'wfuturasemibold, sans-serif'
  };
  let body = '';

  if (price) {
    body = (<span className="price">{`${currency || 'R'} ${currencyFormat(price)}`}</span>);
  } else if (salePrice) {
    if (listPrice) {
      body = (
        <span>
          <span className="detailsStrikeThroughPrice price price--original">{`${currency || 'R'} ${currencyFormat(listPrice)}`}</span>&nbsp;
          {split && <br />}
          <span className="buySavePrice price price--discounted" style={split ? discountedPriceStyle : {}}>{`${currency || 'R'} ${currencyFormat(salePrice)}`}</span>
        </span>
      );
    } else {
      body = (<span className="price">{currency || 'R'} {currencyFormat(salePrice)}</span>);
    }
  }

  return (
    <span className={classes || 'price'} id={ids || 'price'}>
      <span className="currency" itemProp="priceCurrency" content="ZAR" />
      {body}
    </span>
  );
};

export default ProductPrice;
