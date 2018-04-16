import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import ServiceUtil from '../../services/serviceUtil';
import { getLeftNav } from '../help-center/actions';
import SideBarComponent from '../../components/basic/SideBarContent';

class ContactUsThankYou extends Component {
  static need = [
    getLeftNav
  ]

  render() {
    return (
      <div className="grid grid--space-y page-layout">
        <div className="page-layout__aside">
          {this.props.contentAside && <SideBarComponent leftData={this.props.contentAside} />}
        </div>
        <div className="page-layout__content" >
          <header dangerouslySetInnerHTML={{ __html: this.props.contactQuery.message }} />
          <article>
            <p className="text-small">
              <Link className to="/help/faqs">
                <span className="icon-text">
                  {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-thankyou-send-us-another-question-label')}
                </span>
                <span className="icon icon--right-circ-dark" />
              </Link>
            </p>
          </article>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  contactQuery: _.get(state, 'contactUsReducer.contactQueryReducer.contactQuery'),
  contentAside: _.get(state, 'helpReducer.LeftNavReducer.leftNav'),
  labels: _.get(state, 'labels.labelsAndErrorMessages.ContactUsThankyoupage', {})
}))(ContactUsThankYou);
