import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//test chg

class Navbar extends Component {
  render() {
    const { orders, path, auth } = this.props;
    let cart, itemsInCart, totalOrders;
    if (orders.length) {
      cart = orders.find(o => o.status == 'CART');
      itemsInCart = cart.lineitems.reduce(
        (init, curr) => init + curr.quantity,
        0
      );
      totalOrders = orders.filter(o => o.status == 'ORDER').length;
    }

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Acme Store
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarConent"
          aria-controls="navbarConent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarConent">
          <ul className="navbar-nav">
            <li className={path == '' ? 'nav-item active' : 'nav-item'}>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className={path == 'cart' ? 'nav-item active' : 'nav-item'}>
              <Link to="/cart" className="nav-link">
                Cart ({itemsInCart})
              </Link>
            </li>
            <li className={path == 'orders' ? 'nav-item active' : 'nav-item'}>
              <Link to="/orders" className="nav-link">
                Orders ({totalOrders})
              </Link>
            </li>
            <li>
              <Link to={auth.id ? '/logout' : '/login'} className="nav-link">
                {auth.id ? `Logout (${auth.name})` : 'Login'}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  null
)(Navbar);
