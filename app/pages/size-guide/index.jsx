import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';


export default class SizeGuide extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
     
       <div className="grid-wrapper site-page content--centered">
        <main className="grid grid--space-y site-main">
          <div className="main-page">
            <div className="grid grid--space-y">
              <h1 className="font-graphic text-caps">Size Guides</h1>
              <div className="grid grid--space-y">
                <ul className="nav-list nav-list--tabbed nav-list--tabbed-boxed">
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-boxed">
                    <Link to="#woolworths" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed is-current">
                      Woolworths
                    </Link>
                  </li>
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-boxed">
                    <Link to="#country-road" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">
                      Country Road
                    </Link>
                  </li>
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-boxed">
                    <Link to="#trenery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">
                      Trenery
                    </Link>
                  </li>
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-boxed">
                    <Link to="#witchery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">
                      Witchery
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="grid grid--space-y">
                <ul className="nav-list nav-list--tabbed nav-list--tabbed-underlined">
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-underlined">
                    <Link to="#men" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined is-current">
                      Men
                    </Link>
                  </li>
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-underlined">
                    <Link to="#women" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">
                      Women
                    </Link>
                  </li>
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-underlined">
                    <Link to="#boys" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">
                      Boys
                    </Link>
                  </li>
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-underlined">
                    <Link to="#girls" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">
                      Girls
                    </Link>
                  </li>
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-underlined">
                    <Link to="#baby" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">
                      Baby
                    </Link>
                  </li>
                  <li className="nav-list__item nav-list__item--tabbed nav-list__item--tabbed-underlined">
                    <Link to="#homeware" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">
                      Homeware
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="grid grid--space-y">
                <h3 className="font-graphic text-caps">How to Measure</h3>
                <div className="grid accordion--max-medium" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-active="true">
                  <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
                    <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                      <span className="icon-text grid-hidden--medium">How to measure</span>
                    </h4>
                    <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                      <div className="grid size-guide-measurements">
                        <h3 className="font-graphic text-caps grid-visible--large">How to measure</h3>
                        <img alt="sizing guides measurement" src="/store/assets/images/static/ww/size-guides/size-guide-women.gif" width="100%" />
                        <div className="grid counter">
                          <h4 className="font-graphic text-caps counter__increment counter__increment--black">Bust</h4>
                          <p className="text-small">Measure at the fullest part of your bust, by placing the tape measure under your arms and across your shoulder blades. Remember to breathe out when taking this measurement.</p>
                          <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                          <p className="text-small">Decide where you want your trousers to sit (on the hips, above the hips) and measure at this position. Ensure that the tape is horizontal to the ground.</p>
                          <h4 className="font-graphic text-caps counter__increment counter__increment--black">Hip</h4>
                          <p className="text-small">Measure around the fullest part of your bottom, about 20cm below your natural waist, at the top of your legs.</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-small">Please use the following as a guide to help you decide which size to buy.</p>
                        <p className="text-small">Note: Values given are body measurements. To help you choose the best size, we recommend that you compare the measurements below with your own.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
                    <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                      <span className="icon-text grid-hidden--medium">Bra Size Guide</span>
                    </h4>
                    <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                      <div className="grid grid__two-thirds--large grid--space-y">
                        <h3 className="font-graphic text-caps grid-visible--medium">Bra Size Guide</h3>
                        <div className="text-small message message--general"><span className="icon icon--info-dark" /><span className="icon-text">This table can be<span className="touch-hidden strong"> scrolled right</span><span className="no-touch-hidden strong"> swiped left</span> for more info</span></div><div className="table-scroll table-scroll--x">
                          <table cellPadding={0} cellSpacing={0} className="table table-scroll__table table--center table--border-cells table--zebra">
                            <thead className="table__head table__head--dark">
                              <tr className="table-scroll__row">
                                <th colSpan={2}>Under Bust</th>
                                <th colSpan={9}>Cup Size (measured over fullest part of breast)</th>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>Band Size (Inches)</th>
                                <th>CM</th>
                                <th>AA</th>
                                <th>A</th>
                                <th>B</th>
                                <th>C</th>
                                <th>D</th>
                                <th>DD</th>
                                <th>E</th>
                                <th>F</th>
                                <th>G</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>30</th>
                                <td>63-67</td>
                                <td>Up to 76cm</td>
                                <td>77-78cm</td>
                                <td>78-80cm</td>
                                <td>81-82cm</td>
                                <td>83-84cm</td>
                                <td />
                                <td />
                                <td />
                                <td />
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>32</th>
                                <td>68-72</td>
                                <td>Up to 81cm</td>
                                <td>82-83cm</td>
                                <td>84-85cm</td>
                                <td>86-88cm</td>
                                <td>89-90cm</td>
                                <td>91-93cm</td>
                                <td>94-95cm</td>
                                <td />
                                <td />
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>34</th>
                                <td>73-77</td>
                                <td>Up to 86cm</td>
                                <td>87-88cm</td>
                                <td>89-90cm</td>
                                <td>91-93cm</td>
                                <td>94-95cm</td>
                                <td>96-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>36</th>
                                <td>78-82</td>
                                <td>Up to 91cm</td>
                                <td>92-93cm</td>
                                <td>94-95cm</td>
                                <td>96-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>38</th>
                                <td>83-87</td>
                                <td>Up to 96cm</td>
                                <td>97-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>40</th>
                                <td>88-92</td>
                                <td />
                                <td>102-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>42</th>
                                <td>93-97</td>
                                <td />
                                <td />
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>44</th>
                                <td>98-102</td>
                                <td />
                                <td />
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>46</th>
                                <td>103-107</td>
                                <td />
                                <td />
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                                <td>131-133cm</td>
                                <td>134-135cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>48</th>
                                <td>108-112</td>
                                <td />
                                <td />
                                <td />
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                                <td>131-133cm</td>
                                <td>134-135cm</td>
                                <td>136-138cm</td>
                                <td />
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
                    <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                      <span className="icon-text grid-hidden--medium">Womenswear</span>
                    </h4>
                    <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                      <div className="grid grid__two-thirds--large grid--space-y">
                        <h3 className="font-graphic text-caps grid-visible--medium">Womenswear</h3>
                        <div className="text-small message message--general"><span className="icon icon--info-dark" /><span className="icon-text">This table can be<span className="touch-hidden strong"> scrolled right</span><span className="no-touch-hidden strong"> swiped left</span> for more info</span></div><div className="table-scroll table-scroll--x">
                          <table cellPadding={0} cellSpacing={0} className="table table-scroll__table table--center table--border-cells table--zebra">
                            <thead className="table__head table__head--dark">
                              <tr className="table-scroll__row">
                                <th colSpan={2}>Under Bust</th>
                                <th colSpan={9}>Cup Size (measured over fullest part of breast)</th>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>Band Size (Inches)</th>
                                <th>CM</th>
                                <th>AA</th>
                                <th>A</th>
                                <th>B</th>
                                <th>C</th>
                                <th>D</th>
                                <th>DD</th>
                                <th>E</th>
                                <th>F</th>
                                <th>G</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>30</th>
                                <td>63-67</td>
                                <td>Up to 76cm</td>
                                <td>77-78cm</td>
                                <td>78-80cm</td>
                                <td>81-82cm</td>
                                <td>83-84cm</td>
                                <td />
                                <td />
                                <td />
                                <td />
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>32</th>
                                <td>68-72</td>
                                <td>Up to 81cm</td>
                                <td>82-83cm</td>
                                <td>84-85cm</td>
                                <td>86-88cm</td>
                                <td>89-90cm</td>
                                <td>91-93cm</td>
                                <td>94-95cm</td>
                                <td />
                                <td />
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>34</th>
                                <td>73-77</td>
                                <td>Up to 86cm</td>
                                <td>87-88cm</td>
                                <td>89-90cm</td>
                                <td>91-93cm</td>
                                <td>94-95cm</td>
                                <td>96-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>36</th>
                                <td>78-82</td>
                                <td>Up to 91cm</td>
                                <td>92-93cm</td>
                                <td>94-95cm</td>
                                <td>96-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>38</th>
                                <td>83-87</td>
                                <td>Up to 96cm</td>
                                <td>97-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>40</th>
                                <td>88-92</td>
                                <td />
                                <td>102-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>42</th>
                                <td>93-97</td>
                                <td />
                                <td />
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>44</th>
                                <td>98-102</td>
                                <td />
                                <td />
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>46</th>
                                <td>103-107</td>
                                <td />
                                <td />
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                                <td>131-133cm</td>
                                <td>134-135cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>48</th>
                                <td>108-112</td>
                                <td />
                                <td />
                                <td />
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                                <td>131-133cm</td>
                                <td>134-135cm</td>
                                <td>136-138cm</td>
                                <td />
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
                    <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                      <span className="icon-text grid-hidden--medium">Shoe Size Conversion</span>
                    </h4>
                    <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                      <div className="grid grid__two-thirds--large grid--space-y">
                        <h3 className="font-graphic text-caps grid-visible--medium">Shoe Size Conversion</h3>
                        <div className="text-small message message--general"><span className="icon icon--info-dark" /><span className="icon-text">This table can be<span className="touch-hidden strong"> scrolled right</span><span className="no-touch-hidden strong"> swiped left</span> for more info</span></div><div className="table-scroll table-scroll--x">
                          <table cellPadding={0} cellSpacing={0} className="table table-scroll__table table--center table--border-cells table--zebra">
                            <thead className="table__head table__head--dark">
                              <tr className="table-scroll__row">
                                <th colSpan={2}>Under Bust</th>
                                <th colSpan={9}>Cup Size (measured over fullest part of breast)</th>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>Band Size (Inches)</th>
                                <th>CM</th>
                                <th>AA</th>
                                <th>A</th>
                                <th>B</th>
                                <th>C</th>
                                <th>D</th>
                                <th>DD</th>
                                <th>E</th>
                                <th>F</th>
                                <th>G</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>30</th>
                                <td>63-67</td>
                                <td>Up to 76cm</td>
                                <td>77-78cm</td>
                                <td>78-80cm</td>
                                <td>81-82cm</td>
                                <td>83-84cm</td>
                                <td />
                                <td />
                                <td />
                                <td />
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>32</th>
                                <td>68-72</td>
                                <td>Up to 81cm</td>
                                <td>82-83cm</td>
                                <td>84-85cm</td>
                                <td>86-88cm</td>
                                <td>89-90cm</td>
                                <td>91-93cm</td>
                                <td>94-95cm</td>
                                <td />
                                <td />
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>34</th>
                                <td>73-77</td>
                                <td>Up to 86cm</td>
                                <td>87-88cm</td>
                                <td>89-90cm</td>
                                <td>91-93cm</td>
                                <td>94-95cm</td>
                                <td>96-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>36</th>
                                <td>78-82</td>
                                <td>Up to 91cm</td>
                                <td>92-93cm</td>
                                <td>94-95cm</td>
                                <td>96-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>38</th>
                                <td>83-87</td>
                                <td>Up to 96cm</td>
                                <td>97-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>40</th>
                                <td>88-92</td>
                                <td />
                                <td>102-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>42</th>
                                <td>93-97</td>
                                <td />
                                <td />
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>44</th>
                                <td>98-102</td>
                                <td />
                                <td />
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>46</th>
                                <td>103-107</td>
                                <td />
                                <td />
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                                <td>131-133cm</td>
                                <td>134-135cm</td>
                              </tr>
                              <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>48</th>
                                <td>108-112</td>
                                <td />
                                <td />
                                <td />
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                                <td>131-133cm</td>
                                <td>134-135cm</td>
                                <td>136-138cm</td>
                                <td />
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="grid grid--space-y site-footer content--centered">
          <div className="grid">
            <div className="accordion__segment site-footer__link-bucket link-bucket--logo">
              <Link to="" className="site-header-foot__icon" />
            </div>
            <div className="accordion__segment site-footer__link-bucket">
              <div className="heading heading--3 site-footer__heading">
                <Link to="">Join WRewards</Link>
              </div>
              <div className="accordion__content">
                <div className="footer__box footer__box--promo">
                  <Link to="">
                    <span className="footer__box__heading text-wfs font-graphic text-caps">Extra 5% off</span>
                    <span className="footer__box__text font-graphic text-caps">Selected items when you pay
                      <br />with your Woolies card.</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="accordion__segment site-footer__link-bucket">
              <div className="heading heading--3 site-footer__heading">
                <Link to="">Get the card</Link>
              </div>
              <div className="accordion__content">
                <Link to="">
                  <div className="footer__box footer__box--img-link-row">
                    <img src="/store/assets/images/content/footer/card-credit.png" alt="Credit card" />
                    <img src="/store/assets/images/content/footer/card-store.png" alt="Store card" />
                    <img src="/store/assets/images/content/footer/card-loan.png" alt="Revolving loan" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="accordion__segment site-footer__link-bucket">
              <div className="heading heading--3 site-footer__heading">
                <Link to="">Give a gift card</Link>
              </div>
              <div className="accordion__content">
                <Link to="">
                  <div className="footer__box footer__box--img-link-row">
                    <img src="/store/assets/images/content/footer/card-gift-1.png" alt="Gift voucher" />
                    <img src="/store/assets/images/content/footer/card-gift-2.png" alt="Gift voucher" />
                    <img src="/store/assets/images/content/footer/card-gift-3.png" alt="Gift voucher" />
                    <img src="/store/assets/images/content/footer/card-gift-4.png" alt="Gift voucher" />
                    <img src="/store/assets/images/content/footer/card-gift-5.png" alt="Gift voucher" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="accordion__segment site-footer__link-bucket">
              <div className="heading heading--3 site-footer__heading">
                <Link to="">Get the new Woolies app</Link>
              </div>
              <div className="accordion__content">
                <div className="footer__box footer__box--img-link-row">
                  <Link to="">
                    <img src="/store/assets/images/content/footer/store-app.png" alt="Download on the App Store" />
                  </Link>
                  <Link to="">
                    <img src="/store/assets/images/content/footer/store-play.png" alt="Get it on Google Play" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion--max-large grid" data-js="accordion" data-accordion-start="first-open" data-accordion-type="open-single" data-accordion-animated="true" data-accordion-active="true">
            <div className="accordion__segment site-footer__link-bucket link-bucket--logo">
              <div>&nbsp;</div>
            </div>
            <div className="accordion__segment site-footer__link-bucket" data-js="accordion-segment">
              <div className="accordion__toggle heading heading--3 site-footer__heading" data-js="accordion-toggle">My account
                <span className="icon icon--down-dark inline-block-hidden--mobi-min" />
              </div>
              <div className="accordion__content accordion__content--animated" data-js="accordion-content" style={{height: 130}}>
                <div className="footer__box">
                  <ul className="nav-list">
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Login/Register</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Orders</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Shopping Lists</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Account details</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Link a card</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion__segment site-footer__link-bucket" data-js="accordion-segment">
              <div className="accordion__toggle heading heading--3 site-footer__heading is-collapsed" data-js="accordion-toggle">Customer service
                <span className="icon icon--down-dark inline-block-hidden--mobi-min" />
              </div>
              <div className="accordion__content accordion__content--animated is-collapsed" data-js="accordion-content" style={{height: 130}}>
                <div className="footer__box">
                  <ul className="nav-list">
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Help Center</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Contact Us</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Using Woolworths Online</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Delivery Options</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Returns &amp; Exchanges</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion__segment site-footer__link-bucket" data-js="accordion-segment">
              <div className="accordion__toggle heading heading--3 site-footer__heading is-collapsed" data-js="accordion-toggle">About Woolworths
                <span className="icon icon--down-dark inline-block-hidden--mobi-min" />
              </div>
              <div className="accordion__content accordion__content--animated is-collapsed" data-js="accordion-content" style={{height: 130}}>
                <div className="footer__box">
                  <ul className="nav-list">
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Store Locator</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">About Us</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Careers</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Press &amp; News</Link>
                    </li>
                    <li className="nav-list__item">
                      <Link to="" className="nav-list__link">Sustainability</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion__segment site-footer__link-bucket">
              <div className="heading heading--3 site-footer__heading">Follow us on</div>
              <div className="accordion__content accordion__content--animated">
                <div className="footer__box">
                  <Link className="social-icon__link" to="">
                    <span className="icon icon--facebook-dark" />
                    <span className="inline-block-hidden--mobi-max">Facebook</span>
                  </Link>
                  <Link className="social-icon__link" to="">
                    <span className="icon icon--twitter-dark" />
                    <span className="inline-block-hidden--mobi-max">Twitter</span>
                  </Link>
                  <Link className="social-icon__link" to="">
                    <span className="icon icon--pinterest-dark" />
                    <span className="inline-block-hidden--mobi-max">Pinterest</span>
                  </Link>
                  <Link className="social-icon__link" to="">
                    <span className="icon icon--instagram-dark" />
                    <span className="inline-block-hidden--mobi-max">Instagram</span>
                  </Link>
                  <Link className="social-icon__link" to="">
                    <span className="icon icon--youtube-dark" />
                    <span className="inline-block-hidden--mobi-max">YouTube</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid footer__end">
            <div className="grid__half--large">
              <Link to="/store/fragments/corporate/corporate-index.jsp?content=corporate-content&contentId=cmp208720" className="display-inline-block" style={{marginRight: 24}}>
                <img src="/store/assets/images/content/footer/100-secure.png" alt="100% Secure" />
              </Link>
              <img src="/store/assets/images/content/footer/payments.png" alt="Secure Payments" />
            </div>
            <div className="grid__half--large">
              <p>
                <span className="text-part">© 2017 Woolworths. All Rights Reserved.</span>
                <Link to="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110048" className="text-part">Terms and Conditions</Link>
                <Link to="/store/fragments/corporate/corporate-index.jsp?content=corporate-content&contentId=cmp205289" className="text-part">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </footer>
        <link to="/store/assets/css/ww-image-data.css" rel="stylesheet" type="text/css" property="stylesheet" />
      </div> 
         
        
      </div>
    );
  }
}
