const endpoints = {
  megamenu: '/headers/megamenu',
  // utilitylink: '/headers/utilitylinks',
  headerdetails: '/headers/headerdetails',
  // logo: '/headers/headerlogo',
  profilestatus: '/customer/profilestatus',
  labels: '/label',
  // footer: '/footers',
  // aboutUs: '/static/aboutus',
  // faqs: '/static/faqs',
  contactUs: '/footers/contactus',
  contactUsPost: '/footers/contactus',
  contactInfo: '/footers/contactinfo',
  helpcenter: '/static/content/staticPage/help',
  newsandpress: '/static/newsandpress',
  termsAndConditions: '/static/termsandconditions',
  usingWoolworthsOnline: '/static/usingwoolworthsonline',
  // home: '/static/content/home',
  landingpages: '/static/content/landingpages',
  recipe: '/static/content/recipe',
  woolWorthOnline: '/footers/getwoolworthsonline',
  safenseure: '/footers/getsafesecuredetails',
  aboutUs: '/footers/getaboutusdetails',
  faq: '/footers/getfaqdetails',
  faqDetails: '/static/content/staticPage/faqs',
  corporate: '/static/content/staticPage/corporate',
  leftnav: '/static/content/staticPage/leftNav',
  topheader: '/headers/utilitylinks',
  pressnews: '/footers/getnewsandpress',
  footerterms: '/footers/gettermsandconditions',

  // Wrewards
  wrewards: '/wrewards/wrewardsdetails',
  wrewardsLeftNav: '/static/content/staticPage/wrewardsLeftNav',
  wrewardsTierStatus: '/wrewards/tierstatusdetails',
  maintainCards: '/wrewards/rewardcards',
  wrewardsValidateAppliedRewards: '/wrewards/validateappliedrewards',
  wrewardsRegisterForWrewards: '/wrewards/registerforwrewards',
  // region: '/regions',
  corporateSales: '/footers/getcorporatesalesdetails',
  suburb: '/regions/suburb',
  search: '/search/typeahedsearch',
  searchCategory: '/search/category',
  searchDepartment: '/search/department/landingpages',
  getConfNumber: '/token',
  login: '/currentUser/login',
  currentUser: '/currentUser',
  logout: '/currentUser/logout',
  leftNav: '/static/content/staticPage/leftNav',
  storelocatorByGeoLocation: '/storelocator/locatestorebylocation',
  storelocatorByArea: '/storelocator/',
  searchinput: '/search/category/%2Fcat%2F?Ntt=men&Dy=1',
  loginFooter: '/static/content/staticPage/secureFooterLinks',
  // Cart services
  cart: '/cart',
  cartDetails: '/cart/details',
  cartAddItems: '/cart/items',
  cartRemoveItems: '/cart/items/all/productid',
  cartRemoveCommerceItems: '/cart/items',
  cartRemoveGroupItems: '/cart/items/type',
  cartRemoveAllItems: '/cart/items/all',
  cartUpdateItemQty: '/cart/item/:commerceItemId',
  selectGiftWithPurchase: '/cart/makegwpselection',

  // Checkout
  updateshippinginfo: '/cart/updateshippinginfo',
  updateshippinginstructions: '/cart/updateshippinginstructions',
  getUtilityServiceforPayment: '/cart/getUtilityServiceforPayment',
  redeemGiftCard: '/cart/checkout/redeemgiftcard',
  removeGiftCard: '/cart/checkout/removegiftcard',
  existingstoreorcreditcard: '/cart/existingstoreorcreditcard',
  newcreditcard: '/cart/newcreditcard',
  newstorecard: '/cart/newstorecard',
  checkout: '/cart/checkout',
  reprice: '/cart/repriceitem',
  backtoShippingInstructions: '/cart/backtoshippinginstructions',


  // Voucher Services
  applyVoucher: '/cart/claimcoupons',
  revokeVoucher: '/cart/removecoupons',

  // Giftlist services
  createGiftList: '/gift',
  addItemToGiftList: '/gift/item',
  addGroupOfItemsToShoppingList: '/gift/addgroupofitemstolist',
  //addOrderedItemsToShoppingList: '/gift/additemtolist',
  addOrderedItemsToShoppingList: '/gift/addorderitemstolist',
  removeItemFromGiftList: '/gift/item',
  getAllGiftLists: '/gift/list',
  deleteShoppingList: '/gift',
  getAllItemsInShoppingList: '/gift/list/:shopingListId',

  // Wishlist services
  wishList: '/wishlist',
  addItemToWishList: '/wishlist',
  removeItemFromWishList: '/wishlist/:wishlistId',
  getAllItemsInWishList: '/wishlist/items',

  // delivery slots
  deliverySlots: '/currentuser/availabledeliveryslots',
  savedAddress: '/currentuser/savedaddress',
  addAddress: '/currentuser/addnewaddress',
  reserveDeliverySlot: '/currentuser/reservedeliveryslot',
  getChangedAddress: '/currentuser/changedaddress/:changedAddress',
  confirmDeliveryAddress: '/currentuser/confirmdeliveryaddress',
  extendDeliverySlots: '/currentuser/updateextendeddeliveryslots',
  selectedsuburb: '/regions/validateselectedsuburb',
  updateDeliverySlots: '/cart/updatedeliveryslotproperties',
  updateShippingInfo: '/cart/updateshippinginfo',

  // PDP
  getProductInfo: '/product',
  getProductPrice: '/product/prices',
  getRecentlyViewedProducts: '/product/view/recently/:productId',
  getProductInventoryByStoreId: '/inventory/multi/:storeId/:inventoryIds',
  getProductInventory: '/inventory/multi/:inventoryIds',
  performInventoryCheck: '/regions/inventorycheckforskuinsuburb',

  // accountDetails
  getleftNav: '/static/content/staticPage/leftNavMyAccount',
  getAccountDetails: '/currentuser/viewuserdetails/:profileId',
  updateContactNumbers: '/currentuser/updatecontactdetails',
  updateUserEmailAddresses: '/currentuser/updateemail',
  updateUserEmail: '/currentuser/updateprofile',
  changePassword: '/currentuser/changepassword',
  updateUserDetails: '/currentuser/updateuserdetails',
  deleteUser: '/currentuser/deleteprofile',
  getdashboarddetails: '/currentuser/getdashboarddetails',
  createUser: '/currentuser/createuser',
  confirmcustomerlogin: '/currentuser/confirmcustomerlogin',
  resendotp: '/currentuser/resendotp',
  forgotpassword: '/currentuser/forgotpassword',
  fetchcustomer: '/currentuser/fetchcustomer/:idenificationNumber',
  addcreditcarddetails: '/currentuser/creditcard',
  getcreditcarddetails: '/currentuser/creditcard',
  deletecreditcarddetails: '/currentuser/creditcard',
  savedaddress: '/currentuser/savedaddress',
  addnewaddress: '/currentuser/addnewaddress',
  updateaddress: '/currentuser/updateaddress/:addressId',
  deleteaddress: '/currentuser/deleteaddress/:addressId',
  fetchaddress: '/currentuser/fetchaddress/:customerId',
  editcustomeraddress: '/currentuser/editcustomeraddress/:addressID',
  updateccustomeraddress: '/currentuser/updateccustomeraddress',

  // littleWorld services
  getchildDetails: '/currentuser/getchilddetails',
  updatechildDetails: '/currentuser/updatechilddetails',
  deletechildDetails: '/currentuser/deletechild',
  addchildDetails: '/currentuser/addchild',

  // myorders
  orderhistory: '/cart/order/orderhistory',
  orderDetails: '/cart/order/orderdetails/:orderId',
  cancelOrder: '/cart/order/cancelorder',
  addItemsToOrder: '/cart/order/additemstocurrentorder',

  // finacial services
  financialServicesLandingPage: '/wfs',
  wfsLeftNav: '/static/content/staticPage/wfsLeftNav',
  postApplyNow: '/wfs/applyCard',
  postPersonalInfo: '/wfs/PersonalInfo',
  searchSuburb: '/wfs/searchSuburb',
  postIncomeExpenses: '/wfs/incomeExpenses',
  selectOffers: '/wfs/selectOffers',
  clearWfsSession: '/wfs/clearWfsSession',
  storeCardSummary: '/wfs/storecardsummary',
  transactionHistory: '/wfs/transactionhistory',
  switchStatementDetails: '/wfs/switchstatementdetails',
  updatestatementpreferences: '/wfs/updatestatementpreferences',
  cardDetails: '/wfs/carddetails',

  userconsent: '/currentuser/getuserconsent',
  postuserConsent: '/currentuser/updateconsent',

  userinterests: '/currentuser/getuserinterests',
  postuserinterests: '/currentuser/updateinterest',
  wrewardsSavingDetails: '/wrewards/savingdetails',
  myVouchers: '/currentuser/myvoucherdetails',

  schoolContribution: '/wrewards/getcontributions',
  getRewardsLoyalty: '/wrewards/userloyaltycarddetails',
  postRewardsLoyalty: '/wrewards/applyloyaltycard'
};

const cachedEndpointsArray = [ // Response for these APIs will be cached by AKAMAI
  'collections',
  'products'
];


const endpointsUrlKeys = {};
for (const ep in endpoints) {
  endpointsUrlKeys[ep] = ep;
}


const prefix = '/server';
const cachedPrefix = '/server/data';

const urls = {};
const localesEAEndpointMap = {};
for (const endpt in endpoints) {
  if (cachedEndpointsArray.indexOf(endpt) !== -1) {
    urls[endpt] = cachedPrefix + '/' + endpt;
    localesEAEndpointMap[endpt] = '/*' + cachedPrefix + '/' + endpt;
  } else {
    urls[endpt] = prefix + '/' + endpt;
    localesEAEndpointMap[endpt] = '/*' + prefix + '/' + endpt;
  }
}

module.exports = {
  endpoints,
  endpointsUrlKeys,
  serverUrls: urls,
  localesEAEndpointMap
};
