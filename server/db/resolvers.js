const jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET || 'test_secret';

module.exports = {
  Order: {
    lineItems: async(order, args, { Order, LineItem }) => {
      return LineItem.findAll({ where: { orderId: order.id } });
    },
  },
  LineItem: {
    product: (lineItem, args, { Product }) => {
      return Product.findById(lineItem.productId);
    },
    order: (lineItem, args, { Order }) => {
      return Order.findById(lineItem.orderId);
    },
  },
  Product: {
    lineItems: async(product, args, { Order, LineItem }) => {
      const cartFilter = args.filter;
      const items = await LineItem.findAll({
        where: { productId: product.id },
      });
      const cart = await Order.findOne({ where: { status: cartFilter } });
      const cartId = cart.id;
      return cartFilter ? items.filter(i => i.orderId == cartId) : items;
    },
  },
  Query: {
    orders: async(_, args, { Order, LineItem }) => {
      const cartFilter = args.filter;
      await Order.findOrCreate({ where: { status: 'CART' } });
      const orders = Order.findAll({
        include: [{ model: LineItem }],
      });
      return cartFilter ? orders.filter(o => o.status == cartFilter) : orders;
    },
    ordersCount: async(_, args, { Order }) => {
      ords = await Order.findAll();
      return ords.length;
    },
    cartItemsCount: async(_, args, { Order, LineItem }) => {
      const cart = await Order.findOne({ where: { status: 'CART' } });
      const cartId = cart.id;
      const cartItems = await LineItem.findAll({ where: { orderId: cartId } });
      const count = cartItems.reduce((init, curr) => {
        return init + curr.quantity;
      }, 0);
      return count;
    },
    order: async(_, { id }, { Order }) => await Order.findById(id),

    products: async(_, args, { Product }) => await Product.findAll(),

    product: async(_, { id }, { Product }) => await Product.findById(id),

    lineItems: async(parent, args, { LineItem, Order }) => {
      const items = await LineItem.findAll();
      if (!args.filter) return items;
      const cart = await Order.findOne({ where: { status: 'CART' } });
      const cartId = cart.id;
      return args.filter == 'CART' ?
        items.filter(i => i.orderId == cartId) :
        items.filter(i => i.orderId != cartId);
    },
  },

  Mutation: {

    deleteOrder: async(_, { id }, { Order }) =>
      await Order.destroy({ where: { id } }),

    createLineItem: async(_, { productId }, { LineItem, Order }) => {
      const cart = await Order.findOne({ where: { status: 'CART' } });
      const cartId = cart.id;
      return LineItem.create({ orderId: cartId, quantity: 1, productId });
    },

    updateLineItem: async(_, { id, quantity, inc }, { LineItem }) => {
      const _LineItem = await LineItem.findById(id);
      const quant = inc ? quantity + 1 : quantity - 1;
      await _LineItem.update({ quantity: quant });
      return _LineItem;
    },

    deleteLineItem: async(_, { id }, { LineItem }) => {
      await LineItem.destroy({ where: { id } });
      return id;
    },

  },
}
