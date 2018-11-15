const jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET || 'test_secret';

module.exports = {
  Order: {
    user: async(order, args, { User }) => {
      return User.findById(order.userId);
    },
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
  User: {
    orders: (user, args, { Order }) => {
      return Order.findAll({ where: { userId: user.id } });
    },
    lineItems: (user, args, { LineItem }) => {
      return LineItem.findAll({ where: { userId: user.id } });
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
    orders: async(_, args, { Order, LineItem, User }) => {
      const cartFilter = args.filter;
      await Order.findOrCreate({ where: { status: 'CART' } });
      const orders = Order.findAll({
        include: [{ model: LineItem }, User],
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
      const cartFilter = args.filter;
      const items = await LineItem.findAll();
      const cartId = await Order.findOne({ where: { status: cartFilter } }).id;
      return cartFilter ? items.filter(i => i.orderId == cartId) : items;
    },

    users: async(_, args, { User }) => await User.findAll(),
  },

  Mutation: {
    updateOrder: async(_, args, { Order }) => {
      const _order = await Order.findOne({ where: { status: 'CART' } });
      await _order.update({ status: 'ORDER' });
      return _order;
    },

    deleteOrder: async(_, { id }, { Order }) =>
      await Order.destroy({ where: { id } }),

    reset: async(_, args, { Order, LineItem }) => {
      await Order.destroy({ where: {} });
      await LineItem.destroy({ where: {} });
      return;
    },

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
    signup: async(_, { name, password }, { User }) => {
      const user = await User.create({ name, password });
      const token = jwt.encode({ id: user.id }, secret);
      return { token, user };
    },
    login: async(_, { name, password }, { User }) => {
      const user = await User.findOne({ where: { name } });
      if (!user) {
        throw new Error('No such user found');
      }
      const valid = await User.findOne({ where: { password } });
      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = jwt.encode({ id: user.id }, secret);
      return { token, user };
    },
  },
};
