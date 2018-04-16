import React, { Component } from 'react';

export default class CorporateContent extends Component {
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
               {/* CORPORATE CONTENT */}
               {/* REFACTORED */}
               <article>
                  <h1 className="heading heading--1 text-caps font-graphic">English</h1>
                  <div className="text-small">
                     <p><strong>Terms and conditions for&nbsp;small/intermediate credit agreement (Woolworths Card) – Please read carefully.</strong></p>
                     <p><strong>DEFINITIONS USED IN THIS DOCUMENT</strong></p>
                     <ul>
                        <li>“ATM” means Automated Teller Machines</li>
                        <li>“the Act” means the National Credit Act, No 34 of 2005</li>
                        <li>“Bank” means Absa Bank Limited, the issuer of the Credit Card</li>
                        <li>“Business day” means Monday to Friday and any day that is not a South African&nbsp;public holiday</li>
                        <li>“Credit Card” means the Woolworths Credit Card issued by the Bank to you,&nbsp;pursuant to this agreement</li>
                        <li>“Card” means the Credit Card and Store Card</li>
                        <li>“Store Card” means the Woolworths Store Card issued by us to you, pursuant&nbsp;to this agreement</li>
                        <li>“Cardholder” means you, the Woolworths Card Cardholder, in whose name the&nbsp;card is issued and whose name appears on the card</li>
                        <li>"Credit Facility”, “Card Account”, “Account”, “Agreement” means the credit&nbsp;agreement that will be entered into between you and WFS (after acceptance&nbsp;by you of the WFS Pre-Agreement Statement and Quotation) which account&nbsp;will be accessed by using the Card, subject to the terms and conditions of this&nbsp;Agreement</li>
                        <li>“Cash Advances” means monies lent to you when you complete a cash&nbsp;withdrawal voucher or make a withdrawal at any ATM, this includes casino&nbsp;chips. These amounts must be repaid to WFS</li>
                        <li>“Merchant” means a seller of goods or services</li>
                        <li>“Purchase or buy” means any buying of goods or services using your Card,&nbsp;whether telephonically, mechanically, electronically or otherwise</li>
                        <li>“Successor in title” is a person or entity that takes over and continues the role&nbsp;or position of another. For example, should WFS sell its business to another&nbsp;entity, that entity becomes a successor in title</li>
                        <li>“We”, “Us” and “Our”, unless it is specifically mentioned otherwise, means&nbsp;Woolworths Financial Services Limited and includes any holding, affiliated or&nbsp;subsidiary company of any of them and their successors in title</li>
                        <li>“Woolworths” means Woolworths (Pty) Limited, the operating entity of the&nbsp;Woolworths Group of 93 Longmarket Street, Cape Town, 8001</li>
                        <li>“The Woolworths Group” means Woolworths and its subsidiary and associated&nbsp;companies</li>
                        <li>“WFS” means Woolworths Financial Services (Pty) Ltd, an authorized financial&nbsp;services provider and registered credit provider (NCRCP 49) of 21 Howe Street,&nbsp;Observatory, Cape Town, 7925</li>
                        <li>“SA Reserve Bank Repurchase Rate” or “Repo Rate” means the interest rate&nbsp;that the South African Reserve Bank charges commercial banks to borrow money</li>
                        <li>“You” means the account holder who we agree to give credit to.</li>
                     </ul>
                     <p><strong>YOU ARE AWARE OF THE TERMS WITH SPECIFIC LEGAL CONSEQUENCES</strong></p>
                     <p>When you sign this agreement or use the Card you confirm both of the following:</p>
                     <ul>
                        <li>You have read and understood all the terms and conditions in this document;</li>
                        <li>You understand that the terms in bold have important legal consequences.</li>
                     </ul>
                     <p><strong>DECLARATIONS</strong></p>
                     <p>You declare and warrant that:</p>
                     <ul>
                        <li>You understand the risks and costs associated with this agreement;</li>
                        <li>You understand your rights and duties under this agreement;</li>
                        <li>You have received a copy of this agreement.</li>
                     </ul>
                     <p><strong>STATEMENTS ABOUT YOUR FINANCIAL POSITION</strong></p>
                     <p>You confirm that:</p>
                     <ul>
                        <li>You have checked the information we have about your personal, financial and&nbsp;account details and these details are correct;</li>
                        <li>You have fully and truthfully given all information we have asked for about this&nbsp;agreement and about your personal and financial circumstances before we&nbsp;signed this agreement;</li>
                        <li>You have fully and truthfully disclosed your income and expenditure to us&nbsp;before we signed this agreement;</li>
                        <li>You have not applied for an administration order and no administration order&nbsp;has been given against you;</li>
                        <li>You are not currently under debt counselling or subject to debt review;</li>
                        <li>You have told us about all other applications for credit you have made to other&nbsp;credit providers, whether they have been processed or not;</li>
                        <li>The proposed repayments under this agreement will not cause you to owe more&nbsp;than you are able and required to pay back (this is called being over indebted).</li>
                     </ul>
                     <p><strong>YOUR CREDIT LIMIT</strong></p>
                     <p>We alone will decide the amount of credit we give to you and let you know what&nbsp;your credit limit is.&nbsp;If we accept a transaction that results in you exceeding your credit limit, it does not&nbsp;mean that we have extended or increased your credit limit on any permanent basis&nbsp;and you are obliged to immediately bring your account in line with the credit limit&nbsp;that we contracted at.&nbsp;Decreasing your credit limit - you can ask us to lower your credit limit at any time by&nbsp;asking us in writing. We will lower your credit limit within 30 business days of you&nbsp;asking us to do so.&nbsp;Increasing your credit limit - you can ask us to increase your credit limit of the card&nbsp;at any time by asking us in writing or by phone .We will assess whether you qualify&nbsp;for a credit limit increase and if so, we will apply the increased credit limit. We will&nbsp;also give you the option to specifically consent in writing to an automatic yearly&nbsp;credit limit increase.</p>
                     <p><strong>WE MAY LOWER YOUR CREDIT LIMIT OR SUSPEND YOUR USE OF THE CARD</strong></p>
                     <p>We may lower your credit limit, but will notify you in writing if we decide to do so&nbsp;and the lower limit will apply from the date of the notice. We may also suspend&nbsp;your use of the Card any time you are in default under this agreement. You remain&nbsp;responsible to pay us for your outstanding balance.&nbsp;If we suspend your use of the Card, you must not use it again. If you do, you may be&nbsp;guilty of fraud as you do not have our authority to use it.</p>
                     <p><strong>WHAT TO DO WHEN YOU RECEIVE A CARD</strong></p>
                     <p>You will receive the Card with your name printed on it and must sign the back of the&nbsp;Card on the signature strip with a ballpoint pen as soon as you receive it. You will be&nbsp;the only person allowed to use your Card.&nbsp;To activate your Store Card, you will need to go to a store to activate and bring your&nbsp;South African Identity Document (ID) with you. To activate your Credit Card, you will&nbsp;need to contact us on 0861 50 20 05.</p>
                     <p>You may purchase goods or services using the Card up to the credit limit we have&nbsp;given you but we may decide to stop your use of the Card at any time. We remain&nbsp;the owner of the Card. We can demand that you return the Card to us at any time.&nbsp;You do not have the right to give permission to any other person to use your Card,&nbsp;even with a legal document called a Power of Attorney. The Card is personal to you&nbsp;and only you can use it. You must keep your Card safe.</p>
                     <p><strong>CREDIT CARD AND PIN</strong></p>
                     <p>You will be given a secret PIN (Personal Identification Number) for your Credit Card.&nbsp;You can change this PIN at any Absa branch. You will be responsible for the security&nbsp;of your Credit Card and PIN and must sign the back of your Credit Card as soon as&nbsp;you receive it from us. You must keep your Credit Card safe and keep your PIN secret.&nbsp;Never let anyone know your PIN.</p>
                     <p><strong>THE SECONDARY CARDHOLDER</strong></p>
                     <p>You can apply for another person to also have a Card linked to your account by completing&nbsp;an application form. This person will be known as the secondary cardholder.&nbsp;These terms and conditions also apply to you when the secondary cardholder uses&nbsp;the Card. If we issue a secondary Card, it will be linked to your account and you&nbsp;remain responsible for paying for all purchases, interest and fees, including the&nbsp;amounts spent on your secondary Card. Your credit limit will apply to all Cards linked&nbsp;to your account. You can ask us to cancel the secondary card at any time. We do not&nbsp;guarantee that the secondary cardholder will have access to all the functionality&nbsp;available to a primary cardholder.</p>
                     <p><strong>HOW TO USE YOUR CARD</strong></p>
                     <p>When you use the Card to buy goods or services or both, you must enter your PIN&nbsp;number or sign a sales voucher (which is a transaction slip).When you enter your&nbsp;PIN or sign a sales or cash withdrawal voucher, you confirm that the information&nbsp;contained in it is correct. If you do not sign the sales voucher you are still responsible&nbsp;to pay (e.g. buying on the internet, telephone transactions and ATM cash withdrawals).&nbsp;If you are physically present at the Merchant’s location (for example, a retail&nbsp;store) you may be asked to sign the slip and enter your PIN. We will then make the&nbsp;payment to the Merchant on your behalf and add the amount to your statement.&nbsp;You will have to pay this amount back to us when you make your monthly payments.</p>
                     <p>A Merchant is not our agent and we are not responsible if your Credit Card is not&nbsp;accepted by the Merchant for whatever reason.&nbsp;When using the Credit Card to get a Cash Advance (except from an ATM) you must&nbsp;enter the PIN and complete a cash withdrawal voucher.&nbsp;You will have to pay this amount back to us when you make your monthly payments.</p>
                     <p><strong>USING YOUR CREDIT CARD OUTSIDE THE REPUBLIC SOUTH AFRICA</strong></p>
                     <p>If you use your Credit Card outside the Republic of South Africa you must comply&nbsp;with exchange control regulations. This may apply to buying goods or services over&nbsp;the internet from foreign based websites. It is your duty to know the content of and&nbsp;comply with those regulations. You and any secondary cardholder both acknowledge&nbsp;that details of all transactions concluded outside of the Republic of South&nbsp;Africa will be provided to the South African Reserve Bank, South African Revenue&nbsp;Service and/or the Financial Intelligence Centre.</p>
                     <p><strong>ALL USE OF YOUR CARD MUST BE LEGAL</strong></p>
                     <p>You may only use your Card for lawful transactions. It is your responsibility to ensure&nbsp;that the Card and the Secondary Card/s are used for lawful transactions only and in&nbsp;accordance with the South African laws.</p>
                     <p><strong>YOUR INTEREST RATE</strong></p>
                     <p>You must pay interest on the outstanding balance of your account. The initial interest&nbsp;rate that we apply is the yearly rate stated in the pre-agreement statement and&nbsp;quotation given to you.&nbsp;The interest rate that applies to this agreement is a variable yearly interest rate&nbsp;linked to the Repo Rate and will go up or down as this rate changes. This means that&nbsp;your interest rate can change. We will inform you of changes to the interest rate.</p>
                     <p><strong>MANAGING YOUR ACCOUNT PAYMENTS TO AVOID INTEREST</strong></p>
                     <p>We charge interest every month if you do not pay your account in full. You must&nbsp;manage your account properly to avoid paying interest. We will charge you interest&nbsp;on the full outstanding amount from the date that you used your Card until you&nbsp;have paid the full amount of that purchase.&nbsp;You will also be charged interest on any Cash Advances from the date that the Cash&nbsp;Advance is made until the amount owing is paid.&nbsp;You will also earn interest on positive balances on your Credit Card Account, which&nbsp;will be added to your account. No interest is earned on positive balances on Store&nbsp;Card.&nbsp;The Interest that you are charged on the outstanding amounts is calculated and&nbsp;added to your outstanding account every day.</p>
                     <p><strong>YOUR INITIATION FEE</strong></p>
                     <p>We charge you an initiation fee when you sign this agreement to cover our costs at&nbsp;the start of this agreement if not paid upfront.</p>
                     <p><strong>YOUR MONTHLY SERVICE FEE</strong></p>
                     <p>We charge you a monthly service fee at the end of each month. We add this fee&nbsp;to your outstanding balance and show it on your statement. Should we decide to&nbsp;increase the monthly service fee, we will inform you. The monthly service fee will&nbsp;not be more than the maximum amount allowed by the National Credit Act. The fee&nbsp;will be shown on your pre agreement statement and quotation.</p>
                     <p><strong>FEES FOR MISSED PAYMENTS</strong></p>
                     <p>If you miss one or more payments, we will let you know. We will charge you a fee&nbsp;each time we must write to you for this reason. The fee is called a default administration&nbsp;fee. It is the same amount as the fee that must be paid for a registered letter&nbsp;of demand for undefended actions under the Magistrates’ Court Act plus the costs&nbsp;we incur in delivering the letter to you.</p>
                     <p><strong>YOUR MONTHLY PAYMENTS AND STATEMENTS</strong></p>
                     <p>We will send you a monthly statement showing the purchases and any positive balance&nbsp;on your account for the previous month. The statement will also show payments&nbsp;made by you on your account for the previous month. We will post or email&nbsp;the statement to you at your chosen address.&nbsp;You must pay the minimum payment shown on your statement by the due date.&nbsp;Both the minimum payment and the due date will be shown on the statement. You&nbsp;can make your monthly payments in any of the following ways:</p>
                     <ul>
                        <li>At any Woolworths store</li>
                        <li>At any branch of Absa Bank</li>
                        <li>By electronic funds transfer (EFT)</li>
                        <li>Debit Order</li>
                     </ul>
                     <p>Please note your payment can take up to 4 days to reflect on your account and it&nbsp;remains your responsibility to ensure that payments are reflected on your account&nbsp;by the due date.&nbsp;Should you choose to pay your monthly instalments by debit order, the instalment&nbsp;is taken from your bank account automatically each month, on the date that you&nbsp;have chosen. If the date that you have chosen falls on a weekend or public holiday,&nbsp;the debit may be processed on the last business day before the Sunday or public&nbsp;holiday.</p>
                     <p>Should you choose to pay your monthly instalments by debit order, we reserve the&nbsp;right to track the nominated bank account and present the instruction for payment&nbsp;as soon as sufficient funds are available in the nominated bank account to ensure&nbsp;successful payment.</p>
                     <p>We reserve the right to debit your account earlier than usual in December provided&nbsp;that we give you prior notification.&nbsp;If you do not receive a monthly statement from us, it is your responsibility to contact&nbsp;us and find out what the minimum payment must be. You must then pay the&nbsp;minimum payment to us as if you had received the statement and cannot miss a&nbsp;payment to us because you did not receive your monthly statement.&nbsp;If your address or details where you received your statements change, you must let&nbsp;us know so that the change can be made. You understand that if you do not do so,&nbsp;your statements will be returned and we will not send statements until you provide&nbsp;us with updated details.</p>
                     <p><strong>YOU CAN PAY MORE THAN THE MINIMUM PAYMENT</strong></p>
                     <p>You can pay more than the minimum payment shown on your statement each&nbsp;month. We will add any extra payments that you make to your account on the date&nbsp;we receive the payment, but these extra payments do not replace the monthly instalment&nbsp;due.</p>
                     <p>The payments will be applied as follows:</p>
                     <ul>
                        <li>First to pay any interest that is due;</li>
                        <li>Second to pay any fees or charges that are due; and</li>
                        <li>Third to reduce the amount that you still owe us.</li>
                     </ul>
                     <p><strong>YOU CAN PAY THE WHOLE AMOUNT OF YOUR ACCOUNT EARLY</strong></p>
                     <p>You can pay your account in full at any time and we will not penalise you. If you&nbsp;choose to do this, you will have to pay the outstanding balance, the outstanding&nbsp;interest and any other account charges that you owe to us. The interest rate will not&nbsp;be more than the highest interest rate allowed by the National Credit Act.</p>
                     <p><strong>YOU CAN QUERY THE STATEMENT</strong></p>
                     <p>If you believe that there is a mistake on your statement, you must call the WFS Call&nbsp;Centre within 60 days of the date of your statement to let us know where you think&nbsp;the mistake is. If you do not tell us about the mistake within this time period, we&nbsp;will accept that the statement is correct .This means that you will have to pay the&nbsp;minimum payment shown on the statement.</p>
                     <p><strong>YOU CAN CANCEL THIS AGREEMENT AT ANY TIME</strong></p>
                     <p>You can cancel this agreement at any time. To cancel the agreement, you must:</p>
                     <ul>
                        <li>Pay the full outstanding balance, interest and other costs, which includes any&nbsp;transactions processed but not yet reflecting on the outstanding balance, to WFS;</li>
                        <li>Request us to close the account by calling the WFS Contact Centre or notifying&nbsp;us in writing</li>
                        <li>Cut up your Card into pieces to destroy it. By cutting your Card, you prevent it&nbsp;from being used again. If you do not destroy your Card and another person uses&nbsp;it, you will be responsible to pay any amounts spent on the Card by that person.</li>
                     </ul>
                     <p><strong>WE MAY CLOSE YOUR CREDIT FACILITY</strong></p>
                     <p>We may close your credit facility altogether by giving you ten (10) days’ written&nbsp;notice. If we do so, you must immediately return your Card to us.</p>
                     <ul>
                        <li>If we close the credit facility and Card, you remain responsible to pay the&nbsp;outstanding balance to us. You must pay the outstanding amount immediately.</li>
                        <li>If we close the credit facility you and any Secondary cardholders must not use&nbsp;your Cards again. If you do, you may be guilty of fraud as you do not have our&nbsp;authority to use it.</li>
                     </ul>
                     <p>If your Card is closed, any positive balances will be paid to you or paid into another&nbsp;account that you choose, after we have deducted all and any amounts that are due&nbsp;to us by you.</p>
                     <p><strong>LOST OR STOLEN CARDS</strong></p>
                     <p>It is your responsibility to look after your Card. You must not allow anyone else to&nbsp;use your Card. When you notice that your Card is lost, stolen or has been used by&nbsp;another person, you must report it immediately by using the following local and&nbsp;international&nbsp;phone numbers:</p>
                     <ul>
                        <li>Local number 0861 50 20 05 (Credit Card)</li>
                        <li>Local number 0861 50 20 20 (Store Card)</li>
                        <li>International number +27 21 407 5555</li>
                     </ul>
                     <p><strong>UNAUTHORISED USE OF THE CARD</strong></p>
                     <p>You will not be responsible for the use of your Card after you have reported the loss&nbsp;or theft of the Card. You will be responsible for the payment if we can prove that&nbsp;you used the Card or authorised the transaction yourself. If someone else uses the&nbsp;Credit Card and PIN and/or Store Card, you are responsible for payment unless you&nbsp;can prove that such person did not get the PIN by your doing, fault or negligence.</p>
                     <p><strong>THE CARD ISSUER WILL ALWAYS OWN YOUR CARD</strong></p>
                     <p>Although you may use the Card, the Bank and WFS owns the Card and you may be&nbsp;requested to return the Card at any time. You must then immediately return Card&nbsp;and you will remain responsible to repay the outstanding balance on your account&nbsp;even if the Card is taken away from you.</p>
                     <p><strong>IF YOU ARE UNABLE TO PAY YOUR DEBTS</strong></p>
                     <p>You must inform us if you are at any time unable to pay your debts, placed under an&nbsp;administration order, sequestration or any other form of insolvency. You have the&nbsp;right to apply to a debt counsellor to consider whether you have more debts than&nbsp;you are able to pay. This is known as being over-indebted.</p>
                     <p><strong>MISSING PAYMENTS AND NOT COMPLYING WITH THE AGREEMENT</strong></p>
                     <p>If you do not pay any amount that you owe on the due date, we may enforce the&nbsp;agreement and cancel your credit facility.&nbsp;If your payment is twenty (20) days overdue, we will suggest, by written notice, that&nbsp;you refer the agreement to any one or more of the following:</p>
                     <ul>
                        <li>A&nbsp;debt counsellor; or</li>
                        <li>Alternative dispute resolution agent; or</li>
                        <li>Consumer court; or</li>
                        <li>Ombud with jurisdiction</li>
                     </ul>
                     <p>If you ignore the notice and suggestion, and ten (10) days pass from the date of the&nbsp;notice, we may hand the matter over to our attorneys or a registered debt collector.</p>
                     <p><strong>PROOF OF WHAT YOU OWE US</strong></p>
                     <p>A certificate signed by one of our managers is enough proof without further explanation&nbsp;of the amount that you owe and that is due to us. Unless you can prove this&nbsp;is not correct, we may use the certificate for provisional sentence, default judgment&nbsp;or summary judgment or any other legal proceedings. We do not have to prove the&nbsp;appointment of the manager who signs the certificate.</p>
                     <p><strong>YOU MUST PAY COLLECTION COSTS IF WE BRING LEGAL PROCEEDINGS</strong></p>
                     <p>If we bring legal proceedings against you to enforce payment of amounts you owe to&nbsp;us, you are responsible to pay all costs we incur in collecting the payment. The costs&nbsp;are set by various laws, including:</p>
                     <ul>
                        <li>The Supreme Court Act, 1959</li>
                        <li>The Magistrate’s Court Act, 1944</li>
                        <li>The Attorneys Act, 1979</li>
                        <li>The Debt Collectors Act, 1998</li>
                     </ul>
                     <p><strong>YOUR PERSONAL INFORMATION: WHO WE SHARE IT WITH</strong></p>
                     <p>You know us as Woolworths, but in fact we are a group of companies&nbsp;that includes Woolworths, Woolworths Financial Services and&nbsp;MySchool MyVillage MyPlanet. When you share your information&nbsp;with one of these companies, you may also be sharing it with others.&nbsp;In some instances you may also be sharing your information with other&nbsp;companies that help us provide services to you (e.g., the company that&nbsp;delivers your online shopping). We will also share your information with&nbsp;our banking partner, Barclays Africa Group Ltd.</p>
                     <ul>
                        <li>You agree that we may share your personal information with our operators and/or&nbsp;agents which includes sub-contractors and their agents and professional advisers</li>
                        <li>Your personal information will be kept confidential by these parties</li>
                        <li>You may request details of the personal information that we hold for you at any&nbsp;time</li>
                     </ul>
                     <p><strong>YOUR PERSONAL INFORMATION: HOW WE USE IT</strong></p>
                     <p>We collect and process the personal information that you provide to us for the following&nbsp;purposes:</p>
                     <ul>
                        <li>To establish whether you qualify for a Card;</li>
                        <li>To report on your payment behaviour to the credit bureau;</li>
                        <li>To comply with our obligations in terms of the National Credit Act;</li>
                        <li>To comply with our obligations governed by legislation relating to money&nbsp;laundering, terrorist financing, financial sanctions and prohibited business&nbsp;activities;</li>
                        <li>To send you marketing material (with your consent); and</li>
                        <li>To exercise our rights and to perform our obligations in terms of our agreement&nbsp;with you.</li>
                     </ul>
                     <p>You may view our <a href="/privacynotice">privacy notice</a>, which forms part of this agreement at www.woolworths.co.za, to learn more about how we use your personal information.</p>
                     <p><strong>USE OF YOUR PERSONAL INFORMATION: MONEY LAUNDERING AND OTHER&nbsp;</strong><strong>FINANCIAL CRIMES</strong></p>
                     <p>We are part of a global financial institution. As such, we must comply with international&nbsp;and local anti-money laundering, counter terrorist financing, financial sanctions&nbsp;and prohibited business activity laws, regulations, policies and requirements.&nbsp;This means we may initially and continually screen, check and process all new client&nbsp;and related information; and monitor all information, instructions and transactions&nbsp;by you and on your behalf. When we perform these activities, there may be a delay&nbsp;in carrying out your instructions or transactions. The transaction may be declined,&nbsp;prohibited or limited in some way. We have the right to end our business relationship&nbsp;with you.&nbsp;To the extent we are allowed to, we will let you know of any action we intend to&nbsp;take. You acknowledge and confirm that we are not responsible for any direct or&nbsp;consequential (indirect), loss, damage, costs or expenses that you incur because we&nbsp;implement this clause.</p>
                     <p><strong>USE OF YOUR PERSONAL INFORMATION: MARKETING CONSENT</strong></p>
                     <p>As part of your application we ask you whether we can send you marketing material&nbsp;or not and you agree that we can rely on what you have indicated. Information about special offers, a subscription to&nbsp;<strong>W</strong>&nbsp;magazine and various vouchers and other loyalty rewards are not promotional material. They are guaranteed benefits for qualifying&nbsp;<strong>W</strong>Rewards members. If you are a member of&nbsp;<strong>W</strong>Rewards you receive them automatically.</p>
                     <p>You can change your marketing consent at any time by doing any one of the following&nbsp;things.</p>
                     <ul>
                        <li>Changing your preference on our website www.woolworths.co.za</li>
                        <li>Contacting our all centre on 0861 50 20 05</li>
                        <li>Registering a block on any register that we legally must recognize</li>
                     </ul>
                     <p>It may take up to 21 days to remove you from our marketing list.&nbsp;We will not charge you a fee when you ask us to stop sending you marketing material.&nbsp;Even if you unsubscribe from receiving marketing material we will still send you&nbsp;your monthly statement as we are required by law to send you these statements.</p>
                     <p><strong>USE OF YOUR PERSONAL INFORMATION: WE ARE ALLOWED TO GIVE INFORMATION&nbsp;</strong><strong>TO ANY CREDIT BUREAUX</strong></p>
                     <p>You understand that we are allowed to give the following to one or more registered&nbsp;credit bureaux and the South African Fraud Prevention Services:</p>
                     <ul>
                        <li>Information about this Agreement</li>
                        <li>Information about your account with us</li>
                        <li>Details of your default if you do not comply with any of the terms of this&nbsp;Agreement</li>
                        <li>Any false information you give to us</li>
                     </ul>
                     <p>We also have the right to get information about your credit profile from any credit&nbsp;bureaux and the South African Fraud Prevention Services.&nbsp;You have the right to contact the credit bureau and view their records on you. You&nbsp;also have the right to correct any information that is not correct.&nbsp;The credit bureaux details are as follows:</p>
                     <p><strong>TransUnion Credit Bureau (Pty) Ltd&nbsp;</strong><br />Wanderers Office Park<br />52 Corlett Drive,<br />Illovo 2196<br />P O Box 7112<br />Johannesburg 2000</p>
                     <p>Tel: (011) 214-6000<br />Fax: (011) 388 3565</p>
                     <p><strong>Experian South Africa (Pty) Ltd</strong><br />Experian House, The Ambridge<br />Vrede Avenue<br />Douglasdale 2021<br />P O Box 98183<br />Sloane Park<br />2152</p>
                     <p>Tel: (011) 799-3400<br />Fax: (011) 707-6700</p>
                     <p><strong>Xpert Decision Systems (Pty) Ltd</strong><br />3rd Floor, West Wing,&nbsp;Oakhurst Building<br />11-13 St. Andrews Street<br />Parktown<br />Johannesburg<br />2193</p>
                     <p>Tel: (011) 6459100<br />Fax: (011) 4846588</p>
                     <p><strong>COMPLAINTS AND DISPUTES</strong></p>
                     <p>If you have a complaint or dispute, you can do any one or more of the following:</p>
                     <ul>
                        <li>Visit a Woolworths store and ask the customer services desk to connect you to&nbsp;the relevant contact centre</li>
                        <li>Contact the call centre:<br />Credit Card on 0861 50 20 05<br />Store Card on 0861 50 20 20</li>
                        <li>Write a letter of complaint and send it to:<br />Woolworths Financial Services&nbsp;<br />PO Box 5553, Cape Town, 8000</li>
                        <li>Email Credit card:&nbsp;<a href="mailto:creditcard@wfs.co.za">creditcard@wfs.co.za</a>&nbsp;Store card<a href="mailto:creditcard@wfs.co.za">&nbsp;</a><a href="mailto:creditcard@wfs.co.za">queries@wfs.co.za</a></li>
                        <li>Go online at www.woolworths.co.za</li>
                     </ul>
                     <p>If we cannot resolve your complaint we will let you know. If you are not satisfied&nbsp;with the outcome of your dispute or complaint, you can contact the applicable regulatory&nbsp;body on the contact details below:</p>
                     <p><strong>National Credit Regulator</strong><br />Tel: (011) 554-2600 or 0860 627 627<br />Fax: (011) 484-6122<br />E-mail: <a href="mailto:info@NCR.org.za">info@NCR.org.za</a></p>
                     <p>Postal Address:<br />127, 15th Road,<br />Randjespark<br />Midrand</p>
                     <p><strong>FAIS Ombud</strong><br />Tel: (012) 470-9080 or 0860 324 766<br />Fax: (012) 348-3447<br />E-mail: <a href="mailto:info@faisombud.co.za">info@faisombud.co.za</a></p>
                     <p>Postal Address:<br />PO Box 74571<br />Lynnwood Ridge<br />0040</p>
                     <p><strong>Ombudsman for Banking Services</strong><br />Tel: (011) 838-9935/38/39<br />Fax: (011) 838-0043<br />E-mail: <a href="mailto:info@obssa.co.za" style={{lineHeight: '1.6'}}>info@obssa.co.za</a></p>
                     <p>Postal Address:<br />PO Box 5728<br />Johannesburg<br />2000</p>
                     <p><strong>LEGAL PROCEEDINGS CAN BE BROUGHT IN THE MAGISTRATES’ COURT</strong></p>
                     <p>You agree that despite the jurisdictional limit of the Magistrates’ Court, we can&nbsp;launch any legal proceedings against you out of the Magistrates’ Court.</p>
                     <p><strong>WE MAY TRANSFER OUR RIGHTS AND OBLIGATIONS</strong></p>
                     <p>You agree that another credit provider may take over from us as the credit provider&nbsp;for this agreement. We will give you ten (10) days’ written notice if another credit&nbsp;provider intends to take over from us. The new credit provider will immediately take&nbsp;our place in this agreement and will take over the rights and obligations that wehave under this agreement.</p>
                     <p><strong>WE MAY CHANGE THESE TERMS AND CONDITIONS</strong></p>
                     <p>We may change these terms and conditions at any time and most of the time do not&nbsp;need your permission to do so. We will inform you of any changes and the date the&nbsp;changes apply from by doing one or more of the following:</p>
                     <ul>
                        <li>Sending you a notice of the changes we intend to make or have made</li>
                        <li>Sending you a new set of terms and conditions to replace these terms and&nbsp;conditions</li>
                        <li>Setting out the changes on your monthly statement.</li>
                        <li>For the latest Ts and Cs please visit <a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110048">www.woolworths.co.za</a></li>
                     </ul>
                     <p><strong>YOU MAY NOT CHANGE THIS AGREEMENT</strong></p>
                     <p>You may not change the provisions of these Terms and Conditions.</p>
                     <p><strong>WE NEVER LOSE OUR RIGHTS</strong></p>
                     <p>We do not lose any of our rights under this agreement if we do not immediately and&nbsp;in every instance insist on them. You may not raise it as a defence if we have a right&nbsp;but do not enforce it at the relevant time. For example, if we allow you extra time to&nbsp;pay your monthly payments in one month, it does not mean we have allowed you&nbsp;extra time the next or any other month.</p>
                     <p><strong>THESE TERMS AND CONDITIONS AND THE PHONE RECORDING ARE THE WHOLE&nbsp;</strong><strong>AGREEMENT</strong></p>
                     <p>These written terms and conditions as well as the telephone recording and /or the&nbsp;written agreement are the whole agreement between you and WFS. Neither party is&nbsp;legally obliged to comply with any express or implied term, condition, undertaking,&nbsp;representation, warranty, or promise not recorded in the agreement. The Agreement replaces any arrangement or understanding held by the parties before this&nbsp;Agreement was signed.</p>
                     <p><strong>EACH CLAUSE IS SEPARATE</strong></p>
                     <p>The parties acknowledge that each clause of this agreement is separate. If any&nbsp;clause of this agreement is or becomes illegal, invalid or unenforceable for any reason&nbsp;or in any jurisdiction, it will be treated as if it had not been written.</p>
                     <p>This does not:</p>
                     <ul>
                        <li>Make the rest of the agreement illegal, invalid or unenforceable</li>
                        <li>Affect the legality, validity or enforceability of the clause in another jurisdiction.</li>
                     </ul>
                     <p><strong>WE WILL GIVE YOU NOTICE OF POSSIBLE DELAYS AFFECTING THE SERVICE</strong></p>
                     <p>We aim to make the use of the Card available at all times. However, because of&nbsp;maintenance or unavoidable interruptions, the service may be down from time to&nbsp;time. We will give you reasonable notice of delays within our control. You accept&nbsp;this as notice of delays beyond our control.</p>
                     <p><strong>WE WILL GIVE YOU NOTICE THAT SERVICE MAY BE DELAYED BY POWER OUTAGES</strong></p>
                     <p>We may be unable to provide you with our services if power outages occur which affect&nbsp;our facilities. You accept this as notice of unavoidable delays in the performance&nbsp;of our services if this occurs.</p>
                     <p><strong>OUR RESPONSIBILITY TO YOU IS LIMITED</strong></p>
                     <p>We are not responsible for:</p>
                     <ul>
                        <li>Any loss or damages you suffer because of incorrect information that you give&nbsp;to us</li>
                        <li>Anyone else accessing your information</li>
                        <li>The consequences of any enquiries made by or from a credit bureaux, because&nbsp;of any information provided by us about your account. We will do our best to&nbsp;ensure that all information about you and your account is correct.</li>
                     </ul>
                     <p><strong>ADDRESS FOR NOTICES AND LEGAL PROCESSES</strong></p>
                     <p>You agree to accept any notice and legal processes under this Agreement at the&nbsp;address you give to us on the phone or on your application. This address is known&nbsp;in law as your domicilium citandi et executandi. The notices and processes include&nbsp;letters reminding you of payments you have missed, letters of demand, a summons&nbsp;and other legal notices. A legal process includes the ways we can enforce any court&nbsp;judgment, for example, a summons, attaching your property and selling it to recover&nbsp;money you owe to us. Legal process also refers to the formal/legal document served&nbsp;to start proceedings, for example, a summons. If we send you a letter by registered&nbsp;post, we will treat it as if you received the letter four (4) days after we posted it. If&nbsp;you dispute this, you will have to prove that you did not receive the letter at that&nbsp;time.</p>
                     <p>If you want to change the address at which you agree to accept notices and legal&nbsp;processes, then you must give us notice by any of the below means:</p>
                     <ul>
                        <li>Delivering the notice to us by hand</li>
                        <li>Send it by registered mail</li>
                        <li>Send it by email to <a href="mailto:wwfs@woolworths.co.za">wwfs@woolworths.co.za</a></li>
                        <li>Call the WFS Call Centre on 0861 50 20 05</li>
                     </ul>
                     <p>You can send notices and legal processes to us at:<br /><br /><strong>Woolworths Financial Services</strong><br />21 Howe Street<br />Observatory<br />Cape Town<br />7925</p>
                     <p>We will give you notice in writing of any change to our address where we choose to&nbsp;accept notices and legal processes.</p>
                     <p><strong>WREWARDS</strong></p>
                     <p><strong>W</strong>Rewards is a loyalty programme owned and operated by Woolworths. You will&nbsp;automatically become a member of WRewards by applying for one of our products.&nbsp;WRewards is subject to its own terms and conditions which can be viewed at www.woolworths.co.za.</p>
                     <p><strong>SOUTH AFRICAN LAW GOVERNS THIS AGREEMENT</strong></p>
                     <p>South African law governs this agreement and it must be interpreted by the laws&nbsp;of the Republic of South Africa. This applies even if the parties do not live in the&nbsp;Republic of South Africa and if the agreement was signed outside of the Republic&nbsp;of South Africa.</p>
                  </div>
               </article>
               {/* END CORPORATE CONTENT */}
            </div>
         </div>
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

//export default connect(mapStateToProps)(AboutUs);
