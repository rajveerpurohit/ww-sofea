import React, { Component } from 'react';
import url from 'url';
import _ from 'lodash';
import FacebookProvider, { Like } from 'react-facebook';
import { Share } from 'react-twitter-widgets';

import PinterestSave from './PinterestSave';
import { FACEBOOK_APP_ID } from '../../../Constants';

class SocialLinks extends Component {
  constructor(props) {
    super(props);

    this.renderFacebookLikeElm = this.renderFacebookLikeElm.bind(this);
    this.renderPinterestSaveElm = this.renderPinterestSaveElm.bind(this);
    this.renderTwitterShareElm = this.renderTwitterShareElm.bind(this);
  }

  renderFacebookLikeElm() {
    const { facebook } = this.props;

    return (
      <li className="nav-list-x__item nav-list-x--space">
        <FacebookProvider appId={FACEBOOK_APP_ID}>
          <Like href={facebook.url} layout="BUTTON_COUNT" />
        </FacebookProvider>
      </li>
    );
  }

  renderPinterestSaveElm() {
    const { pinterest } = this.props;

    return (
      <li className="nav-list-x__item nav-list-x--space">
        <PinterestSave description={pinterest.text} media={pinterest.media} />
      </li>
    );
  }

  renderTwitterShareElm() {
    const { twitter } = this.props;
    const tUrl = url.parse(twitter.url);
    const hostname = tUrl.hostname.replace(/^www./, '');
    const options = {
      text: `${twitter.text} | ${_.capitalize(hostname)} `
    };

    return (
      <li className="nav-list-x__item nav-list-x--space">
        <Share url={twitter.url} options={options} />
      </li>
    );
  }

  render() {
    const { twitter, pinterest, facebook } = this.props;

    return (
      <nav className="grid grid--space-y">
        <ul className="nav-list-x">
          {twitter && twitter.url && this.renderTwitterShareElm()}
          {pinterest && pinterest.url && this.renderPinterestSaveElm()}
          {facebook && facebook.url && this.renderFacebookLikeElm()}
        </ul>
      </nav>
    );
  }
}

export default SocialLinks;
