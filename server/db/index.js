const db = require('./db');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const User = require('./User.js');

Order.hasMany(LineItem);
Product.hasMany(LineItem);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

const seed = () => {
  return Promise.all([
      User.create({ name: 'moe', password: 'moe' }),
      User.create({ name: 'larry', password: 'larry' }),
      User.create({ name: 'admin', password: 'admin' }),
    ])
    .then(([moe, larry, admin]) => {
      return Promise.all([
        Product.create({ name: 'vhs tape' }),
        Product.create({ name: 'durian' }),
        Product.create({ name: 'e coli' }),
        Product.create({ name: `father's browser history` }),
        Product.create({ name: 'high energy nuclear matter' }),
        Product.create({ name: 'handful of wires' }),
        Product.create({ name: 'loud cough' }),
        Product.create({ name: 'left handed biro' }),
        Order.create({ status: 'ORDER', userId: moe.id }),
        Order.create({ status: 'ORDER', userId: larry.id }),
      ]);
    })
    .then(([p1, p2, p3, p4, p5, p6, p7, p8, order1, order2]) => {
      return Promise.all([
        LineItem.create({ orderId: order1.id, productId: p1.id }),
        LineItem.create({ orderId: order2.id, productId: p6.id }),
        LineItem.create({ orderId: order2.id, productId: p7.id }),
        LineItem.create({ orderId: order2.id, productId: p8.id }),
      ]);
    })
    .catch(err => console.log(err));
};

module.exports = { db, Product, Order, LineItem, User, seed };
