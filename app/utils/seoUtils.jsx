import React from 'react';
import Helmet from 'react-helmet';
import { SITE_TITLE_URL } from '../Constants';

import { meta, link, customMetaAssets } from '../pages/assets';

export const SEOTags = ({ title, metaKeywords, metaDescription }) => {
  return (
    <Helmet
      title={title !== '' ? title + ' | ' + SITE_TITLE_URL : SITE_TITLE_URL}
      link={link}
      meta={customMetaAssets(metaKeywords, metaDescription)}
    />
  );
};
