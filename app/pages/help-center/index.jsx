import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {getHelpAction} from './actions';

class HelpCenter extends Component {
  static need = [
    getHelpAction
  ];
  constructor(props) {
    super(props);
    // this.state = {
    //    helpData : []
    // }
    this.primeComponent = this.primeComponent.bind(this);
    this.secondaryComponent = this.secondaryComponent.bind(this);
    this.findComponenet  = this.findComponenet.bind(this);
    this.createPanelSection  = this.createPanelSection.bind(this); 
  }
  componentDidMount(){
    console.log("helpcenter : "+ this.props);
    // axios.get("http://172.21.40.151:8180/public/v1/common/jsonContent/help") 
    //   .then((response)=>{
    //     this.setState({
    //       helpData : response.data.help.help
    //     });
    // });
  }
  createPanelSection(getPanelData) {
    const CreatePanel = getPanelData.panels;
    return CreatePanel.map((item,index)=>{
      return(
        <div className="grid__third--large" key={index}>
          <div className="panel">
            <h3 className="font-graphic text-caps">{item.panelHeading}</h3>
            <Link to={item.panelContent.url} className="btn btn--secondary btn--block btn--right btn--align-left">{item.panelContent.displayName}</Link>
          </div>
        </div>
      );
    });
  }
  findComponenet(){
    return(
      <div className="grid grid--space-y">
        <hr className="hr--light" />
        <h2 className="font-graphic text-caps">Didn't find what you were looking for?</h2>
        <p className="text-intro">Send us your question and we'll get back to you!</p>
        <a className="btn btn--primary btn--right" href="/store/fragments/help/help-index.jsp?content=contact">Send us your Question</a>
      </div>
    );
  }
  secondaryComponent(){
    return(
      <div className="grid grid--space-y">
        <h1 className="font-graphic text-caps">{this.props.helpData.heading}</h1>
        <p className="text-intro">{this.props.helpData.description}</p>
        {this.props.helpData.panels ? this.createPanelSection(this.props.helpData) : null}
      </div>
    );
  }
  primeComponent(){
    return(
      <main className="grid grid--space-y site-main">
      <div className="main-page ">
       
        <nav className="breadcrumb empty" />
        <div className="grid grid--space-y page-layout">
          <div className="grid grid--space-y">
            {this.secondaryComponent()}
            {this.findComponenet()} 
          </div>	
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
    helpData : state.helpCenterReducer.aboutUsData.help
    };
};

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({getUsingWoolworthsOnline}, dispatch);
// };

export default connect(mapStateToProps)(HelpCenter);