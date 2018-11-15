import React, { Component } from 'react';
import OrderTables from './OrderTables';

class Orders extends Component {
  render() {
    return (
      <div className="container">
        <h3>Orders</h3>
        {this.props.orders ? <OrderTables /> : ''}
      </div>
    );
  }
}

export default Orders;
