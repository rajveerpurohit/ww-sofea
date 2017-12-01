import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {getUsingAboutUs} from './actions';

class AboutUs extends Component {
  static need = [
    getUsingAboutUs
  ];
  constructor(props) {
    super(props);
    console.log(this.props);
    this.primeComponent = this.primeComponent.bind(this);
    this.secondaryComponent  = this.secondaryComponent.bind(this);
    this.panelSection = this.panelSection.bind(this);
  }
  componentDidMount(){
    console.log("aboutus:8888888888888 " + this.props)
    // axios.get("http://172.21.40.151:8180/public/v1/common/jsonContent/aboutus") 
    //   .then((response)=>{
    //     this.setState({
    //       aboutUsData : response.data.aboutus.AboutUs
    //     });
    // });
  }
  secondaryComponent(){
    return(
      <div className="grid grid--space-y">
        <div className="grid">
          <header> 
          </header> 
          <div className="grid">
            <img className=" img-fill-responsive" alt={this.props.aboutUsData.heading} src={this.props.aboutUsData.imageUrl} />
          </div>
        
          <p className="text-intro" />
        
          <article className="grid grid--space-y">
            {this.props.aboutUsData.panels ? this.panelSection(this.props.aboutUsData) : null}
          </article>	
          
        </div>	
      </div>
    );
  }
  panelSection(getPanelData){
    const createPanels = getPanelData.panels;
    return createPanels.map((item,index)=>{
      return  (
        <section className="panel panel--padded grid__third--medium" key={index}>
          <h2 className="heading heading--3 text-caps font-graphic">{item.panelHeading}</h2> 
          <a href={item.panelContent.url} className="btn btn--secondary btn--right btn--block btn--align-left btn--block">{item.panelContent.displayName}<span /></a>
        </section>);
    });
    
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
    aboutUsData : state.aboutUsReducer.aboutUsData
    };
};

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({getUsingWoolworthsOnline}, dispatch);
// };

export default connect(mapStateToProps)(AboutUs);