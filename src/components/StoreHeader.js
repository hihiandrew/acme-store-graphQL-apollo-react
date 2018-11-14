import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../index';

const LINEITEMS_QUERY = gql`
  query {
    orders {
      status
      lineItems {
        quantity
      }
    }
  }
`;

const RESET_MUTATION = gql`
  mutation {
    reset
  }
`;

class StoreHeader extends Component {
  render() {
    return (
      <div className="container">
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
          update={store => {
            const data = store.readQuery({ query: LINEITEMS_QUERY });
            data.orders = [];
            store.writeQuery({
              query: LINEITEMS_QUERY,
              data,
            });
          }}
        >
          {mutation => (
            <button onClick={mutation} className="btn btn-warning">
              Reset
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default StoreHeader;
