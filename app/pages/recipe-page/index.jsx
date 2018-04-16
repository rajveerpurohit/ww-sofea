import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FiveWays from '../content/FiveWays';
import Article from '../content/Article';
import Howto from '../content/Howto';
import Look from '../content/Look';
import Lookbook from '../content/Lookbook';
import Recipe from '../content/Recipe';
import { getRecipePageData, getLeftNavData } from './actions';
import { addItemToCart, removeItemFromCart, getUserAddresses, createNewShoppingList, addItemToShoppingList } from '../../components/compound/cart-action-panel/actions';
import { getProductInventoryDetails } from '../pdp/actions';
import { loader } from '../../actions/common';
import { postDeliveryArea } from '../../components/basic/delevery-model/actions';
import { SEOTags } from '../../utils/seoUtils';

class RecipePage extends Component {
  static need = [
    getRecipePageData,
    getLeftNavData
  ]
  constructor(props) {
    super(props);
    this.renderPage = this.renderPage.bind(this);
  }
  renderPage() {
    const recipeData = _.get(this.props, 'recipeData', {});
    const contentAside = _.get(this.props, 'contentAside', {});
    const DeliveryLocation = _.get(this.props, 'DeliveryLocation', {});
    const { user, currentUser, DeliveryAreaData } = this.props;

    if (recipeData && recipeData.type) {
      switch (recipeData.type) {
        case 'FiveWays': return <FiveWays contentData={recipeData} contentAside={contentAside} />;
        case 'Recipe': return (<Recipe
          contentData={recipeData}
          contentAside={contentAside}
          user={user}
          currentUser={currentUser}
          loader={this.props.loader}
          addItemToCart={this.props.addItemToCart}
          DeliveryAreaData={DeliveryAreaData}
          DeliveryLocation={DeliveryLocation}
          postDeliveryArea={this.props.postDeliveryArea}
          removeItemFromCart={this.props.removeItemFromCart}
          getProductInventoryDetails={this.props.getProductInventoryDetails}
        />);
        case 'HowTos': return <Howto contentData={recipeData} />;
        case 'look': return <Look contentData={recipeData} />;
        case 'LookBook': return <Lookbook contentData={recipeData} />;
        case 'Article': return <Article contentData={recipeData} contentAside={contentAside} />;
        default: return <Recipe contentData={recipeData} />;
      }
    }
    return null;
  }
  render() {
    const SEOTagsData = _.get(this.props, 'SEOTags', {});
    return (
      <div>
        {!_.isEmpty(SEOTagsData) &&
          <SEOTags
            title={SEOTagsData.title}
            metaKeywords={SEOTagsData.SEOTagsData}
            metaDescription={SEOTagsData.metaDescription}
          />
        }
        {this.renderPage()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipeData: state.recipePage.recipeData,
    contentAside: state.recipePage.leftNav,
    DeliveryLocation: state.deliveryDetails.deliveryLocation,
    // DeliveryAreaData: state.deliveryDetails.deliveryArea,
    DeliverAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', []),
    currentUser: state.clp.currentUser,
    user: state.user,
    SEOTags: state.common.seo.SEOTags.recipe || {}
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProductInventoryDetails,
    addItemToCart,
    removeItemFromCart,
    getUserAddresses,
    createNewShoppingList,
    addItemToShoppingList,
    loader,
    postDeliveryArea
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(RecipePage);
