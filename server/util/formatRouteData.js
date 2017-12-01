'use strict';
var isEqual = require('lodash').isEqual;

var logger = require('../../lib/serverLoggerHandler');
var loggerHandler = logger.getBunyanInstance('formatRouteData');

/*
 * function to check if a template already exists in the
 * templateSet array. If it does return its index,
 * otherwise push it onto the end of the array and return
 * the array length before the push
 * (ie the template's new index in the array)
 */
function getIndexForTemplate(templateSet, template) {
  loggerHandler.debug('formatRouteData.js - getIndexForTemplate');
  const setLen = templateSet.length;
  for (let i = 0; i < setLen; ++i) {
    // if the template is already in the set,
    // return its index.
    if (isEqual(template, templateSet[i])) {
      return i;
    }
  }
  // The template wasn't found, add it to the set,
  // the index will be the previously measured length of the array.
  templateSet.push(template);
  return setLen;
}

/*
 * function to actually pick the components of the category that we want
 * for the initial payload
 */
function createRoute(elem, parentURL, templateSet) {
  loggerHandler.debug('formatRouteData.js - createRoute');
  const templateIndex = getIndexForTemplate(templateSet, elem.template);
  const url = (elem.seo) ? parentURL + elem.seo.name : parentURL;
  elem.seo.nameTag = elem.seo.name;
  elem.nameTag = elem.name;
  return {
    id: elem.id,
    dimensionId: elem.dimensionId,
    templateIndex: templateIndex,
    name: elem.name,
    nameTag: elem.name,
    seo: elem.seo,
    url: url,
    priceFilterType: elem.priceFilterType
  };
}

function getTrendCategoryUrl(category) {
  let url;
  if (category.seo && category.seo.url && category.seo.url.indexOf('R-cat') !== -1) { // ATG Trend Categories
    url = category.seo.url;
  } else { // Endeca Trend Categories
    url = 'trend/' + category.seo.name;
  }
  return url;
}

function trendCategoryRoutes(elem, templateSet) {
  loggerHandler.debug('formatRouteData.js - trendCategoryRoutes');
  const templateIndex = getIndexForTemplate(templateSet, elem.template);
  elem.seo.nameTag = elem.seo.name;
  elem.nameTag = elem.name;
  return {
    id: elem.id,
    dimensionId: elem.dimensionId,
    templateIndex: templateIndex,
    name: elem.name,
    nameTag: elem.name,
    type: "TREND-CATEGORY",
    seo: elem.seo,
    url: getTrendCategoryUrl(elem),
    priceFilterType: elem.priceFilterType
  };
}
/*
 * Recursive function to parse the nested blob object.
 * Recurses each time a child or trend array is encountered
 */
function formatSubRoute(child, parentURL, templateSet) {
  loggerHandler.debug('formatRouteData.js - formatSubRoute');
  let routes = [];
  // assume that the child has been called because it has the required data
  // create a route at least for this one
  routes.push(createRoute(child, parentURL, templateSet));

  const baseURL = parentURL + child.seo.name + '/';

  // if it has children, recurse to create those.
  if (child.childCategories && child.childCategories.length > 0) {
    const children = child.childCategories;
    const len = children.length;
    // for each child category, recurse
    for (let i = 0; i < len; ++i) {
      routes = routes.concat(formatSubRoute(children[i], baseURL, templateSet));
    }
  }

  // if it has trends, recurse to create those.
  // probably want different handling here.
  // TODO: handle the trend category's inbuilt URL property
  if (child.trendCategories && child.trendCategories.length > 0) {
    const trends = child.trendCategories;
    const len = trends.length;
    // for each child category, recurse
    for (let i = 0; i < len; ++i) {
      routes = routes.concat(trendCategoryRoutes(trends[i], templateSet));
    }
  }

  return routes;
}

function deleteTemplate(category) {
  loggerHandler.debug('formatRouteData.js - deleteTemplate');
  if (category && category.template) {
    delete category.template;
  }
}

function categoriesOnly(blobArr) {
  loggerHandler.debug('formatRouteData.js - categoriesOnly');
  for (let i = 0; i < blobArr.length; ++i) {
    const category = blobArr[i].category || blobArr[i].nonNavCategory;
    if (blobArr[i].page) {
      continue;
    }
    deleteTemplate(category);
    if (category.childCategories && category.childCategories.length) {
      for (let y = 0; y < category.childCategories.length; y++) {
        const childCategory = category.childCategories[i];
        deleteTemplate(childCategory);
        if (childCategory && childCategory.childCategories) {
          for (let y = 0; y < childCategory.childCategories.length; y++) {
            const grandChildCategory = childCategory.childCategories[i];
            deleteTemplate(grandChildCategory);
          }
        }
      }
    }
  }
  return blobArr;
};
function updateAdditionalExperiences(experienceData) {
  const page = experienceData.page;
  return page;
};
function formatBlob(navigationData, localeString) {
  loggerHandler.debug('formatRouteData.js - formatRouteData');
  let dynamicRoutes = [];
  const templateSet = [];
  let categories;
  const additionalExperiences = [];
  for (let i = 0; i < navigationData.length; ++i) {
    if (navigationData[i].page) {
      additionalExperiences.push(updateAdditionalExperiences(navigationData[i]));
    } else {
      const catName = navigationData[i].category || navigationData[i].nonNavCategory;
      const response = formatSubRoute(catName, "", templateSet);
      dynamicRoutes = dynamicRoutes.concat(response);
    }
  }
  categories = categoriesOnly(navigationData);

  loggerHandler.info('Format Route:::Formatted Blob :', localeString);
  loggerHandler.info('Format Route:::Formatted Routes: ', dynamicRoutes.length);
  loggerHandler.info('Format Route:::Unique Templates found: ', templateSet.length);
  loggerHandler.info('Format Route:::L1 Categories found in Blob: ', categories.length);

  return {
    dynamicRoutes,
    templateSet,
    categories,
    additionalExperiences
  };
}

function formatRouteData(navigationData) {
  const blobCopy = JSON.parse(JSON.stringify(navigationData)) || [];
  const formattedBlobMap = {};
  for (var localeString in blobCopy) {
    const formattedBlob = formatBlob(blobCopy[localeString], localeString);
    formattedBlobMap[localeString] = formattedBlob;
  }
  return formattedBlobMap;
}

module.exports = formatRouteData;
