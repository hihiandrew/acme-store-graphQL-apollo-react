module.exports = {
  Order: {
    user: (parent, args, context) => parent.getUser(),
  },

  Query: {
    orders: async (parent, args, { Order }) => {
      await Order.findOrCreate({ where: { status: 'CART' } });
      return Order.findAll({
        include: [{ model: LineItem }, User],
      });
    },

    order: async (parent, { id }, { Order }) => await Order.findById(id),

    products: async (parent, args, { Product }) => await Product.findAll(),

    product: async (parent, { id }, { Product }) => await Product.findById(id),
  },

  Mutation: {
    createOrder: async (parent, args, { Order }) => await Order.create(args),

    updateOrder: async (parent, args, { Order }) =>
      await Order.update(args, { where: { id: args.id } }),

    deleteOrder: async (parent, { id }, { Order }) =>
      await Order.destroy({ where: { id } }),

    reset: async () => {
      await Order.destroy({ where: {} });
      await LineItem.destroy({ where: {} });
      return;
    },

    createLineItem: async (
      parent,
      { orderId, quantity, productId },
      { LineItem }
    ) => await LineItem.create(orderId, quantity, productId),

    updateLineItem: async (parent, { id, quantity }, { LineItem }) => {
      const _LineItem = await LineItem.findById(id);
      return await _LineItem.update(quantity);
    },

    deleteLineItem: async (parent, { id }, { LineItem }) =>
      await LineItem.destroy({ where: { id } }),

    createUser: async (parent, { name, password }, { User }) => {
      const user = await User.findOne({ where: { name, password } });
      if (!user) await User.create(orderId, quantity, productId);
    },

    updateUser: async (parent, { id, quantity }, { User }) => {
      const _LineItem = await LineItem.findById(id);
      return await _LineItem.update(quantity);
    },

    deleteUser: async (parent, { id }, { User }) =>
      await User.destroy({ where: { id } }),
  },
};

// export default {
//   Author: {
//     posts: (parent, args, context, info) => parent.getPosts(),
//   },
//   Post: {
//     author: (parent, args, context, info) => parent.getAuthor(),
//   },
//   Query: {
//     posts: (parent, args, { db }, info) => db.post.findAll(),
//     authors: (parent, args, { db }, info) => db.author.findAll(),
//     post: (parent, { id }, { db }, info) => db.post.findById(id),
//     author: (parent, { id }, { db }, info) => db.author.findById(id),
//   },
//   Mutation: {
//     createPost: (parent, { title, content, authorId }, { db }, info) =>
//       db.post.create({
//         title: title,
//         content: content,
//         authorId: authorId,
//       }),
//     updatePost: (parent, { title, content, id }, { db }, info) =>
//       db.post.update(
//         {
//           title: title,
//           content: content,
//         },
//         {
//           where: {
//             id: id,
//           },
//         }
//       ),
//     deletePost: (parent, { id }, { db }, info) =>
//       db.post.destroy({
//         where: {
//           id: id,
//         },
//       }),
//   },
// };
