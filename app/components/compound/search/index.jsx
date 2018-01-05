import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { getSearchPageData } from './actions';

class Search extends Component {

    constructor() {
        super();
        this.state = {
            searchOpenClass: ''
        };
        this.handleSearchFocus = this.handleSearchFocus.bind(this);
        this.handleSearchBlur = this.handleSearchBlur.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.generateSuggestions = this.generateSuggestions.bind(this);
        this.generateListItems = this.generateListItems.bind(this);
    }
    handleSearchFocus() {
        this.setState({ searchOpenClass: 'is-open' });
    }
    handleSearchBlur() {
        this.setState({ searchOpenClass: '' });
    }
    handleSearchInput(e) {
        const searchQuery = e.target.value;
        if (searchQuery) this.props.getSearchPageData(e.target.value);
    }

    generateSuggestions(dimensionGroup) {
        const suggestion = [];

        suggestion.push(<h4 >{dimensionGroup.displayName}</h4>);
        suggestion.push(<hr />);
        suggestion.push(this.generateListItems(dimensionGroup.dimensionSearchValues));
        return (
            suggestion
        );
    }
    generateListItems(dimensionSearchValues) {
        // is-selected ----li class
        return (
          <ul className="nav-list">
            {dimensionSearchValues.map(dimensionSearch => <li className="nav-list__item" ><Link to={`/cat${dimensionSearch.navigationState}`}>{dimensionSearch.ancestors.map(curr => curr.label + ' > ')} <span className="text-highlight">{dimensionSearch.label}</span></Link></li>)}
          </ul>
        );
    }
    render() {
        const suggestionLabel = this.props.searchData.length ? this.props.searchData[0].autoSuggest[0].title : null;
        const dimensionSearchGroups = this.props.searchData.length ? this.props.searchData[0].autoSuggest[0].dimensionSearchGroups : null;
        return (
          <form className={`search-bar fly-out ${this.state.searchOpenClass}`} action="" method="post" onFocus={this.handleSearchFocus} onBlur={this.handleSearchBlur} >
            <input type="search" className={`search-bar__input ${this.state.searchOpenClass}`} onChange={this.handleSearchInput} placeholder="Search..." />
            <input className="search-bar__submit icon icon--search-grey" type="submit" />
            <div className="search-bar__suggestions fly-out__content" style={{ position: 'relative' }}>{/* style={{ position: 'relative' }} needs to be removed*/}
              <div data-endeca-auto-suggest="results">
                <nav>
                  <p>{suggestionLabel}</p>
                  {dimensionSearchGroups ? dimensionSearchGroups.map(dimensionGroup => this.generateSuggestions(dimensionGroup)) : null}
                </nav>
              </div>
            </div>
          </form>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        searchData: state.search.searchData
    };
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ getSearchPageData }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Search);
