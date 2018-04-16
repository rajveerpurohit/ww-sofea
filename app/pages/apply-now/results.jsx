import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import { postSelectOffers, getclearWfsSession } from './actions';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callMeBack: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOopsResult() {
    return (
      <div className="grid grid--space-y wfs-app">
        <div className="heading-group text-align-center">
          <h1 className="heading-group__title text-caps landing__header font-graphic">Your online application</h1>
          <p className="heading-group__subtitle text-medium">Oops, we are experiencing technical issues with your application. Please try again later or<br />call us on 0861 50 20 20.</p>
          <br />
          <Link to="/" className="btn btn--primary wfs-app__button-next">Done</Link>
        </div>
      </div>
    );
  }
  handleProvOfferDeclineResult() {
    return (
      <div className="grid grid--space-y wfs-app">
        <div className="heading-group text-align-center">
          <h1 className="heading-group__title text-caps text-largest font-graphic">Your online application</h1>
          <p className="heading-group__subtitle text-medium">This will take less than 10 minutes</p>
        </div>
        <ul className="nav-list-x progress">
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Apply</span></li>
          <li className="progress__step"><span className="icon icon--wfs-app-step-incomplete" /><span className="progress__label text-medium">Personal info</span></li>
          <li className="progress__step"><span className="icon icon--wfs-app-step-incomplete" /><span className="progress__label text-medium">Income + expenses</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Results</span></li>
        </ul>
        <h4 className="text-align-center font-graphic">Your application was not successful</h4>
        <p className="text-medium">Thank you for applying with Woolworths Financial Services. Unfortunately, we cannot offer you a .</p>
        <p className="text-medium">For more information, please call 0861502020.</p>
        <br />
        <Link to="/" className="btn btn--primary wfs-app__button-next">Done</Link>
      </div>
    );
  }
  handleWhatHappensNextResult() {
    return (
      <div className="grid grid--space-y wfs-app">
        <div className="heading-group text-align-center">
          <h1 className="heading-group__title text-caps text-largest font-graphic">Your online application</h1>
          <p className="heading-group__subtitle text-medium">This will take less than 10 minutes</p>
        </div>
        <ul className="nav-list-x progress">
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Apply</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Personal info</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Income + expenses</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Results</span></li>
        </ul>
        <h4 className="text-align-center font-graphic">What happens next?</h4>
        <h5>We will contact you in 24-48 hours to let you know when to collect your card.</h5>
        <p className="text-medium">Meanwhile, please send us the following documents:</p>
        <ul className="text-medium">
          <li>Your three latest payslips or</li>
          <li>Your last three months' bank statements</li>
        </ul>
        <p className="text-medium">Send to: income@wfs.co.za or fax it to 021 407 50 40</p>
        <p className="text-medium">When collecting your card at your nearest Woolies store, please bring along your:</p>
        <ul className="text-medium">
          <li>South African bar coded ID or Smart card ID and</li>
          <li>Proof of residence, not older than 3 months (may not be an ABSA or Woolworths statement).</li>
        </ul>
        <br />
        <Link to="/" className="btn btn--primary wfs-app__button-next">Done</Link>
      </div>);
  }
  handleCallMeBack() {
    return (
      <div className="grid grid--space-y wfs-app">
        <div className="heading-group text-align-center">
          <h1 className="heading-group__title text-caps text-largest font-graphic">Your online application</h1>
          <p className="heading-group__subtitle text-medium">This will take less than 10 minutes</p>
        </div>
        <ul className="nav-list-x progress">
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Apply</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Personal info</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Income + expenses</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Results</span></li>
        </ul>
        <h4 className="text-align-center font-graphic">Call me back</h4>
        <h5>We will contact you in 24-48 hours to let you know when to collect your card.</h5>
        <p className="text-medium">Meanwhile, please send us the following documents:</p>
        <ul className="text-medium">
          <li>Your three latest payslips or</li>
          <li>Your last three months' bank statements</li>
        </ul>
        <p className="text-medium">Send to: income@wfs.co.za or fax it to 021 407 50 40</p>
        <p className="text-medium">When collecting your card at your nearest Woolies store, please bring along your:</p>
        <ul className="text-medium">
          <li>South African bar coded ID or Smart card ID and</li>
          <li>Proof of residence, not older than 3 months (may not be an ABSA or Woolworths statement).</li>
        </ul>
        <br />
        <Link to="/" class="btn btn--primary wfs-app__button-next">Done</Link>
      </div>);
  }
  handleSubmit(e) {
    e.preventDefault();
    const formObj = { buttonClicked: e.target.name };
    this.props.postSelectOffers(formObj);
  }
  handlePreApprovedScreenResult() {
    const personalInfo = _.get(this.props.applyNowReducer, 'perosnalInfo.wfsSessionBean', {});
    const selectOffers = _.get(this.props.applyNowReducer, 'selectOffers.formexceptions', {});
    return (
      <div className="grid grid--space-y wfs-app">
        <div className="heading-group text-align-center">
          <h1 className="heading-group__title text-caps text-largest font-graphic">Your online application</h1>
          <p className="heading-group__subtitle text-medium">This will take less than 10 minutes</p>
        </div>
        <ul className="nav-list-x progress">
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Apply</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Personal info</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Income + expenses</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Results</span></li>
        </ul>
        <h4 className="text-align-center font-graphic">Your application was successful</h4>
        <p className="text-medium">{personalInfo.tittle} {personalInfo.firstname} , we would like to provisionally offer you the following from Woolworths Financial Services.</p>
        <h4 className="font-graphic">Please only select 1 Woolies product to complete your application with:</h4>
        <form autoComplete="off" name="preApprovedProdForm" data-js="" id="preApprovedProdForm" className="wfs-app__form">
          <ul className="nav-list-x wfs-app__card-type grid grid--space-y" /><br />
          {this.props.location.state === 'faultErrorMessage' || this.props.location.state === 'errorSelectProduct' ? <span className="form-field__msg form-field__msg--error"><span className="errorFld">{selectOffers.message}</span></span> : ''}
          <br /><br />
          <input type="submit" value="Accept" className="input input--submit btn--primary wfs-app__button-next" name="accept" onClick={(e) => { this.handleSubmit(e); }} />
          <Link to="/wfs/wfs-results" className="input input--submit btn--primary wfs-app__button-next" onClick={(e) => { e.preventDefault(); this.setState({ callMeBack: true }); }}>Call me back</Link>
          <input type="submit" value="Not interested" className="input input--submit btn--primary wfs-app__button-next" name="notInterested" onClick={(e) => { this.handleSubmit(e); }} />
        </form>

      </div>
    );
  }
  handleDeclinedHurdleOneResult() {
    return (
      <div className="grid grid--space-y wfs-app">
        <div className="heading-group text-align-center">
          <h1 className="heading-group__title text-caps text-largest font-graphic">Your online application</h1>
          <p className="heading-group__subtitle text-medium">This will take less than 10 minutes</p>
        </div>
        <ul className="nav-list-x progress">
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Apply</span></li>
          <li className="progress__step "><span className="icon icon--wfs-app-step-incomplete" /><span className="progress__label text-medium">Personal info</span></li>
          <li className="progress__step "><span className="icon icon--wfs-app-step-incomplete" /><span className="progress__label text-medium">Income + expenses</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Results</span></li>
        </ul>
        <h4 className="text-align-center font-graphic">Your application was not successful</h4>
        <p className="text-medium">Thank you for applying with Woolworths Financial Services. Unfortunately, we cannot offer you a Store Card.</p>
        <p className="text-medium">For more information, please call 0861502020.</p>
        <br />
        <Link to="/" className="btn btn--primary wfs-app__button-next">Done</Link>

      </div>);
  }
  handleApplicationAlreadyExistsHurdleOneResult() {
    return (
      <div className="grid grid--space-y wfs-app">
        <div className="heading-group text-align-center">
          <h1 className="heading-group__title text-caps text-largest font-graphic">Your online application</h1>
          <p className="heading-group__subtitle text-medium">This will take less than 10 minutes</p>
        </div>
        <ul className="nav-list-x progress">
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Apply</span></li>
          <li className="progress__step"><span className="icon icon--wfs-app-step-incomplete" /><span className="progress__label text-medium">Personal info</span></li>
          <li className="progress__step"><span className="icon icon--wfs-app-step-incomplete" /><span className="progress__label text-medium">Income + expenses</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Results</span></li>
        </ul>
        <h4 className="text-align-center font-graphic">Your application was not processed</h4>
        <p className="text-medium">You have already applied for a Woolworths , and this is still being processed. We cannot offer you another card while the first application is in process.</p>
        <p className="text-medium">For more information, please call 0861502020.</p>
        <br />
        <Link to="/" className="btn btn--primary wfs-app__button-next">Done</Link>
      </div>);
  }
  handleThankYouResult() {
    return (
      <div className="grid grid--space-y wfs-app">
        <div className="heading-group text-align-center">
          <h1 className="heading-group__title text-caps text-largest font-graphic">Your online application</h1>
          <p className="heading-group__subtitle text-medium">This will take less than 10 minutes</p>
        </div>
        <ul className="nav-list-x progress">
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Apply</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Personal info</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Income + expenses</span></li>
          <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">Results</span></li>
        </ul>
        <h4 className="text-align-center font-graphic">Thank You</h4>
        <p className="text-medium">Thank you for your Woolies Store Card application.</p>
        <p className="text-medium">Should you wish to apply in the future, please call 0861 50 20 20 or apply online at <Link to="/wfs/wfs-application-details">APPLY</Link></p>
        <br />
        <Link to="/" className="btn btn--primary wfs-app__button-next">Done</Link>
      </div>);
  }
  render() {
    if (this.props.location.state) {
      return (
        <div className="grid-wrapper checkout-page">
          <main className="grid grid--space-y site-main">
            {this.props.location.state === 'Oops' ? this.handleOopsResult() : ''}
            {this.props.location.state === 'provOfferDecline' ? this.handleProvOfferDeclineResult() : ''}{this.props.location.state === 'whatHappensNext' ? this.handleWhatHappensNextResult() : ''}{this.props.location.state === 'preApprovedScreen' ? this.handlePreApprovedScreenResult() : ''}
            {this.props.location.state === 'Declined Hurdle One' ? this.handleDeclinedHurdleOneResult() : ''}
            {this.props.location.state === 'Application Already Exists Hurdle One' ? this.handleApplicationAlreadyExistsHurdleOneResult() : ''}
            {this.props.location.state === 'faultErrorMessage' ? this.handlePreApprovedScreenResult() : ''}
            {this.props.location.state === 'errorSelectProduct' ? this.handlePreApprovedScreenResult() : ''}
            {this.props.location.state === 'accept' ? this.handleWhatHappensNextResult() : '' }
            {this.props.location.state === 'notInterested' ? this.handleThankYouResult() : '' }
          </main>
        </div>
      );
    }
    return (
      <div className="grid-wrapper checkout-page">
        <main className="grid grid--space-y site-main">
          {this.state.callMeBack ? this.handleCallMeBack() : this.handlePreApprovedScreenResult()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // incomeExpenses: state.applyNowReducer.incomeExpenses,
    // selectOffers: state.applyNowReducer.selectOffers,
    applyNowReducer: _.get(state, 'applyNowReducer', {})
  };
};

export default connect(mapStateToProps, { postSelectOffers, getclearWfsSession })(Results);
