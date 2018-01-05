import React, { Component } from 'react';

import { addClass, removeClass } from '../../../utils/htmlUtils';

class RotateBanner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeSlideLabel: 'banner-is-active',
      timer: 0,
      currIndex: 0
    };
    this.generateChildNav = this.generateChildNav.bind(this);
    this.nextBanner = this.nextBanner.bind(this);
    this.startSetInterval = this.startSetInterval.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }
  componentDidMount() {
    const labelActive = document.querySelectorAll('.rotate-banner__nav .rotate-banner__nav-item')[0];
    addClass(labelActive, this.state.activeSlideLabel);

    let radios = document.querySelectorAll('input[type="radio"]');
    radios[0].click();
    this.startSetInterval();
    radios.forEach((element) => {
      element.addEventListener('change', () => {
        removeClass(document.querySelector('.banner-is-active'), 'banner-is-active');
        addClass(document.querySelector('[for="' + element.id + '"]'), 'banner-is-active');
      });
    });
  }
  nextBanner() {
    let _ind = this.state.currIndex;
    _ind += 1;
    const radios = document.querySelectorAll('input[type="radio"]');

    if (_ind >= radios.length) this.setState({ currIndex: 0 });
    else this.setState({ currIndex: _ind });

    radios[this.state.currIndex].click();
  }

  startSetInterval() {
    this.setState({ timer: setInterval(this.nextBanner, 3000) });
  }
  stopTimer() {
    const timer = this.state.timer;
    this.setState({ timer: clearInterval(timer) });
  }
  generateChildNav(children, activeSlideLabel) {
    const childsNav = [];
    children.map(child => child.type === 'input' ? childsNav.push(<label className={'rotate-banner__nav-item'} htmlFor={child.props.id}>{child.props.id}</label>) : null);
    return childsNav;
  }

  render() {
    return (
      <div className="landing__block lazyload-container rotate-banner" onMouseEnter={this.stopTimer} onMouseLeave={this.startSetInterval} >
        {this.props.children}
        <nav className="rotate-banner__nav">
          {this.generateChildNav(this.props.children, this.state.activeSlideLabel)}
        </nav>
      </div>
    );
  }
}
export default RotateBanner;
