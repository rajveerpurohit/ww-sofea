import React from 'react';
import {returnCartridge} from '../../../utils/homePageUtils';

const BannerSlot = ({contentData}) => {
    return (
      <div>{returnCartridge(contentData.bannerContent)}</div>
    );
};
export default BannerSlot;
