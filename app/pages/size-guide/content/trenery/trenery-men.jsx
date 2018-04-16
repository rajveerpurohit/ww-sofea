import React, {Component} from 'react';
import { Link } from 'react-router';

class TerneryMen extends Component {
  render() {
    return(
      <div className="page-layout__content">
        <header>
            <h1 className="font-graphic text-caps">Size Guides</h1>
          </header>
        <div className="grid grid--space-y">
            <nav className="nav-list nav-list--tabbed nav-list--tabbed-boxed">
            <Link to="/sizeGuides/woolworths" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Woolworths
              </Link>
            <Link to="/sizeGuides/countryroad" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Country Road</Link>
            <Link to="/sizeGuides/trenery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed is-current">Trenery</Link>
            <Link to="/sizeGuides/witchery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Witchery</Link>
          </nav>
          </div>
        <div className="grid grid--space-y">
            <ul className="nav-list nav-list--tabbed nav-list--tabbed-underlined">
            <Link to="/sizeGuides/trenery/men" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Men</Link>
            <Link to="/sizeGuides/trenery/women" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Women</Link>
          </ul>
          </div>
        <div className="grid accordion--max-medium" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="size-guide-table" data-accordion-active="true">
        <div id="men" className="grid-visible">
          <aside>
              <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
                <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                    <span className="icon-text grid-hidden--medium">How to measure</span>
                </h4>
                <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                    <div className="grid size-guide-measurements">
                      <h3 className="font-graphic text-caps grid-visible--medium">How to measure</h3>
                      <img alt="sizing guides measurement" src="/images/content/size_guides/tr_men.gif" width="100%" />
                      <div className="grid counter">
                          <h4 className="font-graphic text-caps counter__increment counter__increment--black">Neck</h4>
                          <p className="text-small">Measure all the way around the neck with the tape resting just above the nape (bone at the top of the spine), and under the Adam's apple.</p>
                          <h4 className="font-graphic text-caps counter__increment counter__increment--black">Chest</h4>
                          <p className="text-small">Measure across the widest part of the chest, under the armpits, and around the back. Ensure that the tape is horizontal all the way around 
                            the body. (Do not allow it to dip at the back).
                          </p>
                          <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                          <p className="text-small">Decide where you want your trousers to sit (on the hips, above the hips) and measure at this position. Ensure that the tape is horizontal to the ground.</p>
                          <h4 className="font-graphic text-caps counter__increment counter__increment--black">Inside Leg</h4>
                          <p className="text-small">Measure from the top of the inside leg (crotch) to the bottom of the ankle bone. Make sure the trouser crotch is sitting comfortably against the 
                            body and is not sagging.
                          </p>
                          <h4 className="font-graphic text-caps counter__increment counter__increment--black">Hip</h4>
                          <p className="text-small">Measure around the fullest part of your bottom, about 20cm below your natural waist, at the top of your legs.</p>
                          <h4 className="font-graphic text-caps counter__increment counter__increment--black">Sleeve Length</h4>
                          <p className="text-small">Place your hand at your waist (elbow bent at a 90-degree angle). Measure from the middle of the back of your neck and measure to your shoulder, 
                            down your arm to the elbow, and then on to the wrist.
                          </p>
                      </div>
                    </div>
                </div>
              </div>
          </aside>
          <div className="grid grid__two-thirds--large">
              <div className="">
                <p className="text-small">Please use the following as a guide to help you decide which size to buy.</p>
                <p className="text-small">Note: Values given are body measurements. To help you choose the best size, we recommend that you compare the measurements below with your own.</p>
              </div>
              <div className="grid grid--space-y">
                <h3 className="text-caps font-graphic">Denim</h3>
                <div className="table-scroll table-scroll--x">
                    <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                      <thead className="table__head table__head--dark text-caps">
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>Sizes</th>
                            <th>Waist (cm)</th>
                            <th>Hip (cm)</th>
                            <th>Inside Leg Regular (cm)</th>
                            <th>Inside Leg Long (cm)</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>30</th>
                            <td>78</td>
                            <td>96</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>32</th>
                            <td>83</td>
                            <td>101</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>34</th>
                            <td>88</td>
                            <td>106</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>36</th>
                            <td>93</td>
                            <td>111</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>38</th>
                            <td>98</td>
                            <td>116</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>40</th>
                            <td>103</td>
                            <td>121</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>42</th>
                            <td>108</td>
                            <td>126</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                      </tbody>
                    </table>
                </div>
                <p className="text-small">Note: An existing garment may be used as a guide to measuring inside leg.</p>
              </div>
              <div className="grid grid--space-y">
                
                <h3 className="text-caps font-graphic">Career/Casual - Jackets, Coats, T-shirts, Knitwear &amp; Outerwear</h3>
                <div className="table-scroll table-scroll--x">
                    <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                      <thead className="table__head table__head--dark text-caps">
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>Sizes</th>
                            <th>Chest (cm)</th>
                            <th>Waist (cm)</th>
                            <th>Hip (cm)</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>36/XS</th>
                            <td>94</td>
                            <td>78</td>
                            <td>96</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>38/S</th>
                            <td>99</td>
                            <td>83</td>
                            <td>101</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>40/M</th>
                            <td>104</td>
                            <td>88</td>
                            <td>106</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>42/L</th>
                            <td>109</td>
                            <td>93</td>
                            <td>111</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>44/XL</th>
                            <td>114</td>
                            <td>98</td>
                            <td>116</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>46/XXL</th>
                            <td>119</td>
                            <td>103</td>
                            <td>121</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>48/XXXL</th>
                            <td>124</td>
                            <td>108</td>
                            <td>126</td>
                          </tr>
                      </tbody>
                    </table>
                </div>
              </div>
              <div className="grid grid--space-y">
                
                <h3 className="text-caps font-graphic">Career/Casual - Pants &amp; Shorts</h3>
                <div className="table-scroll table-scroll--x">
                    <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                      <thead className="table__head table__head--dark text-caps">
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow text">
                            <th>Sizes</th>
                            <th>Waist (cm)</th>
                            <th>Hip (cm)</th>
                            <th>Inside Leg Regular (cm)</th>
                            <th>Inside Leg Long (cm)</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>30</th>
                            <td>78</td>
                            <td>96</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>32</th>
                            <td>83</td>
                            <td>101</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>34</th>
                            <td>88</td>
                            <td>106</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>36</th>
                            <td>93</td>
                            <td>111</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>38</th>
                            <td>98</td>
                            <td>116</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>40</th>
                            <td>103</td>
                            <td>121</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>42</th>
                            <td>108</td>
                            <td>126</td>
                            <td>82</td>
                            <td>86</td>
                          </tr>
                      </tbody>
                    </table>
                </div>
                <p className="text-small">Note: An existing garment may be used as a guide to measuring inside leg.</p>
              </div>
              <div className="grid grid--space-y">
                
                <h3 className="text-caps font-graphic">Career/Casual - Shirts</h3>
                <div className="table-scroll table-scroll--x">
                    <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                      <thead className="table__head table__head--dark text-caps">
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>Career Sizes</th>
                            <th>Casual Sizes</th>
                            <th>Chest (cm)</th>
                            <th>Waist (cm)</th>
                            <th>Sleeve (cm)</th>
                            <th>Neck (cm)</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>38XS</th>
                            <td>XS</td>
                            <td>94</td>
                            <td>78</td>
                            <td>90</td>
                            <td>38</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>39/S</th>
                            <td>S</td>
                            <td>99</td>
                            <td>83</td>
                            <td>91</td>
                            <td>39</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>40/M</th>
                            <td></td>
                            <td>102</td>
                            <td>84</td>
                            <td>91</td>
                            <td>40</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>41/M</th>
                            <td>M</td>
                            <td>105</td>
                            <td>89</td>
                            <td>92</td>
                            <td>41</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>42/L</th>
                            <td></td>
                            <td>108</td>
                            <td>92</td>
                            <td>93</td>
                            <td>42</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>43/L</th>
                            <td>L</td>
                            <td>110</td>
                            <td>94</td>
                            <td>93</td>
                            <td>43</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>44/XL</th>
                            <td>XL</td>
                            <td>115</td>
                            <td>99</td>
                            <td>94</td>
                            <td>44</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>46/XXL</th>
                            <td>XXL</td>
                            <td>123</td>
                            <td>106</td>
                            <td>95</td>
                            <td>46</td>
                          </tr>
                          <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                            <th>48/XXXL</th>
                            <td>XXL</td>
                            <td>130</td>
                            <td>114</td>
                            <td>96</td>
                            <td>48</td>
                          </tr>
                      </tbody>
                    </table>
                </div>
              </div>
              <div className="grid grid--space-y">
                <div className="grid grid__half--medium">
                    
                    <h3 className="text-caps font-graphic">Shoe Size Conversion</h3>
                    <table className="table table--center table--border-cells table--zebra table--3-col" cellPadding="0" cellSpacing="0">
                      <thead className="table__head table__head--dark text-caps">
                          <tr>
                            <th>UK/Australia</th>
                            <th>US</th>
                            <th>Europe</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <th>6</th>
                            <td>7</td>
                            <td>40</td>
                          </tr>
                          <tr>
                            <th>7</th>
                            <td>8</td>
                            <td>41</td>
                          </tr>
                          <tr>
                            <th>8</th>
                            <td>9</td>
                            <td>42</td>
                          </tr>
                          <tr>
                            <th>9</th>
                            <td>10</td>
                            <td>43</td>
                          </tr>
                          <tr>
                            <th>9.5</th>
                            <td>10.5</td>
                            <td>44</td>
                          </tr>
                          <tr>
                            <th>10</th>
                            <td>11</td>
                            <td>45</td>
                          </tr>
                          <tr>
                            <th>11</th>
                            <td>12</td>
                            <td>46</td>
                          </tr>
                      </tbody>
                    </table>
                    <p className="text-small">Please use the European sizes as a guide to help you decide which size to buy</p>
                </div>
              </div>
          </div>
        </div>  
        </div>
      </div>
    );
  }
}
export default TerneryMen;
