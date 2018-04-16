import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { getFAQ, getFaqDetails, getLeftNav } from './actions';
import { getHelpAction } from '../help-center/actions';
import SideBarComponent from '../../components/basic/SideBarContent';
import Accordion from '../../components/basic/accordion';
import { resetAccordianStatus } from '../../actions/common';

class FAQ extends Component {
  static need = [
    getFAQ,
    getLeftNav,
    getFaqDetails
  ];
  constructor(props) {
    super(props);

    this.primaryComponent = this.primaryComponent.bind(this);
    this.freqaskedWrapper = this.freqaskedWrapper.bind(this);
    this.freqList = this.freqList.bind(this);
    this.faqDetails = this.faqDetails.bind(this);
    this.FindComponent = this.FindComponent.bind(this);
  }
  freqaskedWrapper() {
    return (
      <div className="contentBlock faqLinks-wrapper">
        <h1 className="font-graphic text-caps">FAQS</h1>
        <p className="text-intro">Click on the topics below to view the related FAQs.</p>
        <div className="faqLinks">
          <ul className="grid list--silent text-small">
            {this.props.allFAQs && this.freqList(this.props.allFAQs)}
          </ul>
        </div>
      </div>
    );
  }
  freqList(getListData) {
    return getListData.map((item, index) => {
      return (
        <li className="grid__third--medium" key={index}>
          <Link to={'/help/faqs/' + item.contentId} className="list__item--chevron" onClick={() => {
            this.props.resetAccordianStatus('null');
          }}
          >{item.displayName}</Link>
        </li>
      );
    });
  }
  FindComponent() {
    return (
      <div className="grid grid--space-y">
        <h3 className="font-graphic text-caps">Can't Find What You're After?</h3>
        <p className="text-intro">Let us know and we'll get you the info you're looking for as soon as possible.</p>
        <p><Link to="/contactus" className="btn btn--primary btn--right">Send us your question</Link></p>
      </div>
    );
  }
  faqDetails(faqAccData) {
    let faqData = [];
    if (this.props.faqAccData) {
      faqData = _.get(this.props.faqAccData, 'FAQs.questionAnswers', []);
      faqData.map((k, i) => {
        k.id = i;
        k.name = k.question;
        k.details = k.answer;
      });
    }
    return (
      <div className="grid grid--space-y">
        <h3 className="font-graphic text-caps">{faqAccData.displayName} FAQ<span>S</span></h3>
        {faqData ? <Accordion refinedData={faqData} /> : null}
      </div>
    );
  }
  primaryComponent() {
    return (
      <div className="main-page site-map-content">
        <nav className="breadcrumb empty" />
        <div className="grid grid--space-y page-layout">
          <div className="page-layout__aside">
            {this.props.contentAside && <SideBarComponent leftData={this.props.contentAside} isActive={this.props.location.pathname} />}
          </div>
          <div className="page-layout__content">
            {this.freqaskedWrapper()}
            <div className="grid grid--space-y">
              {this.props.faqAccData && this.faqDetails(this.props.faqAccData)}
            </div>
            <div className="grid grid--space-y">
              {this.FindComponent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <main className="grid grid--space-y site-main">
        {this.primaryComponent()}
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allFAQs: state.faqReducer.faqLinkReducer.faqData,
    faqAccData: state.faqReducer.faqDetailsReducer.faqDetails,
    contentAside: state.faqReducer.LeftNavReducer.leftNav,
  };
};

export default connect(mapStateToProps, { getFaqDetails, resetAccordianStatus })(FAQ);
