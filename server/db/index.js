const db = require('./db');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');

Order.hasMany(LineItem);
Product.hasMany(LineItem);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

const seed = () => {
  return Promise.all([
    Product.create({ name: 'milk' }),
    Product.create({ name: 'eggs' }),
    Product.create({ name: 'water' }),
    Product.create({ name: `bread` }),
    Product.create({ name: 'coffee' }),
    Product.create({ name: 'flowers' }),
    Product.create({ name: 'fruit' }),
    Product.create({ name: 'vegetables' }),
    Order.create({ status: 'ORDER' }),
    Order.create({ status: 'ORDER' }),
    Order.create({ status: 'CART' }),
  ])
    .then(([p1, p2, p3, p4, p5, p6, p7, p8, order1, order2, order3]) => {
      return Promise.all([
        LineItem.create({ orderId: order1.id, productId: p1.id }),
        LineItem.create({ orderId: order2.id, productId: p6.id }),
        LineItem.create({ orderId: order2.id, productId: p7.id }),
        LineItem.create({ orderId: order2.id, productId: p8.id }),
      ]);
    })
    .catch(err => console.log(err));
};

module.exports = { db, Product, Order, LineItem, seed };
