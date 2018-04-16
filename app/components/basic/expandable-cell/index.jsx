import React from 'react';
import classnames from 'classnames';

const ExpandableCell = (props) => {
  const { iconClasses, cellLabel, children, isExpanded, onCellClick } = props;
  const cellClasses = classnames('accordion__toggle--chrome', 'accordion__toggle', { 'is-collapsed': !isExpanded });
  const cellBodyClasses = classnames('accordion__content--chrome', 'accordion__content', { 'is-collapsed': !isExpanded });

  return (
    <div className="accordion__segment--chrome accordion__segment" >
      <h4 className={cellClasses} onClick={onCellClick}>
        <span className={`icon ${iconClasses}`} />{' '}
        <span className="icon-text">{cellLabel}</span>
      </h4>
      <div className={cellBodyClasses} >
        {isExpanded && children}
      </div>
    </div>
  );
};

export default ExpandableCell;
