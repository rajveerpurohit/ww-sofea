import React from 'react';
import {returnCartridge} from '../../../utils/homePageUtils';


const DepartmentBannerSlot = ({contentData}) => {
  const generateBannerSlot = (contents) => {
    return contents.map((content) => {
        return returnCartridge(content.main);
    });
  };
    return (
      <div>{generateBannerSlot(contentData.contents)}</div>
    );
};
export default DepartmentBannerSlot;
