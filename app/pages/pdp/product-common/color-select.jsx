import React, { Component } from 'react';
import { Link } from 'react-router';

import Image from '../../../components/basic/Image';

class ColorSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flyOutClass: '',
      selectedItem: this.props.activeClrSku || {}
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }

  handleMouseEnter() {
    this.setState({ flyOutClass: 'is-open' });
  }
  handleMouseLeave() {
    this.setState({ flyOutClass: '' });
  }
  handleItemSelect(e, clrSku) {
    e.preventDefault();
    this.setState({ selectedItem: clrSku });
    this.props.getSelectedItem(clrSku);
    this.handleMouseLeave();
  }

  renderListItems() {
    const { colorSkus } = this.props;

    return colorSkus.map((clrSku, i) => {
      const swatchImg = {
        url: clrSku.internalSwatchImage,
        externalUrl: clrSku.externalSwatchImage,
        className: 'colour-swatch circle',
        alt: clrSku.displayName,
        title: clrSku.displayName
      };
      return (
        <li className="nav-list__item" key={i} onClick={e => this.handleItemSelect(e, clrSku)}>
          <Link className="nav-list__link link--silent" style={{ padding: '10px 5px 0 13px', cursor: 'pointer' }}>
            <Image payload={swatchImg} />
            <span>{clrSku.colour}</span>
          </Link>
        </li>
      )
    });
  }

  render() {
    const { listTitle, rootClassName } = this.props;
    const { selectedItem } = this.state;

    return (
      <div
        className={`${rootClassName} fly-out ${this.state.flyOutClass}`}
        onClick={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ marginBottom: 1 + 'em' }}
      >
        <span className="enhanced-select fly-out__toggle">
          <span className="enhanced-select__label" title={listTitle} style={{ paddingRight: 25 + 'px' }}>
            <Image
              payload={{
                url: selectedItem.internalSwatchImage,
                externalUrl: selectedItem.externalSwatchImage,
                className: 'colour-swatch circle',
                alt: selectedItem.displayName,
                title: selectedItem.displayName,
                width: 12,
                height: 12
              }}
              style={{ height: 12 + 'px', width: 12 + 'px' }}
            />
          </span>
          <span className="icon enhanced-select__icon" />
        </span>
        <ul
          className="nav-list fly-out__content fly-out__content--chrome"
          style={{ marginTop: 0, padding: 0 }}
        >
          {this.renderListItems()}
        </ul>
      </div>
    );
  }
}

export default ColorSelect;
