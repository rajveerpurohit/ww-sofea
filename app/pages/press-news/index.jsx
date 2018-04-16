import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getPressNews} from './actions';
import SideBarComponent from '../../components/basic/SideBarContent';
import Panels from '../../components/basic/panels';

class PressNews extends Component {
  static need = [
    getPressNews
  ];
  constructor(props) {
    super(props);

    this.primeComponent = this.primeComponent.bind(this);
    this.secondaryComponent = this.secondaryComponent.bind(this);
  
  }
  componentDidMount(){
  }
 
  secondaryComponent(){
    return(
      
        <div className="grid">
          <header> 
          </header> 
          <div className="grid">
             <img className=" img-fill-responsive" alt="Placeholder" src={this.props.panelData ? this.props.panelData.imageUrl : ""} /> 
          </div>
          <p className="text-intro" /> 
          <article className="grid grid--space-y">
            {this.props.panelData  ?  <Panels panelData = {this.props.panelData} /> : null}
          </article>	
        </div>	
      
    )
  }
  primeComponent(){
    return(
      <main className="grid grid--space-y site-main">
      <div className="main-page "> 	
        <nav className="breadCrumbs empty" />
        <div className="grid page-layout">
        <div className="page-layout__aside">     
             { this.props.contentAside && <SideBarComponent leftData={this.props.contentAside}/>}
         </div>
         <div className ="page-layout__content">
            {this.secondaryComponent()}
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
    panelData : state.pressNewsReducer.pressNewsData,
    contentAside : state.pressNewsReducer.contentAside,
    };
};

export default connect(mapStateToProps)(PressNews);
