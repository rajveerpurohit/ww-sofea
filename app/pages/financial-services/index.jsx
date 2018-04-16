import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import ImageLazyLoad from '../../components/basic/image/ImageLazyLoad';
import { getLandingPageData } from './actions';
import Content from './content';
import SideMenu from '../../components/sections/SideMenu';

class FinancialServices extends Component {
  // static need = [getLandingPageData];
  componentWillMount() {
    if (this.props.params.contentId) {
      this.props.getLandingPageData(this.props.params.contentId);
    } else {
      this.props.getLandingPageData();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.contentId !== this.props.params.contentId) {
      this.props.getLandingPageData(nextProps.params.contentId);
    }
  }
  render() {
    const wfsData = _.get(this.props.landingPageData, 'wfsHomeContent.wfs', {});
    const wfsDataContent = _.get(this.props.landingPageData, 'contents', {});
    if (wfsData && wfsData.bigbanner) {
      return (
        <div className="grid grid--space-y page-layout">
          <div className="page-layout__aside">
            <SideMenu pageType={this.props.route.pageCode} />
          </div>
          <div className="page-layout__content">
            <h1 className={wfsData.headingCss}>{wfsData.heading}</h1>
            <div className="grid">
              <div className="grid__half--medium">
                <Link to={`/wfs/${wfsData.bigbanner.contentId}`}>
                  <ImageLazyLoad
            payload={{
              url: wfsData.bigbanner.img,
              alt: wfsData.bigbanner.alt,
              className: wfsData.bigbanner.imgcss,
            }}
            loader={
              <div className="ajax-spinner-container">
                <span className="product-card__loading-icon loading loading--dark loading--large" />
              </div>
            }
                  />
                </Link>
              </div>
              <div className="grid__half--medium">
                <div className="grid">
                  <div className="grid__half--small">
                    <Link to={`/wfs/${wfsData.smallbanner1.contentId}`}>
                      <ImageLazyLoad
                payload={{
                  url: wfsData.smallbanner1.img,
                  alt: wfsData.smallbanner1.alt,
                  className: wfsData.smallbanner1.imgcss,
                }}
                loader={
                  <div className="ajax-spinner-container">
                    <span className="product-card__loading-icon loading loading--dark loading--large" />
                  </div>
                }
                      />
                    </Link>
                  </div>
                  <div className="grid__half--small">
                    <Link to={`/wfs/${wfsData.smallbanner2.contentId}`}>
                      <ImageLazyLoad
                payload={{
                  url: wfsData.smallbanner2.img,
                  alt: wfsData.smallbanner2.alt,
                  className: wfsData.smallbanner2.imgcss,
                }}
                loader={
                  <div className="ajax-spinner-container">
                    <span className="product-card__loading-icon loading loading--dark loading--large" />
                  </div>
                }
                      />
                    </Link>
                  </div>
                </div>
                <div className="grid grid--space-y">
                  <div className="grid__half--small">
                    <Link to={`/wfs/${wfsData.smallbanner3.contentId}`}>
                      <ImageLazyLoad
                payload={{
                  url: wfsData.smallbanner3.img,
                  alt: wfsData.smallbanner3.alt,
                  className: wfsData.smallbanner3.imgcss,
                }}
                loader={
                  <div className="ajax-spinner-container">
                    <span className="product-card__loading-icon loading loading--dark loading--large" />
                  </div>
                }
                      />
                    </Link>
                  </div>
                  <div className="grid__half--small">

                    <Link to={`/${wfsData.smallbanner4.contentId}`}>
                      <ImageLazyLoad
                payload={{
                  url: wfsData.smallbanner4.img,
                  alt: wfsData.smallbanner4.alt,
                  className: wfsData.smallbanner4.imgcss,
                }}
                loader={
                  <div className="ajax-spinner-container">
                    <span className="product-card__loading-icon loading loading--dark loading--large" />
                  </div>
                }
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid--space-y">
              <p className="text-intro">{wfsData.description}</p>
            </div>
          </div>
        </div>
      );
    }
    if (wfsDataContent && wfsDataContent.displayName) {
      if (this.props.user.isLoggedIn && wfsDataContent.displayName === 'about-wfs') {
        return <Content contentData={wfsDataContent.SimpleHTML} pageType="myAccount" />;
      } else if (!this.props.user.isLoggedIn && wfsDataContent.displayName === 'about-wfs') {
        browserHistory.push({ pathname: '/login' });
      } else {
        return <Content contentData={wfsDataContent.SimpleHTML} pageType={this.props.route.pageCode} />;
      }
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    landingPageData: state.financialServicesReducer.wfsData
  };
};

export default connect(mapStateToProps, { getLandingPageData })(FinancialServices);
