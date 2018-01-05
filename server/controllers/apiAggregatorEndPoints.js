const endpoints = {
  megamenu: '/headers/megamenu',
  // utilitylink: '/headers/utilitylinks',
  logo: '/headers/headerlogo',
  profilestatus: '/customer/profilestatus',
  labels: '/static/content/labels',
  cartdetails: '/cart/cartdetails',
  cart: '/cart/',
  footer: '/footers',
  // aboutUs: '/static/aboutus',
  // faqs: '/static/faqs',
  contactUs: '/footers/contactus',
  contactInfo: '/footers/contactinfo',
  helpcenter: '/footers/gethelpdetails',
  newsandpress: '/static/newsandpress',
  termsAndConditions: '/static/termsandconditions',
  usingWoolworthsOnline: '/static/usingwoolworthsonline',
  home: '/static/content/home',
  landingpages: '/static/content/landingpages',
  woolWorthOnline: '/footers/getwoolworthsonline',
  safenseure: '/footers/getsafesecuredetails',
  aboutUs: '/footers/getaboutusdetails',
  faq: '/footers/getfaqdetails',
  faqDetails: '/static/content/staticPage/faqs',
  leftnav: '/static/content/staticPage/leftNav',
  topheader: '/headers/utilitylinks',
  pressnews: '/footers/getnewsandpress',
  footerterms: '/footers/gettermsandconditions',
  region: '/regions',
  corporateSales: '/footers/getcorporatesalesdetails',
  suburb: '/regions/suburb',
  search: '/search/typeahedsearch',
  getConfNumber: '/token',
  login: '/currentUser/login',
  currentUser: '/currentUser',
  logout: '/currentUser/logout',
  leftNav: '/static/content/staticPage/leftNav',
  storelocatorByGeoLocation:  '/storelocator/locatestorebylocation', 
  storelocatorByArea: '/storelocator/'

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
