import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccordionComponent from './accordion-component';
import FilterContent from './filter-content';

export default class RefineMentMenu extends Component {
    constructor(props) {
        super(props);
    }
    display(i) {
        return this.props.active !== i ? 'block' : 'none';
    }
    render() {
     
        // return (<div>testsfsds</div>);
        const navItemData = this.props.navItemData;
        switch (navItemData.dimensionName) {
            case 'Category':
            return (
            <div className="accordion__content--chrome accordion__content" data-js="accordion-content" style={{ display: this.display(0) }} ><AccordionComponent dimensionData={navItemData} OnPromotion={this.props.OnPromotion} hasCategory={this.props.hasCategory} breadCrumbData={this.props.breadCrumbData} /> </div>
            );

            case 'Content':
            return (<div><AccordionComponent dimensionData={navItemData} OnPromotion={this.props.OnPromotion} hasCategory={this.props.hasCategory} breadCrumbData={this.props.breadCrumbData} /> </div>);

            case 'OnPromotion':
            return (
                <div className="accordion__content--chrome accordion__content" data-js="accordion-content" style={{ display: this.display(0) }} ><AccordionComponent dimensionData={navItemData} OnPromotion={this.props.OnPromotion} hasCategory={this.props.hasCategory} breadCrumbData={this.props.breadCrumbData} /> </div>
            );
            
            default:
            return (<div><FilterContent dimensionData={navItemData} OnPromotion={this.props.OnPromotion} hasCategory={this.props.hasCategory} breadCrumbData={this.props.breadCrumbData} /> </div>);
        }
    }
}
