import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import _ from 'lodash';

import ProductTile from '../../components/compound/product-tile';
import Image from '../../components/basic/Image';
import Ribbon from '../../components/basic/Ribbon';
import Dropdown from '../../components/basic/Dropdown';
import DropdownFlyOutList from '../../components/basic/dropdown-fly-out-list';


export default class ClpContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.createImageData = this.createImageData.bind(this);
    }

    createImageData(itemContentData, productType, pageTamlateType) {
        return itemContentData.map((itemData) => {
            return (
              <ProductTile pageTamlateType={pageTamlateType} productData={itemData} productType={productType} key={itemData.attributes.p_productid} />
            );
        });
    }

    render() {
        const {imageContentProp, productType, pageTamlateType} = this.props;
        return (
          <div className="grid grid--space-y">
            {imageContentProp && imageContentProp.length !== undefined ? this.createImageData(imageContentProp, productType, pageTamlateType) : ''}
          </div>
        );
    }
}
