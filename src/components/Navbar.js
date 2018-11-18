import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { AUTH_TOKEN } from '../index';
import {
  ORDERS_COUNT_QUERY,
  ITEMS_FILTER_QUERY,
  AUTH_USER_QUERY,
} from '../queries';

class Navbar extends Component {
  render() {
    const { path } = this.props;
    const auth = localStorage.getItem(AUTH_TOKEN);
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
            {auth && (
              <li className={path == 'cart' ? 'nav-item active' : 'nav-item'}>
                <Link to="/cart" className="nav-link">
                  Cart (
                  <Query
                    query={ITEMS_FILTER_QUERY}
                    variables={{ filter: 'CART' }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <div>Loading..</div>;
                      if (error) return <div>Error</div>;
                      const { lineItems } = data;
                      return lineItems.reduce((sum, i) => sum + i.quantity, 0);
                    }}
                  </Query>
                  )
                </Link>
              </li>
            )}
            {auth && (
              <li className={path == 'orders' ? 'nav-item active' : 'nav-item'}>
                <Link to="/orders" className="nav-link">
                  Orders (
                  <Query query={ORDERS_COUNT_QUERY}>
                    {({ loading, error, data }) => {
                      if (loading) return <div>Loading..</div>;
                      if (error) return <div>Error</div>;
                      return data.orders.length;
                    }}
                  </Query>
                  )
                </Link>
              </li>
            )}
            <li>
              <Link to={auth ? '/logout' : '/login'} className="nav-link">
                {auth
                  ? `Logout ({(
                      <Query query={AUTH_USER_QUERY}>
                        {({ data }) => {
                          if (loading) return <div>Loading..</div>;
                          if (error) return <div>Error</div>;
                          console.log(data);
                          return;
                        }}
                      </Query>
                    )})`
                  : 'Login'}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
