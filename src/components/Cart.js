import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUpdateLineItem, createOrder } from '../store';

class Cart extends Component {
  render() {

    const {
      products,
      orderId,
      orders,
      createUpdateLineItem,
      createOrder,
      history,
    } = this.props;

    let totalOrders, cart, itemsInCart;
    if (orders.length) {
      totalOrders = orders.filter(o => o.status == 'ORDER').length;
      cart = orders.find(o => o.status == 'CART');
      itemsInCart = cart.lineitems.reduce(
        (init, curr) => init + curr.quantity,
        0
      );
    }

    const productCount = productId => {
      const item = cart.lineitems.find(i => i.productId == productId)
      if (!item) {
        return 0
      }
      return item.quantity
    }

    return (
      <div className="container">
        <h3>Products</h3>
        <div className="row">
          {products.map(prod => {
            const { id, name } = prod;
            return (
              <div className="col-sm-3 border rounded p-3" key={id}>
                <p>{name}</p>
                <p>{productCount(id)} ordered</p>
                <button
                  id={id}
                  onClick={() => createUpdateLineItem(id, 1, orders)}
                  className="btn btn-primary"
                >
                  +
                </button>{' '}
                <button
                  id={id}
                  onClick={() => createUpdateLineItem(id, -1, orders)}
                  disabled={!productCount(id)}
                  className="btn btn-primary"
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
        <br />
        <button
          className="btn btn-primary"
          disabled={!itemsInCart}
          onClick={() => {
            createOrder(orders);
            history.push('/orders');
          }}
        >
          Create Order
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    products: state.products,
    orderId: state.orderId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUpdateLineItem: (id, change, orders) =>
      dispatch(createUpdateLineItem(id, change, orders)),
    createOrder: orders =>
      dispatch(createOrder(orders)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
