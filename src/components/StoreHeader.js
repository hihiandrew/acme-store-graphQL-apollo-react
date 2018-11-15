import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../index';
import { LINEITEMS_QUERY, RESET_MUTATION, ORDERS_QUERY, PRODUCTS_QUERY } from '../queries'

class StoreHeader extends Component {
  render() {
    return (
      <div>
        <p className="alert alert-success">
          <Query query={LINEITEMS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading..';
              if (error) return 'Error';
              const ordered = data.orders.filter(o => o.status == 'ORDER');
              const soldItems = ordered.reduce(
                (init, curr) =>
                  init +
                  curr.lineItems.reduce(
                    (init, curr) => init + curr.quantity,
                    0
                  ),
                0
              );
              return soldItems;
            }}
          </Query>{' '}
          items sold!
        </p>
        <Mutation
          mutation={RESET_MUTATION}
          refetchQueries={[{query:LINEITEMS_QUERY},{query:PRODUCTS_QUERY},{query:ORDERS_QUERY}]}
          // update={store => {
          //   const data = store.readQuery({ query: LINEITEMS_QUERY });
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
        <br/>
      </div>
    );
  }
}

export default StoreHeader;
