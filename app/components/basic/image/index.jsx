import React, { PropTypes } from 'react';

const Image = ({payload}) => {
  let ATG_URL = '';
    if (typeof window !== 'undefined') {
        ATG_URL = window.ATG_URL;
    }
  return (
    <img id={payload.id} className={payload.className} alt={payload.alt} src={`${ATG_URL}${payload.url}`} title={payload.title} />
  );
};

Image.propTypes = {
  payload: PropTypes.object.isRequired
};

export default Image;
