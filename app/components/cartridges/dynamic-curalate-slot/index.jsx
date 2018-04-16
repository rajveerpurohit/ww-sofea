import React from 'react';
import { getScript } from '../../../utils/htmlUtils';
import Curalate from '../../basic/curalate';

class DynamicCuralateSlot extends React.Component {
  render() {
    return (
      <Curalate payload={this.props.contentData} />
    );
  }
}
export default DynamicCuralateSlot;
