import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSLPPageData } from '../../../pages/clp/actions';
import localeInfoUtil from '../../../services/localeInfoUtil';
import ServiceUtil from '../../../services/serviceUtil';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import { Link } from 'react-router';


class ListOptions extends Component {
  constructor() {
    super();
    this.state = {
      sortProductByNo: 60,
      sortProductByAlphabet: 'Sort by',
      nsVal: null
    };
    this.selectSortProductByNo = this.selectSortProductByNo.bind(this);
    this.sortByProductsContent = this.sortByProductsContent.bind(this);
    this.sortByAToZContent = this.sortByAToZContent.bind(this);
    this.getUpdatedState = this.getUpdatedState.bind(this);
    this.createOptionsSizeAToZ = this.createOptionsSizeAToZ.bind(this);
    this.megaNavClickHandler = this.megaNavClickHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (typeof document !== 'undefined' && document) {
      document.addEventListener('click', (e) => { this.megaNavClickHandler(e, nextProps); });
    }
    if (typeof window !== 'undefined' && window) {
      const getDyValue = localeInfoUtil.getParameterByName('Dy', window.location.href);
      if (getDyValue !== null) {
        this.setState({
          sortProductByNo: 60,
          sortProductByAlphabet: 'Sort by',
          nsVal: null
        });
      }
    }
  }
  componentWillUnmount() {
    if (typeof document !== 'undefined' && document) {
      document.removeEventListener('click', this.megaNavClickHandler);
    }
  }
  getUpdatedState(getContentText, getNsValue) {
    this.setState({
      sortProductByAlphabet: getContentText,
      nsVal: getNsValue
    });
  }
  megaNavClickHandler(e, nextProps) {
    if (e.target.className === 'main-nav__link') {
      if (nextProps.records.lastRecNum === 60) {
        this.setState({
          sortProductByNo: 60
        });
      }
      let flag = false;
      if (nextProps.records.sortOptions) {
        nextProps.records.sortOptions.map((option) => {
          if (option.selected) {
            flag = true;
          }
          return flag;
        });
        if (flag === false) {
          this.setState({
            sortProductByAlphabet: 'Sort by',
            nsVal: null
          });
        }
      }
    }
  }
  selectAToZContentChange(event, nrpp) {
    const getContentValue = event.target.value;
    const getContentText = event.target.options[event.target.selectedIndex].text;
    const getNsValue = localeInfoUtil.getParameterByName('Ns', getContentValue);
    const getNrValue = localeInfoUtil.getParameterByName('Nr', getContentValue);
    const getNttValue = localeInfoUtil.getParameterByName('Ntt', getContentValue);
    const getNrppValue = localeInfoUtil.getParameterByName('Nrpp', getContentValue);
    let params = {};
    let newurl = '';
    // const getNrppValue = this.getParameterByName('Nrpp', getContentValue);
    if (this.props.records.totalNumRecs <= 60) {
      if (getNsValue !== null && getNttValue !== null) {
        params = {
          pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
          Nr: getNrValue,
          Ns: getNsValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns + '&Ntt=' + params.Ntt;
      } else if (getNttValue !== null) {
        params = {
          pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
          Nr: getNrValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Ntt=' + params.Ntt;
      } else if (getNsValue !== null) {
        params = {
          pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
          Nr: getNrValue,
          Ns: getNsValue
        };
        newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns;
      } else {
        params = {
          pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
          Nr: getNrValue,
        };
        newurl = params.pageURL + '?Nr=' + params.Nr;
      }
    } else if (getNsValue !== null && getNttValue !== null && getNrppValue !== null) {
      params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue,
        Nr: getNrValue,
        Ns: getNsValue,
        Ntt: getNttValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns + '&Ntt=' + params.Ntt;
    } else if (getNttValue !== null && getNrppValue !== null) {
      params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue !== null ? getNrppValue : nrpp,
        Nr: getNrValue,
        Ntt: getNttValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ntt=' + params.Ntt;
    } else if (getNsValue !== null && getNrppValue !== null) {
      params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue !== null ? getNrppValue : nrpp,
        Nr: getNrValue,
        Ns: getNsValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns;
    } else if (getNsValue !== null && getNttValue !== null) {
      params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue !== null ? getNrppValue : nrpp,
        Nr: getNrValue,
        Ns: getNsValue,
        Ntt: getNttValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns + '&Ntt=' + params.Ntt;
    } else if (getNttValue !== null) {
      params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue !== null ? getNrppValue : nrpp,
        Nr: getNrValue,
        Ntt: getNttValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Ntt=' + params.Ntt;
    } else if (getNsValue !== null) {
      params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue !== null ? getNrppValue : nrpp,
        Nr: getNrValue,
        Ns: getNsValue
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Ns=' + params.Ns;
    } else if (getNrppValue !== null) {
      params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue !== null ? getNrppValue : nrpp,
        Nr: getNrValue,
      };
      newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp;
    } else {
      params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue !== null ? getNrppValue : nrpp,
        Nr: getNrValue,
      };
      newurl = params.pageURL + '?Nr=' + params.Nr;
    }
    // document.querySelector('.enhanced-select__label').innerHTML = getContentText;
    this.getUpdatedState(getContentText, getNsValue);
    this.props.getSLPPageData(params);
    window.history.pushState({ path: newurl }, '', newurl);
  }
  selectSortProductByNo(event) {
    const getContentValue = event.target.value;
    // const getContentText = event.target.options[event.target.selectedIndex].text;
    const getNsValue = localeInfoUtil.getParameterByName('Ns', getContentValue);
    const getNrppValue = localeInfoUtil.getParameterByName('Nrpp', getContentValue);
    const getNrValue = localeInfoUtil.getParameterByName('Nr', getContentValue);
    const getNttValue = localeInfoUtil.getParameterByName('Ntt', getContentValue);
    let newurl = '';
    let params = '';
    if (getNsValue) {
      if (getNttValue) {
        params = {
          pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
          No: '0',
          Nrpp: getNrppValue,
          Nr: getNrValue,
          Ns: getNsValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?No=' + params.No + '&Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns + '&Ntt=' + params.Ntt;
        this.setState({
          sortProductByNo: getNrppValue,
        });
      } else {
        params = {
          pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
          No: '0',
          Nrpp: getNrppValue,
          Nr: getNrValue,
          Ns: getNsValue
        };
        newurl = params.pageURL + '?No=' + params.No + '&Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns;
        this.setState({
          sortProductByNo: getNrppValue,
        });
      }
    } else if (getNttValue) {
        params = {
          pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
          No: '0',
          Nrpp: getNrppValue,
          Nr: getNrValue,
          Ntt: getNttValue
        };
        newurl = params.pageURL + '?No=' + params.No + '&Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ntt=' + params.Ntt;
        this.setState({
          sortProductByNo: getNrppValue,
        });
      } else {
        params = {
          pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
          No: '0',
          Nrpp: getNrppValue,
          Nr: getNrValue
        };
        newurl = params.pageURL + '?No=' + params.No + '&Nr=' + params.Nr + '&Nrpp=' + params.Nrpp;
        this.setState({
          sortProductByNo: getNrppValue,
        });
      }
    this.props.getSLPPageData(params);
    window.history.pushState({ path: newurl }, '', newurl);
  }
  sortByProductsContent() {
    const sortOptions = this.props.records && this.props.records.sortOptions ? this.props.records.sortOptions : [];
    const getNrValue = localeInfoUtil.getParameterByName('Nr', sortOptions[0].navigationState);
    const getNttValue = localeInfoUtil.getParameterByName('Ntt', sortOptions[0].navigationState);
    const getNsValue = this.state.nsVal !== null ? this.state.nsVal : null;
    const pageURL = typeof window !== 'undefined' && window ? window.location.pathname : '';
    if (getNsValue === null) {
      return (
        <div className="list-options__option">
          <span className="enhanced-select">
            {getNttValue === null ? <select id="show" name="show" onChange={(e) => { this.selectSortProductByNo(e); }} >
              <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=24`} selected={this.state.sortProductByNo === 24}> Show 24 Products</option>
              <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=60`} selected={this.state.sortProductByNo === 60}>Show 60 Products</option>
            </select> : <select id="show" name="show" onChange={(e) => { this.selectSortProductByNo(e); }} >
              <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=24&Ntt=${getNttValue}`} selected={this.state.sortProductByNo === 24}> Show 24 Products</option>
              <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=60&Ntt=${getNttValue}`} selected={this.state.sortProductByNo === 60}>Show 60 Products</option>
            </select>}
            <span className="enhanced-select__label">Show {this.state.sortProductByNo} Products&nbsp;</span><span className="icon enhanced-select__icon" /></span>
        </div >
      );
    }
    return (
      <div className="list-options__option">
        <span className="enhanced-select">
          {getNttValue === null ? <select id="show" name="show" onChange={(e) => { this.selectSortProductByNo(e); }}>
            <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=24&Ns=${getNsValue}`} selected={this.state.sortProductByNo === 24}>Show 24 Products</option>
            <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=60&Ns=${getNsValue}`} selected={this.state.sortProductByNo === 60}>Show 60 Products</option>
          </select> : <select id="show" name="show" onChange={(e) => { this.selectSortProductByNo(e); }}>
            <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=24&Ns=${getNsValue}&Ntt=${getNttValue}`} selected={this.state.sortProductByNo === 24}>Show 24 Products</option>
            <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=60&Ns=${getNsValue}&Ntt=${getNttValue}`} selected={this.state.sortProductByNo === 60}>Show 60 Products</option>
          </select>}
          <span className="enhanced-select__label">Show {this.state.sortProductByNo} Products&nbsp;</span><span className="icon enhanced-select__icon" /></span>
      </div>
    );
  }
  sortByAToZContent(nrpp) {
    return (
      <div className="list-options__option">
        <span className="enhanced-select">
          <select id="sort" name="sort" onChange={(e) => { this.selectAToZContentChange(e, nrpp); }}>
            {this.createOptionsSizeAToZ()}
          </select>
          <span className="enhanced-select__label">
            {this.state.sortProductByAlphabet}</span><span className="icon enhanced-select__icon" /></span>
      </div>
    );
  }
  createOptionsSizeAToZ() {
    const sortOptions = this.props.records && this.props.records.sortOptions ? this.props.records.sortOptions : [];
    const pageURL = typeof window !== 'undefined' && window ? window.location.pathname : '';
    return sortOptions.map((option, i) => {
      const getNsValue = localeInfoUtil.getParameterByName('Ns', option.navigationState);
      const getNrppValue = localeInfoUtil.getParameterByName('Nrpp', option.navigationState);
      const getNrValue = localeInfoUtil.getParameterByName('Nr', option.navigationState);
      const getNttValue = localeInfoUtil.getParameterByName('Ntt', option.navigationState);
      if (option.label === 'Sort by') {
        if (getNrppValue !== null && getNttValue !== null) {
          return (<option key={i} value={`${pageURL}&Nr=${getNrValue}&Nrpp=${getNrppValue}&Ntt=${getNttValue}`} selected={this.state.sortProductByAlphabet === option.label}>{option.label}
          </option>);
        } else if (getNrppValue !== null) {
          return (<option key={i} value={`${pageURL}&Nr=${getNrValue}&Nrpp=${getNrppValue}`} selected={this.state.sortProductByAlphabet === option.label}>{option.label}
          </option>);
        } else if (getNttValue !== null) {
          return (<option key={i} value={`${pageURL}&Nr=${getNrValue}&Ntt=${getNttValue}`} selected={this.state.sortProductByAlphabet === option.label}>{option.label}
          </option>);
        }
        return (<option key={i} value={`${pageURL}&Nr=${getNrValue}`} selected={this.state.sortProductByAlphabet === option.label}>{option.label}
        </option>);
      }
      if (getNrppValue !== null && getNttValue !== null) {
        return (<option key={i} value={`${pageURL}&Nr=${getNrValue}&Nrpp=${getNrppValue}&Ns=${getNsValue}&Ntt=${getNttValue}`} selected={this.state.sortProductByAlphabet === option.label}>{option.label}
        </option>);
      } else if (getNrppValue !== null) {
        return (<option key={i} value={`${pageURL}&Nr=${getNrValue}&Nrpp=${getNrppValue}&Ns=${getNsValue}`} selected={this.state.sortProductByAlphabet === option.label}>{option.label}
        </option>);
      } else if (getNttValue !== null) {
        return (<option key={i} value={`${pageURL}&Nr=${getNrValue}&Ns=${getNsValue}&Ntt=${getNttValue}`} selected={this.state.sortProductByAlphabet === option.label}>{option.label}
        </option>);
      }
      return (<option key={i} value={`${pageURL}&Nr=${getNrValue}&Ns=${getNsValue}`} selected={this.state.sortProductByAlphabet === option.label}>{option.label}
      </option>);
    });
  }
  render() {
    const totalNumRecs = this.props.records && this.props.records.totalNumRecs ? this.props.records.totalNumRecs : '';
    const nrpp = this.props.records && this.props.records.recsPerPage ? this.props.records.recsPerPage : '';
    return (
      <div className="product-list__options" id="product-list__options">
        <form className="list-options">
          <label className="list-options__label">{totalNumRecs}
            &nbsp;{ServiceUtil.getLabel(this.props.labels, 'global-clp-items-found-label')}</label>
          {this.props.records.totalNumRecs > 60 ? this.sortByProductsContent() : ''}
          {this.sortByAToZContent(nrpp)}
        </form>
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
export default connect(mapStateToProps, matchDispatchToProps)(ListOptions);
