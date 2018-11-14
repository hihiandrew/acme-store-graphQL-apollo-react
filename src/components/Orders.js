import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

export default connect(
  mapStateToProps,
  null
)(Orders);
