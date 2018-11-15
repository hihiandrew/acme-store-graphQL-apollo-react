import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { AUTH_TOKEN } from '../index';
import { ORDERS_COUNT_QUERY, CARTITEMS_COUNT_QUERY } from '../queries'


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
            <li className={path == 'cart' ? 'nav-item active' : 'nav-item'}>
              <Link to="/cart" className="nav-link">
                Cart (
                <Query query={CARTITEMS_COUNT_QUERY}>
                  {({ loading, error, data }) => {
                    if (loading) return <div>Loading..</div>;
                    if (error) return <div>Error</div>;
                    return data.cartItemsCount;
                  }}
                </Query>
                )
              </Link>
            </li>
            <li className={path == 'orders' ? 'nav-item active' : 'nav-item'}>
              <Link to="/orders" className="nav-link">
                Orders (
                <Query query={ORDERS_COUNT_QUERY}>
                  {({ loading, error, data }) => {
                    // if (loading) return <div>Loading..</div>;
                    if (loading || error) return <div>Error</div>;
                    return data.orders.length;
                  }}
                </Query>
                )
              </Link>
            </li>
            <li>
              <Link to={auth ? '/logout' : '/login'} className="nav-link">
                {auth
                  ? `Logout (temp)`
                  : // ${(<Query query={AUTH_USER_QUERY}>
                    //       {({ data }) => {
                    //         console.log('navbar', data.authUser);
                    //         return authUser;
                    //       }}
                    //     </Query>
                    //     )}
                    'Login'}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
