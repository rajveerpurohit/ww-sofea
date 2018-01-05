/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const components = require('../controllers/components');
const apiaggregatorEndpoints = require('../controllers/apiAggregatorEndPoints');

const endpoints = apiaggregatorEndpoints.endpoints;
const endpointsUrlKeys = apiaggregatorEndpoints.endpointsUrlKeys;
const serverUrls = apiaggregatorEndpoints.serverUrls;
const localesEAEndpointMap = apiaggregatorEndpoints.localesEAEndpointMap;

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;

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
    app.get([localesEAEndpointMap.search, serverUrls.search], (req, res) => {
        components.get(req, res, endpointsUrlKeys.search);
    });
    app.get([localesEAEndpointMap.contactInfo, serverUrls.contactInfo], (req, res) => {
        components.get(req, res, endpointsUrlKeys.contactInfo);
    });
    app.get([localesEAEndpointMap.labels, serverUrls.labels], (req, res) => {
        components.get(req, res, endpointsUrlKeys.labels);
    });
    app.get([localesEAEndpointMap.footer, serverUrls.footer], (req, res) => {
        components.get(req, res, endpointsUrlKeys.footer);
    });
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
    app.get([localesEAEndpointMap.home, serverUrls.home], (req, res) => {
        components.get(req, res, endpointsUrlKeys.home);
    });
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
    app.get([localesEAEndpointMap.faqDetails, serverUrls.faqDetails], (req, res) => {
        components.get(req, res, endpointsUrlKeys.faqDetails);
    });
    app.get([localesEAEndpointMap.pressnews, serverUrls.pressnews], (req, res) => {
        components.get(req, res, endpointsUrlKeys.pressnews);
    });
    app.get([localesEAEndpointMap.footerterms, serverUrls.footerterms], (req, res) => {
        components.get(req, res, endpointsUrlKeys.footerterms);
    });
    app.get([localesEAEndpointMap.region, serverUrls.region], (req, res) => {
        components.get(req, res, endpointsUrlKeys.region);
    });
    app.get([localesEAEndpointMap.landingpages, serverUrls.landingpages], (req, res) => {
        components.get(req, res, endpointsUrlKeys.landingpages);
    });
    app.get([localesEAEndpointMap.cartdetails, serverUrls.cartdetails], (req, res) => {
        components.get(req, res, endpointsUrlKeys.cartdetails);
    });
    app.get([localesEAEndpointMap.logo, serverUrls.logo], (req, res) => {
        components.get(req, res, endpointsUrlKeys.logo);
    });
    app.post([localesEAEndpointMap.suburb, serverUrls.suburb], function (req, res) {
        components.post(req, res, endpointsUrlKeys.suburb);
    });
    app.post([localesEAEndpointMap.login, serverUrls.login], function (req, res) {
        components.post(req, res, endpointsUrlKeys.login);
    });
    app.post([localesEAEndpointMap.logout, serverUrls.logout], function (req, res) {
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
    if (passportConfig && passportConfig.google) {
        // google auth
        // Redirect the user to Google for authentication. When complete, Google
        // will redirect the user back to the application at
        // /auth/google/return
        // Authentication with google requires an additional scope param, for more info go
        // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
        app.get('/auth/google', passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }));

        // Google will redirect the user to this URL after authentication. Finish the
        // process by verifying the assertion. If valid, the user will be logged in.
        // Otherwise, the authentication has failed.
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/',
                failureRedirect: '/login'
            })
        );
    }

    // topic routes
    if (topicsController) {
        app.get('/topic', topicsController.all);
        app.post('/topic/:id', topicsController.add);
        app.put('/topic/:id', topicsController.update);
        app.delete('/topic/:id', topicsController.remove);
    } else {
        // console.warn(unsupportedMessage('topics routes'));
    }
};
