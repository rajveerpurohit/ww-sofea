import React, { Component } from 'react';
import _ from 'lodash';
import classnames from 'classnames';

import Image from '../Image';
import {
  PRODUCT_SIZE_CONST_ML,
  PRODUCT_SIZE_CONST_G
} from '../../../Constants';

const showSizeAsColour = (colour) => {
  return colour && (_.endsWith(colour, PRODUCT_SIZE_CONST_ML) || _.some(PRODUCT_SIZE_CONST_G, size => _.includes(colour, size)));
};

class ProductColour extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedColour: ''
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e, productId, sku) {
    this.setState({ selectedColour: sku.id });
    this.props.onChangeProductColour(e, productId, sku);
  }

  render() {
    const { product, colour } = this.props;
    const { colourSKUs, productId, enableColours } = product;
    let color = this.props.selectedProductSKU && this.props.selectedProductSKU.colour ? this.props.selectedProductSKU.colour : colour;
    if (enableColours && colourSKUs) {
      return (
        <div>
          <p>
            First select a {showSizeAsColour(color) ? 'size' : 'colour' }:<strong>&nbsp;{color}</strong>
          </p>
          <ul className="nav-list-x nav-list-x--wrap">
            {colourSKUs.map((sku, index) => {
              const classes = classnames('large colour colour-swatch colour-swatch--large', { active: this.state.selectedColour === sku.id });

              const payload = {
                id: productId,
                alt: sku.colour,
                title: sku.colour,
                url: sku.internalSwatchImage,
                externalUrl: sku.externalSwatchImage,
                className: classes
              };

              return (
                <li className="nav-list-x__item nav-list-x__item--wrap" key={index} >
                  <Image payload={payload} onClick={e => this.onClick(e, productId, sku)} />
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

export default ProductColour;
