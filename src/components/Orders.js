import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import OrderRows from './OrderRows';

export const ORDERS_QUERY = gql `
query{
  orders(filter: "ORDER"){
    id
    lineItems{
      quantity
      product{
        name
      }
    }
  }
}
`

class Orders extends Component {
  render() {
    return (
      <div className="container">
      <h3>Orders</h3>
      <Query query={ORDERS_QUERY}>
       {({ loading, error, data }) => {
              if (loading) return <div>Loading..</div>;
              if (error) return <div>Error</div>;
              if (data.orders.length==0) return <h6>No orders .. yet!</h6>
              return data.orders.map(ord => {
          return (
            <div>
            <div className="card" key={ord.id}>
              <div className="card-body">
                  <div className="card-title">#{ord.id}</div>
                  {/*<th><button className="btn btn-outline-danger" onClick={()=>deleteOrder(ord.id)}>Delete</button></th>*/}
                  {ord.lineItems.map(item => {
                    return (<div className="card-text">
                    <br/>
                    <OrderRows item={item} key={item.id} />
                    </div>)
                })}
              </div>
            </div>
            <br/>
            </div>
          );
        })
       }}
      </Query>
      </div>
    );
  }
}



export default Orders
