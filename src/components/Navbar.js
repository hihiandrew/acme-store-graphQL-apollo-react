import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { ORDERS_COUNT_QUERY, ITEMS_FILTER_QUERY } from '../queries';

class Navbar extends Component {
  componentDidMount() {}
  render() {
    const { path } = this.props;
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
                <Query
                  query={ITEMS_FILTER_QUERY}
                  variables={{ orderStatus: 'CART' }}
                >
                  {({ loading, error, data }) => {
                    console.log(error);
                    if (loading) return <div>Loading..</div>;
                    if (error) return <div>Error</div>;
                    const { lineItems } = data;
                    console.log('lineitems flter', data);
                    return lineItems.reduce((sum, i) => sum + i.quantity, 0);
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
                    if (loading) return <div>Loading..</div>;
                    if (error) return <div>Error</div>;
                    return data.orders.length;
                  }}
                </Query>
                )
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
