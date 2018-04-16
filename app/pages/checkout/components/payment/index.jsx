import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import AriaModal from 'react-aria-modal';

import ProductPrice from '../../../../components/basic/product-price';
import CommonUtil from '../../../../services/commonUtil'; // CommonUtil.isValidCardNumber
import { redeemGiftCard, removeGiftCard, existingstoreorcreditcard, newcreditcard, newstorecard, checkout, backtoShippingInstructions } from '../../actions';
import wCrypto from '../../crypto/wcrypto.lib';

class OrderPayment extends Component {
  constructor() {
    super();
    this.state = {
      selectedCard: null, // Selected Existing stored creditCard (show the Card info and cvv fields)
      redeemedCard: null, // Redeemed Response (show the redeemed amount data)
      giftCardEnable: false, // Enable Giftcard msg box (show or the msg box)
      payOnlywithGiftcard: false,
      payViaNewCard: false, // Enable the new creditCard and new Stored Card (show hide the section)
      newCard: 'creditCard', // Selected New cardType storedCard or creditCard(toggle the tabs)
      modalActive: false,
      redeemGiftCardErrors: '',
      payAndCheckoutErrors: ''
    };
    this.giftCardSubmit = this.giftCardSubmit.bind(this);
    this.payAndCheckout = this.payAndCheckout.bind(this);
    this.handleGiftCardEnable = this.handleGiftCardEnable.bind(this);
    this.onSelectCard = this.onSelectCard.bind(this);
    this.handlePayViaNewCard = this.handlePayViaNewCard.bind(this);
    this.toggleNewCard = this.toggleNewCard.bind(this);
    this.onFocusCheckoutNote = this.onFocusCheckoutNote.bind(this);
    this.onBlurCheckoutNote = this.onBlurCheckoutNote.bind(this);
    this.onRemoveGiftCard = this.onRemoveGiftCard.bind(this);
    this.goBackBtn = this.goBackBtn.bind(this);

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
  }
  componentWillMount() {
    if (this.props.payAndCheckout && this.props.payAndCheckout.profileCreditCards.items === undefined) {
      this.setState({ payViaNewCard: true });
    }
  }
  onSelectCard(e) {
    this.setState({ payViaNewCard: false });
    if (e.target.value === 'null') {
      this.setState({ selectedCard: null });
    } else {
      const si = e.target.selectedIndex;
      const { exitingCardCvv } = this.selectAddress;
      exitingCardCvv.value = '';
      this.setState({
        selectedCard: {
          id: e.target.value,
          cardType: e.target.options[si].getAttribute('data-cardtype'),
          cardNo: e.target.options[si].getAttribute('data-cno'),
          nickname: e.target.options[si].getAttribute('data-nickname'),
          cardHolderName: e.target.options[si].getAttribute('data-cardHolderName'),
          expirationMonth: e.target.options[si].getAttribute('data-expirationMonth'),
          expirationYear: e.target.options[si].getAttribute('data-expirationYear')
        }
      });
    }
  }
  onSelect(e) {
    e.target.previousSibling.innerText = e.target.value;
    // console.log('e.target.previousSibling', e.target.previousSibling.innerHtml);
    // console.log('onSelect ', e.target.value);
  }
  onFocusCheckoutNote(e) {
    e.target.parentElement.querySelector('.checkoutNote').style.display = 'block';
  }
  onBlurCheckoutNote(e) {
    e.target.parentElement.querySelector('.checkoutNote').style.display = 'none';
  }
  activateModal() {
    this.setState({ modalActive: true });
  }
  deactivateModal() {
    this.setState({
      modalActive: false
    });
  }
  renderDeleveryModel() {
    return (
      <AriaModal titleText="3D secure" onExit={this.deactivateModal} initialFocus="#deactivate">
        <div className="modal__box modal__box--panel modal__box--size-w-large" style={{ marginBottom: '184px', top: '184px', width: '100%' }}>
          <Link className="icon icon--close-circ-dark modal__close" id="deactivate" onClick={this.deactivateModal} >close</Link>
          <div className="heading heading--3 font-graphic modal__head">What is 3D Secure?</div>
          <div className="modal__content">
            <p>3D Secure is an additional security measure to ensure your online card
                transactions are safe and secure. It is mandated by card associations
                and is managed by South African banks.</p>
            <p>Mastercard uses a security
                called SecureCode. Visa uses a security called Verified by Visa.</p>
            <p>When making a credit or debit card payment, you will be automatically
                redirected to your bank's 3D Secure service to authenticate and
                authorise payment for online shopping. Authentication is done via One
                Time Pins (OTPs) sent to your cellphone.</p>
          </div>
        </div>
      </AriaModal>
    );
  }
  handlePayViaNewCard(e) {
    const { selectAddressNickname } = this.selectAddress;
    selectAddressNickname[0].selected = true;
    this.setState({ selectedCard: null });
    this.setState({ payViaNewCard: true });
  }
  toggleNewCard(e) {
    this.setState({ newCard: e.target.name });
    e.target.parentElement.querySelector('.active').classList.remove('active');
    e.target.classList.toggle('active');
  }
  handleGiftCardEnable() {
    this.setState({ giftCardEnable: !this.state.giftCardEnable });
  }
  showFormFieldError(field) {
    try {
      const ele = field.parentElement.querySelector('.formErrors');

      if (ele) {
        ele.style.display = 'block';
      } else {
        field.parentElement.parentElement.parentElement.querySelector('.formErrors').style.display = 'block';
      }
    } catch (e) {
      console.log(e);
    }
  }
  hideFormFieldError(field) {
    try {
      const ele = field.parentElement.querySelector('.formErrors');

      if (ele) {
        ele.style.display = 'none';
      } else {
        field.parentElement.parentElement.parentElement.querySelector('.formErrors').style.display = 'none';
      }
    } catch (e) {
      console.log(e);
    }
  }
  goBackBtn(event) {
    this.props.backtoShippingInstructions()
    .then((res) => {
      console.log('backtoShippingInstructions error', res);
      if (!res.formexceptions) {
        this.props.setCheckoutActiveStep('deliveryOptions');
      } else {
        console.log('backtoShippingInstructions error', res);
      }
    });
    // this.props.setCheckoutActiveStep('deliveryOptions');
  }
  onRemoveGiftCard(e) {
    this.props.removeGiftCard({ creditCardType: 'giftCard' })
      .then((res) => {
        // let res = {
        //   _links: {},
        //   message: 'Gift Card Successfully Removed'
        // };
        const { giftCardNum, cvvNum } = this.frmRedeemGift;
        giftCardNum.value = '';
        cvvNum.value = '';
        const newState = Object.assign({}, this.state);
        newState.redeemedCard = null;
        this.setState(newState);
        this.setState({ giftCardEnable: false });
        this.setState({ payOnlywithGiftcard: false });
      });
  }
  giftCardSubmit(event) {
    event.preventDefault();
    const { giftCardNum, cvvNum, redeemVoucher } = this.frmRedeemGift;
    const publicKey = this.props.payAndCheckout.publicKey;
    console.log('publicKey ', publicKey);
    // const encryptedPanGC1 = '913e1c2274892037a80191bde74742f192185c75ff2482eb321b00f21873ca774eaafe0b4788e8715f47ee2bb9b702fdd4629becbeed65663ad060c74ea5a2cbe2632208fffeb5a9cd5490456b634aaf28976ea9d1e64a166cf7735765ecef8edbc2a17ee2a020ee7a17e8ec58f03f21c8267ec939df08c563dbbcda2701cf93';
    if (giftCardNum.validity.valid === false) {
      giftCardNum.parentElement.querySelector('.formErrors').style.display = 'block';
    }
    if (cvvNum.validity.valid === false) {
      cvvNum.parentElement.querySelector('.formErrors').style.display = 'block';
    }
    if (this.frmRedeemGift.checkValidity() === true) {
      giftCardNum.parentElement.querySelector('.formErrors').style.display = 'none';
      cvvNum.parentElement.querySelector('.formErrors').style.display = 'none';
      const giftCardData = {
        newCreditCardVerificationNumber: cvvNum.value,
        storedAddressSelection: this.props.storedAddressSelection,
        usingSavedAddress: true,
        usingProfileCreditCard: false,
        fingerprint: this.props.payAndCheckout.fingerPrint,
        encryptedPan: wCrypto.encryptPAN(giftCardNum.value, publicKey),
        creditCard: {
          creditCardNumber: wCrypto.truncatePAN(giftCardNum.value),
          creditCardType: 'giftcard'
        }
      };
      this.props.redeemGiftCard(giftCardData)
        .then((res) => {
          if (res.formexceptions) { // formexceptions
            // redeemVoucher.previousSibling.style.display = 'block';
            let messages = '';
            res.formexceptions.forEach((err, index) => {
              messages += err.message + '</br>'; // &#13;
            });
            // redeemVoucher.previousSibling.innerText = messages;
            this.setState({ redeemGiftCardErrors: messages });
          } else {
            if (res.redeemGiftCardCheck.remainingAmount === 0) {
              this.setState({ payOnlywithGiftcard: true });
            }
            this.setState({ redeemedCard: res });
            // redeemVoucher.previousSibling.style.display = 'none';
            this.setState({ redeemGiftCardErrors: '' });
            console.log('giftCardValue remainingAmt', res);
          }
        });
    }
  }
  payAndCheckout(e) {
    const payViaNewCard = this.state.payViaNewCard;
    const payOnlywithGiftcard = this.state.payOnlywithGiftcard;
    const { tAndC } = this.paymentSaveDetails;
    const fingerprintWW = this.props.payAndCheckout.fingerPrint;
    const publicKey = this.props.payAndCheckout.publicKey;
    const storedAddressSelect = this.props.storedAddressSelection;
    // const encryptedPanC1 = '1efef5d93867f085c8448e525bc6123da0af54d208580c7ba6cf4c06b6a19735d603f0d988a3a7d7ba4a40f751ac74193b9e2544f0f32df317043c802c7757c67ae51ddb1353a4e81527a84657037f845764118b962bf9a4b2ac72456d67093c64bb8b3c1616b06cc71f2d805669b0fbbae675a2114261120fde870d62c9f2d8';
    // const encryptedPanC2 = '7aa9c1df9e02db9761fb58f3174862c72feea1426dbf55a6bceed0bc825ec345c1832d2db59f8cc28628a00eeafacb0b120479bc9f081997e39fce7f58e01584a31dcbb4ec7d38571c9d15b5db132c220089658ca172f5198365e9ca22f244df547d8be65e450b415271fdefce04ef5f10aba4b2fdaab3557255bc330040eb1f';
    // const encryptedPanC2 = '7aa9c1df9e02db9761fb58f3174862c72feea1426dbf55a6bceed0bc825ec345c1832d2db59f8cc28628a00eeafacb0b120479bc9f081997e39fce7f58e01584a31dcbb4ec7d38571c9d15b5db132c220089658ca172f5198365e9ca22f244df547d8be65e450b415271fdefce04ef5f10aba4b2fdaab3557255bc330040eb1f';
    let formValidity = true;

    if (payViaNewCard === false && payOnlywithGiftcard === false) {
      const { selectAddressNickname, exitingCardCvv } = this.selectAddress;
      const fields = [selectAddressNickname, exitingCardCvv, tAndC];
      fields.forEach((field, index) => {
        if (field.validity.valid === false) {
          this.showFormFieldError(field);
          formValidity = false;
        } else if (field.validity.valid === true) {
          this.hideFormFieldError(field);
        }
      });
      if (selectAddressNickname.value === 'null') {
        console.log('payOnlywithGiftcard true');
        alert('Invalid Card Number. Please select any card and try again.');
      } else if (formValidity === true) {
        const existingCardData = {
          termsAndConditions: tAndC.value,
          saveCreditCard: false,
          selectedCCId: this.state.selectedCard.id,
          storedCreditCardName: this.state.selectedCard.nickname, // nickname
          creditCardVerificationNumber: exitingCardCvv.value,
          usingProfileCard: true,
          usingSavedAddress: true,
          profileEmail: this.props.profileEmail
        };
        this.props.existingstoreorcreditcard(existingCardData)
          .then((res) => {
            console.log();
            if (res.orderSummary && res.orderSummary.state !== 'INCOMPLETE') {
              this.props.setCheckoutActiveStep('orderConfirmation');
            } else if (res.formexceptions) { // formexceptions
              let messages = '';
              res.formexceptions.forEach((err, index) => {
                messages += err.message + '</br>'; // &#13;
              });
              this.setState({ payAndCheckoutErrors: messages });
            } else if (res.errorMessage) {
              this.setState({ payAndCheckoutErrors: res.errorMessage });
            } else {
              console.log('/checkout existingstoreorcreditcard service error', res);
            }
          });
      }
    } else if (payViaNewCard === true && this.state.newCard === 'creditCard') {
      const { cardNickName, cardHolderName, cardNumber, cvvNumCC, cardType, expiryDateMM, expiryDateYYYY, saveCreditCard } = this.paymentCreditConfirm;

      const fields = [cardNickName, cardHolderName, cardNumber, cvvNumCC, cardType, expiryDateMM, expiryDateYYYY, tAndC];
      fields.forEach((field, index) => {
        if (field.validity.valid === false) {
          this.showFormFieldError(field);
          formValidity = false;
        } else if (field.validity.valid === true) {
          this.hideFormFieldError(field);
        }
      });
      if (!CommonUtil.isValidCardNumber(cardNumber.value)) {
        alert('Invalid Card Number. Please correct and try again.');
      } else if (formValidity === true) {
        console.log('necar publicKey', publicKey);
        const creditCardData = {
          termsAndConditions: tAndC.value,
          saveCreditCard: saveCreditCard.value,
          creditCard: {
            creditCardNumber: wCrypto.truncatePAN(cardNumber.value), // cardNumber.value,
            creditCardType: cardType.value,
            cardHolderName: cardHolderName.value,
            expirationYear: expiryDateYYYY.value,
            expirationMonth: expiryDateMM.value
          },
          creditCardNickname: cardNickName.value,
          newCreditCardVerificationNumber: cvvNumCC.value,
          usingProfileCreditCard: false,
          usingSavedAddress: true,
          storedAddressSelection: storedAddressSelect,
          fingerprint: fingerprintWW,
          encryptedPan: wCrypto.encryptPAN(cardNumber.value, publicKey), // encryptedPanC1
        };
        this.props.newcreditcard(creditCardData)
          .then((res) => {
            if (res.orderSummary && res.orderSummary.state !== 'INCOMPLETE') {
              this.setState({ payAndCheckoutErrors: '' });
              this.props.setCheckoutActiveStep('orderConfirmation');
            } else if (res.threedsIframe) {
              this.props.setCheckoutActiveStep('paymentPortal');
              this.setState({ payAndCheckoutErrors: '' });
            } else if (res.formexceptions) { // formexceptions
              let messages = '';
              res.formexceptions.forEach((err, index) => {
                messages += err.message + '</br>'; // &#13;
              });
              this.setState({ payAndCheckoutErrors: messages });
            } else if (res.errorMessage) {
              this.setState({ payAndCheckoutErrors: res.errorMessage });
            } else {
              console.log('/checkout newcreditcard service error', res);
            }
          });
      }
    } else if (payViaNewCard === true && this.state.newCard === 'storeCard') {
      console.log('storeCard', this.state.newCard);
      // formValidity = false;
      const { cardNickName, storeCardHolderName, storeCardNumber, storeCardSequenceNumber, saveStoreCard } = this.paymentStoreConfirm;
      const fields = [storeCardHolderName, storeCardNumber, storeCardSequenceNumber, tAndC];
      fields.forEach((field, index) => {
        if (field.validity.valid === false) {
          this.showFormFieldError(field);
          formValidity = false;
        } else if (field.validity.valid === true) {
          this.hideFormFieldError(field);
        }
      });
      // if (!CommonUtil.isValidCardNumber()) {
      //   alert('Invalid Card Number. Please correct and try again.');
      // } else
      if (formValidity === true) {
        const storeCardData = {
          termsAndConditions: tAndC.value,
          saveCreditCard: saveStoreCard.value,
          creditCard: {
            creditCardType: 'wwcard',
            cardHolderName: storeCardHolderName.value
          },
          creditCardNickname: cardNickName.value,
          newStoreCardNumber: wCrypto.truncatePAN(storeCardNumber.value),
          newStoreCardSequenceNumber: storeCardSequenceNumber.value,
          usingProfileCreditCard: false,
          usingSavedAddress: true,
          storedAddressSelection: storedAddressSelect,
          fingerprint: fingerprintWW, // '14380b59bfde47a2ced703b1ef2f69ac0548ce4a'
          encryptedPan: wCrypto.encryptPAN(storeCardNumber.value, publicKey),
        };
        this.props.newstorecard(storeCardData)
          .then((res) => {
            if (res.orderSummary && res.orderSummary.state !== 'INCOMPLETE') {
              this.props.setCheckoutActiveStep('orderConfirmation');
            } else if (res.formexceptions) { // formexceptions
              let messages = '';
              res.formexceptions.forEach((err, index) => {
                messages += err.message + '</br>'; // &#13;
              });
              this.setState({ payAndCheckoutErrors: messages });
            } else if (res.errorMessage) {
              this.setState({ payAndCheckoutErrors: res.errorMessage });
            } else {
              console.log('/checkout newstorecard service error', res);
            }
          });
      }
    } else if (payOnlywithGiftcard === true) {
      const fields = [tAndC];
      fields.forEach((field, index) => {
        if (field.validity.valid === false) {
          this.showFormFieldError(field);
          formValidity = false;
        } else if (field.validity.valid === true) {
          this.hideFormFieldError(field);
        }
      });
      if (formValidity === true) {
        const data = {
          siteId: '300001'
        };
        this.props.checkout(data)
          .then((res) => {
            if (res.orderSummary && res.orderSummary.state !== 'INCOMPLETE') {
              this.props.setCheckoutActiveStep('orderConfirmation');
            } else if (res.formexceptions) { // formexceptions
              let messages = '';
              res.formexceptions.forEach((err, index) => {
                messages += err.message + '</br>'; // &#13;
              });
              this.setState({ payAndCheckoutErrors: messages });
            } else if (res.errorMessage) {
              this.setState({ payAndCheckoutErrors: res.errorMessage });
            } else {
              console.log('/checkout service error', res);
            }
          });
      }
    }
  }
  generateRedeemGiftCard(payload, labels) {
    const style = {
      display: this.state.giftCardEnable === true ? 'block' : 'none'
    };
    const styleGiftCard = {
      display: this.state.redeemedCard === null ? 'block' : 'none'
    };
    const styleRedeemedCard = {
      display: this.state.redeemedCard !== null ? 'block' : 'none'
    };
    const giftCardNo = this.state.redeemedCard !== null ? String(this.state.redeemedCard.creditCardNumber).substr(12) : '';
    const giftCardValue = this.state.redeemedCard !== null ? this.state.redeemedCard.redeemGiftCardCheck.giftCardPaymentValue : '';
    const remainingAmount = this.state.redeemedCard !== null ? this.state.redeemedCard.redeemGiftCardCheck.remainingAmount : '';

    return (
      <form name="redeemGift" id="frmRedeemGift" ref={(form) => { this.frmRedeemGift = form; }} className="wForm checkoutForm" onSubmit={this.giftCardSubmit} noValidate>
        <section className="giftCard" style={styleGiftCard}>
          <h3>Do you have a Woolworths Gift Card?</h3>
          <fieldset className="toggleFields">
            <div className="customCheck" id="uniform-yes">
              <span>
                <input type="checkbox" name="yes" id="yes" className="customCheck" checked={this.state.giftCardEnable} onChange={this.handleGiftCardEnable} />
              </span>
            </div>
            <label htmlFor="yes">Yes, I'd like to use a Woolworths Gift Card</label>
          </fieldset>
          <fieldset className="withNote" style={style}>
            <input type="text" name="giftCardNum" id="fldGiftCardNum" onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} tabIndex="0" placeholder="Gift Card number*" pattern="[0-9]{16}" maxLength="16" autoComplete="off" required />
            <div className="checkoutNote">The long number at the back of the card.</div>
            <div className="formErrors">Gift card number is not correct.</div>
          </fieldset>
          <fieldset className="withCvvNum withNote" style={style}>
            <input type="text" name="cvvNum" id="fldCvvNum" onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} tabIndex="0" className="cvvNum withHint" placeholder="CVV number*" pattern="[0-9]{3}" maxLength="3" autoComplete="off" required />
            <Link className="hint">?</Link>
            <div className="checkoutNote">The three digit number called "CVV".</div>
            <div className="formErrors">CVV number is not correct.</div>
          </fieldset>
          <fieldset style={style}>
            <div className="formErrors" dangerouslySetInnerHTML={{ __html: this.state.redeemGiftCardErrors }} style={{ display: this.state.redeemGiftCardErrors.length !== 0 ? 'block' : 'none' }} />
            <input type="submit" name="redeemVoucher" value="Redeem gift card" className="button redeemVoucher" id="fldRedeemVoucher" />
          </fieldset>
        </section>
        <section className="giftCard" style={styleRedeemedCard}>
          <h3> Woolworths Gift Card</h3>
          <fieldset className="toggleFields">
            <span className="rightOffset" />
            XXXX XX** ****&nbsp;{giftCardNo}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" name="removeRedeemVoucher" value="Remove gift card" onClick={this.onRemoveGiftCard} className="moreLink redeemVoucher leftOffset" id="fldRemoveRedeemVoucher" />
          </fieldset>
          <br />
          <fieldset className="toggleFields">
            <h2>Gift card value <strong>R {giftCardValue}</strong>, pay <strong>R {remainingAmount}</strong> with a card</h2>
          </fieldset>
        </section>
      </form>
    );
  }
  generateSelectExistingCard(payload, labels, selectedCard) {
    const selectCardOptions = [];
    const style = {
      display: selectedCard !== null ? 'block' : 'none'
    };
    const remainingAmount = this.state.redeemedCard !== null ? this.state.redeemedCard.redeemGiftCardCheck.remainingAmount : '';
    const cardType = selectedCard !== null ? selectedCard.cardType : '';
    let stylePaywithCards = {};
    if (this.state.redeemedCard !== null) {
      stylePaywithCards = {
        display: remainingAmount > 0 ? 'block' : 'none'
      };
    } else {
      stylePaywithCards = {
        display: 'block'
      };
    }

    selectCardOptions.push(<option value="null">Select Card</option>);
    payload.profileCreditCards.items.forEach((options, index) => {
      selectCardOptions.push(
        <option value={options.id} data-cno={options.creditCardNumber} data-expirationMonth={options.expirationMonth} data-expirationYear={options.expirationYear} data-nickname={options.nickname} data-cardType={options.creditCardType} data-cardHolderName={options.cardHolderName} key={options.id}>XXXXXX******{options.creditCardNumber}</option>
      );
    });
    return (
      <form id="frmSelectAddress" className="wForm checkoutForm" name="selectAddress" ref={(select) => { this.selectAddress = select; }} style={stylePaywithCards} noValidate>
        <section className="addressSelect">
          <fieldset>
            <div className="customSelect" id="uniform-addressNickname">
              <span>{selectedCard !== null ? `XXXXXX******${selectedCard.cardNo}` : 'Select Card'}</span>
              <select id="addressNickname" name="selectAddressNickname" onChange={this.onSelectCard} className="customSelect" defaultValue={selectedCard !== null ? selectedCard.cardNo : null} required>
                {selectCardOptions}
              </select>
            </div>
            <div className="formErrors">Select Any Card from List.</div>
          </fieldset>
          <fieldset className="addNewAddress">
            <Link rel="newCCForm" className="secondaryButton buttonBgLight" onClick={this.handlePayViaNewCard}>Add new card</Link>
          </fieldset>
        </section>
        <section className="addressWrapper">
          <div id={selectedCard !== null ? selectedCard.id : ''} className="addressBlock" style={style}>
            <p style={style}>Credit card payments are now with 3D Secure. <Link rel="fancybox" className="aria-modal-link" onClick={this.activateModal}>What is 3D Secure?</Link>
              {this.state.modalActive && this.renderDeleveryModel()}
            </p>
            <p><strong>{selectedCard !== null ? selectedCard.cardType : ''} (Including WW VISA CARDS)</strong> </p>
            <p>Cardholder Name : {selectedCard !== null ? selectedCard.cardHolderName : ''}</p>
            <p>Card Number : XXXXXX******{selectedCard !== null ? selectedCard.cardNo : ''}</p>
            {cardType !== 'wwcard' && (<p>Expiry Date : {selectedCard !== null ? selectedCard.expirationMonth : ''}/{selectedCard !== null ? selectedCard.expirationYear : ''}</p>)}
            {cardType === 'wwcard' ? (<fieldset className="withCvvNum withNote">
              <input className="cvvNum withHint numeric" type="text" name="exitingCardCvv" id={`cvv-${this.state.selectedCard}`} onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} autoComplete="off" pattern="[0-9]{1}" maxLength="1" placeholder="Sequence number*" required />
              <Link className="hint">?</Link>
              <div className="checkoutNote">The Sequence Number is the single digit number embossed on the bottom right of your Woolworths Store Card.</div>
              <div className="formErrors">Sequence number on Woolworths store card is not correct.</div>
            </fieldset>) : (<fieldset className="withCvvNum withNote">
              <input className="cvvNum withHint numeric" type="text" name="exitingCardCvv" id={`cvv-${this.state.selectedCard}`} onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} autoComplete="off" pattern="[0-9]{3}" maxLength="3" placeholder="CVV Number*" required />
              <Link className="hint">?</Link>
              <div className="checkoutNote">The last 3 digits on the back of your card. American Express, the 4 digit number printed on the front of your card.</div>
              <div className="sequenceNumberError formErrors">Sequence number is not correct.</div>
            </fieldset>)}

            <p className="required">*Required fields</p>
          </div>
        </section>
      </form>
    );
  }

  render() {
    const labels = this.props.labels;
    const payload = this.props.payAndCheckout;
    const remainingAmount = this.state.redeemedCard !== null ? this.state.redeemedCard.redeemGiftCardCheck.remainingAmount : '';

    const styleNewCreditCard = {
      display: (this.state.payViaNewCard === true && this.state.newCard === 'creditCard') ? 'block' : 'none'
    };
    const styleNewStoreCard = {
      display: (this.state.payViaNewCard === true && this.state.newCard === 'storeCard') ? 'block' : 'none'
    };
    const stylePayWithCardTabs = {
      display: (this.state.payViaNewCard === true) ? 'block' : 'none'
    };
    let stylePaywithCards = {};
    if (this.state.redeemedCard !== null) {
      stylePaywithCards = {
        display: remainingAmount > 0 ? 'block' : 'none'
      };
    } else {
      stylePaywithCards = {
        display: 'block'
      };
    }
    // console.log('remainingAmount main', remainingAmount);
    // console.log('jsdj', (remainingAmount > 0));
    return (
      <article className="mainColCheckout">
        <h2>PAYMENT DETAILS</h2>
        <section className="noteWrapper">
          <p className="note">Certain bank card holders are experiencing intermittent issues in completing authentication for 3D secure online. If you are unable to make a payment using your intended bank card, please try an alternative. We are working with the banks to resolve this.</p>
        </section>
        {this.generateRedeemGiftCard(payload, labels)}
        <h3 style={stylePaywithCards}>Pay with a card</h3>
        {(payload.profileCreditCards.items !== undefined) ? this.generateSelectExistingCard(payload, labels, this.state.selectedCard) : ''}
        <section className="payWithCard" style={stylePaywithCards}>
          <div className="tabsToggle payWithCardTabs" style={stylePayWithCardTabs}>
            <Link onClick={this.toggleNewCard} name="creditCard" className="active">Credit Card</Link>
            <Link onClick={this.toggleNewCard} name="storeCard" className="">Store Card</Link>
          </div>
          <div id="creditCard" className="cardFormWrapper hiddenForm" style={styleNewCreditCard}>
            <p>Credit card payments are now with 3D Secure. <Link rel="fancybox" onClick={this.activateModal} className="aria-modal-link">What is 3D Secure?</Link>
              {this.state.modalActive && this.renderDeleveryModel()}
            </p>
            <form name="paymentCreditConfirm" className="wForm checkoutForm" id="frmPaymentCreditConfirm" ref={(form) => { this.paymentCreditConfirm = form; }} noValidate>
              <fieldset className="withNote">
                <input type="text" name="cardNickName" id="fldCardNickName" tabIndex="0" onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} placeholder="Card nickname" maxLength="40" />
                <div className="checkoutNote">e.g. My Woolies Black Card</div>
                <div className="formErrors">Please enter a nickname.</div>
              </fieldset>
              <fieldset>
                <input type="text" name="cardHolderName" id="fldCardHolderName" tabIndex="0" placeholder="Cardholder name*" maxLength="40" required />
                <div className="formErrors">Please enter a name.</div>
              </fieldset>
              <fieldset>
                <div className="customSelect" id="uniform-fldCardType">
                  <span>Choose card type*</span>
                  <select name="cardType" id="fldCardType" tabIndex="0" className="customSelectSmall" onChange={this.onSelect} required>
                    <option value="selectCard">Choose card type*</option>
                    <option value="visa">Visa</option>
                    <option value="masterCard">Master Card</option>
                  </select>
                </div>
                <div className="formErrors">Please select a card type.</div>
              </fieldset>
              <fieldset className="withNote">
                <input type="text" name="cardNumber" id="fldCardNumber" tabIndex="0" onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} placeholder="Card number*" pattern="[0-9]{16}" maxLength="16" required />
                <div className="checkoutNote">The long number on the front of the card.</div>
                <div className="formErrors">Please enter a valid number.</div>
              </fieldset>
              <fieldset className="forExpiryDate">
                <label htmlFor="fldExpiryDateMM">Expiry date*:</label>
                <div className="customSelect" id="uniform-fldExpiryDateMM">
                  <span>Month</span>
                  <select name="expiryDateMM" id="fldExpiryDateMM" tabIndex="0" className="expiryDate" onChange={this.onSelect} required>
                    <option value="cardMonth">Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div className="customSelect" id="uniform-fldExpiryDateYYYY">
                  <span>YYYY</span>
                  <select name="expiryDateYYYY" id="fldExpiryDateYYYY" tabIndex="0" className="expiryDate" onChange={this.onSelect} required>
                    <option value="cardYear">YYYY</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
                <div className="formErrors">This doesn't seem correct. Please try again.</div>
              </fieldset>
              <fieldset className="withCvvNum withNote">
                <input type="text" name="cvvNumCC" id="fldCvvNumCC" tabIndex="0" onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} className="cvvNum withHint" placeholder="CVV number*" pattern="[0-9]{3,4}" maxLength="4" required />
                <Link className="hint">?</Link>
                <div className="checkoutNote">The last 3 digits on the back of your card. American Express, the 4 digit number printed on the front of your card.</div>
                <div className="formErrors">CVV number is not correct.</div>
              </fieldset>
              <fieldset className="withNote">
                <div className="customCheck" id="uniform-saveCreditCard">
                  <span>
                    <input type="checkbox" name="saveCreditCard" id="saveCreditCard" tabIndex="0" className="customCheck" defaultValue="true" />
                  </span>
                </div>
                <label htmlFor="saveCreditCard">I want to save my Card</label>
              </fieldset>
              <p className="required">*Required fields</p>
            </form>
          </div>
          <div id="storeCard" className="cardFormWrapper hiddenForm" style={styleNewStoreCard}>
            <form name="paymentStoreConfirm" className="wForm checkoutForm" id="frmPaymentStoreConfirm" ref={(form) => { this.paymentStoreConfirm = form; }}>
              <fieldset className="withNote">
                <input type="text" name="cardNickName" id="fldCardNickName" onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} tabIndex="0" placeholder="Card nickname" maxLength="40" />
                <div className="checkoutNote">e.g. My Woolies Black Card</div>
                <div className="formErrors">Please enter nickname.</div>
              </fieldset>
              <fieldset className="withNote">
                <input type="text" name="storeCardHolderName" id="fldStoreCardHolderName" onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} tabIndex="0" maxLength="40" placeholder="Cardholder name*" required />
                <div className="checkoutNote">The name printed on the front of the card.</div>
                <div className="formErrors">Please enter name.</div>
              </fieldset>
              <fieldset className="withNote">
                <input maxLength="16" minLength="12" pattern="[0-9]{16}" type="text" name="storeCardNumber" id="fldStoreCardNumber" onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} tabIndex="0" placeholder="Card number*" required />
                <div className="checkoutNote">The long number on the front of the card.</div>
                <div className="formErrors">Store card number is not correct.</div>
              </fieldset>
              <fieldset className="withNote">
                <input maxLength="1" type="text" name="storeCardSequenceNumber" id="fldStoreCardSequenceNumber" pattern="[0-9]{1}" onFocus={this.onFocusCheckoutNote} onBlur={this.onBlurCheckoutNote} tabIndex="0" placeholder="Sequence number*" required />
                <div className="checkoutNote">The Sequence Number is the single digit number embossed on the bottom right of your Woolworths Store Card.</div>
                <div className="formErrors">Sequence number on Woolworths store card is not correct.</div>
              </fieldset>
              <fieldset className="withNote">
                <div className="customCheck" id="uniform-saveStoreCard">
                  <span>
                    <input type="checkbox" name="saveStoreCard" id="saveStoreCard" className="customCheck" defaultValue="true" />
                  </span>
                </div>
                <label htmlFor="saveCreditCard">I want to save my Card</label>
              </fieldset>
              <p className="required">*Required fields</p>
            </form>
          </div>
        </section>
        <form name="paymentSaveDetails" className="wForm checkoutForm" id="frmPaymentSave" ref={(form) => { this.paymentSaveDetails = form; }} noValidate>
          <section className="forTandCs">
            <fieldset>
              <div className="customCheck" id="uniform-fldTAndC">
                <span>
                  <input type="checkbox" name="tAndC" id="fldTAndC" tabIndex="0" className="customCheck" defaultValue="true" required />
                </span>
              </div>
              {/* <input type="checkbox" name="tAndC" id="fldTAndC" className="customCheck" defaultValue="true" required /> */}
              <label htmlFor="fldTAndC">I accept the <Link to="/corporate/cmp100080" target="_blank">Terms and Conditions</Link></label>
              <div className="formErrors">You need to accept the terms and conditions to continue.</div>
            </fieldset>
          </section>
        </form>
        <p className="floatL noMargT">
          <Link className="moreLink prevLink" onClick={this.goBackBtn}>Go back</Link>
        </p>
        <div className="formErrors" dangerouslySetInnerHTML={{ __html: this.state.payAndCheckoutErrors }} style={{ display: this.state.payAndCheckoutErrors.length !== 0 ? 'block' : 'none' }} />
        <section className="totalsWrapper">
          <div className="formErrors">Something went wrong</div>
          <p className="estimatedTotal textR"><strong>TOTAL: <span><ProductPrice price={this.props.miniCartData.orderSummary.total} /></span></strong></p>
          <Link id="pay_now" className="button" onClick={this.payAndCheckout}>Pay now</Link>
        </section>
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    payAndCheckout: state.checkout.payAndCheckout,
    storedAddressSelection: state.deliveryDetails.currentAddress.nickname,
    profileEmail: state.clp.currentUser.email,
    miniCartData: state.headerReducer.miniCartReducer.miniCartData
  };
};
export default connect(mapStateToProps, {
  redeemGiftCard,
  removeGiftCard,
  existingstoreorcreditcard,
  newcreditcard,
  newstorecard,
  checkout,
  backtoShippingInstructions
})(OrderPayment);
