import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../index';
import {
  ITEMS_FILTER_QUERY,
  RESET_MUTATION,
  ORDERS_QUERY,
  PRODUCTS_QUERY,
} from '../queries';

class StoreHeader extends Component {
  render() {
    return (
      <div>
        <p className="alert alert-success">
          <Query query={ITEMS_FILTER_QUERY} variables={{ filter: 'ORDER' }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading..';
              if (error) return 'Error';
              const { lineItems } = data;
              return lineItems.reduce((sum, i) => sum + i.quantity, 0);
            }}
          </Query>
          {' items sold!'}
        </p>
        <Mutation
          mutation={RESET_MUTATION}
          refetchQueries={[
            { query: ITEMS_FILTER_QUERY },
            { query: PRODUCTS_QUERY },
            { query: ORDERS_QUERY },
          ]}
          // update={store => {
          //   const data = store.readQuery({ query: ITEMS_FILTER_QUERY });
          //   console.log(data)
          //   data.orders = [];
          //   store.writeQuery({
          //     query: LINEITEMS_QUERY,
          //     data,
          //   });
          // }}
        >
          {mutation => (
            <button onClick={mutation} className="btn btn-warning">
              Reset
            </button>
          )}
        </Mutation>
        <br />
      </div>
    );
  }
}

export default StoreHeader;
