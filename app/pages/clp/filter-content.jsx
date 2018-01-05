import React, { Component } from 'react';
import { connect } from 'react-redux';

// import PropTypes from 'prop-types';

// import axios from 'axios';

// import { Link } from 'react-router';

import { bindActionCreators } from 'redux';
import { getCLPPageData } from './actions';

class FilterContent extends Component {

    constructor(props) {
        super(props);

        this.state = {

            active: null,

            activeLabel: ''

        };

        this.filterArray = [];

        this.refinementCrumbs = this.refinementCrumbs.bind(this);

        this.handleLabelClick = this.handleLabelClick.bind(this);
        
        this.getDatarefinementCrumbs = this.getDatarefinementCrumbs.bind(this);
    }
    getDatarefinementCrumbs(filteredData) {
        return filteredData.map((filters, item) => {
            const displayName = filters.label;

            const refinementLabel = displayName.split(' ').join('_');

            return (
              <li className="nav-list__item filter_list" key={item}>
                <input type="checkbox" className="enhanced-checkbox is-enhanced filter_list_input" name="checkbox-set" id={`fldLabelFilter_${refinementLabel}`} />
                <label htmlFor={`fldLabelFilter_${refinementLabel}`} className={'label-checkbox filter_list_label is-checked'} onClick={e => this.handleisCheckedClick(e, filters)}>{displayName}</label>
              </li>
            );
        });
    }
    refinementCrumbs(filteredData) {
        return filteredData.map((filters, item) => {
            const displayName = filters.label;

            const refinementLabel = displayName.split(' ').join('_');

            return (
              <li className="nav-list__item filter_list" key={item}>
                <input type="checkbox" className="enhanced-checkbox is-enhanced filter_list_input" name="checkbox-set" id={`fldLabelFilter_${refinementLabel}`} />
                <label htmlFor={`fldLabelFilter_${refinementLabel}`} onClick={e => this.handleLabelClick(e, filters)} className={'label-checkbox filter_list_label '}>{displayName}</label>
              </li>
            );
        });
    }
    handleisCheckedClick(e, filters) {
        const navState = filters.removeAction.navigationState;
        const filterLink = navState.split('?')[0].indexOf('Z') > -1 ? navState.substring(navState.indexOf('Z'), navState.indexOf('?')) : '';


        // const filterLink = filters.removeAction.navigationState.indexOf('?') > -1 && filters.removeAction.navigationState.indexOf('?').split('?')[0].indexOf('Z') >-1 ? filters.removeAction.navigationState.split('?')[0] : '';
        let params = {};
        this.filterArray = this.filterArray.filter(x => x !== filterLink);
        params = {

        pageURL: typeof window !== 'undefined' && window ? window.location.pathname + filterLink : '',
        };
        this.props.getCLPPageData(params);
    }
    handleLabelClick(e, filters) {
        const filterLink = filters.navigationState.substring(0, filters.navigationState.indexOf('?')).substring(filters.navigationState.indexOf('Z') + 0);
        let params = {};
        if (!(e.target.classList.contains('is-checked'))) {
            this.filterArray.push(filterLink);
            params = {
                pageURL: typeof window !== 'undefined' && window ? window.location.pathname + this.filterArray[this.filterArray.length - 1] : '',
            };
        } else {
			this.filterArray = this.filterArray.filter(x => x !== filterLink);
            params = {

                pageURL: typeof window !== 'undefined' && window ? window.location.pathname + this.filterArray[this.filterArray.length - 1] : '',
            };
        }
        this.props.getCLPPageData(params);
        return this.filterArray;
    }

    handleClick(i) {
        return (e) => {
            const active = this.state.active === i ? null : i;
            this.setState({ active });
        };
    }

    collpsedClass(i) {
        return this.state.active === i ? '' : 'is-collapsed';
    }

    liClass(i) {
        return this.state.active === i ? 'active' : 'inactive';
    }

    display(i) {
        return this.state.active === i ? 'block' : 'none';
    }

    render() {
        const filteredData = this.props.dimensionData;
        return (
          <div className="accordion accordion--chrome accordion--group" >

            <div className="accordion__segment--chrome" >

              <h4 className={`text-caps accordion__toggle--chrome accordion__toggle--line ${this.collpsedClass(0)}`} data-js="accordion-toggle" onClick={this.handleClick(0)}>
                {filteredData.name}
              </h4>

              <ul className={`list--silent text-small accordion__content--chrome accordion__content ${filteredData.name == 'Size' || filteredData.name == 'UKSize' ? 'list--sizes' : ' '} acordion_ul`} style={{ display: this.display(0) }} >
                {filteredData && filteredData.refinementCrumbs ? this.getDatarefinementCrumbs(filteredData.refinementCrumbs) : ''}
                {filteredData && filteredData.refinements ? this.refinementCrumbs(filteredData.refinements) : ''}

              </ul>

            </div>

          </div>

        );
    }

}

const mapStateToProps = (state) => {
    return {

    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ getCLPPageData }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(FilterContent);
