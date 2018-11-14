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
        Product.create({ name: 'milk' }),
        Product.create({ name: 'bread' }),
        Product.create({ name: 'eggs' }),
        Product.create({ name: 'coffee' }),
        Order.create({ status: 'ORDER', userId: moe.id }),
        Order.create({ status: 'ORDER', userId: larry.id }),
      ]);
    })
    .then(([milk, bread, eggs, coffee, order1, order2]) => {
      return Promise.all([
        LineItem.create({ orderId: order1.id, productId: milk.id }),
        LineItem.create({ orderId: order2.id, productId: bread.id }),
        LineItem.create({ orderId: order2.id, productId: eggs.id }),
        LineItem.create({ orderId: order2.id, productId: coffee.id }),
      ]);
    })
    .catch(err => console.log(err));
};

module.exports = { db, Product, Order, LineItem, User, seed };
