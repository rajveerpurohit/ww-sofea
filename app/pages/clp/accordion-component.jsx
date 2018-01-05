import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router';

import Accordion from '../../components/basic/accordion';

import { getCLPPageData } from './actions';
class AccordionComponent extends Component {

    constructor(props) {

        super(props);

        this.getrefinements = this.getrefinements.bind(this);

        this.createSubCategories = this.createSubCategories.bind(this);

        this.onPromotion = this.onPromotion.bind(this);

        this.createSubCategoriesOnPromotion = this.createSubCategoriesOnPromotion.bind(this);

        this.showCategoryFilter = false;

        this.filterArray = [];

        this.handleLinkClick = this.handleLinkClick.bind(this);

        this.handleLabelClick = this.handleLabelClick.bind(this);

    }

    getrefinements(refinementsData) {

        return refinementsData.map((refinement) => {

            return (<div>

                {

                    refinement.properties.navigationType !== 'hidden' ?

                        this.showCategoryFilter = true : null

                }

                {

                    this.showCategoryFilter && this.props.hasCategory ? this.createSubCategories(refinement) : null

                }
            </div>

            );

        });

    }

    handleLinkClick(event, refinement) {

        let filterLink = refinement.navigationState.substring(0, refinement.navigationState.indexOf('?'));

        let refinementLabel = refinement.label.substring(0, refinement.label.indexOf('_')).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(' ').join('-').replace(/--/i, '-');

        let locationPath = '';

        if (typeof window !== 'undefined' && window) {

            locationPath = window.location.href.substr(0, window.location.href.lastIndexOf('\/'));

        }

        if (locationPath.substring(locationPath.length - 1) == "_") {

            locationPath = locationPath.substring(0, locationPath.length - 1);

        }

        locationPath = locationPath + refinementLabel + filterLink;

        return locationPath;

    }

    handleLabelClick(e, filters) {

        const filterLink = filters.navigationState.substring(0, filters.navigationState.indexOf('?')).substring(filters.navigationState.indexOf("Z") + 0);

        let params = {};

        if (!(e.target.classList.contains('is-checked'))) {

            this.filterArray.push(filterLink);

            e.target.className += 'is-checked';

            params = {

                pageURL: typeof window !== 'undefined' && window ? window.location.pathname + this.filterArray.join("") : '',

            };

        } else {

            e.target.className = e.target.className.replace(/\bis-checked\b/g, '');

            this.filterArray = this.filterArray.filter(x => x !== filterLink);
            params = {

                pageURL: typeof window !== 'undefined' && window ? window.location.pathname + this.filterArray.join("") : '',
            };

        }

        this.props.getCLPPageData(params);

    }

    createSubCategories(refinement) {

        const displayName = 'On Promotion';

        const refinementLabel = displayName.split(' ').join('_');

        return (<li>

            {this.props.dimensionData.displayName === 'OnPromotion' && this.props.dimensionData.refinementCrumbs === null ?

                <div>

                    <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id={`fldLabelFilter_${refinementLabel}`} />

                    <label htmlFor={`fldLabelFilter_${refinementLabel}`} className="on-promotion nav-list__link--filter label-checkbox is-checked"><span className="nav-list__qnty">({this.props.dimensionData.refinements[0].count})</span>{this.props.dimensionData.refinements[0].label}</label> </div> : null

            }

            {this.props.dimensionData.displayName === 'OnPromotion' && this.props.dimensionData.refinementCrumbs !== null ?

                <div>

                    <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" checked="checked" id={`fldLabelFilter_${refinementLabel}`} />

                    <label htmlFor={`fldLabelFilter_${refinementLabel}`} className="on-promotion nav-list__link--filter label-checkbox is-checked"><span className="nav-list__qnty">({this.props.dimensionData.refinements[0].count})</span>{this.props.dimensionData.refinements[0].label}</label> </div> : null

            }

            {refinement.properties.navigationType && refinement.properties.navigationType !== 'hidden' ?

                <div>

                    <Link to={e => this.handleLinkClick(e, refinement)} className="nav-list__link--filter"><span className="nav-list__qnty">({refinement.count})</span>{refinement.label.substring(0, refinement.label.indexOf('_'))}</Link></div>

                : null

            }

        </li>);

    }
    onPromotion() {

        !this.props.hasCategory && this.props.dimensionData.displayName === 'OnPromotion' ? this.createSubCategoriesOnPromotion() : null

    }
    createSubCategoriesOnPromotion() {

        const displayName = 'On Promotion';

        const refinementLabel = displayName.split(' ').join('_');

        return (

            <li>

                {this.props.dimensionData.refinementCrumbs === null ?

                    <div>

                        <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id={`fldLabelFilter_${refinementLabel}`} />

                        <label htmlFor={`fldLabelFilter_${refinementLabel}`} className="on-promotion nav-list__link--filter label-checkbox is-checked"><span className="nav-list__qnty">({this.props.dimensionData.refinements[0].count})</span>{this.props.dimensionData.refinements[0].label}</label></div> : null

                }


                {

                    this.props.dimensionData.refinementCrumbs !== null ?

                        <div>

                            <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" checked="checked" id={`fldLabelFilter_${refinementLabel}`} />

                            <label htmlFor={`fldLabelFilter_${refinementLabel}`} className="on-promotion nav-list__link--filter label-checkbox is-checked"><span className="nav-list__qnty">({this.props.dimensionData.refinements[0].count})</span>{this.props.dimensionData.refinements[0].label}</label> </div> : null

                }

            </li>

        );
    }

    render() {

        const dimensionData = this.props.dimensionData;

        return (<ul className="list--silent text-small accordion__content--chrome" >{this.getrefinements(dimensionData.refinements)}{this.onPromotion()}

        </ul>);

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

export default connect(mapStateToProps, matchDispatchToProps)(AccordionComponent);