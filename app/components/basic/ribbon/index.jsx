import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import Image from '../Image';
import {
  MAX_BADGES_ALLOWED,
  BADGE_KEYS_PREFERENCE,
  BADGE_KEYS_REMOVE_PREFERENCE
} from '../../../Constants';

export default class Ribbon extends Component {
  constructor(props) {
    super(props);
    this.getBadgeList = this.getBadgeList.bind(this);
    this.renderBadge = this.renderBadge.bind(this);
  }

  getBadgeList() {
    const { attributes } = this.props;
    const badges = BADGE_KEYS_PREFERENCE.filter(badge =>
      _.has(attributes, badge)
    );

    let removalCounter = -1;

    while (badges.length > MAX_BADGES_ALLOWED) {
      _.pull(badges, BADGE_KEYS_REMOVE_PREFERENCE[removalCounter += 1]);
    }

    return badges;
  }

  renderBadge(badge, badgeKey) {
    const { attributes } = this.props;

    const payload = {
      url: attributes[`p_${badge}Image`],
      alt: attributes[badge][0],
      className: classnames('badge', attributes[badge])
    };

    return <Image payload={payload} key={badgeKey} />;
  }

  render() {
    const { classNames } = this.props;
    const badges = this.getBadgeList();

    if (badges.length === 0) {
      return null;
    }

    return (
      <div className={classNames} >{badges.map(this.renderBadge)}</div>
    );
  }
}
