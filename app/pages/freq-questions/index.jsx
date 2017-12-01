import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {getFAQ} from './actions';


class FAQ extends Component {
  static need = [
    getFAQ
  ];
  constructor(props) {
    super(props);
    // this.state = {
    //   FaqsContentDisplayBean : []
    // };
    this.primeComponenet =  this.primeComponenet.bind(this);
    this.freqaskedWrapper  = this.freqaskedWrapper.bind(this);
    this.freqList = this.freqList.bind(this);
    this.FindComponenet  = this.FindComponenet.bind(this);
  }
  componentDidMount(){
    // this.props.getFAQ()
    console.log("faq : " + this.props)
    // axios.get("http://172.21.40.151:8180/public/v1/common/jsonContent/faqs") 
    // .then((response)=>{
    //   this.setState({
    //     FaqsContentDisplayBean : response.data.FaqsContentDisplayBean
    //   });
    // }); 
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
          <Link to={`/store/fragments/help/help-index.jsp?faqId=${item.contentId}&content=faqs`} className="list__item--chevron">{item.contentName}</Link>
        </li>
      );
    });
  }
  FindComponenet(){
    return(
      <div className="grid grid--space-y">
        <h3 className="font-graphic text-caps">Can't Find What You're After?</h3>
        <p className="text-intro">Let us know and we'll get you the info you're looking for as soon as possible.</p>
        <p><a href="/store/fragments/help/help-index.jsp?content=contact" className="btn btn--primary btn--right">Send us your question</a></p> 
      </div>
    );
  }
  primeComponenet(){
    return(
      <main className="grid grid--space-y site-main">
      <div className="main-page ">
       
        <nav className="breadcrumb empty" />
        <div className="grid grid--space-y page-layout">
          {this.freqaskedWrapper()}
          <div className="grid grid--space-y">  
              {this.FindComponenet()}
          </div>	
        </div>	
      </div>	
    </main>	
    );
  }
  render() {
    return (
      <div>
        {this.primeComponenet()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    FaqsContentDisplayBean : state.faqReducer.faqData
    };
};

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({getFAQ}, dispatch);
// };

export default connect(mapStateToProps)(FAQ);