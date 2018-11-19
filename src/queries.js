import gql from 'graphql-tag';

//navbar
export const ORDERS_COUNT_QUERY = gql `
  query {
    orders(filter: "ORDER") {
      id
    }
  }
`;

export const ITEMS_FILTER_QUERY = gql `
  query ItemsFilteredCount($filter: String) {
    lineItems(filter: $filter) {
      id
      quantity
    }
  }
`;

//store header
export const LINEITEMS_QUERY = gql `
  query {
    orders {
      id
      status
      lineItems {
        quantity
      }
    }
  }
`;
export const RESET_MUTATION = gql `
  mutation {
    reset
  }
`;

//cart
export const PRODUCTS_QUERY = gql `
  query {
    products {
      id
      name
      lineItems(filter: "CART") {
        id
        quantity
        orderId
      }
    }
  }
`;


export const POST_MUTATION = gql `
  mutation PostMutation($productId: Int!) {
    createLineItem(productId: $productId) {
      id
      quantity
      orderId
    }
  }
`;
export const DEL_MUTATION = gql `
  mutation DeleteMutation($lineItemId: Int!) {
    deleteLineItem(id: $lineItemId)
  }
`;
export const PUT_MUTATION = gql `
  mutation PutMutation($lineItemId: Int!, $quant: Int!, $inc: Boolean!) {
    updateLineItem(id: $lineItemId, quantity: $quant, inc: $inc) {
      id
      quantity
      productId
      orderId
    }
  }
`;

export const POST_ORDER_MUTATION = gql `
  mutation PostOrderMutation {
    updateOrder {
      status
      id
    }
  }
`;

//orders
export const ORDERS_QUERY = gql `
  query {
    orders(filter: "ORDER") {
      id
      lineItems {
        id
        quantity
        product {
          id
          name
        }
      }
    }
  }
`;
