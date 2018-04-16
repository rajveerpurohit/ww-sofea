// viewportType
export const VIEW_PORT_TYPE_MOBILE = 'mobile';
export const VIEW_PORT_TYPE_DESKTOP = 'desktop';

// Mobile Nav Top options
export const MOBILE_HEADER_OPTION_SEARCH = 'search';
export const MOBILE_HEADER_OPTION_ACCOUNT = 'account';
export const MOBILE_HEADER_OPTION_CART = 'cart';
export const MOBILE_HEADER_OPTION_MEGANAV = 'meganav';

// header constants
export const DEFAULT_SUBURB_ID = '649';
export const DEFAULT_STORE_ID = '242';
export const DEFAULT_FOOD_FULFILLER_TYPE = '01';
export const STORE_ID_COOKIE_NAME = 'storeId';

// Ribbons criteria
export const BADGE_KEYS_PREFERENCE = ['NEW', 'EARTHCRED', 'SAVE', 'WREWARDS', 'VITALITY'];
export const BADGE_KEYS_REMOVE_PREFERENCE = ['NEW', 'VITALITY', 'WREWARDS', 'EARTHCRED', 'SAVE'];
export const MAX_BADGES_ALLOWED = 3;

// Page Template Type
export const TEMPLATE_TYPE = ['longerLanding', 'categoryPages'];

// CLP
export const PRECISION_LENGTH = 2;

// Date Picker
export const DEFAULT_DATE_PICKER_DATE_FORMAT = 'YYYY-MM-DD';

// Cart action panel
export const ALLOWED_ITEM_QUANTITY_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const DEFAULT_ITEM_QUANTITY = 1;
export const DEFAULT_ITEM_QUANTITY_LABEL = 'Qty';
export const DEFAULT_INVENTORY_QUANTITY = 10;
export const DEFAULT_MAX_INVENTORY_QUANTITY = 99;

// Contact Us - Message body chars total count
export const TOTAL_CHAR_COUNT_FOR_CONTACT_US_MESSAGE = 512;

// Favorite list
export const GIFT_LIST_TYPE = 'MY FAVORITES';

// PDP
export const PRODUCT_SIZE_CONST_ML = 'ml';
export const PRODUCT_SIZE_CONST_G = ['0g', '1g', '2g', '3g', '4g', '5g', '6g', '7g', '8g', '9g'];
export const DELIVERY_AND_RETURN_FAQ_CONTENT_ID = 'cfaq000069';
export const RECENTLY_VIEWED_PRODUCTS_COOKIE_NAME = 'RecentlyViewed';
export const MAX_RECENTLY_VIEWED_PRODUCTS_IN_COOKIE = 20;

// Social sites
// http://twitter.com/share?text=<TITLE>&url=<URL>
export const TWITTER_SHARE_URL = 'http://twitter.com/share';
// http://www.facebook.com/sharer.php?u=<URL>&p[title]=<TITLE>
export const FACEBOOK_SHARE_URL = 'http://www.facebook.com/sharer.php';
// http://pinterest.com/pin/create/button/?url=<URL>&description=<TITLE>
export const PINTEREST_SHARE_URL = 'http://pinterest.com/pin/create/button';

export const PINTEREST_THUMBNAIL_URL = 'assets.pinterest.com/images/pidgets/pin_it_button.png';

// TODO: need to create a facebook app for WW.
export const FACEBOOK_APP_ID = '1422117294580907';


// Start Search after 'N' latters in search inputs
export const SEARCH_AFTER_N_LATTERS = 1;

export const pdpSliderSettings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  accessibility: false,
  mobileFirst: true
};

export const SITE_TITLE_URL = 'Woolworths.co.za';

export const recentViewSliderSettings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  accessibility: false,
  mobileFirst: true,
  responsive: [{
    breakpoint: 1500,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  }, {
    breakpoint: 1024,
    settings: {
      slidesToScroll: 3,
      slidesToShow: 3,
    }
  }, {
    breakpoint: 600,
    settings: {
      initialSlide: 2,
      slidesToScroll: 2,
      slidesToShow: 2,
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToScroll: 1,
      slidesToShow: 1,
    }
  }]
};

export const miniCartSliderSettings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  vertical: true,
  verticalSwiping: true,
  accessibility: false,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        vertical: true,
        verticalSwiping: true
      }
    }
  ]
};
