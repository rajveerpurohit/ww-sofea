import React, { Component } from 'react';

export default class WaysDetails extends Component {
//   static need = [
//     getUsingAboutUs
//   ];
  constructor(props) {
    super(props);
    this.primeComponent = this.primeComponent.bind(this);
  }
  componentDidMount() {
  }

  primeComponent() {
    return (
      <main className="grid grid--space-y site-main">
        <div className="main-page ">
          {/* CONTENT */}
          {/* BREADCRUMBS */}
          <nav className="breadCrumbs empty" />
          {/* CONTENT WRAPPER */}
          <div className="grid page-layout">
            <div className="page-layout__aside">
              {/* CATEGORY FILTER NAVIGATION */}
              <nav className="subCategoryNav toggled ">
                {/* IF REQUEST URI IS DASHBOARD WE BUILD NAV MANUALLY, OTHERWISE FROM ATG */}
                {/* HELP SUB NAV */}
                {/* lets build the navigation header based on the section */}
                <nav className="page-layout__aside nav-accordion">
                  <ul className="list--silent text-small nav-accordion__list">
                    <li data-toggle-group={1} data-class-open data-class-closed="hidden" className="nav-accordion__list-segment nav-accordion__list-item">
                      <a className="nav-accordion__link heading heading--4 target-is-closed" a>Help</a>
                      <span data-toggle className="nav-accordion__toggle icon icon--down-dark target-is-closed" />
                      <ul data-toggle-content className="list--silent hidden">
                        <li className="nav-accordion__list-item">
                          <a href="/store/fragments/help/help-index.jsp" className="nav-accordion__link">Help</a>
                        </li>
                        <li className="nav-accordion__list-item "><a href="/store/fragments/help/help-index.jsp?content=contact" className="nav-accordion__link">Contact Us</a></li>
                        <li className="nav-accordion__list-item "><a href="/store/fragments/help/help-index.jsp?content=faqs" className="nav-accordion__link">FAQs</a></li>
                        <li className="nav-accordion__list-item "><a href="/store/fragments/customer-service/customer-service-index.jsp?content=find-store" className="nav-accordion__link">Store Locator</a></li>
                        <li className="nav-accordion__list-item "><a href="/store/fragments/help/size-guide/size-guide-index.jsp?content=woolworths-size-guide-index" className="nav-accordion__link">Size Guides</a></li>
                        <li className="nav-accordion__list-item "><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110130" className="nav-accordion__link">Using Woolworths Online</a></li>
                      </ul>
                    </li>
                  </ul>
                </nav>
                {/* END HELP SUB NAV */}
              </nav>
              {/* END CATEGORY FILTER NAVIGATION */}
            </div>
            <div className="page-layout__content">
              <div className="grid">
                {/*  load page relevant to url param (based on name) */}
                {/* REFACTORED */}
                {/* FIVE WAYS */}
                <article className="grid">
                  <div className="grid">
                    <div className="grid grid__two-thirds--medium">
                      <h1 className="heading heading--1 text-caps font-graphic">
         Our History
         </h1>
                      <div className="text-small">
                        <p>The first Woolworths store opened its doors to the public in Cape Town in October 1931. And it was founder Max Sonnenberg who captured the public’s imagination with dynamic store policies that set Woolworths apart from its competitors.</p>
                        <p>Three years later, a second branch opened in Durban, with another two in Port Elizabeth and Johannesburg a year later. And since then we’ve been building on our reputation for superior quality, exciting innovation and excellent value.</p>
                      </div>
                    </div>
                    <div className="grid grid__third--medium--last grid__third--medium float-r--medium">
                      <img className="img-fill-responsive" src="/images/elasticera/New_Site/Corporate/eastlondon.jpg" alt="Our History" />
                      <div className="text-small">
         Woolworths East London 1948
         {/* Image caption */}
                      </div>
                    </div>
                    <div className="grid grid__two-thirds--medium grid--space-y">
                      <section className="grid grid__two-thirds--large">
                        <h2>
                          {/* Five ways heading here */}	</h2>
                        <ol className="counter">
                          <li className="counter__increment counter__increment--large">
                            <h3 className="counter__increment-heading--large text-dampen-slight">FIRST TO OFFER EMPLOYEE BENEFITS </h3>
                            <div className="counter__increment-text--large text-small">
         Keen to attract and retain the best retail professionals, Woolworths was among the first local retailers to offer employees a pension fund, medical aid and maternity leave.
         </div>	</li>
                          <li className="counter__increment counter__increment--large">
                            <h3 className="counter__increment-heading--large text-dampen-slight">FIRST IN ADVANCING TECH </h3>
                            <div className="counter__increment-text--large text-small">
         Not just a forward thinking employer, Woolworths was also an early adopter of technology. A lease agreement for the first computer was agreed to with National Cash Registers (NCR) in the late 60s and Woolworths was already using a computerised merchandising system by the early 1970s. &nbsp;
         </div>	</li>
                          <li className="counter__increment counter__increment--large">
                            <h3 className="counter__increment-heading--large text-dampen-slight">FIRST TO INTRODUCE SELL BY DATES </h3>
                            <div className="counter__increment-text--large text-small">
         This dynamic thinking extends to Woolworths product offering. In 1974, Woolworths became the first South African retailer to introduce ‘sell by’ dates on food packaging. Convenience, too, has long been a watchword at Woolworths - we were the first South African retailer to offer pre-washed lettuce and machine-washable wool clothing to consumers.
         </div>	</li>
                          <li className="counter__increment counter__increment--large">
                            <h3 className="counter__increment-heading--large text-dampen-slight">OUR GOOD BUSINESS JOURNEY </h3>
                            <div className="counter__increment-text--large text-small">
         In April 2007, we launched our Good Business Journey – a bold plan to make a difference in eight key areas on our journey towards sustainability: Energy, Water, Waste, Sustainable Farming, Ethical Sourcing, Transformation, Social Development and Health and Wellness. Read more about our <a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110068">Good Business Journey</a>
                              </div>	</li>
                        </ol>
                      </section>
                    </div>	</div>	{/* SOCIAL LINKS */}
                 
                  {/* <nav className="grid grid--space-y">
                    <ul className="nav-list-x">
                     
                      <li className="nav-list-x__item">
                        <iframe id="twitter-widget-0" scrolling="no" frameBorder={0} allowTransparency="true" className="twitter-share-button twitter-share-button-rendered twitter-tweet-button" style={{position: 'static', visibility: 'visible', width: 60, height: 20}} title="Twitter Tweet Button" src="https://platform.twitter.com/widgets/tweet_button.eaf4b750247dd4d0c4a27df474e7e934.en.html#dnt=false&id=twitter-widget-0&lang=en&original_referer=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Ffragments%2Fcorporate%2Fcorporate-index.jsp%3Fcontent%3D..%2Ffive-ways%2FfiveWays%26contentId%3Dcmp204261&size=m&text=Woolworths.co.za%20%7C%20Food%2C%20Home%2C%20Clothing%20%26%20General%20Merchandise%20available%20online!&time=1514536977827&type=share&url=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Ffragments%2Fcorporate%2Fcorporate-index.jsp%3Fcontent%3D..%2Ffive-ways%2FfiveWays%26contentId%3Dcmp204261" />
                      </li>
                     
                      <li className="nav-list-x__item nav-list-x--space">
                        <a className="PIN_1514536978008_button_pin PIN_1514536978008_save" href="https://www.pinterest.com/pin/create/button/?guid=mALu7iPbTthF-1&url=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Ffragments%2Fcorporate%2Fcorporate-index.jsp%3Fcontent%3D..%2Ffive-ways%2FfiveWays%26contentId%3Dcmp204261&media=http%3A%2F%2Fwww.woolworths.co.za%2Fimages%2Felasticera%2FNew_Site%2FCorporate%2Feastlondon.jpg&description=Our%2BHistory" data-pin-log="button_pinit" data-pin-href="https://www.pinterest.com/pin/create/button/?guid=mALu7iPbTthF-1&url=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Ffragments%2Fcorporate%2Fcorporate-index.jsp%3Fcontent%3D..%2Ffive-ways%2FfiveWays%26contentId%3Dcmp204261&media=http%3A%2F%2Fwww.woolworths.co.za%2Fimages%2Felasticera%2FNew_Site%2FCorporate%2Feastlondon.jpg&description=Our%2BHistory">Save</a>
                      </li>
                     
                      <li className="nav-list-x__item nav-list-x--space">
                        <span className="fb_like product__fb-like">
                          <fb:like href="http://www.woolworths.co.za/store/fragments/corporate/corporate-index.jsp?contentId=cmp204261" layout="button_count" show-faces="true" width={450} action="like" colorscheme="light" send="false" className=" fb_iframe_widget" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&app_id=599670703430997&color_scheme=light&container_width=0&href=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Ffragments%2Fcorporate%2Fcorporate-index.jsp%3FcontentId%3Dcmp204261&layout=button_count&locale=en_US&sdk=joey&send=false&show_faces=true&width=450"><span style={{verticalAlign: 'bottom', width: 67, height: 20}}><iframe name="f2158d5d58537a8" width="450px" height="1000px" frameBorder={0} allowTransparency="true" allowFullScreen="true" scrolling="no" title="fb:like Facebook Social Plugin" src="https://www.facebook.com/plugins/like.php?action=like&app_id=599670703430997&channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FlY4eZXm_YWu.js%3Fversion%3D42%23cb%3Df203399d56867d%26domain%3Dwww.woolworths.co.za%26origin%3Dhttp%253A%252F%252Fwww.woolworths.co.za%252Ff197c08b72145%26relation%3Dparent.parent&color_scheme=light&container_width=0&href=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Ffragments%2Fcorporate%2Fcorporate-index.jsp%3FcontentId%3Dcmp204261&layout=button_count&locale=en_US&sdk=joey&send=false&show_faces=true&width=450" style={{border: 'none', visibility: 'visible', width: 67, height: 20}} className /></span></fb:like></span>
                      </li>
                    </ul>
                  </nav> */}
                  {/* END PRODUCT SOCIAL LINKS */}
                </article>
                {/* END FIVE WAYS */}
              </div>	</div>
          </div>
        </div>
        {/* /.main-page */}
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
    // aboutUsData: state.aboutUsReducer.aboutUsData,
    // contentAside: state.aboutUsReducer.contentAside
    };
};

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({getUsingWoolworthsOnline}, dispatch);
// };

// export default connect(mapStateToProps)(AboutUs);
