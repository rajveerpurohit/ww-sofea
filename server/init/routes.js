/**
 * Routes for express app
 */
const components = require('../controllers/components');
const apiaggregatorEndpoints = require('../controllers/apiAggregatorEndPoints');

// const endpoints = apiaggregatorEndpoints.endpoints;
const endpointsUrlKeys = apiaggregatorEndpoints.endpointsUrlKeys;
const serverUrls = apiaggregatorEndpoints.serverUrls;
const localesEAEndpointMap = apiaggregatorEndpoints.localesEAEndpointMap;

export default (app) => {
  app.get([localesEAEndpointMap.megamenu, serverUrls.megamenu], (req, res) => {
    components.get(req, res, endpointsUrlKeys.megamenu);
  });
  app.get([localesEAEndpointMap.topheader, serverUrls.topheader], (req, res) => {
    components.get(req, res, endpointsUrlKeys.topheader);
  });
  app.get([localesEAEndpointMap.contactUs, serverUrls.contactUs], (req, res) => {
    components.get(req, res, endpointsUrlKeys.contactUs);
  });
  app.post([localesEAEndpointMap.contactUsPost, serverUrls.contactUsPost], (req, res) => {
    components.post(req, res, endpointsUrlKeys.contactUsPost);
  });
  app.get([localesEAEndpointMap.search, serverUrls.search], (req, res) => {
    components.get(req, res, endpointsUrlKeys.search);
  });
  app.get([localesEAEndpointMap.corporateSales, serverUrls.corporateSales], (req, res) => {
    components.get(req, res, endpointsUrlKeys.corporateSales);
  });
  app.get([localesEAEndpointMap.searchCategory, serverUrls.searchCategory], (req, res) => {
    components.get(req, res, endpointsUrlKeys.searchCategory);
  });
  app.get([localesEAEndpointMap.contactInfo, serverUrls.contactInfo], (req, res) => {
    components.get(req, res, endpointsUrlKeys.contactInfo);
  });
  app.get([localesEAEndpointMap.recipe, serverUrls.recipe], (req, res) => {
    components.get(req, res, endpointsUrlKeys.recipe);
  });
  app.get([localesEAEndpointMap.labels, serverUrls.labels], (req, res) => {
    components.get(req, res, endpointsUrlKeys.labels);
  });
  // app.get([localesEAEndpointMap.footer, serverUrls.footer], (req, res) => {
  //   components.get(req, res, endpointsUrlKeys.footer);
  // });
  app.get([localesEAEndpointMap.helpcenter, serverUrls.helpcenter], (req, res) => {
    components.get(req, res, endpointsUrlKeys.helpcenter);
  });
  app.get([localesEAEndpointMap.newsandpress, serverUrls.newsandpress], (req, res) => {
    components.get(req, res, endpointsUrlKeys.newsandpress);
  });
  app.get([localesEAEndpointMap.termsAndConditions, serverUrls.termsAndConditions], (req, res) => {
    components.get(req, res, endpointsUrlKeys.termsAndConditions);
  });
  app.get([localesEAEndpointMap.usingWoolworthsOnline, serverUrls.usingWoolworthsOnline], (req, res) => {
    components.get(req, res, endpointsUrlKeys.usingWoolworthsOnline);
  });
  // app.get([localesEAEndpointMap.home, serverUrls.home], (req, res) => {
  //   components.get(req, res, endpointsUrlKeys.home);
  // });
  app.get([localesEAEndpointMap.woolWorthOnline, serverUrls.woolWorthOnline], (req, res) => {
    components.get(req, res, endpointsUrlKeys.woolWorthOnline);
  });
  app.get([localesEAEndpointMap.safenseure, serverUrls.safenseure], (req, res) => {
    components.get(req, res, endpointsUrlKeys.safenseure);
  });
  app.get([localesEAEndpointMap.aboutUs, serverUrls.aboutUs], (req, res) => {
    components.get(req, res, endpointsUrlKeys.aboutUs);
  });
  app.get([localesEAEndpointMap.leftnav, serverUrls.leftnav], (req, res) => {
    components.get(req, res, endpointsUrlKeys.leftnav);
  });
  app.get([localesEAEndpointMap.faq, serverUrls.faq], (req, res) => {
    components.get(req, res, endpointsUrlKeys.faq);
  });
  app.get([localesEAEndpointMap.corporate, serverUrls.corporate], (req, res) => {
    components.get(req, res, endpointsUrlKeys.corporate);
  });
  app.get([localesEAEndpointMap.faqDetails, serverUrls.faqDetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.faqDetails);
  });
  app.get([localesEAEndpointMap.pressnews, serverUrls.pressnews], (req, res) => {
    components.get(req, res, endpointsUrlKeys.pressnews);
  });
  app.get([localesEAEndpointMap.footerterms, serverUrls.footerterms], (req, res) => {
    components.get(req, res, endpointsUrlKeys.footerterms);
  });

  // Wrewards
  app.get([localesEAEndpointMap.wrewards, serverUrls.wrewards], (req, res) => {
    components.get(req, res, endpointsUrlKeys.wrewards);
  });
  app.get([localesEAEndpointMap.wrewardsLeftNav, serverUrls.wrewardsLeftNav], (req, res) => {
    components.get(req, res, endpointsUrlKeys.wrewardsLeftNav);
  });
  app.get([localesEAEndpointMap.wrewardsTierStatus, serverUrls.wrewardsTierStatus], (req, res) => {
    components.get(req, res, endpointsUrlKeys.wrewardsTierStatus);
  });
  app.get([localesEAEndpointMap.maintainCards, serverUrls.maintainCards], (req, res) => {
    components.get(req, res, endpointsUrlKeys.maintainCards);
  });
  app.post([localesEAEndpointMap.wrewardsValidateAppliedRewards, serverUrls.wrewardsValidateAppliedRewards], (req, res) => {
    components.post(req, res, endpointsUrlKeys.wrewardsValidateAppliedRewards);
  });
  app.post([localesEAEndpointMap.wrewardsRegisterForWrewards, serverUrls.wrewardsRegisterForWrewards], (req, res) => {
    components.post(req, res, endpointsUrlKeys.wrewardsRegisterForWrewards);
  });
  // app.get([localesEAEndpointMap.region, serverUrls.region], (req, res) => {
  //   components.get(req, res, endpointsUrlKeys.region);
  // });
  app.get([localesEAEndpointMap.searchDepartment, serverUrls.searchDepartment], (req, res) => {
    components.get(req, res, endpointsUrlKeys.searchDepartment);
  });
  app.get([localesEAEndpointMap.cartDetails, serverUrls.cartDetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.cartDetails);
  });
  // app.get([localesEAEndpointMap.logo, serverUrls.logo], (req, res) => {
  //   components.get(req, res, endpointsUrlKeys.logo);
  // });
  app.get([localesEAEndpointMap.headerdetails, serverUrls.headerdetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.headerdetails);
  });
  app.post([localesEAEndpointMap.suburb, serverUrls.suburb], (req, res) => {
    components.post(req, res, endpointsUrlKeys.suburb);
  });

  app.post([localesEAEndpointMap.login, serverUrls.login], (req, res) => {
    components.post(req, res, endpointsUrlKeys.login);
  });
  app.post([localesEAEndpointMap.logout, serverUrls.logout], (req, res) => {
    components.post(req, res, endpointsUrlKeys.logout);
  });
  app.get([localesEAEndpointMap.currentUser, serverUrls.currentUser], (req, res) => {
    components.get(req, res, endpointsUrlKeys.currentUser);
  });
  app.get([localesEAEndpointMap.getConfNumber, serverUrls.getConfNumber], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getConfNumber);
  });
  app.get([localesEAEndpointMap.leftNav, serverUrls.leftNav], (req, res) => {
    components.get(req, res, endpointsUrlKeys.leftNav);
  });
  app.get([localesEAEndpointMap.storelocatorByGeoLocation, serverUrls.storelocatorByGeoLocation], (req, res) => {
    components.get(req, res, endpointsUrlKeys.storelocatorByGeoLocation);
  });
  app.get([localesEAEndpointMap.storelocatorByGeoLocation, serverUrls.storelocatorByGeoLocation], (req, res) => {
    components.get(req, res, endpointsUrlKeys.storelocatorByGeoLocation);
  });
  app.get([localesEAEndpointMap.storelocatorByArea, serverUrls.storelocatorByArea], (req, res) => {
    components.get(req, res, endpointsUrlKeys.storelocatorByArea);
  });

  // Cart services
  app.post([localesEAEndpointMap.cartAddItems, serverUrls.cartAddItems], (req, res) => {
    components.post(req, res, endpointsUrlKeys.cartAddItems);
  });
  app.delete([localesEAEndpointMap.cartRemoveItems, serverUrls.cartRemoveItems], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.cartRemoveItems);
  });
  app.delete([localesEAEndpointMap.cartRemoveCommerceItems, serverUrls.cartRemoveCommerceItems], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.cartRemoveCommerceItems);
  });
  app.delete([localesEAEndpointMap.cartRemoveGroupItems, serverUrls.cartRemoveGroupItems], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.cartRemoveGroupItems);
  });
  app.delete([localesEAEndpointMap.cartRemoveAllItems, serverUrls.cartRemoveAllItems], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.cartRemoveAllItems);
  });
  app.post([localesEAEndpointMap.selectGiftWithPurchase, serverUrls.selectGiftWithPurchase], (req, res) => {
    components.post(req, res, endpointsUrlKeys.selectGiftWithPurchase);
  });
  app['patch']([localesEAEndpointMap.cartUpdateItemQty, serverUrls.cartUpdateItemQty], (req, res) => {
    components.patch(req, res, endpointsUrlKeys.cartUpdateItemQty);
  });

  // Checkout
  app.get([localesEAEndpointMap.getUtilityServiceforPayment, serverUrls.getUtilityServiceforPayment], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getUtilityServiceforPayment);
  });
  app.post([localesEAEndpointMap.updateshippinginfo, serverUrls.updateshippinginfo], (req, res) => {
    components.post(req, res, endpointsUrlKeys.updateshippinginfo);
  });
  app.post([localesEAEndpointMap.updateshippinginstructions, serverUrls.updateshippinginstructions], (req, res) => {
    components.post(req, res, endpointsUrlKeys.updateshippinginstructions);
  });
  app.post([localesEAEndpointMap.redeemGiftCard, serverUrls.redeemGiftCard], (req, res) => {
    components.post(req, res, endpointsUrlKeys.redeemGiftCard);
  });
  app.post([localesEAEndpointMap.existingstoreorcreditcard, serverUrls.existingstoreorcreditcard], (req, res) => {
    components.post(req, res, endpointsUrlKeys.existingstoreorcreditcard);
  });
  app.post([localesEAEndpointMap.newcreditcard, serverUrls.newcreditcard], (req, res) => {
    components.post(req, res, endpointsUrlKeys.newcreditcard);
  });
  app.post([localesEAEndpointMap.newstorecard, serverUrls.newstorecard], (req, res) => {
    components.post(req, res, endpointsUrlKeys.newstorecard);
  });
  app.post([localesEAEndpointMap.checkout, serverUrls.checkout], (req, res) => {
    components.post(req, res, endpointsUrlKeys.checkout);
  });
  app.post([localesEAEndpointMap.reprice, serverUrls.reprice], (req, res) => {
    components.post(req, res, endpointsUrlKeys.reprice);
  });
  app.delete([localesEAEndpointMap.removeGiftCard, serverUrls.removeGiftCard], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.removeGiftCard);
  });
  app.get([localesEAEndpointMap.backtoShippingInstructions, serverUrls.backtoShippingInstructions], (req, res) => {
    components.get(req, res, endpointsUrlKeys.backtoShippingInstructions);
  });

  // Voucher Services
  app.post([localesEAEndpointMap.applyVoucher, serverUrls.applyVoucher], (req, res) => {
    components.post(req, res, endpointsUrlKeys.applyVoucher);
  });
  app.post([localesEAEndpointMap.revokeVoucher, serverUrls.revokeVoucher], (req, res) => {
    components.post(req, res, endpointsUrlKeys.revokeVoucher);
  });

  // Giftlist services
  app.post([localesEAEndpointMap.createGiftList, serverUrls.createGiftList], (req, res) => {
    components.post(req, res, endpointsUrlKeys.createGiftList);
  });
  app.post([localesEAEndpointMap.addItemToGiftList, serverUrls.addItemToGiftList], (req, res) => {
    components.post(req, res, endpointsUrlKeys.addItemToGiftList);
  });
  app.post([localesEAEndpointMap.addGroupOfItemsToShoppingList, serverUrls.addGroupOfItemsToShoppingList], (req, res) => {
    components.post(req, res, endpointsUrlKeys.addGroupOfItemsToShoppingList);
  });
  app.post([localesEAEndpointMap.addOrderedItemsToShoppingList, serverUrls.addOrderedItemsToShoppingList], (req, res) => {
    components.post(req, res, endpointsUrlKeys.addOrderedItemsToShoppingList);
  });
  app.delete([localesEAEndpointMap.removeItemFromGiftList, serverUrls.removeItemFromGiftList], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.removeItemFromGiftList);
  });
  app.get([localesEAEndpointMap.getAllGiftLists, serverUrls.getAllGiftLists], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getAllGiftLists);
  });
  app.get([localesEAEndpointMap.getAllItemsInShoppingList, serverUrls.getAllItemsInShoppingList], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getAllItemsInShoppingList);
  });
  app.delete([localesEAEndpointMap.deleteShoppingList, serverUrls.deleteShoppingList], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.deleteShoppingList);
  });

  // Favorite list services
  app.get([localesEAEndpointMap.wishList, serverUrls.wishList], (req, res) => {
    components.get(req, res, endpointsUrlKeys.wishList);
  });
  app.get([localesEAEndpointMap.getAllItemsInWishList, serverUrls.getAllItemsInWishList], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getAllItemsInWishList);
  });
  app.post([localesEAEndpointMap.addItemToWishList, serverUrls.addItemToWishList], (req, res) => {
    components.post(req, res, endpointsUrlKeys.addItemToWishList);
  });
  app.delete([localesEAEndpointMap.removeItemFromWishList, serverUrls.removeItemFromWishList], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.removeItemFromWishList);
  });


  // Delivery slots
  app.get([localesEAEndpointMap.deliverySlots, serverUrls.deliverySlots], (req, res) => {
    components.get(req, res, endpointsUrlKeys.deliverySlots);
  });
  app.get([localesEAEndpointMap.savedAddress, serverUrls.savedAddress], (req, res) => {
    components.get(req, res, endpointsUrlKeys.savedAddress);
  });
  app.get([localesEAEndpointMap.getChangedAddress, serverUrls.getChangedAddress], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getChangedAddress);
  });
  app.post([localesEAEndpointMap.addAddress, serverUrls.addAddress], (req, res) => {
    components.post(req, res, endpointsUrlKeys.addAddress);
  });
  app.post([localesEAEndpointMap.reserveDeliverySlot, serverUrls.reserveDeliverySlot], (req, res) => {
    components.post(req, res, endpointsUrlKeys.reserveDeliverySlot);
  });
  app.post([localesEAEndpointMap.confirmDeliveryAddress, serverUrls.confirmDeliveryAddress], (req, res) => {
    components.post(req, res, endpointsUrlKeys.confirmDeliveryAddress);
  });
  app.post([localesEAEndpointMap.extendDeliverySlots, serverUrls.extendDeliverySlots], (req, res) => {
    components.post(req, res, endpointsUrlKeys.extendDeliverySlots);
  });
  app.post([localesEAEndpointMap.updateDeliverySlots, serverUrls.updateDeliverySlots], (req, res) => {
    components.post(req, res, endpointsUrlKeys.updateDeliverySlots);
  });
  app.post([localesEAEndpointMap.updateShippingInfo, serverUrls.updateShippingInfo], (req, res) => {
    components.post(req, res, endpointsUrlKeys.updateShippingInfo);
  });
  app.get([localesEAEndpointMap.selectedsuburb, serverUrls.selectedsuburb], (req, res) => {
    components.get(req, res, endpointsUrlKeys.selectedsuburb);
  });

  // my orders
  app.get([localesEAEndpointMap.orderhistory, serverUrls.orderhistory], (req, res) => {
    components.get(req, res, endpointsUrlKeys.orderhistory);
  });
  app.get([localesEAEndpointMap.orderDetails, serverUrls.orderDetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.orderDetails);
  });
  app.post([localesEAEndpointMap.cancelOrder, serverUrls.cancelOrder], (req, res) => {
    components.post(req, res, endpointsUrlKeys.cancelOrder);
  });
  app.post([localesEAEndpointMap.addItemsToOrder, serverUrls.addItemsToOrder], (req, res) => {
    components.post(req, res, endpointsUrlKeys.addItemsToOrder);
  });

  // Product services - PDP
  app.get([localesEAEndpointMap.getProductInfo, serverUrls.getProductInfo], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getProductInfo);
  });
  app.get([localesEAEndpointMap.getProductPrice, serverUrls.getProductPrice], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getProductPrice);
  });
  app.get([localesEAEndpointMap.getRecentlyViewedProducts, serverUrls.getRecentlyViewedProducts], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getRecentlyViewedProducts);
  });

  app.get([localesEAEndpointMap.getProductInventory, serverUrls.getProductInventory], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getProductInventory);
  });
  app.get([localesEAEndpointMap.getProductInventoryByStoreId, serverUrls.getProductInventoryByStoreId], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getProductInventoryByStoreId);
  });
  app.post([localesEAEndpointMap.performInventoryCheck, serverUrls.performInventoryCheck], (req, res) => {
    components.post(req, res, endpointsUrlKeys.performInventoryCheck);
  });

  app.get([localesEAEndpointMap.loginFooter, serverUrls.loginFooter], (req, res) => {
    components.get(req, res, endpointsUrlKeys.loginFooter);
  });

  app.get([localesEAEndpointMap.getAccountDetails, serverUrls.getAccountDetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getAccountDetails);
  });

  app.get([localesEAEndpointMap.getdashboarddetails, serverUrls.getdashboarddetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getdashboarddetails);
  });

  app.post([localesEAEndpointMap.createUser, serverUrls.createUser], (req, res) => {
    components.post(req, res, endpointsUrlKeys.createUser);
  });

  app.post([localesEAEndpointMap.confirmcustomerlogin, serverUrls.confirmcustomerlogin], (req, res) => {
    components.post(req, res, endpointsUrlKeys.confirmcustomerlogin);
  });

  app.post([localesEAEndpointMap.resendotp, serverUrls.resendotp], (req, res) => {
    components.post(req, res, endpointsUrlKeys.resendotp);
  });

  app.post([localesEAEndpointMap.forgotpassword, serverUrls.forgotpassword], (req, res) => {
    components.post(req, res, endpointsUrlKeys.forgotpassword);
  });

  app.get([localesEAEndpointMap.fetchcustomer, serverUrls.fetchcustomer], (req, res) => {
    components.get(req, res, endpointsUrlKeys.fetchcustomer);
  });

  app.patch([localesEAEndpointMap.updateContactNumbers, serverUrls.updateContactNumbers], (req, res) => {
    components.patch(req, res, endpointsUrlKeys.updateContactNumbers);
  });

  app.patch([localesEAEndpointMap.updateUserEmail, serverUrls.updateUserEmail], (req, res) => {
    components.patch(req, res, endpointsUrlKeys.updateUserEmail);
  });

  app.patch([localesEAEndpointMap.updateUserEmailAddresses, serverUrls.updateUserEmailAddresses], (req, res) => {
    components.patch(req, res, endpointsUrlKeys.updateUserEmailAddresses);
  });

  app.patch([localesEAEndpointMap.updateaddress, serverUrls.updateaddress], (req, res) => {
    components.patch(req, res, endpointsUrlKeys.updateaddress);
  });

  app.patch([localesEAEndpointMap.changePassword, serverUrls.changePassword], (req, res) => {
    components.patch(req, res, endpointsUrlKeys.changePassword);
  });

  app.patch([localesEAEndpointMap.updateUserDetails, serverUrls.updateUserDetails], (req, res) => {
    components.patch(req, res, endpointsUrlKeys.updateUserDetails);
  });

  app.delete([localesEAEndpointMap.deleteUser, serverUrls.deleteUser], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.deleteUser);
  });

  app.delete([localesEAEndpointMap.deleteaddress, serverUrls.deleteaddress], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.deleteaddress);
  });

  app.get([localesEAEndpointMap.getleftNav, serverUrls.getleftNav], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getleftNav);
  });

  app.get([localesEAEndpointMap.savedaddress, serverUrls.savedaddress], (req, res) => {
    components.get(req, res, endpointsUrlKeys.savedaddress);
  });

  app.get([localesEAEndpointMap.fetchaddress, serverUrls.fetchaddress], (req, res) => {
    components.get(req, res, endpointsUrlKeys.fetchaddress);
  });

  app.get([localesEAEndpointMap.editcustomeraddress, serverUrls.editcustomeraddress], (req, res) => {
    components.get(req, res, endpointsUrlKeys.editcustomeraddress);
  });
  app.post([localesEAEndpointMap.updateccustomeraddress, serverUrls.updateccustomeraddress], (req, res) => {
    components.post(req, res, endpointsUrlKeys.updateccustomeraddress);
  });
  app.get([localesEAEndpointMap.userconsent, serverUrls.userconsent], (req, res) => {
    components.get(req, res, endpointsUrlKeys.userconsent);
  });
  app.post([localesEAEndpointMap.postuserConsent, serverUrls.postuserConsent], (req, res) => {
    components.post(req, res, endpointsUrlKeys.postuserConsent);
  });
  app.post([localesEAEndpointMap.addnewaddress, serverUrls.addnewaddress], (req, res) => {
    components.post(req, res, endpointsUrlKeys.addnewaddress);
  });
  app.get([localesEAEndpointMap.userinterests, serverUrls.userinterests], (req, res) => {
    components.get(req, res, endpointsUrlKeys.userinterests);
  });
  app.post([localesEAEndpointMap.postuserinterests, serverUrls.postuserinterests], (req, res) => {
    components.post(req, res, endpointsUrlKeys.postuserinterests);
  });

  app.get([localesEAEndpointMap.getchildDetails, serverUrls.getchildDetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getchildDetails);
  });
  app.patch([localesEAEndpointMap.updatechildDetails, serverUrls.updatechildDetails], (req, res) => {
    components.patch(req, res, endpointsUrlKeys.updatechildDetails);
  });
  app.delete([localesEAEndpointMap.deletechildDetails, serverUrls.deletechildDetails], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.deletechildDetails);
  });
  app.post([localesEAEndpointMap.addchildDetails, serverUrls.addchildDetails], (req, res) => {
    components.post(req, res, endpointsUrlKeys.addchildDetails);
  });
  app.post([localesEAEndpointMap.addcreditcarddetails, serverUrls.addcreditcarddetails], (req, res) => {
    components.post(req, res, endpointsUrlKeys.addcreditcarddetails);
  });
  app.get([localesEAEndpointMap.getcreditcarddetails, serverUrls.getcreditcarddetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getcreditcarddetails);
  });
  app.delete([localesEAEndpointMap.deletecreditcarddetails, serverUrls.deletecreditcarddetails], (req, res) => {
    components.delete(req, res, endpointsUrlKeys.deletecreditcarddetails);
  });
  // Financial services
  app.get([localesEAEndpointMap.financialServicesLandingPage, serverUrls.financialServicesLandingPage], (req, res) => {
    components.get(req, res, endpointsUrlKeys.financialServicesLandingPage);
  });

  app.get([localesEAEndpointMap.wfsLeftNav, serverUrls.wfsLeftNav], (req, res) => {
    components.get(req, res, endpointsUrlKeys.wfsLeftNav);
  });

  app.post([localesEAEndpointMap.postApplyNow, serverUrls.postApplyNow], (req, res) => {
    components.post(req, res, endpointsUrlKeys.postApplyNow);
  });

  app.get([localesEAEndpointMap.searchSuburb, serverUrls.searchSuburb], (req, res) => {
    components.get(req, res, endpointsUrlKeys.searchSuburb);
  });

  app.post([localesEAEndpointMap.postPersonalInfo, serverUrls.postPersonalInfo], (req, res) => {
    components.post(req, res, endpointsUrlKeys.postPersonalInfo);
  });

  app.post([localesEAEndpointMap.postIncomeExpenses, serverUrls.postIncomeExpenses], (req, res) => {
    components.post(req, res, endpointsUrlKeys.postIncomeExpenses);
  });

  app.post([localesEAEndpointMap.selectOffers, serverUrls.selectOffers], (req, res) => {
    components.post(req, res, endpointsUrlKeys.selectOffers);
  });

  app.get([localesEAEndpointMap.clearWfsSession, serverUrls.clearWfsSession], (req, res) => {
    components.get(req, res, endpointsUrlKeys.clearWfsSession);
  });

  app.get([localesEAEndpointMap.storeCardSummary, serverUrls.storeCardSummary], (req, res) => {
    components.get(req, res, endpointsUrlKeys.storeCardSummary);
  });

  app.post([localesEAEndpointMap.transactionHistory, serverUrls.transactionHistory], (req, res) => {
    components.post(req, res, endpointsUrlKeys.transactionHistory);
  });

  app.get([localesEAEndpointMap.switchStatementDetails, serverUrls.switchStatementDetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.switchStatementDetails);
  });

  app.post([localesEAEndpointMap.updatestatementpreferences, serverUrls.updatestatementpreferences], (req, res) => {
    components.post(req, res, endpointsUrlKeys.updatestatementpreferences);
  });

  app.get([localesEAEndpointMap.wrewardsSavingDetails, serverUrls.wrewardsSavingDetails], (req, res) => {
    components.get(req, res, endpointsUrlKeys.wrewardsSavingDetails);
  });

  app.get([localesEAEndpointMap.myVouchers, serverUrls.myVouchers], (req, res) => {
    components.get(req, res, endpointsUrlKeys.myVouchers);
  });
  app.post([localesEAEndpointMap.cardDetails, serverUrls.cardDetails], (req, res) => {
    components.post(req, res, endpointsUrlKeys.cardDetails);
  });
  app.get([localesEAEndpointMap.getRewardsLoyalty, serverUrls.getRewardsLoyalty], (req, res) => {
    components.get(req, res, endpointsUrlKeys.getRewardsLoyalty);
  });
  app.post([localesEAEndpointMap.postRewardsLoyalty, serverUrls.postRewardsLoyalty], (req, res) => {
    components.post(req, res, endpointsUrlKeys.postRewardsLoyalty);
  });
};
