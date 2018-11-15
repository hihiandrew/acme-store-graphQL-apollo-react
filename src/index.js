import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
export const AUTH_TOKEN = 'token-1806';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  // uri: `https://vfs.cloud9.us-east-1.amazonaws.com/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  clientState: {},
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
