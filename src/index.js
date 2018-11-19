import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
const PORT = process.env.PORT || 8080;
export const AUTH_TOKEN = 'token-1806';

const httpLink = createHttpLink({
  // uri: 'http://localhost:${PORT}/graphql',
  uri: 'https://f5c3c09755cc4acd97e2d93560e90e54.vfs.cloud9.us-east-1.amazonaws.com/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  clientState: {},
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
