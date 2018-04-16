import React, { Component } from 'react';
import AriaModal from 'react-aria-modal';
import { Link } from 'react-router';
import ServiceUtil from '../../../services/serviceUtil';

class SuburbSearch extends Component {
  constructor(props) {
    super(props);
    this.deactivateModal = this.deactivateModal.bind(this);
  }

  deactivateModal(evt) {
    // this.props.loader(false);
    evt.preventDefault();
    this.props.onSearchClose(evt.target.textContent);
  }
  render() {
    return (
      <AriaModal
        titleText="suburbModal"
        className="suburb-modal"
        initialFocus="#suburbModal"
        verticallyCenter
        onExit={this.deactivateModal}
        dialogClass="suburb-search-wrapper"
      >
        <div className="modal__box modal__box--panel modal__box--size-w-medium">
          <Link className="icon icon--close-circ-dark modal__close" onClick={evt => this.deactivateModal(evt)}>
            {ServiceUtil.getLabel(this.props.labels, 'global-wfs-close-label')}
          </Link>
          <div className="heading heading--3 font-graphic modal__head" data-js="modal-head">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-select-suburb-label')}</div>
          <div className="modal__content">
            <div id="suburbModal" className="modal-target is-open">
              <ul className="list--silent text-medium">
                {
                  this.props.suburbSearchData.map((data) => {
                    return (<li><Link to="#" onClick={evt => this.deactivateModal(evt)}>{data.suburbName}, {data.provinceName}, {data.streetPostCode}</Link></li>);
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </AriaModal>
    );
  }
}

export default SuburbSearch;
