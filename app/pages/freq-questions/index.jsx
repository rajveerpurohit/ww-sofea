import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {getFAQ,getFaqDetails,getLeftNav} from './actions';
import {getHelpAction} from '../help-center/actions';
import SideBarComponent  from '../../components/basic/SideBarContent';
import Accordion from '../../components/basic/accordion';

class FAQ extends Component {
  static need = [
    getFAQ,
    getLeftNav
  ];
  constructor(props) {
    super(props);
    
    this.primaryComponent =  this.primaryComponent.bind(this);
    this.freqaskedWrapper  = this.freqaskedWrapper.bind(this);
    this.freqList = this.freqList.bind(this);
    this.faqDetails = this.faqDetails.bind(this);
    this.FindComponent  = this.FindComponent.bind(this);
    this.faqDetailsHeading = '';
  }
  componentDidMount(){
    if(this.props.routeParams.faqId){
      this.props.getFaqDetails(this.props.routeParams.faqId);
    }
  }
  freqaskedWrapper(){
    return(
      <div className="contentBlock faqLinks-wrapper">
        <h1 className="font-graphic">FAQS</h1>
        <p className="text-intro">Click on the topics below to view the related FAQs.</p>
        <div className="faqLinks">
          <ul className="grid list--silent text-small">   
            {this.props.FaqsContentDisplayBean && this.freqList(this.props.FaqsContentDisplayBean)} 
          </ul> 
        </div> 
      </div> 
    );
  }
  freqList(getListData){

    return getListData.map((item,index)=>{
      
      return(
        <li className="grid__third--medium" key={index}>
          <Link to={'/help/faqs/'+item.contentId} className="list__item--chevron" onClick={() => {this.props.getFaqDetails(item.contentId);this.faqDetailsHeading = item.contentName;}}>{item.contentName}</Link>
        </li>
      );
    });
  }
  FindComponent(){
    return(
      <div className="grid grid--space-y">
        <h3 className="font-graphic text-caps">Can't Find What You're After?</h3>
        <p className="text-intro">Let us know and we'll get you the info you're looking for as soon as possible.</p>
        <p><Link to="/contactus" className="btn btn--primary btn--right">Send us your question</Link></p> 
      </div>
    );
  }
  faqDetails(){
    var faqData = [];
    if(this.props.faqAccData){
      faqData = this.props.faqAccData;
      faqData.map((k,i)=>{
        k.id = i;
        k.name = k.question;
        k.details = k.answer;
      });
    } 
    return(
      faqData?<Accordion refinedData={faqData}/>:null
    );
  }
  primaryComponent(){
    return(
      <div className="main-page">
        <nav className="breadcrumb empty" />
        <div className="grid grid--space-y page-layout">
          <div className="page-layout__aside">  
            { this.props.contentAside && <SideBarComponent leftData={this.props.contentAside} />}
          </div>
          <div className="page-layout__content">	
            {this.freqaskedWrapper()}
            <div className="grid grid--space-y">
            {this.faqDetailsHeading?<h3 className="font-graphic text-caps">{this.faqDetailsHeading} FAQ<span>S</span></h3>:''}
            {this.faqDetails()}
            </div>
            <div className="grid grid--space-y">  
            {this.FindComponent()}
            </div>
          </div>  	
        </div>
      </div>	
    );
  }
  render() {
    return (
      <main className="grid grid--space-y site-main">
        {this.primaryComponent()}
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    FaqsContentDisplayBean : state.faqReducer.faqLinkReducer.faqData,
    faqAccData : state.faqReducer.faqDetailsReducer.faqDetails,
    contentAside: state.faqReducer.LeftNavReducer.leftNav,
    };
};

export default connect(mapStateToProps,{getFaqDetails})(FAQ);