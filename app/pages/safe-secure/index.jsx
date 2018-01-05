import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import {getUsingSafenSecure} from './actions';
import {bindActionCreators} from 'redux';
import SideBarComponent  from '../../components/basic/SideBarContent';
class SafeAndSecure extends Component {
  static need = [getUsingSafenSecure];
  constructor(props) {

    super(props);

    this.primaryComponent = this.primaryComponent.bind(this);
    this.pageContent = this.pageContent.bind(this);
  
    this.paymentInfo = this.paymentInfo.bind(this);
    this.threeDSecure  = this.threeDSecure.bind(this);
    
  }
  componentDidMount(){
  }
  primaryComponent(){
    return(
      <div className="main-page ">
      <nav className="breadCrumbs empty" />
      <div className="grid page-layout">
         <div className="page-layout__aside">     
             { this.props.contentAside && <SideBarComponent leftData={this.props.contentAside}/>}
         </div>
         {this.pageContent()}
      </div>
   </div>
    );
  }
  
  pageContent(){
    return(
      <div className="page-layout__content">
      <div className="grid">
         <article>
            <h1 className="heading heading--1 text-caps font-graphic">{this.props.secureData.heading}</h1>
            <div className="text-small">
              <div>{this.props.secureData.description}</div>
              <h2>Protected Payment Info</h2>
              {this.props.secureData && this.props.secureData.ProtectedPaymentInfo && this.paymentInfo(this.props.secureData)}
              <p><Link className="btn btn--primary btn--right btn--align-left btn--atc no-wrap" to={this.props.moreOnThis.searchBtnUrl}>{this.props.moreOnThis.searchBtnTxt}</Link></p>
              {this.props.secureData && this.props.secureData['3DSecure'] && this.threeDSecure(this.props.secureData)}
              <p><Link className="btn btn--primary btn--right btn--align-left btn--atc no-wrap" to={this.props.moreOnPayments.searchBtnUrl}>{this.props.moreOnPayments.searchBtnTxt}</Link></p>
              <div>{this.props.customerService}</div>
              <p><Link className="btn btn--primary btn--right btn--align-left btn--atc no-wrap" to={this.props.startshop.searchBtnUrl}>{this.props.startshop.searchBtnTxt}</Link></p>  
            </div>
         </article>
      </div>
   </div>
    );
  }
  paymentInfo(getPaymentData){
    return getPaymentData.ProtectedPaymentInfo.map((item,i)=>{
      var keyValue = Object.keys(item)
      return(
        <div key={i}>  
          <div><strong>{item[keyValue[0]].heading}</strong></div>
          <div>{item[keyValue[0]].DATA.description}</div>
          <div>&nbsp;</div>  
        </div>
      );
    });
  }
  threeDSecure(getthreeDData){
    return getthreeDData['3DSecure'].map((item,i)=>{
    var keyValue = Object.keys(item);
    let questionDataLi =  [];
    let questionDataDiv =  [];
    if(keyValue == 'question2') {
     item[keyValue[0]].DATA.answerlistdata.map((answers,i)=>{
      questionDataLi.push(<li key = {i} >{answers[Object.keys(answers)[0]]}</li>)
      })
    }
    else if(keyValue == 'question3'){
      item[keyValue[0]].DATA.answerlistdata.map((answers,i)=>{
        questionDataDiv.push(<div key = {i} >&#8226; {answers[Object.keys(answers)[0]]}</div>)
      })
    }
      return(
        <div key={i}>  
          <div><strong>{item[keyValue[0]].heading}</strong></div>
          {questionDataLi ? <ul>{questionDataLi}</ul> : ""}
          <div>{item[keyValue[0]].DATA.description}</div>
          {questionDataDiv}
          <div>&nbsp;</div>  
        </div>
      );
    });
  }
  render() {
    return (
      <div>
   <main className="grid grid--space-y site-main">
      {this.primaryComponent()}
   </main>
</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    secureData : state.secureReducer.secureData.SHOPONLINESAFELYWITHWOOLIES,
    contentAside : state.secureReducer.secureData.LeftNav,
    moreOnPayments : state.secureReducer.secureData.MOREONPAYMENTS,
    moreOnThis : state.secureReducer.secureData.MOREONTHIS,
    startshop : state.secureReducer.secureData.STARTSHOPPING,
    customerService : state.secureReducer.secureData.CustomerServiceMessage
    };
};

export default connect(mapStateToProps)(SafeAndSecure);

