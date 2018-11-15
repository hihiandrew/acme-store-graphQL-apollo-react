import gql from 'graphql-tag';

//navbar
export const ORDERS_COUNT_QUERY = gql `
query{
  orders(filter: "ORDER"){
    id
  }
}
`

export const CARTITEMS_COUNT_QUERY = gql `
  query {
    cartItemsCount
  }
`;

//store header
export const LINEITEMS_QUERY = gql `
  query {
    orders {
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
      name
      id
      lineItems(filter: "CART") {
        id
        quantity
        orderId
      }
    }
  }
`;
const CART_ITEMS_COUNT = gql `
  query {
    cartItemsCount
  }
`;

//login
export const LOGIN_MUTATION = gql `
  mutation LoginMutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        name
      }
    }
  }
`;
export const SIGNUP_MUTATION = gql `
  mutation SignupMutation($name: String!, $password: String!) {
    signup(name: $name, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

//orders
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
