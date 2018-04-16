import React from 'react';
import { Link } from 'react-router';

const DynamicRichText = ({ contentData }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: contentData.content }} />
    </div>
  );
};
export default DynamicRichText;
