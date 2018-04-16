import React, { Component } from 'react';
import { connect, browserHistory } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Link } from 'react-router';
import { returnCartridge } from '../../utils/homePageUtils';
import NoResultsFound from '../../pages/no-results-found';
import ListOptions from '../../components/basic/list-options';
import Pagination from '../../components/basic/pagination';
import BreadCrumb from '../../components/basic/breadcrumb';
import RefineMentMenu from './refinement-menu';
import { getCLPPageData, getCurrentUser, getSLPPageData } from './actions';
import ServiceUtil from '../../services/serviceUtil';
// import { getSLPPageData } from './actions';
import ClpContainer from './clp-container';
import { TEMPLATE_TYPE } from '../../Constants';
import { SEOTags } from '../../utils/seoUtils';
import { tagProductClicks } from '../../gtm/gtmActions';


class CLP extends Component {

  static need = [
    // getCLPPageData
    getSLPPageData
  ]

  constructor(props) {
    super(props);

    this.state = {
      active: null
    };
    this.OnPromotion = '';
    this.hasCategory = false;
    this.guidedNavigation = this.guidedNavigation.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentUser(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    const { refreshClpData, params } = nextProps;
    if (refreshClpData) {
      nextProps.getSLPPageData(params);
    }
  }

  handleClick(i) {
    return (e) => {
      const active = this.state.active === i ? null : i;
      this.setState({ active });
    };
  }
  collpsedClass(i) {
    return this.state.active === i ? 'is-collapsed' : '';
  }
  liClass(i) {
    return this.state.active === i ? 'active' : 'inactive';
  }
  guidedNavigation(getrefinementData) {
    const breadCrumbData = this.props.clpData && this.props.clpData[0] && this.props.clpData[0].secondaryContent && this.props.clpData[0].secondaryContent[0] ? this.props.clpData[0].secondaryContent[0] : '';
    if (getrefinementData.navigation && getrefinementData.navigation.length > 0 || getrefinementData.recipesNavigation && getrefinementData.recipesNavigation.length > 0 || getrefinementData.articleNavigation && getrefinementData.articleNavigation.length > 0 || getrefinementData.lookBookNavigation && getrefinementData.lookBookNavigation.length > 0) {
      return (
        <div className="grid grid--tight-y">
          <div className="product-list__filters" >
            <div className="accordion accordion--chrome accordion--group" >
              <div className="accordion__segment--chrome" >
                {getrefinementData.navigation[0].dimensionName === 'OnPromotion' || getrefinementData.navigation[0].dimensionName === 'Category' ?
                  <h4 className={`text-caps accordion__toggle--chrome accordion__toggle--line ${this.collpsedClass(0)}`} data-js="accordion-toggle" onClick={this.handleClick(0)}>
                    {
                      breadCrumbData.categoryDimensions && breadCrumbData.categoryDimensions[0] && breadCrumbData.categoryDimensions[0].label
                        ? <div>{ServiceUtil.getLabel(this.props.labels, 'global-clp-show-label')} {breadCrumbData.categoryDimensions[0].label.substring(0, breadCrumbData.categoryDimensions[0].label.indexOf('_'))}</div>
                        : <div>{ServiceUtil.getLabel(this.props.labels, 'global-clp-show-me-label')}</div>
                    }
                  </h4> : ''}
                {
                  getrefinementData.navigation ? getrefinementData.navigation.map((navItem) => {
                    if (navItem.name === 'OnPromotion') {
                      // var OnPromotion = navItem;

                      this.OnPromotion = navItem;
                    }
                    if (navItem.displayName === 'Category') {
                      // var hasCategory = true;

                      this.hasCategory = true;
                    }
                    return null;
                  }) : null
                }
                {
                  getrefinementData.navigation ? getrefinementData.navigation.map((navItem, index) => {
                    return (<RefineMentMenu key={index} navItemData={navItem} active={this.state.active} OnPromotion={this.OnPromotion} hasCategory={this.hasCategory} breadCrumbData={breadCrumbData} />);
                  }) : null
                }
                {
                  getrefinementData.recipesNavigation ? getrefinementData.recipesNavigation.map((navItem, index) => {
                    return (<RefineMentMenu key={index} navItemData={navItem} breadCrumbData={breadCrumbData} />);
                  }) : null
                }
                {
                  getrefinementData.articleNavigation ? getrefinementData.articleNavigation.map((navItem, index) => {
                    return (<RefineMentMenu key={index} navItemData={navItem} breadCrumbData={breadCrumbData} />);
                  }) : null
                }
                {
                  getrefinementData.lookBookNavigation ? getrefinementData.lookBookNavigation.map((navItem, index) => {
                    return (<RefineMentMenu key={index} navItemData={navItem} breadCrumbData={breadCrumbData} />);
                  }) : null
                }
                {/* </ul> */}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
  searchresultCrumbs(recordsData, serachCrumbs) {
    const totalNumRecs = recordsData.totalNumRecs;
    return serachCrumbs.map((searchCrumb, index) => {
      return (
        <div className="grid product-list__srp-info" >
          <span className="text-xsmall">{ServiceUtil.getLabel(this.props.labels, 'global-clp-your-search-for-label')}<strong>{` "${searchCrumb.terms}" `}</strong>{ServiceUtil.getLabel(this.props.labels, 'global-clp-returned-label')}
            <span className="strong"> {`${totalNumRecs} ${ServiceUtil.getLabel(this.props.labels, 'global-clp-results-for-related-items-label')}`}</span>
          </span>
          <hr className="hr--light" />
          <div className="heading--4 font-graphic text-caps">
            {ServiceUtil.getLabel(this.props.labels, 'global-clp-products-label')}
          </div>
        </div>
      );
    });
  }
  slpDataPage(recordsData, breadCrumbData, navigationData, refinementData, productType) {
    const serachCrumbs = _.get(this.props, 'clpData[0].secondaryContent[0].searchCrumbs', []);
    const miniCartData = _.get(this.props, 'miniCartData.miniCartData', {});
    const { user, currentUser } = this.props;
    return (<div>
      {<BreadCrumb breadcrumbs={breadCrumbData} />}
      <div className="grid grid--tight-y">
        <div className="product-list__filters">
          {this.guidedNavigation(refinementData)}
        </div>
        <div className="product-list__list">
          <ListOptions clpProps={navigationData} records={recordsData} getselectedContent={this.onSelectContent} labels={this.props.labels} />
          {this.searchresultCrumbs(recordsData, serachCrumbs)}
          <ClpContainer
            pageTamlateType={TEMPLATE_TYPE[1]}
            imageContentProp={recordsData.records}
            productType={productType}
            user={user}
            currentUser={currentUser}
            cartDetails={miniCartData}
            tagProductClicks={this.props.tagProductClicks}
          />
        </div>

        <div className="grid lazyload-container landing__row" />
        <div className="grid" />
      </div>
      <div className="grid grid--space-y">
        {refinementData.navigation && refinementData.navigation.length > 0 ?
          <Pagination
            paginationData={recordsData}
            labels={this.props.labels}
          /> : ''}
      </div>
    </div>
    );
  }
  render() {
    const templateTypes = _.get(this.props, 'clpData[0].mainContent[0].templateTypes[0]', '');
    const breadCrumbData = _.get(this.props, 'clpData[0].secondaryContent[0]', '');
    const recordsData = _.get(this.props, 'clpData[0].mainContent[0].contents[0]', []);
    const productType = _.get(this.props, 'clpData[0].mainContent[0].contents[0].productType', '');
    const refinementData = _.get(this.props, 'clpData[0].secondaryContent[1].contents[0]', '');
    let recipesData = [];
    templateTypes !== 'Banner' ? [] : recipesData = _.get(this.props, 'clpData[0].mainContent[0].contents[0].main', []);
    const navigationData = _.get(this.props, 'clpData[0].secondaryContent[1].contents[0].navigation', []);
    const { user, currentUser } = this.props;
    const locationPath = typeof window !== 'undefined' && window ? window.location.href : '';
    const totalNumRecs = recordsData.totalNumRecs;
    const detailPageURL = _.get(recordsData, 'records[0].detailPageURL', '');
    const miniCartData = _.get(this.props, 'miniCartData.miniCartData', {});
    const SEOTagsData = _.get(this.props, 'SEOTags', {});

    if (locationPath.indexOf('Ntt') !== -1) {
      return (
        <div className="main-page">
          {!_.isEmpty(SEOTagsData) &&
            <SEOTags
              title={SEOTagsData.title}
              metaKeywords={SEOTagsData.SEOTagsData}
              metaDescription={SEOTagsData.metaDescription}
            />
          }
          {totalNumRecs !== 0 ? this.slpDataPage(recordsData, breadCrumbData, navigationData, refinementData, productType) : <NoResultsFound />}
        </div>
      );
    }
    return (
      <div className="main-page">
        {!_.isEmpty(SEOTagsData) &&
          <SEOTags
            title={SEOTagsData.title}
            metaKeywords={SEOTagsData.SEOTagsData}
            metaDescription={SEOTagsData.metaDescription}
          />
        }
        <Link id="pdp-link" to={detailPageURL} style={{ display: 'none' }} />
        <BreadCrumb breadcrumbs={breadCrumbData} />
        <div className="grid grid--tight-y">
          {
            refinementData && refinementData.navigation && refinementData.navigation.length != 0 ?
              <div className="product-list__filters">
                {this.guidedNavigation(refinementData)}
              </div>
              : null
          }
          {templateTypes !== 'Banner' ? recordsData.records && recordsData.records[0] && recordsData.records[0].attributes.Type === 'recipe' ? (
            <div className="grid">
              <ClpContainer
                pageTamlateType={TEMPLATE_TYPE[1]}
                imageContentProp={recordsData.records}
                productType={productType}
                user={user}
                currentUser={currentUser}
                refinementData={refinementData}
                cartDetails={miniCartData}
                tagProductClicks={this.props.tagProductClicks}
              />
            </div>
          ) : (
              // <div className={refinementData ? 'grid grid--space-y' : 'grid'} >
              <div className="product-list__list">
                <ListOptions clpProps={navigationData} records={recordsData} getselectedContent={this.onSelectContent} labels={this.props.labels} />
                <ClpContainer
                  pageTamlateType={TEMPLATE_TYPE[1]}
                  imageContentProp={recordsData.records}
                  productType={productType} user={user}
                  currentUser={currentUser}
                  refinementData={refinementData}
                  nonDelieverable={this.props.nonDelieverable}
                  cartDetails={miniCartData}
                  tagProductClicks={this.props.tagProductClicks}
                />
              </div>
              // </div>
            ) : (
              <div className="grid grid--space-y remove-it">{/* need to remove remove-it class */}
                {returnCartridge(recipesData)}
              </div>
            )}
          <div className="grid lazyload-container landing__row" />
          <div className="grid" />
        </div>
        <div className="grid grid--space-y">
          {
            refinementData.navigation && refinementData.navigation.length > 0 ? <Pagination paginationData={recordsData} labels={this.props.labels} /> : ''
          }
        </div>

        {
          (recordsData && recordsData.records && recordsData.records.length === 1)
            ?
            typeof document !== 'undefined' && typeof window !== 'undefined' && window && document.querySelector('#pdp-link') ?
              document.querySelector('#pdp-link').click()
              : null

            : null
        }
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    // clpData: state.clp.clpData,
    clpData: state.clp.SLPData,
    nonDelieverable: state.clp.nonDelieverable,
    user: state.user,
    currentUser: state.clp.currentUser,
    miniCartData: state.headerReducer.miniCartReducer,
    refreshClpData: state.clp.refreshClpData,
    labels: state.labels.labelsAndErrorMessages.CLP,
    SEOTags: state.common.seo.SEOTags.clp
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCLPPageData, getCurrentUser, getSLPPageData, tagProductClicks }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(CLP);
