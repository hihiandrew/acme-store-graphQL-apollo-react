import React, { Component } from 'react';
import { Query } from 'react-apollo';
import OrderCards from './OrderCards';
import { ORDERS_QUERY } from '../queries';

class Orders extends Component {
  render() {
    return (
      <div className="container">
        <h3>Orders</h3>
        <Query query={ORDERS_QUERY} variables={{ orderStatus: 'ORDER' }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading..</div>;
            if (error) return <div>Error</div>;
            if (data.orders.length == 0) return <h6>No orders .. yet!</h6>;
            return data.orders.map(ord => {
              return <OrderCards ord={ord} key={ord.id} />;
            });
          }}
        </Query>
      </div>
    );
  }
}

export default Orders;
