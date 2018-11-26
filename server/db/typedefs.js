module.exports = `
type Product {
  id: Int!
  name: String!
  lineItems(filter: String): [LineItem]
}

type LineItem {
  id: Int
  quantity: Int
  productId: Int
  product: Product
  orderId: String
  order: Order
}

type Order {
  id: String!
  lineItems: [LineItem]
  status: String!
}

type Query {
  orders(filter: String): [Order!]!
  order(id:String!): Order
  products: [Product]
  product(id:Int!): Product
  lineItems(filter: String): [LineItem]
  lineItem(id:Int!): LineItem
  ordersCount: Int
  cartItemsCount: Int
}

type Mutation {
  updateOrder(id: String, status: String): Order!
  deleteOrder(id: String): Int

  reset(id: String):Int

  createLineItem(id: Int, quantity: Int, productId: Int, orderId: String): LineItem!
  updateLineItem(id: Int, quantity: Int, inc: Boolean, productId: Int, orderId: String): LineItem!
  deleteLineItem(id: Int): Int
}
`;
