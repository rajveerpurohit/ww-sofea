import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { getchildDetailsPageData, updatechildDetailsPageData, deletechildDetailsPageData, addchildDetailsPageData } from './actions';
import DatePicker from '../../components/basic/datepicker';

class LittleWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      startDate: null,
      childForm: {
        parentGuardian: '',
        childFirstName: '',
        childLastName: '',
        childDateOfBirth: '',
        childGender: '',
        childId: '',
        removeChild: ''
      },
      formErrors: {}
    };
    this.renderFormFieldErrorElm = this.renderFormFieldErrorElm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.UpdateChildDetails = this.UpdateChildDetails.bind(this);
    this.addchildDetailsPageData = this.addchildDetailsPageData.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser && currentUser.synchronizeStatus) {
      this.props.getchildDetailsPageData();
    }
  }

  onDateChange(newDate) {
    if (newDate) {
      const newState = _.assign({}, this.state);
      newState.childForm.childDateOfBirth = newDate;
      newState.startDate = newDate;
      this.setState(newState);
    }
  }

  addchildDetailsPageData(data) {
    const { update } = this.state;
    const { pathname } = this.props;
    if (pathname === '/dashboard/littleworld/details' && update) {
      this.props.updatechildDetailsPageData(data);
    } else {
      this.props.addchildDetailsPageData(data, () => {
        const formErrors = {};
        const { childList } = this.props;
        formErrors.register = childList[0].formexceptions[0].message;
        this.setState({ formErrors });
      });
    }
  }

  handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
  }

  handleCheckboxChange(value, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = value;
    this.setState(newState);
  }

  UpdateChildDetails(childDetails) {
    const childForm = {
      childFirstName: childDetails.childFirstName,
      childLastName: childDetails.childLastName,
      childDateOfBirth: childDetails.childDateOfBirth,
      childGender: childDetails.childGender,
      parentGuardian: '',
      childId: childDetails.childId,
      removeChild: '',
      age: childDetails.age
    };
    this.setState({ update: true, childForm });
  }
  handleAddChildForm(e) {
    e.preventDefault();
    const childForm = {};
    childForm.childDateOfBirth = this.state.childForm.childDateOfBirth;
    childForm.childGender = this.state.childForm.childGender;
    let formErrors = {};
    formErrors = _.reduce(childForm, (prev, val, field) => {
      prev[field] = this.validate(val, field); // eslint-disable-line no-param-reassign
      return prev;
    }, {});
    if (_.compact(_.values(formErrors)).length === 0) {
      this.setState({ formErrors: {} });
      this.addchildDetailsPageData(this.state.childForm);
    } else {
      this.setState({ formErrors });
    }
  }
  validate(val, field) {
    if (field === 'childDateOfBirth' && val === '') {
      return 'Please enter Date Of Birth.';
    } else if (!/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i.test(val) && field === 'childDateOfBirth') {
      return 'Invalid date of birth.';
    } else if (field === 'childGender' && val === '' && this.state.childForm.childDateOfBirth !== '') {
      return 'Please select Child gender.';
    }
    return '';
  }

  renderFormFieldErrorElm(field) {
    const { formErrors } = this.state;
    if (formErrors[field]) {
      return (
        <span className="form-field__msg form-field__msg--error">{formErrors[field]}</span>
      );
    }

    return null;
  }
  render() {
    const { childList, currentUser, pathname } = this.props;
    const { childForm, update, formErrors } = this.state;
    const formTiltle = pathname === '/dashboard/littleworld/details' && update ? 'Update' : 'Add';
    return (
      <main className="grid grid--space-y site-main">
        <div className="main-page ">
          <div className="grid grid--space-y page-layout">
            <div className="page-layout__content">
              <div className="grid">
                <h1 className="text-caps font-graphic">Littleworld Details</h1>
                <p className="text-intro">These are the details we have on record for your little ones (babies and kids, from birth to age 7).</p>
                <div className="flex-parent">
                  { childList.length > 0 && (currentUser && currentUser.synchronizeStatus) && pathname === '/dashboard/littleworld/details' && !formErrors.register? childList.map(item =>
                    <div className="panel panel-card panel--flex">
                      <header className="panel-card__header">
                        <h3 className="font-graphic text-caps" id="nicknameDisplay_">
                      &nbsp;
                        </h3>
                      </header>
                      <section className="panel-card__body">
                        <p><strong>Age:</strong>{item.age} years old</p>
                        <p><strong>DOB:</strong><span id="dateOfBirth_">{item.childDateOfBirth}</span></p>
                        <p><strong>Gender:</strong><span id="gender_">{item.childGender === 'M' ? 'Male' : 'Female'}</span></p>
                      </section>
                      <footer className="panel-card__footer">
                        <span className="arrow-link--forward link--silent text-small" id="updateChild_" onClick={() => this.UpdateChildDetails(item)} rel="detailsForm">Update details</span><br />
                        <span className="arrow-link--forward link--silent text-small" id="removeChild_" onClick={() => this.props.deletechildDetailsPageData(item)} rel="detailsForm">Remove child</span>
                      </footer>
                    </div>) : null }</div>
              </div>
              { (pathname === '/dashboard/littleworld/details' && update) || (pathname === '/dashboard/littleworld/details/add') ?
                <div className="grid">
                  <div id="littleworlds-new-child-container">
                    <h2 className="text-caps font-graphic" id="childHeading">{formTiltle} A Child</h2>
                    <form name="addChildForm" className="wForm contactFormHolder" id="addChildForm" onSubmit={(e) => { this.handleAddChildForm(e); }} >
                      <p className="text-intro">Are you the parent/guardian?</p>
                      <div>
                        <input className="input enhanced-radio is-enhanced" name="parentGuardian" type="radio" value="yes" />
                        <label className={`enhanced-radio text-small label-radio ${childForm.parentGuardian === 'yes' ? 'is-checked' : ''}`} htmlFor="yes" onClick={event => this.handleCheckboxChange('yes', 'childForm', 'parentGuardian')}>Yes</label>
                        <span>&nbsp;</span>
                        <input className="input enhanced-radio is-enhanced" name="parentGuardian" type="radio" value="no" />
                        <label className={`enhanced-radio text-small label-radio ${childForm.parentGuardian === 'no' ? 'is-checked' : ''}`} htmlFor="no" onClick={event => this.handleCheckboxChange('no', 'childForm', 'parentGuardian')}>No</label>
                        <div className="formErrors">Please select parent/guardian.</div>
                      </div>
                      <div className="grid__three-fourths--medium">
                        <div className="grid__three-fourths--medium grid__third--large">
                          <p><strong className="text-small">Child's information</strong></p>
                          <div>
                            <input name="childFirstName" className="narrowField childNameDetails input input--text" id="childFirstName" type="text" placeholder="First name*" value={childForm.childFirstName} onChange={event => this.handleInputChange(event, 'childForm', 'childFirstName')} />
                            <div className="formErrors">Please enter first name.</div>
                          </div>
                          <div className="grid--space-y">
                            <input name="childLastName" className="narrowField childNameDetails input input--text" id="childLastName" type="text" placeholder="Last name*" value={childForm.childLastName} onChange={event => this.handleInputChange(event, 'childForm', 'childLastName')} />
                            <div className="formErrors">Please enter last name.</div>
                          </div>
                          <div className="grid--space-y">
                            <DatePicker
                            startDate={this.state.startDate}
                            handleChange={this.onDateChange}
                            placeholder="Date of birth*"
                            />
                            {this.renderFormFieldErrorElm('childDateOfBirth')}
                          </div>
                          <div className="grid--space-y">
                            <span><strong>Gender:&nbsp;</strong>&nbsp;</span>
                            <input className="input enhanced-radio is-enhanced" name="childGender" type="radio" value="M" />
                            <label className={`enhanced-radio text-small label-radio ${childForm.childGender === 'M' ? 'is-checked' : ''}`} htmlFor="M" onClick={event => this.handleCheckboxChange('M', 'childForm', 'childGender')}>Male</label>
                            <span>&nbsp;</span>
                            <input className="input enhanced-radio is-enhanced" name="childGender" type="radio" value="F" />
                            <label className={`enhanced-radio text-small label-radio ${childForm.childGender === 'F' ? 'is-checked' : ''}`} htmlFor="F" onClick={event => this.handleCheckboxChange('F', 'childForm', 'childGender')}>Female</label>
                            {this.renderFormFieldErrorElm('childGender')}
                          </div>
                          <div>
                            {this.renderFormFieldErrorElm('register')}
                          </div>
                        </div>
                      </div>
                      <div className="grid--space-y grid__three-fourths">
                        <input name="submit" className="btn btn--primary btn--right " id="saveNewChild" type="submit" value="Save New Child" />
                        <input name="submit" className="btn btn--primary btn--right hidden" id="updateChildDetails" type="submit" value="Update Details" />
                        <input name="submit" className="btn btn--primary btn--right hidden" id="removeChildButton" type="submit" value="Remove Child" />
                        <span>&nbsp;</span>
                        <a className="link--silent text-small" id="cancelChildAdd" href="#"><span className="icon-text">Cancel</span><span className="icon icon--cancel-dark" /></a>
                      </div>
                    </form>
                  </div>
                </div>
            : null }
            </div>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    childList: state.littleWorldReducer.littleWorld.childList,
    currentUser: state.clp.currentUser,
    pathname: state.routing.locationBeforeTransitions.pathname,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getchildDetailsPageData, updatechildDetailsPageData, deletechildDetailsPageData, addchildDetailsPageData }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(LittleWorld);
