import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.selectedValue || props.options[0].value || props.options[0]
    };

    this.renderOptions = this.renderOptions.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  onOptionChange(e) {
    const { onChange } = this.props;

    return onChange ? onChange(e) : (() => {
      e.preventDefault();
      this.setState({
        selectedValue: e.target.value
      });
    })();
  }

  renderOptions() {
    const { options } = this.props;

    return options.map((opt, optIndex) => (
      <option value={opt.value || opt} key={optIndex} disabled={opt.disabled} >
        {opt.label || opt}
      </option>
    ));
  }

  render() {
    const { id, name, classNames, selectedValue, disabled, onOptionClick } = this.props;
    const props = {
      id,
      name,
      onClick: onOptionClick || (() => {}),
      onChange: this.onOptionChange,
      className: classNames,
      value: selectedValue || this.state.selectedValue
    };

    if (disabled) {
      props.disabled = disabled;
    }

    return (
      <span className="enhanced-select">
        <select {...props} >
          {this.renderOptions()}
        </select>
        <span className={'enhanced-select__label'}>
          {selectedValue || this.state.selectedValue}&nbsp;
        </span>
        <span className={'icon enhanced-select__icon'} />
      </span>
    );
  }
}

// Dropdown.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   selectedValue: PropTypes.string.isRequired,
//   options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
//   onChange: PropTypes.func // eslint-disable-line react/require-default-props
// };

export default Dropdown;
