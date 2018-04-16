import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';

import SignIn from '../../components/compound/signin';

const SignInPage = (props) => {
  const { viewportType } = props;
  const classes = classnames('site-main', 'grid', viewportType);

  return (
    <main className={classes}>
      <div className="grid grid--space-y">
        <article className="checkout">
          <SignIn {...props} />
        </article>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  const labels = _.get(state, 'labels.labelsAndErrorMessages.myAccount', {});

  return ({
    labels,
    viewportType: state.common.viewportType
  });
};

export default connect(mapStateToProps)(SignInPage);
