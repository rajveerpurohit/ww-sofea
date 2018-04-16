import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { getInterestPageData, postInterestsData } from './actions';

class MyInterests extends Component {
  // static need = [
  //   getInterestPageData
  // ]
  constructor(props) {
    super(props);
    this.onSubmitFunction = this.onSubmitFunction.bind(this);
    this.handleMaincheck = this.handleMaincheck.bind(this);
  }
  componentDidMount() {
    this.props.getInterestPageData();
  }
  onSubmitFunction(e) {
    e.preventDefault();
    const data = {
      foodsAndFlavour: this.foodsandFlavour.checked.toString(),
      wine: this.wine.checked.toString(),
      health: this.health.checked.toString(),
      fashion: this.fashion.checked.toString(),
      kidsAndBaby: this.kidsandBaby.checked.toString(),
      offersAndPromotions: this.offersandPromotions.checked.toString(),
      sustainability: this.sustainability.checked.toString()
    };
    this.props.postInterestsData(data);
  }
  handleMaincheck(event) {
    if (event.target.checked === true) {
      event.target.nextSibling.classList.add('is-checked');
    } else {
      event.target.nextSibling.classList.remove('is-checked');
    }
  }
  render() {
    console.log('props', this.props.userDetails);
    return (
      <div className="main-page ">
        <nav className="breadcrumb empty" />
        <div className="grid grid--space-y page-layout">
          <div className="page-layout__content">
            <div className="grid">
              <h1 className="font-graphic text-caps">My Preferences</h1>
              <h2 className="font-graphic text-caps">My Interests</h2>
              <p className="text-intro text-medium">Please tell us what you are interested in:</p>
              <p className="text-small">A tick indicates you are interested in this topic.</p>
              <div className="grid">
                <form onSubmit={this.onSubmitFunction} name="interestsForm" id="interestsForm" className="contactForm interestsForm validateForm">

                  <div>
                    <input name="foodsandFlavour" id="fldCheck1" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} defaultChecked={this.props.userDetails && this.props.userDetails.foodsandFlavour} ref={(foodsandFlavour) => { this.foodsandFlavour = foodsandFlavour; }} style={{ 'margin-top': '3px' }} />

                    <label htmlFor="fldCheck1" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.foodsandFlavour === true ? 'is-checked' : ''}`}>
                      Foods &amp; Flavour
                    </label>

                  </div>
                  <div>
                    <input name="wine" id="fldCheck2" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} defaultChecked={this.props.userDetails && this.props.userDetails.wine} ref={(wine) => { this.wine = wine; }} style={{ 'margin-top': '3px' }} />
                    <label htmlFor="fldCheck2" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.wine === true ? 'is-checked' : ''}`}>
                      Wine
                    </label>
                  </div>
                  <div>
                    <input name="health" id="fldCheck3" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} defaultChecked={this.props.userDetails && this.props.userDetails.health} ref={(health) => { this.health = health; }} style={{ 'margin-top': '3px' }} />
                    <label htmlFor="fldCheck3" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.health === true ? 'is-checked' : ''}`}>
                      Health
                    </label>
                  </div>
                  <div>
                    <input name="fashion" id="fldCheck4" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} defaultChecked={this.props.userDetails && this.props.userDetails.fashion} ref={(fashion) => { this.fashion = fashion; }} style={{ 'margin-top': '3px' }} />
                    <label htmlFor="fldCheck4" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.fashion === true ? 'is-checked' : ''}`}>
                      Fashion
                    </label>
                  </div>
                  <div>
                    <input name="kidsandBaby" id="fldCheck5" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} defaultChecked={this.props.userDetails && this.props.userDetails.kidsandBaby} ref={(kidsandBaby) => { this.kidsandBaby = kidsandBaby; }} style={{ 'margin-top': '3px' }} />
                    <label htmlFor="fldCheck5" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.kidsandBaby === true ? 'is-checked' : ''}`}>
                      Kids &amp; Baby
                    </label>
                  </div>
                  <div>
                    <input name="offersandPromotions" id="fldCheck6" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} defaultChecked={this.props.userDetails && this.props.userDetails.offersandPromotions} ref={(offersandPromotions) => { this.offersandPromotions = offersandPromotions; }} style={{ 'margin-top': '3px' }} />
                    <label htmlFor="fldCheck6" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.offersandPromotions === true ? 'is-checked' : ''}`}>
                      Offers and Promotions
                    </label>
                  </div>
                  <div>
                    <input name="fldCheck7" id="fldCheck7" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} defaultChecked={this.props.userDetails && this.props.userDetails.sustainability} ref={(sustainability) => { this.sustainability = sustainability; }} style={{ 'margin-top': '3px' }} />
                    <label htmlFor="fldCheck7" className={`enhanced-checkbox label-checkbox text-small ${this.props.userDetails && this.props.userDetails.sustainability === true ? 'is-checked' : ''}`}>
                      Sustainability, Organic, Eco Friendly &amp; Community
                    </label>
                  </div>
                  <div className="my-details-section__row grid--space-y submitField">

                    <input name="submit" id="fldUpdate" type="submit" defaultValue="Update" className="btn btn--primary btn--right grid--space-y" /><input name="_D:submit" type="hidden" defaultValue=" " />
                  </div>
                </form>
              </div>
            </div>
            {/* INTERESTS */}
          </div>	</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      // currentUser: state.clp.currentUser,
    userDetails: state.interestReducer.interestFormReducer.interestData.data
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getInterestPageData, postInterestsData }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(MyInterests);
