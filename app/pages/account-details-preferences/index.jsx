import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getpreferencesPageData, postpreferencesData } from './actions';

class Preference extends Component {

  constructor(props) {
    super(props);
    this.onSubmitFunc = this.onSubmitFunc.bind(this);
    this.handleOptOutWoolworths = this.handleOptOutWoolworths.bind(this);
    this.handleOptOutFinServices = this.handleOptOutFinServices.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.linkedUser = this.linkedUser.bind(this);
    this.nonLinkedUser = this.nonLinkedUser.bind(this);
    this.handleNonLinkedSubmit = this.handleNonLinkedSubmit.bind(this);
    this.handleNonLinkedSubmitfunc = this.handleNonLinkedSubmitfunc.bind(this);
    this.state = {
      userDetailsData: this.props.userDetails
    };

  }

  componentDidMount() {
    this.props.getpreferencesPageData();
  }
  onSubmitFunc(e) {
    e.preventDefault();
    const data = {
      optOutWoolworths: this.optOutWoolworths.checked.toString(),
      optOutFinServices: this.optOutFinServices.checked.toString(),
      optOutSms: this.optOutSms.checked.toString(),
      optOutPost: this.optOutPost.checked.toString(),
      optOutPhone: this.optOutPhone.checked.toString(),
      optOutEmail: this.optOutEmail.checked.toString(),
      wwfOptOutSms: this.wwfOptOutSms.checked.toString(),
      wwfOptOutPhone: this.wwfOptOutPhone.checked.toString(),
      wwfOptOutEmail: this.wwfOptOutEmail.checked.toString(),
      wwfOptOutPost: this.wwfOptOutPost.checked.toString()
    };

    this.props.postpreferencesData(data);
  }
  handleOptOutWoolworths(event) {
    const groupOneElements = document.getElementsByClassName('grp1');
   
    if (document.getElementById('fldCheck1').checked === true) {
      document.getElementById('fldCheck1').nextSibling.classList.add('is-checked');
      Array.from(groupOneElements).forEach((el) => {
        el.checked = true;
        el.nextSibling.classList.add('is-checked');
      });
    } else if (document.getElementById('fldCheck1').checked === false) {
      document.getElementById('fldCheck1').nextSibling.classList.remove('is-checked');
      Array.from(groupOneElements).forEach((el) => {
        el.checked = false;
        el.nextSibling.classList.remove('is-checked');
      });
    }
  }
  handleOptOutFinServices(event){
    const groupTwoElements = document.getElementsByClassName('grp2');
    if (document.getElementById('fldCheck2').checked === true) {
      document.getElementById('fldCheck2').nextSibling.classList.add('is-checked');
      Array.from(groupTwoElements).forEach((el) => {
        el.checked = true;
        el.nextSibling.classList.add('is-checked');
      });
    } else if (document.getElementById('fldCheck2').checked === false) {
      document.getElementById('fldCheck2').nextSibling.classList.remove('is-checked');
      Array.from(groupTwoElements).forEach((el) => {
        el.checked = false;
        el.nextSibling.classList.remove('is-checked');
      });
    }
  }
  handleChangeEvent(event) {
    const groupOneElements = document.getElementsByClassName('grp1');
    const groupTwoElements = document.getElementsByClassName('grp2');
    if (this.optOutSms.checked === true &&
      this.optOutPost.checked === true &&
      this.optOutPhone.checked === true &&
      this.optOutEmail.checked === true) {
      document.getElementById('fldCheck1').checked = true;
      document.getElementById('fldCheck1').nextSibling.classList.add('is-checked');
    } else if (this.optOutSms.checked === false ||
      this.optOutPost.checked === false ||
      this.optOutPhone.checked === false ||
      this.optOutEmail.checked === false) {
      document.getElementById('fldCheck1').checked = false;
      document.getElementById('fldCheck1').nextSibling.classList.remove('is-checked');
    }
    if (this.wwfOptOutSms.checked === true &&
      this.wwfOptOutPhone.checked === true &&
      this.wwfOptOutEmail.checked === true &&
      this.wwfOptOutPost.checked === true) {
      document.getElementById('fldCheck2').checked = true;
      document.getElementById('fldCheck2').nextSibling.classList.add('is-checked');
    } else if (this.wwfOptOutSms.checked === false ||
      this.wwfOptOutPhone.checked === false ||
      this.wwfOptOutEmail.checked === false ||
      this.wwfOptOutPost.checked === false) {
      document.getElementById('fldCheck2').checked = false;
      document.getElementById('fldCheck2').nextSibling.classList.remove('is-checked');
    }

    const data = {
      [event.target.name]: event.target.checked
    };
    if (event.target.checked == true) {
      event.target.nextSibling.classList.add('is-checked');
    } else {
      event.target.nextSibling.classList.remove('is-checked');
    }

    // this.setState({ userDetailsData: [...this.state.userDetailsData, data]})
  }
  handleNonLinkedSubmit(e) {
    if (document.getElementById('fldCheck1').checked === true) {
      document.getElementById('fldCheck1').nextSibling.classList.add('is-checked');
    } else if (document.getElementById('fldCheck1').checked === false) {
      document.getElementById('fldCheck1').nextSibling.classList.remove('is-checked');
    }
    if (document.getElementById('fldCheck2').checked === true) {
      document.getElementById('fldCheck2').nextSibling.classList.add('is-checked');
    } else if (document.getElementById('fldCheck2').checked === false) {
      document.getElementById('fldCheck2').nextSibling.classList.remove('is-checked');
    }
  }
  handleNonLinkedSubmitfunc(e) {
    e.preventDefault();
    const data = {
      optOutWoolworths: this.optOutWoolworthsnL.checked.toString(),
      optOutFinServices: this.optOutFinServicesnL.checked.toString(),
      optOutSms: 'false',
      optOutPost: 'false',
      optOutPhone: 'false',
      optOutEmail: 'false',
      wwfOptOutSms: 'false',
      wwfOptOutPhone: 'false',
      wwfOptOutEmail: 'false',
      wwfOptOutPost: 'false'
    };

    this.props.postpreferencesData(data);
  }
  nonLinkedUser() {
    return (
      <form onSubmit={this.handleNonLinkedSubmitfunc} name="consentsNotLinkedForm" id="consentsNotLinkedForm" className="contactForm consentsNotLinkedForm validateForm">

        <div>
          <input name="fldCheck1" id="fldCheck1" name="optOutWoolworths" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleNonLinkedSubmit(e); }} defaultChecked={this.props.userDetails && this.props.userDetails.optOutWoolworths} ref={(optOutWoolworthsnL) => { this.optOutWoolworthsnL = optOutWoolworthsnL; }} style={{ 'margin-top': '3px' }} />
          <label htmlFor="fldCheck1" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.optOutWoolworths === true ? 'is-checked' : ''}`}>Woolworths (a tick indicates you have opted out of receiving this form of communication)</label>

        </div>

        <div>
          <input id="fldCheck2" type="checkbox" name="optOutFinServices" className="input enhanced-checkbox is-enhanced" defaultChecked={this.props.userDetails && this.props.userDetails.optOutFinServices} ref={(optOutFinServicesnL) => { this.optOutFinServicesnL = optOutFinServicesnL; }} onChange={(e) => { this.handleNonLinkedSubmit(e); }} style={{ 'margin-top': '3px' }} />
          <label htmlFor="fldCheck2" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.optOutFinServices === true ? 'is-checked' : ''}`}>Woolworths Financial Services (a tick indicates you have opted out of receiving this form of communication)</label>
        </div>

        <div className="my-details-section__row grid--space-y">
          <input name="submit" id="fldUpdate" type="submit" defaultValue="Update" className="btn btn--primary btn--right grid--space-y" />
        </div>

      </form>);
  }
  linkedUser() {
    return (
      <form onSubmit={this.onSubmitFunc} name="consentsLinkedForm" id="consentsLinkedForm" className="contactForm consentsLinkedForm validateForm">

        <div>
          <input id="fldCheck1" name="optOutWoolworths" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleOptOutWoolworths(e); }} defaultChecked={this.props.userDetails && this.props.userDetails.optOutWoolworths} ref={(optOutWoolworths) => { this.optOutWoolworths = optOutWoolworths; }} style={{ 'margin-top': '3px' }} />
          <label htmlFor="fldCheck1" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.optOutWoolworths === true ? 'is-checked' : ''}`}>Woolworths (a tick indicates you have opted out of receiving this form of communication)</label>

        </div>
        <div className="text-space">
          <input type="checkbox" data-check="grp1" className="input enhanced-checkbox is-enhanced grp1" id="fldCheck1_1" name="optOutPhone" defaultChecked={this.props.userDetails && this.props.userDetails.optOutPhone} ref={(optOutPhone) => { this.optOutPhone = optOutPhone; }} onChange={(e) => { this.handleChangeEvent(e); }} style={{ 'margin-top': '3px' }} />
          <label htmlFor="fldCheck1_1" className={`enhanced-checkbox label-checkbox text-space text-small ${this.props.userDetails && this.props.userDetails.optOutPhone === true ? 'is-checked' : ''}`}>I don't want telephone calls</label>
        </div>
        <div className="text-space">
          <input type="checkbox" data-check="grp1" className="input enhanced-checkbox is-enhanced grp1" id="fldCheck1_2" name="optOutSms" defaultChecked={this.props.userDetails && this.props.userDetails.optOutSms} ref={(optOutSms) => { this.optOutSms = optOutSms; }} onChange={(e) => { this.handleChangeEvent(e); }} style={{ 'margin-top': '3px' }} />
          <label htmlFor="fldCheck1_2" className={`enhanced-checkbox label-checkbox text-space text-small ${this.props.userDetails && this.props.userDetails.optOutSms === true ? 'is-checked' : ''}`}>I don't want SMSs</label>
        </div>
        <div className="text-space">
          <input type="checkbox" data-check="grp1" className="input enhanced-checkbox is-enhanced grp1" id="fldCheck1_3" name="optOutEmail" defaultChecked={this.props.userDetails && this.props.userDetails.optOutEmail} ref={(optOutEmail) => { this.optOutEmail = optOutEmail; }} onChange={(e) => { this.handleChangeEvent(e); }} style={{ 'margin-top': '3px' }} />
          <label htmlFor="fldCheck1_3" className={`enhanced-checkbox label-checkbox text-space text-small ${this.props.userDetails && this.props.userDetails.optOutEmail === true ? 'is-checked' : ''}`}>I don't want emails</label>
        </div>
        <div className="text-space">
          <input type="checkbox" data-check="grp1" className="input enhanced-checkbox is-enhanced grp1" id="fldCheck1_4" name="optOutPost" defaultChecked={this.props.userDetails && this.props.userDetails.optOutPost} ref={(optOutPost) => { this.optOutPost = optOutPost; }} onChange={(e) => { this.handleChangeEvent(e); }} style={{ 'margin-top': '3px' }} />
          <label htmlFor="fldCheck1_4" className={`enhanced-checkbox label-checkbox text-space text-small ${this.props.userDetails && this.props.userDetails.optOutPost === true ? 'is-checked' : ''}`}>I don't want post</label>
        </div>

        <div>
          <input id="fldCheck2" type="checkbox" name="optOutFinServices" className="input enhanced-checkbox is-enhanced" defaultChecked={this.props.userDetails && this.props.userDetails.optOutFinServices} ref={(optOutFinServices) => { this.optOutFinServices = optOutFinServices; }} onChange={(e) => { this.handleOptOutFinServices(e); }} style={{ 'margin-top': '3px' }} />
          <label htmlFor="fldCheck2" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.optOutFinServices === true ? 'is-checked' : ''}`}>Woolworths Financial Services (a tick indicates you have opted out of receiving this form of communication)</label>
        </div>
        <div className="text-space">
          <input type="checkbox" className="input enhanced-checkbox is-enhanced grp2" id="fldCheck2_1" name="wwfOptOutPhone" defaultChecked={this.props.userDetails && this.props.userDetails.wwfOptOutPhone} ref={(wwfOptOutPhone) => { this.wwfOptOutPhone = wwfOptOutPhone; }} onChange={(e) => { this.handleChangeEvent(e); }} />
          <label htmlFor="fldCheck2_1" className={`enhanced-checkbox label-checkbox text-space text-small ${this.props.userDetails && this.props.userDetails.wwfOptOutPhone === true ? 'is-checked' : ''}`}>I don't want telephone calls</label>
        </div>
        <div className="text-space">
          <input type="checkbox" className="input enhanced-checkbox is-enhanced grp2" id="fldCheck2_2" name="wwfOptOutSms" defaultChecked={this.props.userDetails && this.props.userDetails.wwfOptOutSms} ref={(wwfOptOutSms) => { this.wwfOptOutSms = wwfOptOutSms; }} onChange={(e) => { this.handleChangeEvent(e); }} />
          <label htmlFor="fldCheck2_2" className={`enhanced-checkbox label-checkbox text-space text-small ${this.props.userDetails && this.props.userDetails.wwfOptOutSms === true ? 'is-checked' : ''}`}>I don't want SMSs</label>
        </div>
        <div className="text-space">
          <input type="checkbox" className="input enhanced-checkbox is-enhanced grp2" id="fldCheck2_3" name="wwfOptOutEmail" defaultChecked={this.props.userDetails && this.props.userDetails.wwfOptOutEmail} ref={(wwfOptOutEmail) => { this.wwfOptOutEmail = wwfOptOutEmail; }} onChange={(e) => { this.handleChangeEvent(e); }} />
          <label htmlFor="fldCheck2_3" className={`enhanced-checkbox label-checkbox text-space text-small ${this.props.userDetails && this.props.userDetails.wwfOptOutEmail === true ? 'is-checked' : ''}`}>I don't want emails</label>
        </div>
        <div className="text-space">
          <input type="checkbox" className="input enhanced-checkbox is-enhanced grp2" id="fldCheck2_4" name="wwfOptOutPost" defaultChecked={this.props.userDetails && this.props.userDetails.wwfOptOutPost} ref={(wwfOptOutPost) => { this.wwfOptOutPost = wwfOptOutPost; }} onChange={(e) => { this.handleChangeEvent(e); }} />
          <label htmlFor="fldCheck2_4" className={`enhanced-checkbox label-checkbox text-space text-small ${this.props.userDetails && this.props.userDetails.wwfOptOutPost === true ? 'is-checked' : ''}`}>I don't want post</label>

        </div>
        <div className="my-details-section__row grid--space-y">
          <input name="submit" id="fldUpdate" type="submit" defaultValue="Update" className="btn btn--primary btn--right grid--space-y" />
        </div>

      </form>
    );
  }
  render() {

    const synchronizeStatus = this.props.currentUser && this.props.currentUser.synchronizeStatus;

    return (
      <div className="grid grid--space-y page-layout">
        <div className="page-layout__content">


          <div className="grid">
            <h1 className="font-graphic text-caps">My Preferences</h1>

            <div className="grid">
              <h2 className="heading--2 text-caps font-graphic">Promotional Information</h2>
              <p className="text-medium">I <span className="text-wfs strong">DO NOT WANT</span> to receive promotional information* from:</p>
              <div className="grid">
                {
                  synchronizeStatus === true ?
                     this.linkedUser() 
                  : this.nonLinkedUser()
                }
              </div>
              <div className="grid">
                <p className="text-small">To get the latest news on products, great savings and exciting competitions, <a href="/store/fragments/wrewards/wrewards-application.jsp?content=../dashboard/rewards/apply-wrewards&apply=rewards">sign-up</a> for our <span className="text-wfs strong">W</span>Rewards programme. Already a member? <a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/connect-card">Link your card</a> now.</p>
              </div>
              <hr />
              <div className="grid">
                <p className="text-xsmall text-grey-dark">* This relates to your Woolworths Online profile only.</p>
                <p className="text-xsmall text-grey-dark">* If you are a member of the MySchool program please contact the MySchool call centre on 0860 100 445 to manage the information you receive from MySchool.</p>
              </div>
            </div>
            {/* CONSENTS NOT LINKED */}
          </div>
          {/* CONSENTS */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    currentUser: state.clp.currentUser,
    userDetails: state.preferenceReducer.preferenceFormReducer.preferenceData.data
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getpreferencesPageData, postpreferencesData }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Preference);
