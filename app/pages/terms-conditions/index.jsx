import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {getTermsNCondtions} from './actions';

class TermsConditions extends Component {
  static need = [
    getTermsNCondtions
  ];
  constructor(props) {
    super(props);
    // this.state = {
    //   termsData : []
    // }
    this.primeComponent = this.primeComponent.bind(this);
    this.secondaryComponent =this.secondaryComponent.bind(this);
    this.panelSection = this.panelSection.bind(this);
  }
  componentDidMount(){
    // axios.get("http://172.21.40.151:8180/public/v1/common/jsonContent/termsandconditions") 
    //   .then((response)=>{
    //     this.setState({
    //         termsData : response.data.termsandconditions.Legal
    //     });
    // });
  }
  panelSection(getPanelData){
    const createPanels = getPanelData.panels;
    return createPanels.map((item,index)=>{
      return  (
        <section className="panel panel--padded grid__third--medium" key={index}>
          <h2 className="heading heading--3 text-caps font-graphic">{item.panelHeading}</h2> 
          <Link to={item.panelContent.url} className="btn btn--secondary btn--right btn--block btn--align-left btn--block">{item.panelContent.displayName}</Link>
        </section>);
    });
    
  }
  secondaryComponent(){
    return(
      <div className="grid grid--space-y">
        <div className="grid">
          <header> 
          </header> 
          <div className="grid">
            <img className=" img-fill-responsive" alt={this.props.termsData.heading} src={this.props.termsData.imageUrl} />
          </div>
        
          <p className="text-intro" />
        
          <article className="grid grid--space-y">
            {this.props.termsData.panels ? this.panelSection(this.props.termsData) : null}
          </article>	
          
        </div>	
      </div>
    );
  }
  primeComponent(){
    return(  
      <main className="grid grid--space-y site-main">
        <div className="main-page ">
        	
          <nav className="breadCrumbs empty" />
         
          <div className="grid page-layout">
            {this.secondaryComponent()}
          </div>	
        </div>
      </main>
      );
  }
  render() {
    return (
      <div>
        {this.primeComponent()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    termsData : state.footerTermsdReducer.termsData
    };
};

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({getUsingWoolworthsOnline}, dispatch);
// };

export default connect(mapStateToProps)(TermsConditions);
