import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSLPPageData } from '../clp/actions';
import localeInfoUtil from '../../services/localeInfoUtil';

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
          <label htmlFor={`fldLabelFilter_${refinementLabel}`} className={'label-checkbox filter_list_label is-checked'} onClick={e => this.handleisCheckedClick(e, filters)}>
            {displayName}
          </label>
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
          <label htmlFor={`fldLabelFilter_${refinementLabel}`} onClick={e => this.handleLabelClick(e, filters)} className={'label-checkbox filter_list_label '}>
            {displayName}
          </label>
        </li>
      );
    });
  }
  handleisCheckedClick(e, filters) {
    const navState = filters.removeAction.navigationState;
    // const filterLink = navState.split('?')[0].indexOf('Z') > -1 ? navState.substring(navState.indexOf('Z'), navState.indexOf('?')) : '';
    const filterURL = navState.substring(0, navState.indexOf('?')).substring(navState.indexOf('_'));
    const pathName = typeof window !== 'undefined' && window ? window.location.pathname.substring(0, window.location.pathname.indexOf('_')) : '';
    const getNsValue = localeInfoUtil.getParameterByName('Ns', window.location.href);
    const getNrppValue = localeInfoUtil.getParameterByName('Nrpp', window.location.href);
    const getNrValue = localeInfoUtil.getParameterByName('Nr', window.location.href);
    const getNttValue = localeInfoUtil.getParameterByName('Ntt', window.location.href);
    let params = {};
    let newurl = '';
    if (getNttValue !== null) {
      if (getNrppValue !== null && getNrValue !== null) {
        params = {
          pageURL: pathName + filterURL,
          No: '0',
          Nrpp: getNrppValue,
          Nr: getNrValue,
          Ns: getNsValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns + '&Ntt=' + getNttValue;
      } else if (getNrValue !== null) {
        params = {
          pageURL: pathName + filterURL,
          Nr: getNrValue,
          Ns: getNsValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns + '&Ntt=' + getNttValue;
      } else {
        params = {
          // pageURL: typeof window !== 'undefined' && window ? window.location.pathname + this.filterArray[this.filterArray.length - 1] : '',
          pageURL: pathName + filterURL,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Ntt=' + getNttValue;
      }
    } else if (getNrppValue !== null && getNrValue !== null) {
      params = {
        pageURL: pathName + filterURL,
        No: '0',
        Nrpp: getNrppValue,
        Nr: getNrValue,
        Ns: getNsValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns;
    } else if (getNrValue !== null) {
      params = {
        pageURL: pathName + filterURL,
        Nr: getNrValue,
        Ns: getNsValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns;
    } else {
      params = {
        // pageURL: typeof window !== 'undefined' && window ? window.location.pathname + this.filterArray[this.filterArray.length - 1] : '',
        pageURL: pathName + filterURL
      };
      newurl = params.pageURL;
    }

    this.props.getSLPPageData(params);
    window.history.pushState({ path: newurl }, '', newurl);
  }
  handleLabelClick(e, filters) {
    // const filterLink = filters.navigationState.substring(0, filters.navigationState.indexOf('?')).substring(filters.navigationState.indexOf('Z') + 0);
    const filterURL = filters.navigationState.substring(0, filters.navigationState.indexOf('?')).substring(filters.navigationState.indexOf('_'));
    const pathName = typeof window !== 'undefined' && window ? window.location.pathname.substring(0, window.location.pathname.indexOf('_')) : '';
    const getNsValue = localeInfoUtil.getParameterByName('Ns', window.location.href);
    const getNrppValue = localeInfoUtil.getParameterByName('Nrpp', window.location.href);
    const getNrValue = localeInfoUtil.getParameterByName('Nr', window.location.href);
    const getNttValue = localeInfoUtil.getParameterByName('Ntt', window.location.href);
    let params = {};
    let newurl = '';
    if (getNttValue !== null) {
      if (getNrppValue !== null && getNrValue !== null && getNsValue !== null) {
        params = {
          pageURL: pathName + filterURL,
          No: '0',
          Nrpp: getNrppValue,
          Nr: getNrValue,
          Ns: getNsValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns + '&Ntt=' + getNttValue;
      } else if (getNrValue !== null && getNrppValue !== null) {
        params = {
          pageURL: pathName + filterURL,
          Nr: getNrValue,
          Nrpp: getNrppValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ntt=' + getNttValue;
      } else if (getNrValue !== null && getNsValue !== null) {
        params = {
          pageURL: pathName + filterURL,
          Nr: getNrValue,
          Ns: getNsValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns + '&Ntt=' + getNttValue;
      } else {
        params = {
          // pageURL: typeof window !== 'undefined' && window ? window.location.pathname + this.filterArray[this.filterArray.length - 1] : '',
          pageURL: pathName + filterURL,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Ntt=' + getNttValue;
      }
    } else if (getNrppValue !== null && getNrValue !== null && getNsValue !== null) {
      params = {
        pageURL: pathName + filterURL,
        No: '0',
        Nrpp: getNrppValue,
        Nr: getNrValue,
        Ns: getNsValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns;
    } else if (getNrValue !== null && getNrppValue !== null) {
      params = {
        pageURL: pathName + filterURL,
        Nr: getNrValue,
        Nrpp: getNrppValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp;
    } else if (getNrValue !== null && getNsValue !== null) {
      params = {
        pageURL: pathName + filterURL,
        Nr: getNrValue,
        Ns: getNsValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns;
    } else {
      params = {
        // pageURL: typeof window !== 'undefined' && window ? window.location.pathname + this.filterArray[this.filterArray.length - 1] : '',
        pageURL: pathName + filterURL
      };
      newurl = params.pageURL;
    }
    this.props.getSLPPageData(params);
    window.history.pushState({ path: newurl }, '', newurl);
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
          <h4 className={`accordion__toggle--chrome accordion__toggle--line ${this.collpsedClass(0)}`} data-js="accordion-toggle" onClick={this.handleClick(0)}>
            {filteredData.dimensionName}
          </h4>
          <ul className={`list--silent text-small accordion__content--chrome accordion__content ${filteredData.displayName === 'Size' || filteredData.displayName === 'UKSize' ? 'list--sizes' : ' '} acordion_ul`} style={{ display: this.display(0) }} >
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
  return bindActionCreators({ getSLPPageData }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(FilterContent);
