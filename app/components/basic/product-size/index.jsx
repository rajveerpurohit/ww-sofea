import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import classnames from 'classnames';

class ProductSize extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: ''
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e, sku) {
    this.setState({ selectedSize: sku.id });
    this.props.onChangeProductSize(e, sku);
  }

  render() {
    const { styleId, product, productInventory, currentUser } = this.props;
    const { styleIdSizeSKUsMap, enableSizes, fulfillerType } = product;
    const suburbId = _.get(this.props, 'currentUser.suburb.id', null);

    if (enableSizes && styleIdSizeSKUsMap && fulfillerType && currentUser) {
      const { storeIds } = currentUser;
      const storeId = _.get(storeIds, fulfillerType, null);

      return (
        <div>
          <p>First select a size:</p>
          <ul className="nav-list-x product__size-selector">
            {_.map(styleIdSizeSKUsMap[styleId], (sku) => {
              const quantity = storeId && _.get(productInventory, `${sku.id}.${storeId}`, 0);
              let isAvaliable = false;

              if (suburbId && !_.isEmpty(productInventory) && (Number(quantity) > 0)) {
                isAvaliable = true;
              } else if (!suburbId) {
                isAvaliable = true;
              }

              const classes = classnames('product-size', {
                'is-sold-out': !isAvaliable
              }, {
                'is-selected': isAvaliable && this.state.selectedSize === sku.id
              });

              return (
                <li className="nav-list-x__item" key={sku.id} >
                  <Link
                    className={classes}
                    onClick={e => (isAvaliable ? this.onClick(e, sku) : (() => {}))}
                  >
                    {sku.size}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return null;
  }
}

export default ProductSize;
