import React, { Component } from 'react';
import { Query, Mutation, graphql } from 'react-apollo';
import {
  PRODUCTS_QUERY,
  ORDERS_QUERY,
  POST_MUTATION,
  DEL_MUTATION,
  PUT_MUTATION,
  POST_ORDER_MUTATION,
}
from '../queries';

class Products extends Component {
  _updateCacheAfterTrade = (store, trade, productId) => {
    const data = store.readQuery({
      query: PRODUCTS_QUERY,
    });
    //conditional del as mutation doesnt return quantity, instead we remove it
    let tradedProduct = data.products.find(prod => prod.id === productId);
    if (!trade) {
      tradedProduct.lineItems = [];
    }
    else {
      if (trade.quantity == 1) {
        //create lineItem
        tradedProduct.lineItems.push(trade);
      }
      else {
        //increment/decrement first (and only) lineItem
        tradedProduct.lineItems[0].quantity = trade.quantity;
      }
    }
    store.writeQuery({ query: PRODUCTS_QUERY, data });
  };

  _updateCacheAfterOrder = (store, order, productId) => {
    const data = store.readQuery({
      query: POST_ORDER_MUTATION,
    });

    store.writeQuery({ query: POST_ORDER_MUTATION, data });
  };

  render() {
    const { history } = this.props;
    return (
      <div className="container">
        <h3>Products</h3>
        <div className="row">
          <Query query={PRODUCTS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading..'
              if (error) return 'Error'
              return data.products.map(prod => {
                const { id: productId, name, lineItems } = prod;
                let lineItemId, quantity;
                if (lineItems.length) {
                  lineItemId = lineItems[0].id;
                  quantity = lineItems[0].quantity;
                }
                const quant = quantity === undefined ? 0 : quantity;
                return (
                  <div className="col-sm-3 border rounded p-3" key={prod.id}>
                    <p>{name}</p>
                    <p>{quant} ordered</p>
                    <Mutation
                      mutation={quant ? PUT_MUTATION : POST_MUTATION}
                      variables={{
                        quant,
                        productId,
                        inc: true,
                        lineItemId,
                      }}
                      update={(store, { data }) => {
                        this._updateCacheAfterTrade(
                          store,
                          quant ? data.updateLineItem : data.createLineItem,
                          productId
                        );
                      }}
                    >
                      {mutation => (
                        <button onClick={mutation} className="btn btn-primary">
                          +
                        </button>
                      )}
                    </Mutation>{' '}
                    <Mutation
                      mutation={quant === 1 ? DEL_MUTATION : PUT_MUTATION}
                      variables={{
                        quant,
                        productId,
                        inc: false,
                        lineItemId,
                      }}
                      update={(store, { data }) => {
                        this._updateCacheAfterTrade(
                          store,
                          quant === 1 ? null : data.updateLineItem,
                          productId
                        );
                      }}
                    >
                      {mutation => (
                        <button
                          onClick={mutation}
                          disabled={!quant}
                          className="btn btn-primary"
                        >
                          -
                        </button>
                      )}
                    </Mutation>
                  </div>
                );
              });
            }}
          </Query>
        </div>
        <br />
        <Mutation
          mutation={POST_ORDER_MUTATION}
          onCompleted={() => history.push('/orders')}
          refetchQueries={[{ query: ORDERS_QUERY }]}
        >
          {mutation => (
            <button
              className="btn btn-primary"
              // disabled={
              //   <Query query={CART_ITEMS_COUNT}>
              //     {({ loading, error, data }) => {
              //       console.log(loading, error, data);
              //       if (loading || error) return 1;
              //       console.log(data.cartItemsCount);
              //       return data.cartItemsCount;
              //     }}
              //   </Query>
              // }
              onClick={mutation}
            >
              Create Order
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Products;
