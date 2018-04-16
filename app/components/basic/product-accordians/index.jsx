import React, { Component } from 'react';
import _ from 'lodash';

import ExpandableCell from '../expandable-cell';
import Image from '../Image';

const SEGMENT_KEY_ICON_LABEL_MAP = {
  LONGDESC: {
    iconClasses: 'icon--info-dark',
    cellLabel: 'Details'
  },
  CAREGUIDE: {
    iconClasses: 'icon--wash-dark',
    cellLabel: 'Care guide'
  },
  NUTRIINFO: {
    iconClasses: 'icon--nutrition-grey',
    cellLabel: 'Nutritional information'
  },
  ALLERGENS: {
    iconClasses: 'icon--warning-dark',
    cellLabel: 'Allergens'
  },
  HEATINGINSTR: {
    iconClasses: 'icon--cooking',
    cellLabel: 'Instructions'
  },
  STORAGEINSTR: {
    iconClasses: 'icon--cold-storage',
    cellLabel: 'Storage Instruction'
  },
  INGREDIENTS: {
    iconClasses: 'icon--oven',
    cellLabel: 'Ingredients'
  },
  DELIVERYRETURNS: {
    iconClasses: 'icon--van-dark-thin',
    cellLabel: 'Delivery & returns'
  },
};

export default class ProductAccordians extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedSegment: 'LONGDESC'
    };

    this.renderProductDetailsSegment = this.renderProductDetailsSegment.bind(this);
    this.renderProductAccordiansSegments = this.renderProductAccordiansSegments.bind(this);
    this.renderProductMultiAttributeSegments = this.renderProductMultiAttributeSegments.bind(this);
    this.renderProductDeliveryAndReturnsSection = this.renderProductDeliveryAndReturnsSection.bind(this);
  }

  renderProductDetailsSegment(key, body) {
    const { productId } = this.props.product;

    if (key && body && productId) {
      const props = {
        iconClasses: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.iconClasses`, ''),
        cellLabel: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.cellLabel`, ''),
        isExpanded: this.state.expandedSegment === key,
        onCellClick: (e) => {
          e.preventDefault();
          if (this.state.expandedSegment === key) {
            this.setState({ expandedSegment: '' });
          } else {
            this.setState({ expandedSegment: key });
          }
        }
      };

      return (
        <ExpandableCell {...props} >
          <p dangerouslySetInnerHTML={{ __html: body }} />
          <ul className="list--silent">
            <li className="strong">Product code:</li>
            <li>{productId}</li>
          </ul>
        </ExpandableCell>
      );
    }

    return null;
  }

  renderProductDeliveryAndReturnsSection(key, body) {
    if (body && body.questionAnswers) {
      const props = {
        iconClasses: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.iconClasses`, ''),
        cellLabel: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.cellLabel`, ''),
        isExpanded: this.state.expandedSegment === key,
        onCellClick: (e) => {
          e.preventDefault();
          if (this.state.expandedSegment === key) {
            this.setState({ expandedSegment: '' });
          } else {
            this.setState({ expandedSegment: key });
          }
        }
      };

      return (
        <ExpandableCell {...props} >
          {_.map(body.questionAnswers, (item, index) => (
            <span key={index} >
              <p className="noMargB">
                <strong>{item.question}</strong>
              </p>
              <p className="noMargT" dangerouslySetInnerHTML={{ __html: item.answer }} />
            </span>
          ))}
        </ExpandableCell>
      );
    }

    return null;
  }

  renderProductMultiAttributeSegments(key, body) {
    const { productId } = this.props.product;

    if (key && body && productId) {
      const props = {
        iconClasses: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.iconClasses`, ''),
        cellLabel: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.cellLabel`, ''),
        isExpanded: this.state.expandedSegment === key,
        onCellClick: (e) => {
          e.preventDefault();
          if (this.state.expandedSegment === key) {
            this.setState({ expandedSegment: '' });
          } else {
            this.setState({ expandedSegment: key });
          }
        }
      };

      const tableContent = _.map((_.sortBy(_.filter(body, ({ type }) => (type === 'NUTRITIONAL')), 'sequence')), (row, index) => (
        <tr className="table-scroll__row" key={index} >
          <th>{row.text}</th><td>{row.element1}</td><td>{row.element2}</td><td>{row.element3}</td><td>{row.element4}</td>
        </tr>
      ));

      return (
        <ExpandableCell {...props} >
          <div className="table-scroll table-scroll--x">
            <table className="table table-scroll__table table--zebra table--nutrition" cellPadding="0" cellSpacing="0">
              <thead className="table__head">
                <tr className="table-scroll__row">
                  <th>Description</th>
                  <th>Per<br />100g/ml</th>
                  <th>Per<br />Serving</th>
                  <th>Measurement</th>
                  <th>% NRV<br /> per<br />serving</th>
                </tr>
              </thead>
              <tbody>{tableContent}</tbody>
            </table>
          </div>
        </ExpandableCell>
      );
    }

    return null;
  }

  renderProductCareGuideSection(key, body) {
    const props = {
      iconClasses: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.iconClasses`, ''),
      cellLabel: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.cellLabel`, ''),
      isExpanded: this.state.expandedSegment === key,
      onCellClick: (e) => {
        e.preventDefault();
        if (this.state.expandedSegment === key) {
          this.setState({ expandedSegment: '' });
        } else {
          this.setState({ expandedSegment: key });
        }
      }
    };

    const payload = {
      id: key,
      alt: body.attributeValue,
      title: body.attributeValue,
      url: body.imageURL
    };

    return (
      <ExpandableCell {...props} >
        <Image payload={payload} />
      </ExpandableCell>
    );
  }

  renderProductAccordiansSegments(segments) {
    return segments.map(({ key, body }) => {
      if (key === 'LONGDESC') {
        return this.renderProductDetailsSegment(key, body);
      } else if (key === 'NUTRIINFO') {
        return this.renderProductMultiAttributeSegments(key, body);
      } else if (key === 'DELIVERYRETURNS') {
        return this.renderProductDeliveryAndReturnsSection(key, body);
      } else if (key === 'CAREGUIDE') {
        return this.renderProductCareGuideSection(key, body);
      }

      const segment = {
        iconClasses: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.iconClasses`, ''),
        cellLabel: _.get(SEGMENT_KEY_ICON_LABEL_MAP, `${key}.cellLabel`, ''),
        isExpanded: this.state.expandedSegment === key,
        onCellClick: (e) => {
          e.preventDefault();
          if (this.state.expandedSegment === key) {
            this.setState({ expandedSegment: '' });
          } else {
            this.setState({ expandedSegment: key });
          }
        }
      };

      return (
        <ExpandableCell {...segment} >
          <p dangerouslySetInnerHTML={{ __html: body }} />
        </ExpandableCell>
      );
    });
  }

  render() {
    const { product, deliveryAndReturnsDetails } = this.props;
    const { longDescription, textualAttributes, multiAttributes, productAttributes } = product;
    const segments = [];

    if (longDescription) {
      segments.push({
        key: 'LONGDESC',
        body: longDescription
      });
    }

    if (productAttributes) {
      const careGuide = _.find(productAttributes, ({ attributeDisplayName }) => (attributeDisplayName === 'Care'));

      if (careGuide) {
        segments.push({
          key: 'CAREGUIDE',
          body: careGuide
        });
      }
    }

    if (textualAttributes) {
      _.map(textualAttributes, (description, key) => {
        if (key !== 'LONGDESC') {
          segments.push({
            key,
            body: description
          });
        }
      });
    }

    if (multiAttributes) {
      segments.push({
        key: 'NUTRIINFO',
        body: multiAttributes
      });

      const allergens = multiAttributes.filter(({ type }) => type === 'ALLERGENS');
      if (allergens) {
        segments.push({
          key: 'ALLERGENS',
          body: allergens.reduce((prev, cur) => {
            // TODO: For now we are not sure about the service response.
            // So just concating the text and displaying on UI.
            prev += ' ' + cur.text; // eslint-disable-line no-param-reassign
            return prev;
          }, '')
        });
      }
    }

    if (deliveryAndReturnsDetails) {
      segments.push({
        key: 'DELIVERYRETURNS',
        body: deliveryAndReturnsDetails
      });
    }

    return (
      <div className="grid grid--space-y accordion accordion--chrome" >
        {this.renderProductAccordiansSegments(segments)}
      </div>
    );
  }
}
