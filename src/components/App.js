import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { AUTH_TOKEN } from '../index';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';
import Login from './Login';
import StoreHeader from './StoreHeader';

class App extends Component {
  render() {
    const auth = localStorage.getItem(AUTH_TOKEN);
    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };
    const renderLogin = ({ location, history }) => {
      const path = location.pathname;
      return <Login path={path} history={history} />;
    };
    const renderLogout = ({ location, history }) => {
      const path = location.pathname.split('/').pop();
      localStorage.removeItem(AUTH_TOKEN);
      return <Login path={path} history={history} />;
    };
    const renderCart = ({ history }) => {
      return <Cart history={history} />;
    };

    return (
      <HashRouter>
        <div>
          <Route path="/" render={renderNavbar} />
          {auth ? (
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

export default App;
