import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Image from '../../basic/Image';
import { resetFooterAccordianStatus } from '../Header/actions';
// import { resetFooterAccordianStatus } from './actions';
import _ from 'lodash';

class Footer extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   active: null
    // };
    this.generateLinkcategory = this.generateLinkcategory.bind(this);
    this.generateLinks = this.generateLinks.bind(this);
    this.generateFooterLegal = this.generateFooterLegal.bind(this);
    this.generateFooterRewards = this.generateFooterRewards.bind(this);
    this.generateJoinRewards = this.generateJoinRewards.bind(this);
    this.generateCards = this.generateCards.bind(this);
  }

  componentDidMount() {
    this.props.resetFooterAccordianStatus(0);
  }
  handleClick(i) {
    // console.log('clicek');
    if (this.props.viewportType === 'desktop') {
      return '';
    }
    return () => {
      const active = this.props.active === i ? null : i;
      this.props.resetFooterAccordianStatus(active);
    };
  }
  display(i) {
    if (this.props.viewportType === 'desktop') {
      return '';
    }
    return this.props.active === i ? 'block' : 'none';
  }
  collpsedClass(i) {
    if (this.props.viewportType === 'desktop') {
      return '';
    }
    return this.props.active === i ? '' : 'is-collapsed';
  }
  generateLinkcategory(categoryData) {
    return categoryData.map((category, i) => {
      const categoryObj = category[Object.keys(category)[0]];
      // let displayName = categoryObj.displayName !== 'Follow us on'? `<span className="icon icon--down-dark inline-block-hidden--mobi-min" />`;
      if (categoryObj.displayName !== 'FOLLOW US ON') {
        // console.log('generateAccordionHeadingBtn');
        // return <span className="icon icon--down-dark inline-block-hidden--mobi-min" />;
        return (
          <div className="accordion__segment site-footer__link-bucket" key={i}>
            <div className={`accordion__toggle heading heading--3 site-footer__heading ${this.collpsedClass(i)}`} onClick={this.handleClick(i)}>
              {categoryObj.displayName}<span className="icon icon--down-dark inline-block-hidden--mobi-min" />
            </div>
            <div className="accordion__content accordion__content--animated" style={{ display: this.display(i) }}>
              <div className="footer__box">{this.generateLinks(categoryObj.DATA)}</div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="accordion__segment site-footer__link-bucket" key={i}>
            <div className="accordion__toggle heading heading--3 site-footer__heading">
              {categoryObj.displayName}
            </div>
            <div className="accordion__content accordion__content--animated">
              <div className="footer__box">{this.generateLinks(categoryObj.DATA)}</div>
            </div>
          </div>
        );
      }
    });
  }
  // {this.generateAccordionHeadingBtn(categoryObj.displayName)}
  generateAccordionHeadingBtn(displayName) {
    // console.log('generateAccordionHeadingBtn', displayName);
    if (displayName !== 'FOLLOW US ON') {
      // console.log('generateAccordionHeadingBtn');
      return <span className="icon icon--down-dark inline-block-hidden--mobi-min" />;
      //
    }
    return '';
  }

  generateLinks(linksData) {
    return linksData.map((link, index) => {
      if (link.displayType === 'text') {
        const props = {
          to: link.url,
          className: 'nav-list__link'
        };

        // TODO: better approach for external URL
        if (link.displayName === 'Careers') {
          props.target = '_blank';
        }

        return (
          <li className="nav-list__item" key={index}>
            <Link {...props}>{link.displayName}</Link>
          </li>
        );
      }
      const className = 'icon icon--' + link.displayName.toLowerCase() + '-dark';
      return (
        <Link to={link.url} className="social-icon__link" target="_blank" key={index}>
          <span className={className} />
          <span className="inline-block-hidden--mobi-max">{link.displayName}</span>
        </Link>
      );
    });
  }

  generateFooterLegal(footerLegal) {
    const secure = footerLegal[0].secure;
    const policy = footerLegal[3].policy;
    const payments = footerLegal[1].payments;
    if (secure && policy && payments) {
      return (
        <div className="grid footer__end">
          <div className="grid__half--large">
            <Link to={secure.DATA[0].url} className="display-inline-block" style={{ marginRight: 24 }}>
              <Image
                payload={{
                  url: secure.DATA[0].imageURL,
                  alt: secure.DATA[0].displayName,
                  className: ''
                }}
              />
              {/* <img src={`${this.state.atgUrl}${secure.imageURL}`} alt={secure.displayName} /> */}
            </Link>
            <Image
              payload={{
                url: payments.DATA[0].imageURL,
                alt: payments.DATA[0].displayName,
                className: ''
              }}
            />
            {/* <img src={`${this.state.atgUrl}${payments.imageURL}`} alt={payments.displayName} /> */}
          </div>
          <div className="grid__half--large">
            <p>
              <span className="text-part">{this.props.footerData.footer_legal[2].copyright.DATA[0].displayName}</span>
              {/* <Link to={terms.DATA[0].url} className="text-part">{terms.DATA[0].displayName}</Link> */}
              <Link to={policy.DATA[0].url} className="text-part">
                {policy.DATA[0].displayName}
              </Link>
            </p>
          </div>
        </div>
      );
    }
    return null;
  }

  generateFooterRewards(footerRewards) {
    return (
      <div className="grid">
        <div className="site-footer__link-bucket link-bucket--logo">
          <Link to={footerRewards[0].footerLogo.DATA[0].url} className={footerRewards[0].footerLogo.DATA[0].cssClass} />
        </div>
        {this.generateJoinRewards(footerRewards[1].JoinRewards.DATA)}
        {footerRewards.slice(2).map((footerReward, key) => {
          const footerRewardObje = footerReward[Object.keys(footerReward)[0]];
          return this.generateCards(footerRewardObje.DATA, key);
        })}
      </div>
    );
  }

  generateJoinRewards(rewardsData) {
    return (
      <div className="site-footer__link-bucket">
        <div className="heading heading--3 site-footer__heading">
          <Link to={rewardsData[0].url}>{rewardsData[0].displayName}</Link>
        </div>
        <div>
          <div className="footer__box footer__box--promo">
            <Link to={rewardsData[0].url}>
              <span className="footer__box__heading text-wfs font-graphic text-caps">{rewardsData[1].displayName}</span>
              <span className="footer__box__text font-graphic text-caps">{rewardsData[1].description}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  generateCards(getCardData, key) {

    return (
      <div className="site-footer__link-bucket" key={key}>
        <div className="heading heading--3 site-footer__heading">
          <Link to={getCardData[0].url}>{getCardData[0].displayName}</Link>
        </div>
        <div className="accordion__content">
          <div className="footer__box footer__box--img-link-row">
            {getCardData.slice(1).map((img, i) => {
              let applyTarget = '';
              let getTarget = _.includes(img.url, 'itunes.apple.com') || _.includes(img.url, 'play.google.com') ? applyTarget = '_blank' : '';
              return (
                <Link to={img.url} key={i} target={getTarget} >
                  <Image
                    key={i}
                    payload={{
                      url: img.imageURL,
                      alt: img.displayName,
                      className: ''
                    }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { footerData } = this.props;
    if (footerData) {
      return (
        <footer className="grid grid--space-y site-footer content--centered">
          {footerData.footer_rewards ? this.generateFooterRewards(footerData.footer_rewards) : null}

          <div className="grid">
            <div className="site-footer__link-bucket link-bucket--logo">
              <div>&nbsp;</div>
            </div>
            {footerData.footer_sitemap ? this.generateLinkcategory(footerData.footer_sitemap) : null}
          </div>

          {footerData.footer_legal ? this.generateFooterLegal(footerData.footer_legal) : null}
        </footer>
      );
    }

    return null;
  }
}
const mapStateToProps = (state) => {
  return {
    // footerData: state.footer.footerData,
    // active: state.footer.footerAccordinStatus,
    footerData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.footer.footer', {}),
    // active: state.headerReducer.headerDetailsReducer.headerDetailsData.footer.footerAccordinStatus,
    active: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.footer.footerAccordinStatus', -1),
    viewportType: state.common.viewportType
  };
};
export default connect(mapStateToProps, { resetFooterAccordianStatus })(Footer);
