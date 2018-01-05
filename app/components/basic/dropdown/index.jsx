import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: ''
    };
    this.renderOptions = this.renderOptions.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      selectedValue: this.props.selectedValue || this.props.options[0]
    });
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
      <option value={opt} key={optIndex}>
        {opt}
      </option>
    ));
  }

  render() {
    const { id, name, classNames } = this.props;

    return (
      <span className={'enhanced-select'}>
        <select
          id={id}
          name={name}
          onChange={this.onOptionChange}
          className={classNames}
          value={this.state.value}
        >
          {this.renderOptions()}
        </select>
        <span className={'enhanced-select__label'}>
          {this.state.selectedValue}&nbsp;
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
