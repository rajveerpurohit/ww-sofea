import React from 'react';
import * as Cartridge from '../components/cartridges';
/*
    makeCartridgeName() is function which returns endeca 'contentType' in the form of our folder structure,
    We are using this to maintain out Naming conventions accros the Project.
*/
export const makeCartridgeName = contentType => (contentType.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ').join('-').toLowerCase());

export const returnCartridge = (contentData, atgUrl) => {
  const type = '@type';

  if (contentData) {
    return contentData.map((content, index) => {
      let compType = content[type];
      compType = compType.replace(/-/g, '');
      const ReturnComp = Cartridge[compType];
      const imageBannerData = { ...content, atgUrl, key: index };

      return ReturnComp ? <ReturnComp contentData={imageBannerData} key={index} /> : null;
    });
  }

  return null;
};
