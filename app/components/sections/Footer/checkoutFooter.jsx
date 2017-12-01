import React from 'react';
import PropTypes from 'prop-types';

const CheckoutFooter  = () => (<footer className="checkout-footer">
    <ul className="text-caps checkout-footer__nav">
        <li><a href="/store/fragments/help/help-index.jsp?content=contact" className="link--silent">Need help? Contact us now</a></li>
        <li><a href="/store/fragments/checkout/checkout-index.jsp" className="link--silent">Basket</a></li>
        <li><a href="/store/fragments/help/help-index.jsp?faqId=cfaq000069&amp;content=faqs" className="link--silent">Delivery policy and charges</a></li>
        <li><a href="/store/fragments/help/help-index.jsp?faqId=cfaq000071&amp;content=faqs" className="link--silent">Returns policy</a></li>
        <li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-content&amp;contentId=cmp205289" className="link--silent">Privacy</a></li>
        <li><a href="/store/fragments/help/help-index.jsp?faqId=cfaq000076&amp;content=faqs" className="link--silent">Terms &amp; Conditions</a></li>
    </ul>
</footer>)

export default CheckoutFooter;