import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import FiveWays from './sub-contents/FiveWays';
import Article from './sub-contents/Article';
import Howto from './sub-contents/Howto';
import Look from './sub-contents/Look';
import Lookbook from './sub-contents/Lookbook';
import Recipe from './sub-contents/Recipe';

import { getRecipePageData } from './actions';

class RecipePage extends Component {
  static need = [
    getRecipePageData
  ]

  render() {
    const recipeData = _.get(this.props, 'recipeData', {});

    switch (recipeData.type) {
      case 'FiveWays': return <FiveWays contentData={recipeData} />;
      case 'Recipe': return <Recipe contentData={recipeData} />;
      case 'HowTos': return <Howto contentData={recipeData} />;
      case 'look': return <Look contentData={recipeData} />;
      case 'LookBook': return <Lookbook contentData={recipeData} />;
      case 'article': return <Article contentData={recipeData} />;
      default : return <Recipe contentData={recipeData} />;
    }
  }
}

const mapStateToProps = state => ({ recipeData: state.recipePage.recipeData });

export default connect(mapStateToProps)(RecipePage);
