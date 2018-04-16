import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DeliveryTo from '../../basic/delivering-to';
// import DeliverySlotTo from '../../basic/delivery-slot';

// class DeliveryDetails extends Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {
//         const user = this.props.user;
//         const deliveryDetails = this.props.deliveryDetails;
//         const deliverySlot = (user.isLoggedIn && deliveryDetails.deliveryLocation.suburb) ? <DeliverySlotTo deliveryDetails={deliveryDetails} /> : null;

//         return (
//             <div>
//             </div>
//         );
//     }

// }
const DeliveryDetails = (props) => {
  return <DeliveryTo labels={props.labels} deliveryDetails={props.deliveryDetails} />;
};
export default DeliveryDetails;
