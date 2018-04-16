import React from 'react';
import { connect } from 'react-redux';

const Loader = (props) => {
    const style = {
        display: props.visible ? 'block' : 'none'
    };
    return (<div style={style} className="modal has-overlay is-loading">
        <span className="loading loading--large" />
    </div>);
};

function mapStateToProps({ common }) {
    return {
        visible: common.loader
    };
}

export default connect(mapStateToProps)(Loader);