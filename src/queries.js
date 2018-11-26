import gql from 'graphql-tag';

//navbar
export const ORDERS_COUNT_QUERY = gql`
  query {
    orders(filter: "ORDER") {
      id
    }
  }
`;

export const ITEMS_FILTER_QUERY = gql`
  query ItemsFilteredCount($orderStatus: String) {
    lineItems(filter: $orderStatus) {
      id
      quantity
    }
  }
`;

//store header
export const LINEITEMS_QUERY = gql`
  query {
    orders {
      id
      status
      lineItems {
        id
        quantity
      }
    }
  }
`;
export const RESET_MUTATION = gql`
  mutation {
    reset
  }
`;

//cart
export const PRODUCTS_QUERY = gql`
  query filterProducts($orderStatus: String) {
    products {
      id
      name
      lineItems(filter: $orderStatus) {
        id
        quantity
        orderId
      }
    }
  }
`;

//cart?
export const POST_MUTATION = gql`
  mutation PostMutation($productId: Int!) {
    createLineItem(productId: $productId) {
      id
      quantity
      orderId
    }
  }
`;
export const DEL_MUTATION = gql`
  mutation DeleteMutation($lineItemId: Int!) {
    deleteLineItem(id: $lineItemId)
  }
`;
export const PUT_MUTATION = gql`
  mutation PutMutation($lineItemId: Int!, $quant: Int!, $inc: Boolean!) {
    updateLineItem(id: $lineItemId, quantity: $quant, inc: $inc) {
      id
      quantity
      productId
      orderId
    }
  }
`;

export const POST_ORDER_MUTATION = gql`
  mutation PostOrderMutation {
    updateOrder {
      status
      id
    }
  }
`;

//orders
export const ORDERS_QUERY = gql`
  query filteredOrders($orderStatus: String) {
    orders(filter: $orderStatus) {
      id
      lineItems {
        id
        quantity
        product {
          name
        }
      }
    }
  }
`;
