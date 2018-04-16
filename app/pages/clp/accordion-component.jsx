import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { getSLPPageData } from './actions';
import localeInfoUtil from '../../services/localeInfoUtil';
import commonUtil from '../../services/commonUtil';


class AccordionComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
    this.getrefinements = this.getrefinements.bind(this);
    this.createSubCategories = this.createSubCategories.bind(this);
    this.showCategoryFilter = false;
    this.filterArray = [];
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.refinementCrumbs = this.refinementCrumbs.bind(this);
    this.handleisCheckedClick = this.handleisCheckedClick.bind(this);
    this.generateSubrefinements = this.generateSubrefinements.bind(this);
  }
  getrefinements(refinementsData) {
    return refinementsData.map((refinement, index) => {
      return (<div key={index}>
        {
          refinement.navigationType !== 'hidden' ?
            this.showCategoryFilter = true : null
        }
        {
          this.showCategoryFilter && this.props.hasCategory ? this.createSubCategories(refinement, index) : null
        }
      </div>

      );
    });
  }
  handleClick(i) {
    return (e) => {
      const active = this.state.active === i ? null : i;
      this.setState({ active });
    };
  }

  collpsedClass(i) {
    return this.state.active === i ? 'target-is-open' : 'target-is-closed';
  }

  liClass(i) {
    return this.state.active === i ? 'active' : 'inactive';
  }

  display(i) {
    return this.state.active === i ? 'block' : 'none';
  }

  handleLinkClick(event, refinement, refinementLabel) {
    const filterLink = refinement.navigationState.substring(0, refinement.navigationState.indexOf('?'));
    let locationPath = '';
    let getNsValue = '';
    let getNrppValue = '';
    let getNrValue = '';
    let getNttValue = '';
    const getNo = '0';
    let newurl = '';
    locationPath = commonUtil.getParameterByName('pageURL', refinement.navigationState);
    locationPath = locationPath.substring(0, locationPath.indexOf('_'));
    if (typeof window !== 'undefined' && window) {
      locationPath = window.location.origin + locationPath;
      getNsValue = localeInfoUtil.getParameterByName('Ns', window.location.href);
      getNrppValue = localeInfoUtil.getParameterByName('Nrpp', window.location.href);
      getNrValue = localeInfoUtil.getParameterByName('Nr', window.location.href);
      getNttValue = localeInfoUtil.getParameterByName('Ntt', window.location.href);
    }
    if (getNttValue !== null) {
      if (locationPath.indexOf('cat') !== -1) {
        locationPath = locationPath + refinementLabel + filterLink;
      } else {
        locationPath = '/cat/' + refinementLabel + filterLink;
      }
      if (getNrppValue !== null && getNrValue !== null && getNsValue !== null) {
        newurl = locationPath + '?No=' + getNo + '&Nr=' + getNrValue + '&Nrpp=' + getNrppValue + '&Ns=' + getNsValue + '&Ntt=' + getNttValue;
      } else if (getNrValue !== null && getNsValue !== null) {
        newurl = locationPath + '?No=' + getNo + '&Nr=' + getNrValue + '&Ns=' + getNsValue + '&Ntt=' + getNttValue;
      } else if (getNrValue !== null && getNrppValue !== null) {
        newurl = locationPath + '?No=' + getNo + '&Nr=' + getNrValue + '&Nrpp=' + getNrppValue + '&Ntt=' + getNttValue;
      } else {
        newurl = locationPath + '?No=' + getNo + '&Ntt=' + getNttValue;
      }
    } else {
      locationPath = locationPath + refinementLabel + filterLink;
      if (getNrppValue !== null && getNrValue !== null && getNsValue !== null) {
        newurl = locationPath + '?No=' + getNo + '&Nr=' + getNrValue + '&Nrpp=' + getNrppValue + '&Ns=' + getNsValue;
      } else if (getNrValue !== null && getNsValue !== null) {
        newurl = locationPath + '?No=' + getNo + '&Nr=' + getNrValue + '&Ns=' + getNsValue;
      } else if (getNrValue !== null && getNrppValue !== null) {
        newurl = locationPath + '?No=' + getNo + '&Nr=' + getNrValue + '&Nrpp=' + getNrppValue;
      } else {
        newurl = locationPath;
      }
    }
    return newurl;
  }
  handleLabelClick(e, filters) {
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
          No: '0',
          Nr: getNrValue,
          Nrpp: getNrppValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ntt=' + getNttValue;
      } else if (getNrValue !== null && getNsValue !== null) {
        params = {
          pageURL: pathName + filterURL,
          No: '0',
          Nr: getNrValue,
          Ns: getNsValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns + '&Ntt=' + getNttValue;
      } else {
        params = {
          pageURL: '/cat/' + filterURL,
          No: '0',
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
        No: '0',
        Nr: getNrValue,
        Nrpp: getNrppValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp;
    } else if (getNrValue !== null && getNsValue !== null) {
      params = {
        pageURL: pathName + filterURL,
        No: '0',
        Nr: getNrValue,
        Ns: getNsValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns;
    } else {
      params = {
        pageURL: pathName + filterURL
      };
      newurl = params.pageURL;
    }
    this.props.getSLPPageData(params);
    window.history.pushState({ path: newurl }, '', newurl);
  }
  handleisCheckedClick(e, filters) {
    const navState = filters.removeAction.navigationState;
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
          pageURL: '/cat' + filterURL,
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
        pageURL: pathName + filterURL
      };
      newurl = params.pageURL;
    }

    this.props.getSLPPageData(params);
    window.history.pushState({ path: newurl }, '', newurl);
  }
  createSubCategories(refinement, createIndex) {
    const displayName = 'On Promotion';
    const refinementLabel = displayName.split(' ').join('_');
    const subRefinements = _.get(refinement, 'subRefinements', []);
    const refinementLabelLink = refinement.label.substring(0, refinement.label.indexOf('_')).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(' ').join('-').replace(/--/i, '-');
    
    return (<div >
      {this.props.dimensionData.dimensionName === 'OnPromotion' && this.props.dimensionData.refinementCrumbs === null ?
        <li className="nav-accordion__list-item">
          <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id={`fldLabelFilter_${refinementLabel}`} />
          <label htmlFor={`fldLabelFilter_${refinementLabel}`} className="on-promotion nav-list__link--filter label-checkbox" onClick={e => this.handleLabelClick(e, refinement)}>
            <span className="nav-list__qnty">({this.props.dimensionData.refinements[0].count})</span>
            {this.props.dimensionData.refinements[0].label}
          </label>
        </li> : null
      }
      {this.props.dimensionData.dimensionName === 'OnPromotion' && this.props.dimensionData.refinementCrumbs !== null ?
        <li className="nav-accordion__list-item">
          <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" checked="checked" id={`fldLabelFilter_${refinementLabel}`} />
          <label htmlFor={`fldLabelFilter_${refinementLabel}`} className="on-promotion nav-list__link--filter label-checkbox is-checked" onClick={e => this.handleisCheckedClick(e, this.props.dimensionData.refinementCrumbs[0])}>
            <span className="nav-list__qnty">({this.props.dimensionData.refinementCrumbs[0].count})</span>
            {this.props.dimensionData.refinementCrumbs[0].label}
          </label>
        </li> : null
      }
      {
        refinement.navigationType && refinement.navigationType !== 'hidden' ?
          <li className="nav-accordion__list-item">
            <Link to={e => this.handleLinkClick(e, refinement, refinementLabelLink)} className={`nav-accordion__link ${this.collpsedClass(createIndex)}`}>
              {/* <span className="nav-list__qnty">({refinement.count})</span> */}
              {refinement.label.substring(0, refinement.label.indexOf('_'))}
            </Link>
            {
              subRefinements && subRefinements.length > 0 ? 
              <span data-toggle="" className={`nav-accordion__toggle icon icon--down-dark ${this.collpsedClass(createIndex)}`} onClick={this.handleClick(createIndex)} />
              : ''
          }
            {
            subRefinements && subRefinements.length > 0 ?
              <ul className="list--silent" style={{ display: this.display(createIndex) }}>
                {this.generateSubrefinements(subRefinements, refinementLabelLink)}
              </ul>
              : ''
          }

          </li> : null
      }
    </div>);
  }
  generateSubrefinements(getSubRefineData, refinementLabelLink) {
    // getSubRefineData
    return getSubRefineData.map((subrefinement, index) => {
      const subRefinementLabelLink = refinementLabelLink + '/' + subrefinement.label.substring(0, subrefinement.label.indexOf('_')).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(' ').join('-').replace(/--/i, '-');
      return (<li className="nav-accordion__list-item" >
        <Link to={e => this.handleLinkClick(e, subrefinement, subRefinementLabelLink)} className="nav-accordion__link" >
          {subrefinement.label.substring(0, subrefinement.label.indexOf('_'))}
          {/* <span className="nav-list__qnty">({subrefinement.count})</span> */}
        </Link>
      </li>);
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


  render() {
    const dimensionData = this.props.dimensionData;
    return (<ul className="list--silent text-small accordion__content--chrome" >
      {dimensionData && dimensionData.refinementCrumbs ? this.getrefinements(dimensionData.refinementCrumbs) : ''}
      {dimensionData && dimensionData.refinements ? this.getrefinements(dimensionData.refinements) : ''}
    </ul>);
  }

}
const mapStateToProps = (state) => {
  return {

  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getSLPPageData }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(AccordionComponent);
