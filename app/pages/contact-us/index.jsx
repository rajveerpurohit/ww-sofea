import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import classnames from 'classnames';
import _ from 'lodash';

import Accordion from '../../components/basic/accordion';
import SideBarComponent from '../../components/basic/SideBarContent';
import ServiceUtil from '../../services/serviceUtil';
import { getContactUsPageData, getContactInfoPageData, postContactQuery } from './actions';
import { getLeftNav } from '../help-center/actions';
import { getCurrentUser } from '../clp/actions';
import { resetAccordianStatus } from '../../actions/common';
import {
  VIEW_PORT_TYPE_MOBILE,
  TOTAL_CHAR_COUNT_FOR_CONTACT_US_MESSAGE
} from '../../Constants';

const FORM_FIELD_CLASS_MAP = {
  departmentName: 'selectedDepartment',
  topic: 'selectedTopic',
  firstName: '_D:firstName',
  surname: '_D:lastName',
  emailAddress: '_D:emailAddress',
  contactNumber: '_D:phoneNumber',
  message: '_D:message'
};

class ContactUs extends Component {
  static need = [
    getContactUsPageData,
    getContactInfoPageData,
    getLeftNav,
    getCurrentUser
  ]

  constructor(props) {
    super(props);
    const { currentUser, labels } = props;
    const { firstName, lastName, email, primaryContactNo } = currentUser;

    this.state = {
      departmentsData: [],
      topicsData: [],
      firstDepartment: ServiceUtil.getLabel(labels, 'global-contact-us-select-a-department-label'),
      firstDepartmentValue: '',
      firstTopic: '',
      firstTopicValue: '',
      firstname: firstName,
      lastname: lastName,
      email,
      phoneNo: primaryContactNo,
      isQueryFormOpen: false,
      isFormHasErrors: false,
      formErrors: {},
      fieldHavingFocus: '',
      remainingMessageChars: TOTAL_CHAR_COUNT_FOR_CONTACT_US_MESSAGE
    };

    this.primaryComponent = this.primaryComponent.bind(this);
    this.pageContent = this.pageContent.bind(this);
    this.createDepartmentOptionsData = this.createDepartmentOptionsData.bind(this);
    this.createTopicOptionsData = this.createTopicOptionsData.bind(this);
    this.departmentSelect = this.departmentSelect.bind(this);
    this.topicSelect = this.topicSelect.bind(this);
    this.handleContactQuery = this.handleContactQuery.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.renderFormErrorElm = this.renderFormErrorElm.bind(this);
    this.renderFormFieldErrorElm = this.renderFormFieldErrorElm.bind(this);
    this.renderSubmitQueryForm = this.renderSubmitQueryForm.bind(this);
    this.toggleSubmitQueryAccordian = this.toggleSubmitQueryAccordian.bind(this);
    this.onMessageAreaKeyUp = this.onMessageAreaKeyUp.bind(this);
  }
  onMessageAreaKeyUp(evt) {
    if (evt) evt.preventDefault();

    const value = _.get(this.message, 'value', '');

    this.setState({
      remainingMessageChars: TOTAL_CHAR_COUNT_FOR_CONTACT_US_MESSAGE - value.length
    });
  }

  createDepartmentOptionsData(contactUsData) {
    return contactUsData.map((item, index) => (
      <option key={index} value={item.departmentId}>{item.description}</option>
    ));
  }

  createTopicOptionsData(topicsData) {
    return topicsData.map((item, index) => (
      <option key={index} value={item.departmentId}>{item.description}</option>
    ));
  }

  departmentSelect(event) {
    const getDepartmentValue = event.target.value;
    const getDepartmentName = event.target.options[event.target.selectedIndex].text;

    const newStates = {
      firstTopic: ServiceUtil.getLabel(this.props.labels, 'global-contact-us-select-a-topic-label'),
      firstTopicValue: ''
    };

    if (getDepartmentValue === '') {
      newStates.firstDepartment = ServiceUtil.getLabel(this.props.labels, 'global-contact-us-select-a-department-label');
      newStates.firstDepartmentValue = '';
    } else {
      /* Code to return topics of matched department */
      const departmentData = _.find(this.props.contactUsData, ({ departmentId }) => (
        departmentId === getDepartmentValue
      ));

      newStates.firstDepartment = getDepartmentName;
      newStates.firstDepartmentValue = getDepartmentValue;
      newStates.topicsData = _.get(departmentData, 'WoolworthsTopics', []);
    }

    this.setState(newStates);
  }

  topicSelect(event) {
    const getTopicValue = event.target.value;
    const getTopicName = event.target.options[event.target.selectedIndex].text;
    if (getTopicValue === '') {
      this.setState({
        firstTopic: ServiceUtil.getLabel(this.props.labels, 'global-contact-us-select-a-topic-label'),
        firstTopicValue: ''
      });
    } else {
      this.setState({
        firstTopic: getTopicName,
        firstTopicValue: getTopicValue
      });
    }
  }

  validate(field, parentNode) {
    if (field === 'true' || field === '') {
      return 'This is a required field';
    } else if (parentNode === '_D:emailAddress' && field !== '') {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field)) {
        return 'Please enter a valid email address';
      }

      return '';
    } else if (parentNode === '_D:phoneNumber' && field !== '') {
      if (isNaN(Number(field))) {
        return 'Only numbers are allowed';
      } else if (field.length < 10) {
        return 'Insufficient number of characters. Please enter a minimum of 10 characters.';
      }

      return '';
    }

    return '';
  }

  handleContactQuery(e) {
    e.preventDefault();
    const contactQueryData = {
      departmentName: this.department.value,
      topic: this.topic.value,
      firstName: this.firstName.value,
      surname: this.lastName.value,
      emailAddress: this.emailAddress.value,
      contactNumber: this.phoneNumber.value,
      message: this.message.value
    };

    const formErrors = _.reduce(contactQueryData, (prev, val, field) => {
      if (FORM_FIELD_CLASS_MAP[field]) {
        prev[field] = this.validate(val, FORM_FIELD_CLASS_MAP[field]); // eslint-disable-line no-param-reassign
      }

      return prev;
    }, {});

    if (_.compact(_.values(formErrors)).length === 0) {
      this.setState({ isFormHasErrors: false, formErrors: {} });
      this.props.postContactQuery(contactQueryData);
      browserHistory.push('/contactus/thankyou');
    } else {
      this.setState({ isFormHasErrors: true, formErrors });
    }
  }


  handleFocus(evt, field) {
    if (evt) evt.preventDefault();

    this.setState({ fieldHavingFocus: field });
  }

  handleBlur(evt) {
    if (evt) evt.preventDefault();

    this.setState({ fieldHavingFocus: '' });
  }

  pageContent() {
    const refinedObj = this.props.contactInfoData;
    return (
      <div className="page-layout__content">
        <div className="grid grid--space-y">
          <h1 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-contact-us-label')}</h1>
          <p className="text-small">
            {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-fill-in-the-form-below-label')}
          </p>
          {this.renderSubmitQueryForm()}
          <div className="grid grid__two-thirds--medium">
            <h3 className="font-graphic text-caps">Contact Info</h3>
            {refinedObj ? <Accordion refinedData={refinedObj} /> : null}
          </div>
        </div>
      </div>
    );
  }

  primaryComponent() {
    return (
      <div className="main-page ">
        <nav className="breadcrumb empty" />
        <input type="hidden" defaultValue="#" id="referer_url" />
        <div className="grid grid--space-y page-layout">
          <div className="page-layout__aside">
            {this.props.contentAside && (
            <SideBarComponent leftData={this.props.contentAside} isActive={this.props.location.pathname} />
          )}
          </div>
          {this.pageContent()}
        </div>
      </div>
    );
  }

  toggleSubmitQueryAccordian() {
    const { isQueryFormOpen } = this.state;

    this.setState({ isQueryFormOpen: !isQueryFormOpen });
    if (!isQueryFormOpen) this.props.resetAccordianStatus('none');
  }

  renderFormErrorElm() {
    if (this.state.isFormHasErrors) {
      return (
        <div className="text-small message message--error">
          <span>{ServiceUtil.getLabel(this.props.labels, 'global-contact-us-invalid-form-input-error')}</span>
        </div>
      );
    }

    return null;
  }

  renderFormFieldErrorElm(field) {
    const { isFormHasErrors, formErrors } = this.state;

    if (isFormHasErrors && formErrors[field]) {
      return (
        <span className="form-field__msg form-field__msg--error">{formErrors[field]}</span>
      );
    }

    return null;
  }

  renderSubmitQueryForm() {
    const { isQueryFormOpen } = this.state;
    const toggleClasses = classnames('accordion__toggle--chrome', 'grid-hidden--medium', 'accordion__toggle', {
      'is-collapsed': !isQueryFormOpen
    });
    const toggleProps = { className: toggleClasses };
    const contentClasses = classnames('grid--space-y', 'accordion__content', {
      'is-collapsed': !isQueryFormOpen
    });

    if (VIEW_PORT_TYPE_MOBILE === this.props.viewportType) {
      toggleProps.onClick = this.toggleSubmitQueryAccordian;
    }

    return (
      <div className="grid grid__third--medium">
        <h3 className="font-graphic text-caps grid-visible--medium">
          {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-submit-a-query-label')}
        </h3>
        <div className="accordion--max-medium accordion--group">
          <div className="accordion__segment--chrome accordion__segment">
            <h4 {...toggleProps}>{ServiceUtil.getLabel(this.props.labels, 'global-contact-us-submit-a-query-label')}</h4>
            <div className={contentClasses}>
              {this.renderFormErrorElm()}
              <form method="post" name="generalEnquiriesForm" onSubmit={this.handleContactQuery} id="generalEnquiriesForm" className="wForm" noValidate="true">
                <div style={{ display: 'none' }}><input name="_dyncharset" type="hidden" defaultValue="UTF-8" /></div>
                <div style={{ display: 'none' }}><input name="_dynSessConf" type="hidden" defaultValue={-5118320893446871934} /></div>
                <div className="form-field">
                  <div data-js="validate-field">
                    <input name="_D:department" type="hidden" defaultValue=" " />
                    <span className="enhanced-select">
                      <select ref={dept => (this.department = dept)} name="department" onChange={this.departmentSelect} id="department">
                        <option value>{ServiceUtil.getLabel(this.props.labels, 'global-contact-us-select-a-department-label')}</option>
                        {this.createDepartmentOptionsData(this.props.contactUsData)}
                      </select>
                      <span className="enhanced-select__label">{
                      this.state.firstDepartmentValue === ''
                        ? ServiceUtil.getLabel(this.props.labels, 'global-contact-us-select-a-department-label')
                        : this.state.firstDepartment
                    }</span>
                      <span className="icon enhanced-select__icon" />
                    </span>
                  </div>
                  <input type="hidden" id="selectedDepartment" name="selectedDepartment" defaultValue />
                  {this.renderFormFieldErrorElm('departmentName')}
                  <div className="formErrors">Select a department</div>
                </div>
                <input name="/za/co/woolworths/ticket/TicketFormHandler.userId" type="hidden" defaultValue={613018858} />
                <input name="_D:/za/co/woolworths/ticket/TicketFormHandler.userId" type="hidden" defaultValue=" " />
                <input name="successurl" id="successurl" type="hidden" />
                <input name="_Dsuccessurl" type="hidden" defaultValue=" " />
                <input name="errorurl" id="errorurl" type="hidden" />
                <input name="_D:errorurl" type="hidden" defaultValue=" " />
                <div className="form-field grid--space-y" data-js="form-field">
                  <div>
                    <input name="_D:topic" type="hidden" defaultValue=" " />
                    <span className="enhanced-select">
                      <select ref={top => (this.topic = top)} name="topic" id="topic" onChange={this.topicSelect}>
                        <option value>{ServiceUtil.getLabel(this.props.labels, 'global-contact-us-select-a-topic-label')}</option>
                        {this.createTopicOptionsData(this.state.topicsData)}
                      </select>
                      <span className="enhanced-select__label">{
                      this.state.firstTopicValue === ''
                        ? ServiceUtil.getLabel(this.props.labels, 'global-contact-us-select-a-topic-label')
                        : this.state.firstTopic
                    }</span>
                      <span className="icon enhanced-select__icon" />
                    </span>
                  </div>
                  <input type="hidden" id="selectedTopic" name="selectedTopic" defaultValue />
                  {this.renderFormFieldErrorElm('topic')}
                </div>
                <div className="form-field form-field--enhanced-label">
                  <label
                  htmlFor="fldFirstName"
                  className={classnames('form-field__label--enhanced', {
                    'is-active': !_.isEmpty(this.state.firstname) || this.state.fieldHavingFocus === 'firstName'
                  })}
                  >
                    {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-first-name-label')}
                  </label>
                  <input
                  maxLength={40}
                  tabIndex={1}
                  ref={fname => (this.firstName = fname)}
                  name="firstName"
                  id="fldFirstName"
                  type="text"
                  onFocus={e => this.handleFocus(e, 'firstName')}
                  onBlur={this.handleBlur}
                  onChange={e => (this.setState({ firstname: e.target.value }))}
                  value={this.state.firstname}
                  />
                  <input id="_D:firstName" name="_D:firstName" type="hidden" defaultValue=" " />
                  {this.renderFormFieldErrorElm('firstName')}
                </div>
                <div className="form-field form-field--enhanced-label">
                  <label
                  htmlFor="fldLastName"
                  className={classnames('form-field__label--enhanced', {
                    'is-active': !_.isEmpty(this.state.lastname) || this.state.fieldHavingFocus === 'surname'
                  })}
                  >
                    {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-last-name-label')}
                  </label>
                  <input
                  maxLength={40}
                  ref={lName => (this.lastName = lName)}
                  tabIndex={2}
                  name="lastName"
                  id="fldLastName"
                  type="text"
                  onFocus={e => this.handleFocus(e, 'surname')}
                  onBlur={this.handleBlur}
                  onChange={e => this.setState({ lastname: e.target.value })}
                  value={this.state.lastname}
                  />
                  <input id="_D:lastName" name="_D:lastName" type="hidden" defaultValue=" " />
                  {this.renderFormFieldErrorElm('surname')}
                </div>
                <div className="form-field form-field--enhanced-label">
                  <label
                  htmlFor="fldEmailAddress"
                  className={classnames('form-field__label--enhanced', {
                    'is-active': !_.isEmpty(this.state.email) || this.state.fieldHavingFocus === 'emailAddress'
                  })}
                  >
                    {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-email-address-label')}
                  </label>
                  <input
                  tabIndex={3}
                  ref={email => (this.emailAddress = email)}
                  name="emailAddress"
                  id="fldEmailAddress"
                  type="email"
                  className="stdFld"
                  onFocus={e => this.handleFocus(e, 'emailAddress')}
                  onBlur={this.handleBlur}
                  onChange={e => this.setState({ email: e.target.value })}
                  value={this.state.email}
                  />
                  <input id="_D:emailAddress" name="_D:emailAddress" type="hidden" defaultValue="" />
                  {this.renderFormFieldErrorElm('emailAddress')}
                </div>
                <div className="form-field form-field--enhanced-label">
                  <label
                  htmlFor="fldPhoneNumber"
                  className={classnames('form-field__label--enhanced', {
                    'is-active': !_.isEmpty(this.state.phoneNo) || this.state.fieldHavingFocus === 'contactNumber'
                  })}
                  >
                    {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-contact-number-label')}
                  </label>
                  <input
                  minLength={10}
                  maxLength={11}
                  tabIndex={4}
                  ref={phone => (this.phoneNumber = phone)}
                  name="phoneNumber"
                  id="fldPhoneNumber"
                  type="tel"
                  className="stdFld"
                  onFocus={e => this.handleFocus(e, 'contactNumber')}
                  onBlur={this.handleBlur}
                  onChange={e => this.setState({ phoneNo: e.target.value })}
                  value={this.state.phoneNo}
                  />
                  <input id="_D:phoneNumber" name="_D:phoneNumber" type="hidden" defaultValue=" " />
                  {this.renderFormFieldErrorElm('contactNumber')}
                </div>
                <div className="grid--space-y">
                  <div className="form-field">
                    <label htmlFor="fldMessage" className="text-small">
                      {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-messege-label')}
                    </label>
                    <textarea
                    maxLength={512}
                    ref={mess => (this.message = mess)}
                    onKeyUp={this.onMessageAreaKeyUp}
                    tabIndex={5}
                    name="message"
                    id="fldMessage"
                    rows={5}
                    cols={5}
                    className="textarea form_textinput_faq"
                    defaultValue=""
                    />
                    <input id="_D:message" name="_D:message" type="hidden" defaultValue=" " />
                    <div className="characters text-small"><span className="charCount">{this.state.remainingMessageChars}</span> characters</div>
                    {this.renderFormFieldErrorElm('message')}
                  </div>
                </div>
                <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-contact-us-required-fields-label')}</p>
                <p className="text-small">
                  {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-privacy-is-important-label')}{' '}
                  <Link to="/corporate/cmp205289">{ServiceUtil.getLabel(this.props.labels, 'global-contact-us-privacy-notice-label')}</Link>{' '}
                  {ServiceUtil.getLabel(this.props.labels, 'global-contact-us-for-more-label')}
                </p>
                <input name="formSubmit" id="formSubmit" type="submit" className="btn btn--primary btn--right" defaultValue="submit" />
                <input name="_D:formSubmit" type="hidden" defaultValue=" " />
                <div style={{ display: 'none' }}>
                  <input name="_DARGS" type="hidden" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="contact-us">
        <main className="grid grid--space-y site-main">
          {this.primaryComponent()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'clp.currentUser', {}),
    contactUsData: state.contactUsReducer.contactUsFormReducer.contactUsData,
    contactInfoData: state.contactUsReducer.contactInfoReducer.contactInfo.CONTACTINFO,
    contactQuery: state.contactUsReducer.contactQueryReducer.contactQuery,
    contentAside: state.helpReducer.LeftNavReducer.leftNav,
    labels: state.labels.labelsAndErrorMessages.ContactUs,
    viewportType: state.common.viewportType
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ postContactQuery, resetAccordianStatus, getCurrentUser }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ContactUs);
