const db = require('./db');
const { resolver } = require('graphql-sequelize');

const Order = db.define('order', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: db.Sequelize.ENUM('CART', 'ORDER'),
    allowNUll: false,
    defaultValue: 'CART',
  },
});

module.exports = Order;
