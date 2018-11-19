const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./db/typedefs');
const resolvers = require('./db/resolvers');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8080;
const { db, Product, Order, LineItem, seed } = require('./db');


const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { Product, Order, LineItem },
});

server.applyMiddleware({ app, path: '/graphql' });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); //get HTML
app.use('/public', express.static(path.join(__dirname, '../public'))); //get webpack bundle

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
