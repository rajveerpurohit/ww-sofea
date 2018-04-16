import React, { Component } from 'react';

export default class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
   
    
  }
 
  render() {
    return (
      <div>
        <main className="grid grid--space-y site-main">
            <div className="main-page ">
                {/* CONTENT */}	{/* BREADCRUMBS */}
                <nav className="breadCrumbs empty" />
                {/* CONTENT WRAPPER */}
                <div className="grid page-layout">
                    <div className="page-layout__aside">
                        {/* CATEGORY FILTER NAVIGATION */}
                        <nav className="subCategoryNav toggled ">
                        {/* IF REQUEST URI IS DASHBOARD WE BUILD NAV MANUALLY, OTHERWISE FROM ATG */}
                        {/* HELP SUB NAV */}{/* lets build the navigation header based on the section */}
                        <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="open-single" data-accordion-type="open-single" data-accordion-animated="true" data-accordion-active="true">
                            <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
                                <div className="accordion__toggle accordion__toggle--chrome accordion__toggle--line heading heading--4" data-js="accordion-toggle">Help</div>
                                <ul className="list--silent text-small accordion__content--chrome accordion__content accordion__content--animated" data-js="accordion-content" style={{height: 156}}>
                                <li className="active"><a href="/store/fragments/help/help-index.jsp" className="nav-list__link--filter">Help</a></li>
                                <li><a href="/store/fragments/help/help-index.jsp?content=contact" className="nav-list__link--filter">Contact Us</a></li>
                                <li><a href="/store/fragments/help/help-index.jsp?content=faqs" className="nav-list__link--filter">FAQs</a></li>
                                <li><a href="/store/fragments/customer-service/customer-service-index.jsp?content=find-store" className="nav-list__link--filter">Store Locator</a></li>
                                <li><a href="/store/fragments/help/size-guide/size-guide-index.jsp?content=woolworths-size-guide-index" className="nav-list__link--filter">Size Guides</a></li>
                                <li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110130" className="nav-list__link--filter">Using Woolworths Online</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* END HELP SUB NAV */}
                        </nav>
                        {/* END CATEGORY FILTER NAVIGATION */}
                    </div>
                    <div className="page-layout__content">
                        <div className="grid">
                        {/*  load page relevant to url param (based on name) */}
                        {/* CORPORATE CONTENT */}{/* REFACTORED */}
                        <article>
                            <h1 className="heading heading--1 text-caps font-graphic">Protecting your privacy</h1>
                            <div className="text-small">
                                <p><strong>Last modified: 31 January 2017</strong></p>
                                <p>Protecting your privacy is as important to us as it is to you. For us, it’s more than just making sure we comply with the relevant legislation; you trust us with your personal information and we respect that trust. This privacy notice explains why and how we collect, use and store your personal information. If you have any questions please contact us at 0860 022 002 or at <a href="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</a>.</p>
                                <h2>What is this notice about?</h2>
                                <h3>We want you to understand who you are sharing your information with, what kind of information we are collecting and how we use the information.</h3>
                                <p>In your day-to-day dealings with Woolworths we obtain information about you. We want you to know exactly what that information is and what we do with it. After all, trust is nothing without transparency.</p>
                                <h3>We need your information to deliver the right product, at the right time and in the right place.</h3>
                                <p>We ask for your information to make sure that we can offer the right product at the right time and in the right place. This includes making sure that you can receive the benefit of the <strong>W</strong>Rewards programme, analysing your data to better understand what your needs are, and sending you promotional information.</p>
                                <h3>The Protection of Personal Information Act protects you.</h3>
                                <p>The Protection of Personal Information Act (POPI) is aimed at protecting your personal information and prescribes what we must and must not do with it. POPI created an Information Regulator who checks that companies like Woolworths manage personal information in a responsible manner that respects your privacy.</p>
                                <h3>Other legislation applies to your personal information.</h3>
                                <p>Other legislation also applies to your personal information. For instance, if you are applying for a Credit Card or a Store Card, the Financial Intelligence Centre Act and the National Credit Act have to be complied with. This means that from time to time we will be obligated to process your personal information in a certain way (or keep it for a certain period).</p>
                                <h3>This privacy notice is part of our agreement with you.</h3>
                                <p>This privacy notice forms part of our agreement with you. You should read it along with the terms and conditions that apply. These terms and conditions can be accessed <a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110048 " style={{textDecoration: 'underline'}}>here</a>.</p>
                                <h3>This notice may change from time to time.</h3>
                                <p>From time to time we may have to amend this notice to accommodate changes in our business or services or if legal requirements change.</p>
                                <h2>Who you are sharing your information with</h2>
                                <h3>Woolworths is a group of companies.</h3>
                                <p>You know us just as Woolworths, but in fact we are a group of companies that includes Woolworths, Woolworths Financial Services and MySchool MyVillage MyPlanet. When you share your information with one of these companies, you may also be sharing it with one of the others.<strong>This notice relates to the following three companies:</strong>Woolworths (Pty) Ltd<strong>Woolworths (Pty) Ltd:</strong> If you join the <strong>W</strong>Rewards programme Woolworths requires your personal information. In addition, your personal information may also be used in the day-to-day business of providing Woolworths products to you.Virtual Market Place (Pty) Ltd (MySchool MyVillage MyPlanet)<strong>Virtual Market Place (Pty) Ltd:</strong> VMP administers the MySchool MyVillage MyPlanet programme. If you are a MySchool MyVillage MyPlanet supporter, they require some personal information. For more on the company <a href="http://www.myschool.co.za" style={{textDecoration: 'underline'}}>click here</a>Woolworths Financial Services (Pty) Ltd<strong>Woolworths Financial Services (Pty) Ltd:</strong> Woolworths Financial Services (WFS) provides the Woolworths in-store card, silver credit card, gold credit card, black credit card, insurance and personal loans. If you use one of these services WFS require your personal information. Your information will also be shared with our banking partner, Barclays Africa Group Ltd. For more on the company <a href="/store/fragments/wfs/wfs-index.jsp" style={{textDecoration: 'underline'}}>click here</a><br /><br />In some instances you may also be sharing your information with other companies that are part of Woolworths Holdings Limited or other companies that help us provide services to you. This notice does not apply to them.</p>
                                <h2>What information we collect</h2>
                                <h3>When you apply to join <strong>W</strong>Rewards, MySchool MyVillage MyPlanet or LittleWorld, or apply for a Woolworths Store Card, Credit Card, loan or insurance, we collected the personal information we need to make it happen.</h3>
                                <p>If you are a member of the <strong>W</strong>Rewards programme, the MySchool programme, LittleWorld programme, have a Store Card or Woolworths Credit Card or an online account we collect your personal information. Depending on what you apply for we require information such as your name, e-mail address, contact numbers, ID or passport number, gender, date of birth, physical address, billing address, payment card details, financial information and history, employment information, communication preferences, language preferences, signature and eventually a Woolworths card number. We collect this information to process your application so you can have a customer record with us. This is how we provide all the services as set out in the terms and conditions for these programmes and cards.</p>
                                <h3>We collect information to analyse purchasing patterns.</h3>
                                <p>If you swipe any Woolworths or MySchool card, we collect some more information, such as your shopping preferences. Analysing information like this helps us ensure we do the best possible job of meeting your needs.</p>
                                <h3>We conduct surveys from time to time.</h3>
                                <p>We send out surveys from time to time. You can choose to respond or not, and you can unsubscribe from receiving them.</p>
                                <h3>We collect information while you use our website.</h3>
                                <p>When you shop at www.woolworths.co.za we collect standard information about your internet connection and website use. We collect this information from registered and unregistered users. We use this information to help us improve our website and online services.<br /><br />The type of information we collect includes the URL you came from, IP address, domain type, browser type, the country and telephone code where your device is located, the web pages viewed during your visit, the advertisements you clicked on, and any search terms you entered on our website (user information).<br /><br />When you place an online order with us, we may offer to store your payment card details for your convenience so you do not have to re-enter these details in future. However, if you prefer that we do not retain these details, you can go to ‘My Account’, click on ‘Edit or delete a credit card’ and delete any card information that we hold about you.</p>
                                <h3>We use cookies to optimise your website experience, but you can opt out.</h3>
                                <p>A cookie is a small piece of information stored by your browser on your device. It may contain some personal details, the contents of your shopping basket, and date and time information in an encrypted format, which can be recalled when you return to the Woolworths website. This speeds up our identification, ordering and delivery processes.<br /><br />We use cookies to identify the device you use to connect to our website. We use anonymous cookies to collect data about how you use our website, so that we can improve and optimise your website experience. We use the anonymous DoubleClick cookie and Google Analytics cookie to optimise your web experience and deliver relevant advertising on the Google Display Network based on the activity of visitors to our website.<br /><br />You can opt out of Google Analytics for Display Advertisers and out of customized Google Display Network advertising by visiting Google's Ad Preferences Manager.</p>
                                <h3>We collect information when you contact our Call Centre to respond to your query.</h3>
                                <p>When you contact our customer support services, we collect information that helps us to categorise your query, respond to it and, if applicable, investigate what went wrong. We also use this information to track potential problems and trends to customise our support responses to provide a better service to you.</p>
                                <h3>We don’t collect the information of persons under 18.</h3>
                                <p>We do not collect the information of persons under 18 without the consent of their parents or guardians. If you are under the age of 18 you must not provide personal information to us without the consent of your parent or guardian.</p>
                                <h3>Our facilities are monitored by CCTV cameras.</h3>
                                <p>Our facilities are monitored by CCTV cameras for public safety, crime prevention and quality control.</p>
                                <h3>Lay-by agreements, WConnect, Gift Cards, beauty counters and other services</h3>
                                <p>We have to collect some of your information when you enter into a lay-by agreement, purchase a cell phone, replace a lost or stolen gift card or transfer a gift card to another branch and other services.</p>
                                <h2>Why we need your personal information</h2>
                                <h3>We use your personal information to provide our products and services to you.</h3>
                                <p>We use your personal information to provide our products and services to you. This includes:</p>
                                <ul>
                                    <li>processing your payment card details in order to complete any purchase,</li>
                                    <li>delivering products that you order online,</li>
                                    <li>calculating your <strong>W</strong>Rewards status level, and ensuring that you receive your <strong>W</strong>Rewards benefits which could include instant savings, information about preview sales, free W magazines and exclusive <strong>W</strong>Rewards savings vouchers.</li>
                                    <li>sending statements and any other legal documents,</li>
                                    <li>any other purpose relating to providing products and services, and</li>
                                    <li>when we have a legal duty to use or disclose your information.</li>
                                </ul>
                                <h3>Here are some of the more specific purposes for which your personal information is used by Woolworths Financial Services. For more details check the <a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110049" style={{textDecoration: 'underline'}}>financial terms and conditions.</a></h3>
                                <p>In addition to the general uses listed here, Woolworths Financial Services (WFS) processes your information if you apply for credit, loans and insurance. If you have applied for one of these products, the WFS <a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110049" style={{textDecoration: 'underline'}}>terms and conditions</a> will apply.<br /><br />If you have applied for a Woolworths Store Card or Credit Card your personal information will also be used for the following purposes:</p>
                                <ul>
                                    <li>WFS will need to use your financial information, including your credit history, which we will obtain from a credit bureau and the South African Fraud Prevention Services, to decide whether you qualify for a credit facility.</li>
                                    <li>
                                    WFS will provide the following information to any registered credit bureaux and the South Africa Fraud Prevention Services:
                                    <ul>
                                        <li>information about your agreement with WFS;</li>
                                        <li>information about your WFS account;</li>
                                        <li>details of any default should you not comply with your credit agreement;</li>
                                        <li>any false information which you provide to WFS</li>
                                    </ul>
                                    </li>
                                    <li>WFS must comply with all regulations relating to credit and insurance. This will involve processing your personal information. In particular WFS must comply with the National Credit Act 34 of 2005.</li>
                                    <li>WFS is required to process your information for purposes of local and international crime prevention. One example of this is the Financial Intelligence Centre Act 38 of 2001 or ‘FICA’.</li>
                                    <li>WFS will provide information to credit bureaux and the SA Fraud Prevention Services about your agreement, about your WFS account, details of any default should you not comply with the terms of your credit agreement and any false information which you have provided to credit bureaux and the South African Fraud Prevention Services.</li>
                                    <li>If you have a Woolworths Credit Card or Store Card you will automatically be a member of the <strong>W</strong>Rewards programme and your personal information will be used to ensure that you receive your benefits.</li>
                                </ul>
                                <h3>MySchool MyVillage MyPlanet cardholders are also part of <strong>W</strong>Rewards.</h3>
                                <p>MySchool MyVillage MyPlanet cardholders are automatically members of <strong>W</strong>Rewards. You will automatically receive swipe benefits, but in order for you to enjoy all the benefits of the programme, your personal information will be shared with Woolworths. If you choose not to join <strong>W</strong>Rewards, your information will not be shared with Woolworths.</p>
                                <h3>Your personal information is used to ensure that you and your beneficiaries benefit.</h3>
                                <p>If you are a MySchool MyVillage MyPlanet supporter, your personal information will also be used to create an account for you, and to make sure that you and the schools and/or charities you support receive the benefits promised by the programme.</p>
                                <h3>The <a href="http://www.myschool.co.za/about-myschool/terms-and-conditions-card-usage" style={{textDecoration: 'underline'}}>MySchool MyVillage MyPlanet terms and conditions</a> will also apply to you.</h3>
                                <p>Be sure to read the MySchool MyVillage MyPlanet terms and conditions on <a href="http://www.myschool.co.za/about-myschool/terms-and-conditions-card-usage" style={{textDecoration: 'underline'}}>www.myschool.co.za</a></p>
                                <h3>Our call centres record their calls for quality control and record-keeping purposes.</h3>
                                <p>When you contact our call centres, the information you give us will be used to investigate and resolve your query, complaint or request. Calls are recorded for quality control and record-keeping purposes.<br /><br />Our call centres are committed to keeping your personal information safe and secure. Please take care not to provide more information than what we ask for. Never give us your banking details, credit card details or any passwords. Any unnecessary information you give us will not be retained.</p>
                                <h3>We only share your personal information with companies that help us to provide our services to you and who have agreed to keep your information secure, confidential and to only use it for authorised purposes.</h3>
                                <p>Your privacy is important to us, which is why it is our policy not to share your personal information with other companies. We will never sell your personal information.<br /><br />We use suppliers or service providers who we trust to provide services to us and sometimes that involves sharing your information with them. They operate under strict requirements aimed at keeping your personal information secure and confidential and they will only use it for the purpose for which we have sent it to them.</p>
                                <h3>Sometimes we have to send your personal information to other countries.</h3>
                                <p>Some of these service providers may be located in other countries that may not have the same levels of protection of personal information as South Africa. If this is the case, we require that they undertake to protect the personal information of our customers to the same level that we do.</p>
                                <h2>Your rights and preferences</h2>
                                <h3>You have the right to know what personal information we have about you, to correct it and to opt out of any marketing.</h3>
                                <p>You have the right to:</p>
                                <ul>
                                    <li>ask what personal information we hold about you;</li>
                                    <li>ask what information was sent to our suppliers, service providers or any other third party;</li>
                                    <li>ask us to update, correct or delete any out-of-date or incorrect personal information we hold about you;</li>
                                    <li>unsubscribe from any direct marketing communications we may send you;</li>
                                    <li>object to the processing of your personal information.</li>
                                </ul>
                                <p>It can take us up to 21 days to respond to your request.<br /><br />If you want us to delete all personal information we have about you, you will probably have to terminate all agreements you have with us in respect of your Store Card or Credit Card and <strong>W</strong>Rewards programme. We cannot maintain our relationship with you without having some of your personal information.<br /><br />We can refuse to delete your information if we are required by law to retain it or if we need it to protect our rights.<br /><br />You can request access to the information we hold about you by contacting our call centres.</p>
                                <h3>Some of your information is available online.</h3>
                                <p>You are able to view and correct some of your information online by creating an online profile. Other information can be corrected via the call centre.</p>
                                <h2>Security</h2>
                                <h3>We take your privacy and the security of your personal information seriously.</h3>
                                <p>We have implemented reasonable security safeguards to protect the personal information that you provide. For example sensitive data (such as your credit card information) is protected by SSL encryption when it is exchanged between your web browser and our website.<br /><br />We regularly monitor our systems for possible vulnerabilities and attacks. As no system is perfect we cannot guarantee that information may not be accessed, disclosed, altered or destroyed by breach of any of our physical, technical or managerial safeguards.<br /><br />Please note that any e-mail you send to us is not encrypted and may be monitored by us. Please do not send us sensitive or confidential personal information by means of e-mail. Instead, contact our call centre on 0860 022 002 or send a message via our website.</p>
                                <h3>We will inform you if your privacy is ever compromised.</h3>
                                <p>Although we cannot prevent all security threats, we have measures in place to minimise the threat to your privacy. We will let you know of any breaches which affect your personal information.</p>
                            </div>
                        </article>
                        {/* END CORPORATE CONTENT */}
                        </div>
                    </div>
                </div>
            </div>
            {/* /.main-page */}	
            </main>
      </div>
    );
  }
}
