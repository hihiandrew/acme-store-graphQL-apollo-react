import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
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
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className={path == 'orders' ? 'nav-item active' : 'nav-item'}>
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
