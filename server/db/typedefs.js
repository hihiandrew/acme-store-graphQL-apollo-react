module.exports = `
type Product {
  id: ID!
  name: String!
}

type LineItem {
  id: ID!
  quantity: Int!
  productId: ID
  product: Product
  orderId: ID
  order: Order
}

enum Status {
  CART
  ORDER
}

type Order {
  id: ID!
  lineItems: [LineItem]!
  status: Status!
  user: User
}

type User {
  id: String!
  name: String!
  password: String!
  orders: [Order]
}

type Query {
  orders: [Order!]!
  order(id:String!): Order
  products: [Product!]!
  product(id:ID!): Product
  lineItems: [LineItem!]!
  lineItem(id:ID!): LineItem
}

input OrderInput {
  lineItems: [LineItemInput]
  status: Status
}

input LineItemInput {
  quantity: Int = 1
  productId: ID
  orderID: ID
}

type AuthPayload {
  token: String
  user: User
}

type Mutation {
  createOrder(id: String, input: OrderInput): Order!
  updateOrder(id: String!, input: OrderInput): Order!
  deleteOrder(id: String): Int

  reset(id: String):Int

  createLineItem(id: ID, input: LineItemInput): LineItem!
  updateLineItem(id: ID, input: LineItemInput): LineItem!
  deleteLineItem(id: ID): Int

  createUser(id:ID, name:String!, password: String!): AuthPayload
  updateUser(id:ID, name:String, password: String): AuthPayload
  deleteUser(id:ID): Int
}
`;
