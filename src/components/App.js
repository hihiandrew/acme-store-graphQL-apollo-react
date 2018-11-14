import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';
import Login from './Login';
import StoreHeader from './StoreHeader';
import {
  getOrders,
  getProducts,
  resetAll,
  exchangeTokenForAuth,
  logout,
}
from '../store';

//test chg

class App extends Component {
  constructor() {
    super();
    this.resetAll = this.resetAll.bind(this);
  }

  async componentDidMount() {
    await this.props.getProducts();
    await this.props.getOrders();
    await this.props.exchangeTokenForAuth();
  }

  resetAll() {
    this.props.resetAll();
  }

  render() {
    const { logout, auth } = this.props;

    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };
    const renderLogin = ({ location, history }) => {
      const path = location.pathname;
      return <Login path={path} history={history} />;
    };
    const renderLogout = ({ history }) => {
      logout();
      return null;
    };
    const renderCart = ({ history }) => {
      return <Cart history={history} />;
    };

    return (
      <HashRouter>
        <div>
          <Route path="/" render={renderNavbar} />
          {auth.id ? (
            <div>
              <Route path="/" component={StoreHeader} />
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" render={renderCart} />
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/logout" render={renderLogout} />
            </div>
          ) : (
            <div>
              <Route path="/" render={renderLogin} />
              Please login to access Acme Store. Try:{' '}
              {`moe : moe, larry : larry`}.
            </div>
          )}
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    products: state.products,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders()),
    getProducts: () => dispatch(getProducts()),
    resetAll: () => dispatch(resetAll()),
    exchangeTokenForAuth: history => dispatch(exchangeTokenForAuth(history)),
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
