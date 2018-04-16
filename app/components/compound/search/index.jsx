import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import cx from 'classnames';
import _ from 'lodash';

import {
  getSearchPageData,
  clearSearchData,
  incrementSuggetionIndex,
  decreamentSuggetionIndex,
  resetSuggetionIndex
} from './actions';

import { getSLPPageData } from '../../../pages/clp/actions';

import {
  VIEW_PORT_TYPE_MOBILE,
  SEARCH_AFTER_N_LATTERS,
  MOBILE_HEADER_OPTION_SEARCH
} from '../../../Constants';


class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchOpenClass: '',
      searchUrl: '',
      getAttributeIndex: 0
    };
    this.handleSearchFocus = this.handleSearchFocus.bind(this);
    this.handleSearchBlur = this.handleSearchBlur.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateSuggestions = this.generateSuggestions.bind(this);
    this.generateListItems = this.generateListItems.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getHighlightedString = this.getHighlightedString.bind(this);
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleSuggetionNavigation = this.handleSuggetionNavigation.bind(this);
  }

  componentWillMount() {
    this.handleSearchBar();
  }

  componentDidMount() {
    this.handleSearchBar();
    if (typeof window !== 'undefined' && window) {
      window.addEventListener('resize', () => { this.handleSearchBar(); });
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { viewportType, mobileNavHeaderStatus } = nextProps;

    if (viewportType === VIEW_PORT_TYPE_MOBILE && mobileNavHeaderStatus === MOBILE_HEADER_OPTION_SEARCH) {
      this.setState({ searchOpenClass: nextProps.searchOpenClass || '' });
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && window) {
      window.removeEventListener('resize', () => { this.handleSearchBar(); });
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  handleSearchBar() {
    this.timerSearchBar = setTimeout(() => {
      const { getSearchBarWidth } = this.props;

      if (_.isFunction(getSearchBarWidth) && this.searchBarNode) {
        this.searchBarNode.style.width = getSearchBarWidth();
      }
    }, 200);

    // if (typeof window !== 'undefined' && window) {
    //   if (document.getElementsByClassName('width-marker')[0]) {
    //     const navWidth = document.getElementsByClassName('width-marker')[0].offsetLeft;
    //     const searchFormWidth = document.getElementsByClassName('site-header__wrapper--navigation')[0].offsetWidth;
    //     const searchWidth = searchFormWidth - navWidth - 10;
    //     document.getElementsByClassName('search-bar')[0].style.width = searchWidth + 'px';
    //   }
    // }
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      const searchQuery = e.target.value;
      if (searchQuery !== '') {
        document.querySelector('#toSearch').click();
        this.props.clearSearchData();
        this.handleSearchBlur();
        e.target.value = '';
        if (this.props.resultItemClick) this.props.resultItemClick();
      }
    }
  }

  handleSearchFocus() {
    this.setState({ searchOpenClass: 'is-open' });
  }

  handleSearchBlur() {
    this.setState({ searchOpenClass: '' });
    document.activeElement.blur();
  }

  handleMouseHover(event, keyIndex) {
    this.props.resetSuggetionIndex(keyIndex);
    if (!event.target.classList.contains('is-selected')) {
      event.target.className += ' is-selected';
      this.setState({ getAttributeIndex: keyIndex });    
    
    }
  }

  handleMouseOut(event) {
    if (event.target.classList.contains('is-selected')) {
      event.target.className = event.target.className.replace(/\bis-selected\b/g, '');
    }
  }

  handleClick(e) {
    this.handleSearchBlur();
    this.handleMouseOut(e);
    e.stopPropagation();
    this.props.clearSearchData();
    document.getElementById('fldSearch').value = '';

    if (this.props.resultItemClick) this.props.resultItemClick();
  }

  handleSearchInput(e) {
    const searchQuery = e.target.value;
    if (searchQuery && searchQuery.length >= SEARCH_AFTER_N_LATTERS) {
      this.props.getSearchPageData(searchQuery);
    }

    const newurl = '/cat?Ntt=' + searchQuery + '&Dy=1';
    this.setState({ searchUrl: newurl });
  }

  handleSuggetionNavigation(evt) {
    const { activeSuggetionIndex } = this.props;
    const searchQuery = evt.target.value;
    const dimensionSearchGroups = _.get(this.props, 'searchData[0].autoSuggest[0].dimensionSearchGroups', null);
    let suggestionsLength = 0;
    let suggestionItems = [];

    if (!_.isEmpty(dimensionSearchGroups)) _.map(dimensionSearchGroups, dimension => suggestionsLength += dimension.dimensionSearchValues.length);


    if (!searchQuery) {
      switch (evt.keyCode) {
        case 9: // tab, hide the box
          this.handleSearchBlur();
          break;
        case 27: // escape, hide the box
          this.handleSearchBlur();
          break;
        default:
        // this.props.resetSuggetionIndex();
      }
    }

    if (suggestionsLength) {
      suggestionItems = document.querySelectorAll('.highlighted-item');
      _.map(suggestionItems, suggestion => suggestion.classList.remove('is-selected'));


      switch (evt.keyCode) {
        case 38: // up, select the previous item
          if (activeSuggetionIndex > 0) this.props.decreamentSuggetionIndex(this.state.getAttributeIndex);
          break;
        case 40: // down, select the next item
          if (activeSuggetionIndex < suggestionsLength) this.props.incrementSuggetionIndex(this.state.getAttributeIndex);
          break;
        case 9: // tab, hide the box
          this.props.resetSuggetionIndex();
          this.handleSearchBlur();
          break;
        case 13: // return, select the highlighted item
          // this.props.incrementSuggetionIndex();
          break;
        case 27: // escape, hide the box
          this.handleSearchBlur();
          break;
        default:
        // this.props.resetSuggetionIndex();

      }
      if (activeSuggetionIndex < suggestionsLength) suggestionItems[activeSuggetionIndex].classList.toggle('is-selected');
    }
  }

  handleSubmit(e) {
    const serchValue = document.getElementById('fldSearch').value;

    if (serchValue !== '') {
      e.preventDefault();
      document.querySelector('#toSearch').click();
      this.handleSearchBlur();
      document.getElementById('fldSearch').value = '';
      this.props.clearSearchData();
    }
  }

  generateSuggestions(dimensionGroup) {
    const suggestion = [];

    suggestion.push(<h4>{dimensionGroup.displayName}</h4>);
    suggestion.push(<hr />);
    suggestion.push(this.generateListItems(dimensionGroup.dimensionSearchValues));
    return suggestion;
  }

  getHighlightedString(searchItem) {
    const serchValue = document.getElementById('fldSearch').value;
    let inputText = serchValue.trim().toLowerCase();
    const highlighted = searchItem.toLowerCase();

    if (highlighted.indexOf(inputText) !== -1) {
      const index = highlighted.indexOf(inputText);
      const prefix = searchItem.substring(0, index);
      const suffix = searchItem.substring(index + inputText.length);
      inputText = searchItem.substr(index, inputText.length);
      return (<span>{prefix}<span className="text-highlight">{inputText}</span>{suffix}</span>);
    }
  }

  generateListItems(dimensionSearchValues) {
    return (
      <ul className="nav-list">
        {dimensionSearchValues.map((dimensionSearch, keyIndex) => (
          <li
            className="nav-list__item highlighted-item"
            onMouseEnter={e => this.handleMouseHover(e, keyIndex)}
            onMouseOut={e => this.handleMouseOut(e)}
            onClick={e => this.handleClick(e)}
            key={keyIndex}
            data-key={keyIndex}
          >
            <Link to={`/cat${dimensionSearch.navigationState}`}>
              {dimensionSearch.ancestors.map(curr => curr.label + ' > ')} {dimensionSearch && dimensionSearch.label ? this.getHighlightedString(dimensionSearch.label) : ''}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleSearchBlur();
    }
  }
  render() {
    const suggestionLabel = _.get(this.props, 'searchData[0].autoSuggest[0].title', null);
    const dimensionSearchGroups = _.get(this.props, 'searchData[0].autoSuggest[0].dimensionSearchGroups', null);
    const searchBarClasses = cx(
      'search-bar',
      'fly-out',
      this.state.searchOpenClass
    );


    return (
      <div ref={this.setWrapperRef}>
        <form
          className={searchBarClasses}
          id="frmSiteSearch"
          action="/cat"
          method="GET"
          autoComplete="off"
        >
          <Link
            to={this.state.searchUrl}
            style={{ display: 'none' }}
            id="toSearch"
          // ref={node => (document.querySelector('#toSearch') = findDOMNode(node))}
          />
          <input type="hidden" value="default" />
          <input
            id="fldSearch"
            type="search"
            className="search-bar__input "
            onChange={this.handleSearchInput}
            placeholder="Search..."
            onKeyPress={this.handleEnter}
            // ref={node => (document.getElementById('fldSearch'))}
            onFocus={e => this.handleSearchFocus(e)}
            autoComplete="off"
            onKeyDown={evt => this.handleSuggetionNavigation(evt)}
          />
          <input className="search-bar__submit icon icon--search-grey" onClick={this.handleSubmit} />
          <div className="search-bar__suggestions fly-out__content">
            <div>
              <nav>
                <p>{suggestionLabel}</p>
                {dimensionSearchGroups && dimensionSearchGroups.map(this.generateSuggestions)}
              </nav>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchData: state.search.searchData,
    activeSuggetionIndex: state.search.activeSuggetionIndex
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getSearchPageData,
    getSLPPageData,
    clearSearchData,
    incrementSuggetionIndex,
    decreamentSuggetionIndex,
    resetSuggetionIndex
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Search);
