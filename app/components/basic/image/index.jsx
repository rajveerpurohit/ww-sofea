import React, { PropTypes } from 'react';

const Img = ({payload}) => {
  return (
    <img className={payload.className} alt={payload.alt} title={payload.text} src={payload.url} />
  );
};

Img.propTypes = {
  payload: PropTypes.object.isRequired
};

export default Img;
