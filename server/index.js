const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./db/typeDefs');
const resolvers = require('./db/resolvers');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8080;
const { db, Product, Order, LineItem, User, seed } = require('./db');
const jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET || 'test_secret';

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { Product, Order, LineItem, User },
});

server.applyMiddleware({ app, path: '/graphql' });

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); //get HTML
app.use('/public', express.static(path.join(__dirname, '../public'))); //get webpack bundle

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  let id;
  try {
    id = jwt.decode(token, secret).id;
  } catch (ex) {
    return next({ status: 401 });
  }
  User.findById(id)
    .then(user => {
      req.user = user; //add user field into req
      next();
    })
    .catch(next);
});

db.sync({ force: true })
  .then(() => {
    console.log('database synced');
    seed();
  })
  .then(() => {
    console.log('databse seeded');
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  });
