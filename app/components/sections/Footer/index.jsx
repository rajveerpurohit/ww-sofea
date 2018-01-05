import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Image from '../../basic/Image';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.generateLinkcategory = this.generateLinkcategory.bind(this);
    this.generateLinks = this.generateLinks.bind(this);
    this.generateFooterLegal = this.generateFooterLegal.bind(this);
    this.generateFooterRewards = this.generateFooterRewards.bind(this);
    this.generateJoinRewards = this.generateJoinRewards.bind(this);
    this.generateCards = this.generateCards.bind(this);
    this.footerRewardClickHandler = this.footerRewardClickHandler.bind(this);
  }

  generateLinkcategory(categoryData) {
    return categoryData.map((category, i) => {
      const categoryObj = category[Object.keys(category)[0]];
      return (
        <div className="accordion__segment site-footer__link-bucket" key={i}>
          <div className="accordion__toggle heading heading--3 site-footer__heading">{categoryObj.displayName}</div>
          <div className="accordion__content accordion__content--animated" data-js="accordion-content">
            <div className="footer__box">
              {this.generateLinks(categoryObj.DATA)}
            </div>
          </div>
        </div>
      );
    });
  }

  generateLinks(linksData) {
    return linksData.map((link, index) => {
      if (link.displayType === 'text') {
        return (
          <li className="nav-list__item" key={index} >
            <Link to={link.url} className="nav-list__link">
              {link.displayName}
            </Link>
          </li>
        );
      }
      const className = 'icon icon--' + link.displayName.toLowerCase() + '-dark';
      return (

        <Link to={link.url} className="social-icon__link" target="_blank" key={index} >
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
            <Link to={secure.url} className="display-inline-block" style={{ marginRight: 24 }}>
              <Image
                payload={{
                  url: secure.DATA[0].imageURL,
                  alt: secure.DATA[0].displayName,
                  className: ''
                }} />
              {/* <img src={`${this.state.atgUrl}${secure.imageURL}`} alt={secure.displayName} /> */}
            </Link>
            <Image
              payload={{
                url: payments.DATA[0].imageURL,
                alt: payments.DATA[0].displayName,
                className: ''
              }} />
            {/* <img src={`${this.state.atgUrl}${payments.imageURL}`} alt={payments.displayName} /> */}
          </div>
          <div className="grid__half--large">
            <p>
              <span className="text-part">{this.props.footerData.footer_legal[2].copyright.DATA[0].displayName}</span>
              {/* <Link to={terms.DATA[0].url} className="text-part">{terms.DATA[0].displayName}</Link> */}
              <Link to={policy.DATA[0].url} className="text-part">{policy.DATA[0].displayName}</Link>
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
        <div className="accordion__segment site-footer__link-bucket link-bucket--logo">
          <Link to={footerRewards[0].footerLogo.DATA[0].url} className={footerRewards[0].footerLogo.DATA[0].cssClass} />
        </div>
        {this.generateJoinRewards(footerRewards[1].JoinRewards.DATA)}
        {
          footerRewards.slice(2).map((footerReward, key) => {
            const footerRewardObje = footerReward[Object.keys(footerReward)[0]];
            return (
              this.generateCards(footerRewardObje.DATA, key)
            );
          })
        }
      </div>
    );
  }

  generateJoinRewards(rewardsData) {
    return (
      <div className="accordion__segment site-footer__link-bucket">
        <div className="heading heading--3 site-footer__heading"><Link to={rewardsData[0].url}>{rewardsData[0].displayName}</Link></div>
        <div className="accordion__content">
          <div className="footer__box footer__box--promo">
            <Link to="">
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
      <div className="accordion__segment site-footer__link-bucket" key={key}>
        <div className="heading heading--3 site-footer__heading"><Link to={getCardData[0].url}>{getCardData[0].displayName}</Link></div>
        <div className="accordion__content">
          <Link to="" onClick={this.footerRewardClickHandler}>
            <div className="footer__box footer__box--img-link-row">
              {
                getCardData.slice(1).map((img, key) => <Image
                  key={key} payload={{
                    url: img.imageURL,
                    alt: img.displayName,
                    className: ''
                  }} />)
              }
            </div>
          </Link>
        </div>
      </div>
    );
  }
  footerRewardClickHandler(e) {
    e.preventDefault();
  }
  render() {
    return (
      <footer className="grid grid--space-y site-footer content--centered">

        {this.props.footerData.footer_rewards ? this.generateFooterRewards(this.props.footerData.footer_rewards) : null}

        <div className="accordion--max-large grid" >
          <div className="accordion__segment site-footer__link-bucket link-bucket--logo">
            <div>&nbsp;</div>
          </div>
          {this.props.footerData.footer_sitemap ? this.generateLinkcategory(this.props.footerData.footer_sitemap) : null}
        </div>

        {this.props.footerData.footer_legal ? this.generateFooterLegal(this.props.footerData.footer_legal) : null}

      </footer>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    footerData: state.footer.footerData
  };
};
export default connect(mapStateToProps)(Footer);
