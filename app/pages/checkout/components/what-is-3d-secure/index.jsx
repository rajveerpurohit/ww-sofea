import React from 'react';

const WhatIs3DSecure = () => {
  return (
    <div className="staticPage">
      <h1>What is 3D Secure?</h1>
      <p>3D Secure is an additional security measure to ensure your online card transactions are safe and secure. It is mandated by card associations and is managed by South African banks.</p>
      <p>Mastercard uses a security called SecureCode. Visa uses a security called Verified by Visa.</p>
      <p>When making a credit or debit card payment, you will be automatically redirected to your bank's 3D Secure service to authenticate and authorise payment for online shopping. Authentication is done via One Time Pins (OTPs) sent to your cellphone.</p>
    </div>
  );
};

export default WhatIs3DSecure;
