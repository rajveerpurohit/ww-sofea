import React, { Component } from 'react';

import ProductTile from '../../components/compound/product-tile';

export default class ClpContainer extends Component {
  constructor(props) {
    super(props);
    this.createImageData = this.createImageData.bind(this);
  }

  createImageData(itemContentData, productType, pageTamlateType) {
    const { user, currentUser, nonDelieverable, cartDetails } = this.props;

    return itemContentData.map((itemData, index) => {
      const productId = itemData.attributes.p_productid ? itemData.attributes.p_productid : index;

      return (
        <ProductTile
          showQuickView
          user={user}
          key={productId}
          productData={itemData}
          productType={productType}
          currentUser={currentUser}
          pageTamlateType={pageTamlateType}
          nonDelieverable={nonDelieverable}
          cartDetails={cartDetails}
          tagProductClicks={this.props.tagProductClicks}
        />
      );
    });
  }

  render() {
    console.log('asd');
    const { imageContentProp, productType, pageTamlateType, refinementData } = this.props;
    return (
      <div className={refinementData && refinementData.navigation && refinementData.navigation.length !== 0 ? 'grid grid--space-y' : 'grid'}>
        {imageContentProp && imageContentProp.length !== undefined ?
          this.createImageData(imageContentProp, productType, pageTamlateType)
          : ''}
      </div>
    );
  }
}
