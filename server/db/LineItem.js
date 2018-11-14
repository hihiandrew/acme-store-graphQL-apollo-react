const db = require('./db');

const LineItem = db.define('lineitem', {
  quantity: {
    type: db.Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = LineItem;
