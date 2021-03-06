import React, { Component } from 'react';
import AccordionComponent from './accordion-component';
import FilterContent from './filter-content';

export default class RefineMentMenu extends Component {
  display(i) {
    return this.props.active !== i ? 'block' : 'none';
  }
  render() {
    const navItemData = this.props.navItemData;
    switch (navItemData.dimensionName) {
      case 'Category':
        return (
          <div style={{ display: this.display(0)}} >
            <AccordionComponent dimensionData={navItemData} OnPromotion={this.props.OnPromotion} hasCategory={this.props.hasCategory} breadCrumbData={this.props.breadCrumbData} />
          </div>
        );

      case 'Content':
        return (
          <div>
            <AccordionComponent dimensionData={navItemData} OnPromotion={this.props.OnPromotion} hasCategory={this.props.hasCategory} breadCrumbData={this.props.breadCrumbData} />
          </div>
        );

      case 'OnPromotion':
        return (
          <div style={{ display: this.display(0),marginBottom: "-28px" }} >
            <AccordionComponent dimensionData={navItemData} OnPromotion={this.props.OnPromotion} hasCategory={this.props.hasCategory} breadCrumbData={this.props.breadCrumbData} />
          </div>
        );

      default:
        return (
          <div>
            <FilterContent dimensionData={navItemData} OnPromotion={this.props.OnPromotion} hasCategory={this.props.hasCategory} breadCrumbData={this.props.breadCrumbData} />
          </div>
        );
    }
  }
}
