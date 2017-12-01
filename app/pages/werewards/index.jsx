import React, { Component } from 'react';
import {connect} from 'react-redux';

export default class WeRewards extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
    <div>
     <main className="grid grid--space-y site-main">
        <div className="main-page ">
          
          <nav className="breadcrumb empty" />
          <input type="hidden" defaultValue id="referer_url" />
          <div className="grid grid--space-y page-layout">
           
            <div className="page-layout__aside">
              
              <nav className="subCategoryNav toggled dashboardNav">
                	
                <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="open-single" data-accordion-type="open-single" data-accordion-animated="true" data-accordion-active="true">
                  <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
                    <div className="accordion__toggle accordion__toggle--chrome accordion__toggle--line heading heading--4" data-js="accordion-toggle">WREWARDS</div>
                    <ul className="list--silent text-small accordion__content--chrome accordion__content accordion__content--animated" data-js="accordion-content" style={{height: 272}}>
                      <li className="active"><a href="/store/fragments/wrewards/wrewards-index.jsp" className="nav-list__link--filter">My WRewards Home</a></li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/nav/wrewards/how-it-works" className="nav-list__link--filter">How It Works</a></li>	<li><a href="/store/nav/wrewards/apply-now" className="nav-list__link--filter">Apply Now</a></li>	<li><a href="/store/cat?Ntt=WReward" className="nav-list__link--filter">Instant Savings</a></li>	<li><a href="/store/fragments/wrewards/wrewards-index.jsp?content=tier-status" className="nav-list__link--filter">Tier Status</a></li>	<li><a href="/store/nav/wrewards/my-school" className="nav-list__link--filter">MySchool</a></li>	<li><a href="/store/nav/wrewards/littleworld" className="nav-list__link--filter">Littleworld</a></li>	<li><a href="/store/nav/wrewards/discovery-vitality" className="nav-list__link--filter">Discovery Vitality</a></li>	<li><a href="/store/nav/wrewards/terms-conditions" className="nav-list__link--filter">T&amp;Cs</a></li>	<li><a href="/store/nav/wrewards/green-rewards" className="nav-list__link--filter">Wrewards Green</a></li>	</ul> </div>	</div>
               
              </nav>
             
            </div>
            <div className="page-layout__content">					
              
              <div className="grid grid--space-y">
                <div className="grid grid__half--medium">
                  <a href="/store/fragments/corporate/corporate-index.jsp?content=../article/article&contentId=cmp205249">
                    <img src="/images/rewards/wrewards_header_banner.jpg" data-src768="/images/rewards/wrewards_header_banner.jpg" data-src960="/images/rewards/wrewards_header_banner.jpg" alt="how it works" className=" img-fill-responsive" />
                  </a>
                </div>
                <div className="grid grid__half--medium">
                  <div className="grid">
                    <div className="grid grid__half--medium">
                      <a href="/store/fragments/common/dimension-search-results.jsp?searchTerm=WRewards&isExact=true">
                        <img src="/images/rewards/wrewards_instantRewards_banner.jpg" data-src768="/images/rewards/wrewards_instantRewards_banner.jpg" data-src960="/images/rewards/wrewards_instantRewards_banner.jpg" alt="Instant Rewards" className="img-fill-responsive" />
                      </a>
                    </div>
                    <div className="grid grid__half--medium">
                      <a href="/store/fragments/wrewards/wrewards-index.jsp?content=tier-status">
                        <img src="/images/rewards/wrewards_tieredRewards_banner.jpg" data-src768="/images/rewards/wrewards_tieredRewards_banner.jpg" data-src960="/images/rewards/wrewards_tieredRewards_banner.jpg" alt="Tiered Rewards" className="img-fill-responsive" />
                      </a>
                    </div>
                  </div>
                  <div className="grid grid--space-y">
                    <div className="grid grid__half--medium">
                      <a href="/store/store/fragments/wrewards/wrewards-index.jsp?content=../lookbook/lookbook-multiple&contentId=cmp207960&context=myschool ">
                        <img src="/images/rewards/wrewards_sharedRewards_banner.jpg" data-src768="/images/rewards/wrewards_sharedRewards_banner.jpg" data-src960="/images/rewards/wrewards_sharedRewards_banner.jpg" alt="Shared Rewards" className="img-fill-responsive" />
                      </a>
                    </div>
                    <div className="grid grid__half--medium">
                      <a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/vouchers">
                        <img src="/images/rewards/wrewards_myVouchers_banner.jpg" data-src768="/images/rewards/wrewards_myVouchers_banner.jpg" data-src960="/images/rewards/wrewards_myVouchers_banner.jpg" alt="My Vouchers" className="img-fill-responsive" />
                      </a>		</div>	</div>	</div>	</div>
              
            </div>	</div>	
        </div></main>
      </div>
    );
  }
}
