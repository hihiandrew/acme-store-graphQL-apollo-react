import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';
import StoreHeader from './StoreHeader';

class App extends Component {
  render() {
    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };
    const renderCart = ({ history }) => {
      return <Cart history={history} />;
    };
    return (
      <HashRouter>
        <div className="container">
          <Route path="/" render={renderNavbar} />
          <Route path="/" component={StoreHeader} />
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" render={renderCart} />
          <Route exact path="/orders" component={Orders} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
