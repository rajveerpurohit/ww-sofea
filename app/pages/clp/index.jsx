import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
// import clpData from './clp_sort.json';
// import clpRefineData from './clp.json';
import ListOptions from '../../components/basic/list-options';
import Pagination from '../../components/basic/pagination';
import BreadCrumb from '../../components/basic/breadcrumb';
import Filters from '../../components/basic/filters';
import Accordion from '../../components/basic/accordion';
import RefineMentMenu from './refinement-menu';
import { getCLPPageData } from './actions';
import ClpContainer from './clp-container';
import {TEMPLATE_TYPE} from '../../Constants';

class CLP extends Component {

    static need = [
        getCLPPageData
    ]

    constructor(props) {
        super(props);
        this.state = {
            active: null
        };
        this.OnPromotion = '';
        this.hasCategory = false;
        this.guidedNavigation = this.guidedNavigation.bind(this);
        this.getClpContentData = false;
    }
    
    handleClick(i) {
        return (e) => {
            const active = this.state.active === i ? null : i;
            this.setState({ active });
        };
    }
    collpsedClass(i) {
        return this.state.active === i ? 'is-collapsed' : '';
    }
    liClass(i) {
        return this.state.active === i ? 'active' : 'inactive';
    }
    guidedNavigation(getrefinementData) {
        const breadCrumbData = this.props.clpData && this.props.clpData[0] && this.props.clpData[0].secondaryContent && this.props.clpData[0].secondaryContent[0] ? this.props.clpData[0].secondaryContent[0] : '';
        if (getrefinementData.navigation && getrefinementData.navigation.length > 0 || getrefinementData.recipesNavigation && getrefinementData.recipesNavigation.length > 0 || getrefinementData.articleNavigation && getrefinementData.articleNavigation.length > 0 || getrefinementData.lookBookNavigation && getrefinementData.lookBookNavigation.length > 0) {
            return (
              <div className="grid grid--tight-y">
                <div className="product-list__filters" >

                  <div className="accordion accordion--chrome accordion--group" >
                    <div className="accordion__segment--chrome" >
                      {getrefinementData.navigation[0].name === 'OnPromotion' || getrefinementData.navigation[0].displayName === 'Category' ?
                        <h4 className={`text-caps accordion__toggle--chrome accordion__toggle--line ${this.collpsedClass(0)}`} data-js="accordion-toggle" onClick={this.handleClick(0)}>
                          {
                                            breadCrumbData.categoryDimensions && breadCrumbData.categoryDimensions[0] && breadCrumbData.categoryDimensions[0].label ? <div>SHOW                            {breadCrumbData.categoryDimensions[0].label.substring(0, breadCrumbData.categoryDimensions[0].label.indexOf('_'))}</div> : <div>SHOW ME</div>
                                        }

                        </h4> : ''}
                      {
                                    getrefinementData.navigation ? getrefinementData.navigation.map((navItem) => {
                                        if (navItem.name === 'OnPromotion') {
                                            // var OnPromotion = navItem;

                                            this.OnPromotion = navItem;
                                        }
                                        if (navItem.displayName === 'Category') {
                                            // var hasCategory = true;

                                            this.hasCategory = true;
                                        }
                                        return null;
                                    }) : null
                                }
                      {
                                    getrefinementData.navigation ? getrefinementData.navigation.map((navItem) => {
                                        return (<RefineMentMenu navItemData={navItem} active={this.state.active} OnPromotion={this.OnPromotion} hasCategory={this.hasCategory} breadCrumbData={breadCrumbData} />);
                                    }) : null
                                }
                      {
                                    getrefinementData.recipesNavigation ? getrefinementData.recipesNavigation.map((navItem) => {
                                        return (<RefineMentMenu navItemData={navItem} breadCrumbData={breadCrumbData} />);
                                    }) : null
                                }
                      {
                                    getrefinementData.articleNavigation ? getrefinementData.articleNavigation.map((navItem) => {
                                        return (<RefineMentMenu navItemData={navItem} breadCrumbData={breadCrumbData} />);
                                    }) : null
                                }
                      {
                                    getrefinementData.lookBookNavigation ? getrefinementData.lookBookNavigation.map((navItem) => {
                                        return (<RefineMentMenu navItemData={navItem} breadCrumbData={breadCrumbData} />);
                                    }) : null
                                }
                      {/* </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            );
        }
        return null;
    }

    render() {
        const breadCrumbData = this.props.clpData && this.props.clpData[0] && this.props.clpData[0].secondaryContent && this.props.clpData[0].secondaryContent[0] ? this.props.clpData[0].secondaryContent[0] : '';
        const recordsData = this.props.clpData && this.props.clpData[0] && this.props.clpData[0].mainContent && this.props.clpData[0].mainContent[0] && this.props.clpData[0].mainContent[0].contents && this.props.clpData[0].mainContent[0].contents[0] ? this.props.clpData[0].mainContent[0].contents[0] : '';
        const productType = this.props.clpData && this.props.clpData[0] && this.props.clpData[0].mainContent && this.props.clpData[0].mainContent[0] && this.props.clpData[0].mainContent[0].contents && this.props.clpData[0].mainContent[0].contents[0] ? this.props.clpData[0].mainContent[0].contents[0].productType : '';

        const refinementData = this.props.clpData && this.props.clpData[0] && this.props.clpData[0].secondaryContent && this.props.clpData[0].secondaryContent[1] && this.props.clpData[0].secondaryContent[1].contents && this.props.clpData[0].secondaryContent[1].contents[0] ? this.props.clpData[0].secondaryContent[1].contents[0] : '';
        const navigationData = this.props.clpData && this.props.clpData[0] && this.props.clpData[0].secondaryContent && this.props.clpData[0].secondaryContent[1] && this.props.clpData[0].secondaryContent[1].contents[0] ? this.props.clpData[0].secondaryContent[1].contents[0].navigation : [];
        return (
          <div className="main-page">
            <BreadCrumb breadcrumbs={breadCrumbData} />
            <div className="grid grid--tight-y">
              <div className="product-list__filters">
                {this.guidedNavigation(refinementData)}
              </div>
              <div className="product-list__list">
                <ListOptions clpProps={navigationData} records={recordsData} getselectedContent={this.onSelectContent}  />
                <ClpContainer pageTamlateType={TEMPLATE_TYPE[1]} imageContentProp={recordsData.records} productType={productType} />
              </div>

              <div className="grid lazyload-container landing__row" />
              <div className="grid" />
            </div>
            <div className="grid grid--space-y">
              {
                    refinementData.navigation && refinementData.navigation.length > 0 ? <Pagination paginationData={recordsData} /> : ''
                }
            </div>
          </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        clpData: state.clp.clpData
    };
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ getCLPPageData }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(CLP);