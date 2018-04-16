import React from 'react';
import SideMenu from '../../../components/sections/SideMenu';

const Content = ({ contentData, pageType }) => {
  return (
    <main className="grid grid--space-y site-main">
      <div className="main-page">
        <div className="grid grid--space-y">
          <div className="page-layout__aside">
            <SideMenu pageType={pageType} />
          </div>
          <div className="page-layout__content" dangerouslySetInnerHTML={{ __html: contentData }} />
        </div>
      </div>
    </main>
  );
};

export default Content;
