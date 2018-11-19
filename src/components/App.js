import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Products from './Products';
import Orders from './Orders';

class App extends Component {
  render() {
    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };
    const renderProducts = ({ history }) => {
      return <Products history={history} />;
    };
    return (
      <HashRouter>
        <div className="container">
          <Route path="/" render={renderNavbar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/products" render={renderProducts} />
          <Route exact path="/orders" component={Orders} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
