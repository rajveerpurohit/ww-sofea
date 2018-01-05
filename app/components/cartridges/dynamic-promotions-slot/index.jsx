import React from 'react';
import {returnCartridge} from '../../../utils/homePageUtils';

const DynamicPromotionsSlot = ({contentData}) => {
    return (
      <div className="grid landing__row lazyload-container">
        {returnCartridge(contentData.Promotions)}
      </div>
	);
};
export default DynamicPromotionsSlot;
