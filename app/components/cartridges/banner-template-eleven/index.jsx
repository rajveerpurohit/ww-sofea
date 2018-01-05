import React from 'react';
import {returnCartridge} from '../../../utils/homePageUtils';

const BannerTemplateEleven = ({contentData}) => {
    return (
      <div>{returnCartridge(contentData.main)}</div>
    );
};
export default BannerTemplateEleven;
