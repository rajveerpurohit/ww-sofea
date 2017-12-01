import React, { Component } from 'react';
import {connect} from 'react-redux';


export default class StoreLocator extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
        
      <div className="grid-wrapper site-page content--centered">
        <main className="grid grid--space-y site-main">
          <div className="main-page ">
           
            <nav className="breadcrumb empty" />
            <input type="hidden" defaultValue="http://www.woolworths.co.za/store/fragments/help/help-index.jsp?faqId=cfaq000071&content=faqs" id="referer_url" />
            <div className="grid grid--space-y page-layout">
             
              <div className="page-layout__aside">
              
                <nav className="subCategoryNav toggled ">
                
                  <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="open-single" data-accordion-type="open-single" data-accordion-animated="true" data-accordion-active="true">
                    <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
                      <div className="accordion__toggle accordion__toggle--chrome accordion__toggle--line heading heading--4" data-js="accordion-toggle">Store Locator</div>
                      <ul className="list--silent text-small accordion__content--chrome accordion__content accordion__content--animated" data-js="accordion-content" style={{height: 164}}>
                        <li className="active"><a href="/store/fragments/help/help-index.jsp" className="nav-list__link--filter">Help</a></li>	<li><a href="/store/fragments/help/help-index.jsp?content=contact" className="nav-list__link--filter">Contact Us</a></li>	<li><a href="/store/fragments/help/help-index.jsp?content=faqs" className="nav-list__link--filter">FAQs</a></li>	<li className="heading heading--4"><a href="/store/fragments/customer-service/customer-service-index.jsp?content=find-store" className="nav-list__link--filter">Store Locator</a></li>	<li><a href="/store/fragments/help/size-guide/size-guide-index.jsp?content=woolworths-size-guide-index" className="nav-list__link--filter">Size Guides</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110130" className="nav-list__link--filter">Using Woolworths Online</a></li>	</ul> </div>	</div>
                
                </nav>
               
              </div>
              <div className="page-layout__content">					
              
                <div className="grid grid--space-y">
                  <header>
                    <h1 className="text-caps font-graphic">Store Locator</h1>
                  </header>
                  <article className="findAStore">  
                    <div className>
                    
                      <section className="findAStoreNearMe" style={{display: 'none'}}>
                        <h2 className="text-caps font-graphic">Find a Store near me</h2> <p><strong>Find a Store in your area</strong>: (Choose a proximity in KMs below and then click 'show me nearby Store')</p>
                        <form id className="wForm" method="post" action="/" name="question">
                          <p style={{display: 'inline-block'}}>Show me Store within a &nbsp; </p>
                          <div className="form-field storeRadius" data-js="form-field" style={{display: 'inline-block', float: 'left'}}>  
                            <span className="enhanced-select"><select id="storeRadius" name="question" data-js="enhance-select">
                                <option value={1}>1</option>
                                <option data-validate-unselected="true" value={5} selected>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                              </select><span className="enhanced-select__label">5&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                           
                          </div>
                          <p style={{display: 'inline-block'}}>&nbsp; km radius.</p>
                          <div className="form-field storeRadiusButton" data-js="form-field">
                            <a className="button btn btn--primary" id="findKMSubmit" href="#">show nearby Store</a> </div> </form> </section>
                    
                    </div>
                    <section className="or" style={{display: 'none'}}>
                      <strong>Or</strong>
                      <span />
                    </section>
                    <div className>            
                     
                      <section className="findAStoreByArea" style={{width: '60%'}}>
                        <h2 className="text-caps font-graphic">Find a Store by area</h2>
                        <form id="frmStoreByArea" className="wForm" method="post" action="/" name="storeByArea">
                          <div id="provinceSuburbContainer" name="provinceSuburbContainer" className="form-field">
                            <div className="form-field">	
                             
                              <span className="enhanced-select"><select tabIndex={5} id="fldAddressProvince" name="addressProvince" placeholder="Province*" onchange="javascript:chooseRegion(this,'/store')" data-js="enhance-select">
                                  <option value="selectProvince">Select a Province</option>
                                  <option value={1600030}>
                                    Eastern Cape
                                  </option>	
                                  <option value={1600032}>
                                    Free State
                                  </option>	
                                  <option value={1600033}>
                                    Gauteng
                                  </option>	
                                  <option value={1600034}>
                                    Kwa-Zulu Natal
                                  </option>	
                                  <option value={1600035}>
                                    Limpopo
                                  </option>	
                                  <option value={1600036}>
                                    Mpumalanga
                                  </option>	
                                  <option value={1600037}>
                                    North West
                                  </option>	
                                  <option value={1600038}>
                                    Northern Cape
                                  </option>	
                                  <option value={2000030}>
                                    Western Cape
                                  </option>	
                                </select><span className="enhanced-select__label">Select a Province&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                              <div className="formErrors">Select a Province</div>
                            </div>
                           
                            <div className="form-field">
                              <span className="enhanced-select"><select name="suburbId" id="fldSuburb" data-js="enhance-select">
                                 
                                  <option value id="selectedSuburb" selected="selected">Select a Suburb</option>
                                </select><span className="enhanced-select__label">Select a Suburb&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                              <div className="formErrors">Select a Suburb</div>
                            </div>	
                          </div>
                          <div className="storeInMyAreaButton">
                            <a className="button btn btn--primary" id="findStoresSubmit" href="#">show Store by area</a> </div> </form> </section>
                    
                    </div>	</article>	</div>
               
              </div>	</div>	
          </div>	</main>	
      	</div>
      </div>
    );
  }
}
