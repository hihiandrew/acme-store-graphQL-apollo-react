import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  PRODUCTS_QUERY,
  ORDERS_QUERY,
  POST_MUTATION,
  DEL_MUTATION,
  PUT_MUTATION,
  POST_ORDER_MUTATION,
} from '../queries';

class Cart extends Component {
  _updateCacheAfterTrade = (store, trade, productId) => {
    const data = store.readQuery({
      query: PRODUCTS_QUERY,
      variables: { orderStatus: 'CART' },
    });
    //conditional del as mutation doesnt return quantity, instead we remove it
    let tradedProduct = data.products.find(prod => prod.id === productId);
    console.log(trade);
    if (!trade) {
      tradedProduct.lineItems = [];
    } else {
      if (trade.quantity == 1) {
        //create lineItem
        tradedProduct.lineItems = [...tradedProduct.lineItems, trade];
      } else {
        //increment/decrement first (and only) lineItem
        tradedProduct.lineItems[0].quantity = trade.quantity;
      }
    }
    store.writeQuery({ query: PRODUCTS_QUERY, data });
  };

  _updateCacheAfterOrder = (store, orderId) => {
    const data = store.readQuery({
      query: ORDERS_QUERY,
    });
    console.log('updatecacheOrder', data);
    store.writeQuery({ query: ORDERS_QUERY, data });
  };

  render() {
    const { history } = this.props;
    return (
      <div className="container">
        <h3>Products</h3>
        <div className="row">
          <Query query={PRODUCTS_QUERY} variables={{ orderStatus: 'CART' }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading..</div>;
              if (error) return <div>Error</div>;
              const { products } = data;
              console.log('cart prods', products);
              return products.map(prod => {
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
                        console.log('store', store);
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
          refetchQueries={[{ query: ORDERS_QUERY }]}
          onCompleted={() => history.push('/orders')}
          update={(store, { data }) => {
            console.log('store', store);
            console.log('data', data);
            //this._updateCacheAfterOrder(store, data.updateOrder.id)
          }}
        >
          {mutation => (
            <button className="btn btn-primary" onClick={mutation}>
              Create Order
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}
//ok
export default Cart;
