import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderRows from './OrderRows';
import { deleteOrder } from '../store'

class OrderTables extends Component {
  render() {
    const orders = this.props.orders.filter(o => o.status == 'ORDER');
    const { deleteOrder } = this.props
    return (
      <div>
        {orders.map(ord => {
          return (
            <table className="table" key={ord.id}>
              <thead>
                <tr>
                  <th>#{ord.id}</th>
                  <th><button className="btn btn-outline-danger" onClick={()=>deleteOrder(ord.id)}>Delete</button></th>
                </tr>
              </thead>
              <tbody>
                {ord.lineitems.map(item => {
                  return <OrderRows item={item} key={item.id} />;
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOrder: orderId => dispatch(deleteOrder(orderId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTables);
