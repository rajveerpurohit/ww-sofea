const endpoints = {
  megamenu: '/headers/megamenu',
  utilitylink: '/headers/utilitylinks',
  logo: '/headers/headerlogo',
  profilestatus: '/customer/profilestatus',
  login: '/currentUser/login',
  currentUser: '/currentUser',
  logout: '/currentUser/logout',
  regions: '/regions',
  cart: '/cart/',
  footer: '/footers',
<<<<<<< .mine
  aboutUs: '/static/aboutus',
  contactUs: '/footers/contactus',
  faqs: '/static/faqs',
  help: '/static/help',
||||||| .r265
  aboutUs: '/static/aboutus',
  faqs: '/static/faqs',
  help: '/static/help',
=======
  //aboutUs: '/static/aboutus',
  //faqs: '/static/faqs',
  helpcenter : '/footers/gethelpdetails',
>>>>>>> .r284
  newsandpress: '/static/newsandpress',
  termsAndConditions: '/static/termsandconditions',
  usingWoolworthsOnline: '/static/usingwoolworthsonline',
  home: '/static/content/home',
  woolWorthOnline: '/footers/getwoolworthsonline',
  safenseure : '/footers/getsafesecuredetails',
  aboutUs : '/footers/getaboutusdetails',
  faq: '/footers/getfaqdetails',
  topHeader : '/headers/utilitylinks',
  pressnews : '/footers/getnewsandpress',
  footerterms : '/footers/gettermsandconditions'
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
    urls[endpt] = cachedPrefix + "/" + endpt;
    localesEAEndpointMap[endpt] = '/*' + cachedPrefix + "/" + endpt;
  } else {
    urls[endpt] = prefix + "/" + endpt;
    localesEAEndpointMap[endpt] = '/*' + prefix + "/" + endpt;
  }
}

module.exports = {
  endpoints,
  endpointsUrlKeys,
  serverUrls: urls,
  localesEAEndpointMap
};