import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getOrderHistory, getOrderDetails, cancelOrder, addItemsToOrder } from './actions';

class MyOrders extends Component {

  constructor(props) {
    super(props);
    this.orderTable = this.orderTable.bind(this);
  }

  componentDidMount() {
    this.props.getOrderHistory(-1);
  }

  orderTable() {
    const orderHistory = this.props.user.orders;
    const orderRows = orderHistory.map((order) => {
      return (<tr className="table-scroll__row"><td><Link to={'/accountdetails/orderdetails?orderid=' + order.orderId}>{order.orderId}</Link></td>
        <td>{order.submittedDate.split(' ')[0]}</td>
        <td>R {order.total}</td>
        <td>{order.state}</td>
        <td>
          <a id="btnPrintSingleTaxNote" href="/store/docs/taxInvoice/.pdf" target="_blank" style={{ textDecoration: 'underline' }} /> <br />
          <a id="btnPrintSingleTaxNote" href="/store/docs/taxInvoice/.pdf" target="_blank" style={{ textDecoration: 'underline' }} /><br />
        </td>
        <td>
          <Link to={'/accountdetails/orderdetails?orderid=' + order.orderId}>View order</Link>
        </td>
        <td className="text-align-right">
          {order.orderCancellable &&
                (<a title="cancel order" className="removeItem" onClick={() => this.props.cancelOrder(order.orderId)}><span className="icon icon--cancel-dark" /></a>)}
        </td></tr>);
    });
    return orderRows;
  }

  render() {
    const orderHistory = this.props.user.orders;
    if (orderHistory.length === 0) {
      return (<div className="page-layout__content"><h1 className="font-graphic text-caps">My orders</h1></div>);
    }
    return (
      <div className="page-layout__content">
        <section className="contentBlock tableWrapper">
          <h1 className="font-graphic text-caps">My orders</h1>
          <p>Click on the purchase ID to view the full details of your purchase:</p>
          <div className="table-scroll table-scroll--x">
            <table className="table table-scroll__table table--border-rows" cellSpacing="0" cellPadding="0">
              <thead className="table__head">
                <tr className="table-scroll__row">
                  <th>PURCHASE ID</th>
                  <th>PURCHASE DATE</th>
                  <th>VALUE</th>
                  <th>DELIVERY DATE</th>
                  <th>TAX INVOICE</th>
                  <th>VIEW ORDER</th>
                  <th className="text-align-right">CANCEL ORDER</th>
                </tr>
              </thead>
              <tbody className="table-scroll__body">
                {this.orderTable()}
              </tbody>
            </table>
            <p>
              {orderHistory.length > 20 && (<a className="moreLink">View All</a>) }
            </p>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    common: state.common
  };
}

export default connect(mapStateToProps, { getOrderHistory, getOrderDetails, cancelOrder, addItemsToOrder })(MyOrders);
