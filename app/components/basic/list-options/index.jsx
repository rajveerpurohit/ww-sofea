import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCLPPageData } from '../../../pages/clp/actions';

// import PropTypes from 'prop-types';
// import axios from 'axios';
// import { Link } from 'react-router';


class ListOptions extends Component {
  constructor(props) {
    super(props);
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
  }
  // componentDidUpdate() {
  //   console.log(this._debugID);
  //   if (typeof window !== 'undefined' && window) {
  //     if (window.location.href.indexOf('?') === -1) {
  //       this.setState({
  //         sortProductByAlphabet: 'Sort by',
  //         sortProductByNo: 60

  //       });
  //     }
  //   }
  // }
  getUpdatedState(getContentText, getNsValue) {
    this.setState({
      sortProductByAlphabet: getContentText,
      nsVal: getNsValue
    });
  }
  getParameterByName(name, url) {
    if (typeof window !== 'undefined' && window) {
      if (!url) url = window.location.pathname;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return results[2].replace(/\+/g, ' ');
  }
  selectAToZContentChange(event, nrpp) {
    const getContentValue = event.target.value;
    const getContentText = event.target.options[event.target.selectedIndex].text;
    const getNsValue = this.getParameterByName('Ns', getContentValue);
    const getNrValue = this.getParameterByName('Nr', getContentValue);
    // const getNrppValue = this.getParameterByName('Nrpp', getContentValue);
    const params = {
      pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
      No: '0',
      Nrpp: nrpp,
      Nr: getNrValue,
      Ns: getNsValue
    };
    // document.querySelector('.enhanced-select__label').innerHTML = getContentText;
    const newurl = params.pageURL + '?Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns;
    this.getUpdatedState(getContentText, getNsValue);
    this.props.getCLPPageData(params);
    window.history.pushState({ path: newurl }, '', newurl);
  }
  selectSortProductByNo(event) {
    const getContentValue = event.target.value;
    // const getContentText = event.target.options[event.target.selectedIndex].text;
    const getNsValue = this.getParameterByName('Ns', getContentValue);
    const getNrppValue = this.getParameterByName('Nrpp', getContentValue);
    const getNrValue = this.getParameterByName('Nr', getContentValue);
    if (getNsValue) {
      const params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue,
        Nr: getNrValue,
        Ns: getNsValue
      };
      const newurl = params.pageURL + '?No=' + params.No + '&Nr=' + params.Nr + '&Nrpp=' + params.Nrpp + '&Ns=' + params.Ns;
      this.setState({
        sortProductByNo: getNrppValue,
      });
      this.props.getCLPPageData(params);
      window.history.pushState({ path: newurl }, '', newurl);
    } else {
      const params = {
        pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
        No: '0',
        Nrpp: getNrppValue,
        Nr: getNrValue
      };
      const newurl = params.pageURL + '?No=' + params.No + '&Nr=' + params.Nr + '&Nrpp=' + params.Nrpp;
      this.setState({
        sortProductByNo: getNrppValue,
      });
      this.props.getCLPPageData(params);
      window.history.pushState({ path: newurl }, '', newurl);
    }
    // this.setState({
    //   value: e.target.value
    // });
    // if (typeof document !== 'undefined' && document && document.getElementById('show') !== null) {
    //         const optionVal = document.getElementById('show').selectedIndex;
    //          if (optionVal === 1) {
    //   // document.querySelector('.enhanced-select__label').innerHTML = 'Show 60 Products&nbsp;';
    //   document.getElementsByTagName('option')[optionVal].setAttribute('selected', 'selected');
    //   document.getElementsByTagName('option')[0].removeAttribute('selected', 'selected');
    //   this.props.getCLPPageData(params);
    //   // window.location.href = {`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}`}document.getElementById('selectbox').value;
    // } else {
    //   // document.querySelector('.enhanced-select__label').innerHTML = 'Show 24 Products&nbsp;';
    //   document.getElementsByTagName('option')[optionVal].setAttribute('selected', 'selected');
    //   document.getElementsByTagName('option')[1].removeAttribute('selected', 'selected');
    //   this.props.getCLPPageData(params);
    // }
    //     }
  }
  sortByProductsContent() {
    const sortOptions = this.props.records && this.props.records.sortOptions ? this.props.records.sortOptions : [];
    const getNrValue = this.getParameterByName('Nr', sortOptions[0].navigationState);
    const getNsValue = this.state.nsVal !== null ? this.state.nsVal : null;
    const pageURL = typeof window !== 'undefined' && window ? window.location.pathname : '';
    if (getNsValue === null) {
      return (
        <div className="list-options__option">
          <span className="enhanced-select">
            <select id="show" name="show" onChange={(e) => { this.selectSortProductByNo(e); }} data-js="enhance-select">
              <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=24`}>Show 24 Products</option>
              <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=60`} selected="selected">Show 60 Products</option>
            </select>
            <span className="enhanced-select__label">Show {this.state.sortProductByNo} Products&nbsp;</span><span className="icon enhanced-select__icon" /></span>
        </div>
      );
    }
    return (
      <div className="list-options__option">
        <span className="enhanced-select">
          <select id="show" name="show" onChange={(e) => { this.selectSortProductByNo(e); }} data-js="enhance-select">
            <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=24&Ns=${getNsValue}`}>Show 24 Products</option>
            <option value={`${pageURL}?No=0&Nr=${getNrValue}&Nrpp=60&Ns=${getNsValue}`} selected="selected">Show 60 Products</option>
          </select>
          <span className="enhanced-select__label">Show {this.state.sortProductByNo} Products&nbsp;</span><span className="icon enhanced-select__icon" /></span>
      </div>
    );
  }
  sortByAToZContent(nrpp) {
    return (
      <div className="list-options__option">
        <span className="enhanced-select">
          <select id="sort" name="sort" onChange={(e) => { this.selectAToZContentChange(e, nrpp); }} data-js="enhance-select">
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
      const getNsValue = this.getParameterByName('Ns', option.navigationState);
      const getNrppValue = this.getParameterByName('Nrpp', option.navigationState);
      const getNrValue = this.getParameterByName('Nr', option.navigationState);
      return option.label === 'Sort by' ? (<option key={i} value={`${pageURL}&Nr=${getNrValue}&Nrpp=${getNrppValue}`}>{option.label}
      </option>) : (<option key={i} value={`${pageURL}&Nr=${getNrValue}&Nrpp=${getNrppValue}&Ns=${getNsValue}`}>{option.label}
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
            &nbsp;Items Found</label>
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
  return bindActionCreators({ getCLPPageData }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ListOptions);
